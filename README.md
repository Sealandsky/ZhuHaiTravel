# ZHTravel — 自更新個人打卡網站 (pengzhe.ng 復刻項目)

這是一個基於 **Astro (SSG + Islands)** 構建的「自更新個人打卡網站（Living Website）」完整模板，復刻了 [pengzhe.ng/cn](https://www.pengzhe.ng/cn) 的核心設計與自動化打卡架構。

## ✨ 核心特性

1. **極簡雙語排版**：內置 `/`（English）與 `/cn`（繁體中文）雙語路由與一鍵無縫切換。
2. **水平刻度時間軸 (`StripTimeline.astro`)**：支持展開/收起、點擊刻度或使用鍵盤 `←` / `→` 方向鍵切換歷史打卡足跡，並帶平滑交叉淡入淡出動效。
3. **3D 粘土微縮日夜雙模渲染 (`LastSeen.astro` & `ClayDiorama.astro`)**：切換淺色（`#faf9f6`）與深色模式（`#121212`）時，建築的窗戶與霓虹招牌會同步點亮暖光；同時支持自定義 `WebP` 雙圖源（`dayImage` / `nightImage`）或內置的 5 套 3D 粘土矢量預設。
4. **免構建直接預覽 (`preview.html`)**：雙擊項目根目錄下的 `preview.html` 即可直接在瀏覽器中體驗完整交互與「模擬 AI 打卡」功能。
5. **AI 自動化打卡腳本 (`scripts/checkin-bot.mjs` & `PLAYBOOK.md`)**：支持通過 Google Places API 自動檢索地點座標並生成新的打卡 JSON 文件。

## 🚀 快速開始

### 方式一：零依賴直接預覽
直接在瀏覽器中雙擊打開本目錄下的 `preview.html`。

### 方式二：運行 Astro 本地開發服務器
```bash
# 1. 安裝依賴
npm install

# 2. 啟動開發服務器 (默認 http://localhost:4321/cn)
npm run dev

# 3. 構建生產環境靜態文件
npm run build
```

### 方式三：使用命令行新增一條打卡記錄
```bash
# 不配置 API Key 時也可直接傳入店名與城市生成 JSON 記錄
npm run checkin -- --place="Blue Bottle Coffee" --city="San Francisco" --preset="cafe" --friend="Alan Zhang"
```

## 📂 目錄結構

```text
ZHTravel/
├── astro.config.mjs                 # Astro 靜態構建配置
├── package.json                     # 項目依賴與腳本
├── PLAYBOOK.md                      # 供 AI Agent 讀取的自動化打卡與繪圖 Prompt 手冊
├── preview.html                     # 免安裝交互式預覽入口（含模擬打卡器）
├── preview/                         # 模塊化預覽靜態資源
│   ├── css/
│   │   └── style.css                # 預覽頁樣式（主題色彩、舞台、全景畫廊、FLIP動畫）
│   └── js/
│       ├── data.js                  # 打卡節點足跡 (checkins) 與作品數據 (works)
│       ├── diorama-svg.js           # 3D 粘土微縮模型 SVG 降級生成算法
│       └── app.js                   # 核心交互（FLIP連貫飛行動畫、日夜模式、拖曳滾動）
├── scripts/
│   ├── checkin-bot.mjs              # Google Places API 查詢與打卡 JSON 自動寫入腳本
│   └── make-transparent.py          # 3D 建築日/夜雙模雙向色差摳圖透明化腳本
└── src/
    ├── components/
    │   ├── ClayDiorama.astro        # 3D 粘土微縮日/夜雙圖層渲染器
    │   ├── LastSeen.astro           # 核心微縮舞台與動態打卡簡介組件
    │   └── StripTimeline.astro      # 可展開水平刻度時間軸組件
    ├── content/
    │   ├── config.ts                # Astro Content Collections Schema 定義
    │   └── checkins/                # 每次打卡生成的結構化 JSON 數據
    ├── layouts/
    │   └── BaseLayout.astro         # 全局樣式、主題控制與頁頭頁腳佈局
    └── pages/
        ├── index.astro              # 英文版首頁 (/)
        ├── cn/
        │   └── index.astro          # 中文版首頁 (/cn)
        └── rss.xml.js               # RSS 訂閱源生成路由 (/rss.xml)
```
