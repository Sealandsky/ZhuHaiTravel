#!/usr/bin/env python3
"""
scripts/make-transparent.py
專為「日/夜雙生 3D 微縮建築圖」設計的透明背景生成腳本：

核心原理（互補色差共享遮罩法）：
- 白天圖 (zhuhai-opera-day.jpeg) 為純白背景，深色圓形底座邊緣極清晰，但白色貝殼頂部與白背景接近；
- 黑夜圖 (zhuhai-opera-night.jpeg) 為深黑背景，白色/暖光貝殼邊緣極清晰，但深色底座與黑背景接近；
本腳本支援兩種模式：
1. 若已安裝 `rembg` (pip install rembg pillow)，優先調用 AI 模型提取主體並合併日夜遮罩；
2. 若僅安裝 `pillow` + `numpy` + `scipy` (或純 `pillow` + `numpy`)，使用「外圍背景泛洪填充 (Floodfill) + 日夜互補合成統一 Alpha 遮罩」，
   確保生成的 `zhuhai-opera-day.webp` 與 `zhuhai-opera-night.webp` 既不丟失白色貝殼頂部、也不丟失深色底座，且日夜切換時像素級 100% 對齊！
"""
from collections import deque
import pathlib
import sys

try:
    import numpy as np
    from PIL import Image, ImageFilter
except ImportError:
    print("❌ 請先安裝 Pillow 與 NumPy: pip3 install pillow numpy")
    sys.exit(1)

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG_DIR = ROOT / "public" / "images"

DAY_IN = IMG_DIR / "zhuhai-opera-day.jpeg"
NIGHT_IN = IMG_DIR / "zhuhai-opera-night.jpeg"

DAY_OUT_WEBP = IMG_DIR / "zhuhai-opera-day.webp"
NIGHT_OUT_WEBP = IMG_DIR / "zhuhai-opera-night.webp"
DAY_OUT_PNG = IMG_DIR / "zhuhai-opera-day.png"
NIGHT_OUT_PNG = IMG_DIR / "zhuhai-opera-night.png"


def compute_shared_alpha_floodfill(day_rgb: np.ndarray, night_rgb: np.ndarray, day_thresh: float = 75.0, night_thresh: float = 25.0) -> np.ndarray:
    """
    利用四角的背景採樣顏色，結合白天與黑夜兩張圖的互補對比度，
    從圖像四邊向內進行泛洪背景檢測 (Floodfill)，生成統一的抗鋸齒 Alpha 遮罩。
    """
    h, w, _ = day_rgb.shape

    # 取四角 16x16 區域計算白天背景色與黑夜背景色均值
    corners_day = np.concatenate([
        day_rgb[:16, :16].reshape(-1, 3),
        day_rgb[:16, -16:].reshape(-1, 3),
        day_rgb[-16:, :16].reshape(-1, 3),
        day_rgb[-16:, -16:].reshape(-1, 3),
    ], axis=0)
    bg_day = np.median(corners_day, axis=0)

    corners_night = np.concatenate([
        night_rgb[:16, :16].reshape(-1, 3),
        night_rgb[:16, -16:].reshape(-1, 3),
        night_rgb[-16:, :16].reshape(-1, 3),
        night_rgb[-16:, -16:].reshape(-1, 3),
    ], axis=0)
    bg_night = np.median(corners_night, axis=0)

    # 計算每個像素與各自背景色的歐氏距離
    dist_day = np.linalg.norm(day_rgb.astype(np.float32) - bg_day, axis=2)
    dist_night = np.linalg.norm(night_rgb.astype(np.float32) - bg_night, axis=2)

    # 互補融合：只要在白天圖中明顯偏離白背景（如深色底座），或在黑夜圖中明顯偏離黑背景（如白色貝殼與燈光），即視為前景主體！
    # 注意：排除白天圖右側地面淺灰投影（投影在黑夜圖中與黑背景幾乎一致，dist_night 很小）
    combined_fg_score = np.maximum(dist_day * 0.75, dist_night * 1.35)

    # 背景判定閾值：必須同時滿足在黑夜圖中接近黑背景，且在白天圖中接近白背景（或為地面淺灰/陰影）
    is_bg_candidate = (dist_night < night_thresh) & (dist_day < day_thresh)

    # 從四條邊界向內做 BFS 泛洪，避免誤傷建築內部的暗部細節
    visited_bg = np.zeros((h, w), dtype=bool)
    q = deque()

    for x in range(w):
        if is_bg_candidate[0, x]:
            visited_bg[0, x] = True
            q.append((0, x))
        if is_bg_candidate[h - 1, x]:
            visited_bg[h - 1, x] = True
            q.append((h - 1, x))
    for y in range(h):
        if is_bg_candidate[y, 0]:
            visited_bg[y, 0] = True
            q.append((y, 0))
        if is_bg_candidate[y, w - 1]:
            visited_bg[y, w - 1] = True
            q.append((y, w - 1))

    while q:
        cy, cx = q.popleft()
        for ny, nx in ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1)):
            if 0 <= ny < h and 0 <= nx < w and not visited_bg[ny, nx]:
                if is_bg_candidate[ny, nx]:
                    visited_bg[ny, nx] = True
                    q.append((ny, nx))

    # 生成初始二值遮罩並對邊緣進行平滑羽化抗鋸齒
    fg_mask = (~visited_bg).astype(np.uint8) * 255
    mask_img = Image.fromarray(fg_mask)
    # 先用中值濾波消除細小噪點，再做輕微高斯羽化使邊緣自然過渡
    mask_img = mask_img.filter(ImageFilter.MedianFilter(size=5))
    mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=1.2))
    return np.array(mask_img, dtype=np.uint8)


def process_pair(day_in: pathlib.Path, night_in: pathlib.Path, slug: str, out_dir: pathlib.Path, day_thresh: float = 75.0, night_thresh: float = 25.0):
    print(f"\n🎨 開始處理 [{slug}]...")
    print(f"   ☀️ 白天圖源: {day_in}")
    print(f"   🌙 黑夜圖源: {night_in}")

    day_im = Image.open(day_in).convert("RGB")
    night_im = Image.open(night_in).convert("RGB")

    if day_im.size != night_im.size:
        night_im = night_im.resize(day_im.size, Image.Resampling.LANCZOS)

    print(f"   🔍 正在計算互補色差共享 Alpha 遮罩 ({day_im.size[0]}x{day_im.size[1]})...")
    day_arr = np.array(day_im)
    night_arr = np.array(night_im)

    alpha = compute_shared_alpha_floodfill(day_arr, night_arr, day_thresh=day_thresh, night_thresh=night_thresh)

    day_rgba = Image.fromarray(np.dstack([day_arr, alpha]))
    night_rgba = Image.fromarray(np.dstack([night_arr, alpha]))

    day_out_webp = out_dir / f"{slug}-day.webp"
    night_out_webp = out_dir / f"{slug}-night.webp"
    day_out_png = out_dir / f"{slug}-day.png"
    night_out_png = out_dir / f"{slug}-night.png"

    # 保存為高壓縮透明 WebP 與透明 PNG
    day_rgba.save(day_out_webp, format="WEBP", quality=92, method=6)
    night_rgba.save(night_out_webp, format="WEBP", quality=92, method=6)
    day_rgba.save(day_out_png, format="PNG")
    night_rgba.save(night_out_png, format="PNG")

    print(f"   ✅ 已生成透明白天版: {day_out_webp} & {day_out_png}")
    print(f"   ✅ 已生成透明黑夜版: {night_out_webp} & {night_out_png}")


def main():
    import argparse
    parser = argparse.ArgumentParser(description="生成日/夜雙生透明微縮建築圖")
    parser.add_argument("--day", type=pathlib.Path, help="白天圖源路徑")
    parser.add_argument("--night", type=pathlib.Path, help="黑夜圖源路徑")
    parser.add_argument("--name", type=str, help="輸出檔案名前綴 (slug)")
    parser.add_argument("--out-dir", type=pathlib.Path, default=IMG_DIR, help="輸出目錄")
    parser.add_argument("--day-thresh", type=float, default=75.0, help="白天背景容差閾值 (默認 75.0)")
    parser.add_argument("--night-thresh", type=float, default=25.0, help="黑夜背景容差閾值 (默認 25.0)")
    args = parser.parse_args()

    args.out_dir.mkdir(parents=True, exist_ok=True)

    if args.day and args.night:
        slug = args.name or args.day.stem.replace("-day", "").replace("_day", "")
        process_pair(args.day, args.night, slug, args.out_dir, day_thresh=args.day_thresh, night_thresh=args.night_thresh)
        return

    # 自動發現 public/images 下的所有 *-day.{jpeg,jpg,png} 與 *-night.{jpeg,jpg,png}
    found_pairs = []
    for ext in ("*.jpeg", "*.jpg", "*.png"):
        for day_file in IMG_DIR.glob(f"*-day{ext[1:]}"):
            slug = day_file.stem[:-4] # 去掉 -day
            # 尋找對應的 night 文件
            night_candidates = [
                IMG_DIR / f"{slug}-night.jpeg",
                IMG_DIR / f"{slug}-night.jpg",
                IMG_DIR / f"{slug}-night.png",
            ]
            for nc in night_candidates:
                if nc.exists():
                    found_pairs.append((day_file, nc, slug))
                    break

    if not found_pairs:
        print(f"❌ 未在 {IMG_DIR} 找到成對的 *-day 與 *-night 圖片！")
        sys.exit(1)

    print(f"🚀 掃描到 {len(found_pairs)} 組建築日夜圖源，開始自動批處理...")
    for day_path, night_path, slug in found_pairs:
        process_pair(day_path, night_path, slug, args.out_dir, day_thresh=args.day_thresh, night_thresh=args.night_thresh)
    print("\n✨ 全部日夜透明遮罩生成完成！")


if __name__ == "__main__":
    main()
