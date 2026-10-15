# PLAYBOOK.md — 自更新個人網站 AI Check-in 機器人操作手冊

將此文件保存在你的倉庫根目錄，供你的 AI Agent（如 Grok Bot、Claude Code 或自定義 Telegram Bot）讀取並自動執行打卡發布流程。

## 1. 觸發條件與輸入格式
當用戶發送一張街景照片、地圖截圖或地點名稱（可選附帶同行好友的名字與社交主頁 Handle）時，依序執行以下 4 個步驟。

## 2. Step 1 — 解析地理位置 (Google Places API)
調用 Google Places Text Search API (`https://places.googleapis.com/v1/places:searchText`) 或運行本地腳本：
```bash
GOOGLE_PLACES_API_KEY="你的API_KEY" npm run checkin -- --query="Blue Bottle Coffee San Francisco" --friend="Alan Zhang|https://x.com"
```
獲取：
- 標準化店名 (`placeName`)
- 所在城市 (`cityZh`, `cityEn`)
- 經緯度坐標 (`lat`, `lng`)

## 3. Step 2 — 生成日/夜雙模 3D 粘土微縮插畫 (Image Generation)

### (A) 日間版微縮圖 Prompt (`public/_astro/{slug}-pose.webp`)
> "Transform the building in this photo into a whimsical 3D isometric clay miniature diorama. Fix perspective to a clean front-three-quarter miniature angle, remove all people, cars, and street clutter, isolate the building facade and entrance details on a clean miniature plinth base, soft daylight studio illumination, tactile matte clay and miniature architectural model texture, pure transparent background."

### (B) 夜間亮燈版微縮圖 Prompt (`public/_astro/{slug}-pose-night.webp`)
> "Using the generated daytime 3D clay miniature image as strict structural reference: Keep the exact same geometry, camera angle, proportions, and silhouette pixel-for-pixel. Switch lighting to nighttime mode (#121212 dark environment) and illuminate the interior windows, doorway, and storefront signage with warm golden-amber light."

## 4. Step 3 — 寫入結構化數據並觸發自動部署
1. 將生成的日/夜兩張圖片轉為高壓縮比 `WebP` 存入 `public/_astro/`。
2. 在 `src/content/checkins/` 下新建 `YYYY-MM-DD-{slug}.json`。
3. 執行 `git add . && git commit -m "checkin: {placeName}" && git push origin main` 觸發靜態託管平台（Vercel / Cloudflare Pages）自動構建上線。
