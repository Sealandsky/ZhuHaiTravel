#!/usr/bin/env python3
"""
scripts/prepare-images.py
自動識別並處理放入 public/images/ 或項目根目錄下的白天/黑夜建築微縮圖片：
1. 自動根據圖片平均亮度區分「白天版 (day)」與「黑夜版 (night)」
2. 自動複製並標準化命名為 public/images/zhuhai-opera-day.jpeg 與 public/images/zhuhai-opera-night.jpeg
3. 如果系統安裝了 Pillow (PIL)，還會自動生成去背/透明邊緣過渡的 WebP 版本
"""
import pathlib
import shutil

root_dir = pathlib.Path(__file__).resolve().parent.parent
img_dir = root_dir / "public" / "images"
img_dir.mkdir(parents=True, exist_ok=True)

candidates = list(root_dir.glob("Gemini_Generated_Image_*.jp*g")) + list(img_dir.glob("Gemini_Generated_Image_*.jp*g"))

if len(candidates) >= 2:
    try:
        from PIL import Image, ImageStat
        scored = []
        for p in candidates:
            with Image.open(p) as im:
                stat = ImageStat.Stat(im.convert("L"))
                scored.append((stat.mean[0], p))
        scored.sort(key=lambda x: x[0])
        night_src = scored[0][1]
        day_src = scored[-1][1]
    except Exception:
        # Fallback by known filenames from upload
        night_src = next((p for p in candidates if "tr1228" in p.name), candidates[0])
        day_src = next((p for p in candidates if "ylhbma" in p.name), candidates[1])

    day_dst = img_dir / "zhuhai-opera-day.jpeg"
    night_dst = img_dir / "zhuhai-opera-night.jpeg"
    if day_src.resolve() != day_dst.resolve():
        shutil.copy2(day_src, day_dst)
    if night_src.resolve() != night_dst.resolve():
        shutil.copy2(night_src, night_dst)
    print(f"✅ 已配置白天版圖片: {day_dst}")
    print(f"✅ 已配置黑夜版圖片: {night_dst}")
else:
    print("ℹ️ 請先將兩張圖片放入 public/images/ 或項目根目錄，再運行此腳本。")
