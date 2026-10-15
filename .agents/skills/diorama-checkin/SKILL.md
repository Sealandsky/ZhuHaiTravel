---
name: diorama-checkin
description: >-
  Workflow for creating and publishing a new 3D architectural check-in location for the living website.
  Use this skill when the user provides an architectural photo, street view, or place name and wants to:
  1) Generate day 3D miniature diorama model and await user confirmation,
  2) Generate structurally aligned night model,
  3) Process images to transparent WebP backgrounds using make-transparent.py, and
  4) Register the new check-in location into both the Astro content collection and preview.html.
---

# 3D 微縮打卡節點全流程 (Diorama Check-in Skill)

本 Skill 定義了將一張現實建築照片或地點信息，轉化為日/夜雙模 3D 微縮模型並發布至打卡網站的標準化全流程。
**核心原則：必須先生成白天微縮圖並主動向用戶展示，待用戶確認滿意後，方可繼續執行後續步驟。**

```
[用戶提供照片/地點] 
       │
       ▼
【階段 1：地點與元數據解析】──► 提取名稱、主/副標題、經緯度、5項遊玩指南
       │
       ▼
【階段 2：生成白天 3D 模型】──► 45° 等軸測微縮模型 (純白底、無陰影)
       │
       ▼
【階段 3：★ 用戶審核與確認】──► 向用戶展示白天圖，等待明確確認反饋（滿意才繼續）
       │
       ▼
【階段 4：生成黑夜點燈模型】──► 以確認的白天圖為幾何參考，生成同角度、同比例黑夜暖光圖
       │
       ▼
【階段 5：透明背景合成】────► 運行 scripts/make-transparent.py 生成日夜透明 WebP
       │
       ▼
【階段 6：網頁數據接入】────► 寫入 src/content/checkins/ 與 preview/js/data.js (含主副標題與遊玩指南)
       │
       ▼
【階段 7：驗證與預覽】──────► 驗證日夜像素級切換、宮格副標題獨立排版與地圖外鏈
```

---

## 階段 1：地點與元數據解析

1. **確定地點與標題拆分**：
   - 提取標準地點名稱（如 `珠海大劇院（日月貝）`）。
   - **主標題與副標題分離**：括號內的特色名稱（如 `日月貝`、`正大光明殿`）作為副標題，在宮格列表中獨立於地名下方展示：
     - 中文主標題：`titleZh: "珠海大劇院"`，中文副標題：`subZh: "日月貝"`（無括號則為空）
     - 英文主標題：`titleEn: "Zhuhai Grand Theater"`，英文副標題：`subEn: "Sun & Moon Shells"`
   - 城市：`cityZh: "珠海"`, `cityEn: "Zhuhai"`
   - 命名 slug：以英文破折號命名（如 `zhuhai-grand-theater`、`xiangshan-lake-park`）
2. **獲取座標**：
   - 通過地理知識或檢索獲取精確經緯度（如 `{ lat: 22.2858, lng: 113.5284 }`）。
3. **整理 5 項實用遊玩指南（方案 A + 地理位置）**：
   - 門票預約（Tickets）
   - 開放時間（Hours）
   - 建議用時（Duration）
   - 最佳時段（Best Time，呼應日夜亮燈特色）
   - 地理位置（Location，詳細地址）
4. **確定打卡日期與狀態**：
   - 新節點設為最新打卡：`dateZh: "今天"`, `relZh: "剛剛"`, `dateEn: "Today"`, `relEn: "just now"`。
   - 上一個最新節點相應轉為歷史日期標籤（如 `10月18日` / `on Oct 18`）。

---

## 階段 2：生成白天 3D 微縮建築模型

調用 `image-generator` 工具生成白天圖，**比例固定為 4:3**：

### 白天版 Prompt 模板 (`{slug}-day.jpg`)
> [!TIP]
> **去投影核心訣竅**：
> 1. 將光照設定為無方向的「柔和環形漫射棚拍光（uniform diffuse studio lighting）」，避免使用 `directional sunlight`。
> 2. 強調「僅保留建築幾何體內部的環境光遮蔽與自陰影（ambient occlusion and self-shadowing only）」。
> 3. 明確宣告「純粹虛空純白背景，無地面、無投射陰影（pure solid white void background, NO ground plane, NO cast shadows, NO floor drop shadows）」。

```text
Using the provided architectural photo as reference: Generate a high-fidelity 3D building model in the look of a '3D-printed architecture model'. Preserve the building's authentic massing, facade details, materials, roof geometry, and raised stone/concrete podium base with steps. Lightly stylized for a modern video game engine asset. Render in an orthographic 45-degree top-down isometric three-quarter view to emphasize depth. Define materials clearly (glossy glazed tiles, matte timber lacquer, carved stone). Pure solid white background (#ffffff). Crucial lighting instruction: Isolated floating 3D model, clean uniform diffuse studio lighting, ambient occlusion and self-shadowing on the building structure only. Completely pure clean background: NO ground plane, NO cast shadows, NO drop shadow, NO directional floor shadow, zero shadow on the white background.
```

將生成出的原始圖保存為 `public/images/{slug}-day.jpg`。

---

## 階段 3：★ 用戶審核與確認 (User Confirmation Gate)

> [!IMPORTANT]
> **生成白天圖後，必須立即暫停並主動向用戶展示白天模型效果，請求用戶確認！**
> **嚴禁在未經用戶確認的情況下直接生成夜景或執行後續步驟。**

### 執行步驟：
1. 向用戶輸出生成的白天模型圖片（以 Markdown 圖片或 Artifact 展示）。
2. 向用戶扼要說明模型的造型特點、視角與背景純淨度。
3. 明確詢問用戶是否滿意當前白天版效果，是否可以進行下一步。
4. **若用戶滿意（如回覆「滿意」、「可以」、「ok」等）** ➔ 進入【階段 4】。
5. **若用戶提出修改意見** ➔ 針對性調整 Prompt 重新生成白天圖，再次向用戶確認，直至用戶滿意為止。

---

## 階段 4：生成黑夜點燈版 3D 微縮模型

收到用戶的確認指令後，調用 `image-generator` 工具生成黑夜點燈版：

### 黑夜點燈版 Prompt 模板 (`{slug}-night.jpg`)
> [!IMPORTANT]
> **必須傳入已獲用戶確認的白天版圖片作為 `ImagePaths` 參考**，並在提示詞中強調「嚴格保持相同幾何形狀與相機視角」。背景設定為純深色虛空，避免地面大面積泛光投影。

```text
Using the provided daytime 3D building model image as strict structural and geometric reference: Maintain the exact same 45-degree top-down isometric camera angle, geometry, scale, building proportions, and silhouette. Transform the scene into night mode with a solid, deep dark void background (#12141a). Add realistic architectural night lighting: warm golden-amber interior light spilling through windows and the main doorway; soft warm glow illuminating under the eaves; subtle accent spotlights softly highlighting steps and columns. Crucial background instruction: Isolated floating model on solid dark background, zero floor cast shadow, no ground plane smear. High-fidelity physically based rendering, clean game-engine night render.
```

將生成的夜景圖保存為 `public/images/{slug}-night.jpg`。

---

## 階段 5：透明背景合成 (Make Transparent)

利用項目內建的「日/夜互補色差共享 Alpha 遮罩」算法生成透明 WebP：

1. **執行腳本**：
   ```bash
   python3 scripts/make-transparent.py --day public/images/{slug}-day.jpg --night public/images/{slug}-night.jpg --name {slug}
   ```

2. **產物確認**：
   確認在 `public/images/` 下生成了以下 4 個文件：
   - `public/images/{slug}-day.webp`（透明 WebP，約 70~200 KB）
   - `public/images/{slug}-night.webp`（透明 WebP，約 70~200 KB）
   - `public/images/{slug}-day.png`（備用無損 PNG）
   - `public/images/{slug}-night.png`（備用無損 PNG）

---

## 階段 6：網頁數據接入

### 1. 更新上一打卡點的日期
檢查 `src/content/checkins/` 中前一個最新打卡 JSON，將其 `dateZh`、`relZh`、`dateEn`、`relEn` 改為具體歷史日期（如 `"10月18日"` / `"on Oct 18"`）。

### 2. 寫入 Astro 內容集合 (`src/content/checkins/`)
新建 `src/content/checkins/YYYY-MM-DD-{slug}.json`：
```json
{
  "date": "2026-10-19",
  "dateZh": "今天",
  "dateEn": "Today",
  "relZh": "剛剛",
  "relEn": "just now",
  "place": "香山湖公園",
  "titleZh": "香山湖公園",
  "subZh": "",
  "titleEn": "Xiangshan Lake Park",
  "subEn": "",
  "cityZh": "珠海",
  "cityEn": "Zhuhai",
  "preset": "park",
  "guideZh": "景點中文遊玩特色與建築介紹（約100字，突出建築看點、觀景機位與遊覽體驗）",
  "guideEn": "Attraction travel introduction in English (architectural highlights, best views, cultural context)",
  "dayImage": "/images/{slug}-day.webp",
  "nightImage": "/images/{slug}-night.webp",
  "coordinates": {
    "lat": 22.2858,
    "lng": 113.5284
  },
  "companions": [],
  "guideDetailsZh": [
    { "label": "門票預約", "value": "免費入園（免預約）" },
    { "label": "開放時間", "value": "06:00 – 22:30（全天候開放）" },
    { "label": "建議用時", "value": "2 – 3 小時" },
    { "label": "最佳時段", "value": "清晨吸氧觀鳥 / 傍晚湖畔散步賞夜景" },
    { "label": "地理位置", "value": "香洲區健民路健民一路交叉口西南" }
  ],
  "guideDetailsEn": [
    { "label": "Tickets", "value": "Free admission (No reservation needed)" },
    { "label": "Hours", "value": "06:00 – 22:30 (Open daily)" },
    { "label": "Duration", "value": "2 – 3 Hours" },
    { "label": "Best Time", "value": "Early morning walk / Sunset & evening lights" },
    { "label": "Location", "value": "Jianmin Road, Xiangzhou, Zhuhai" }
  ]
}
```

### 3. 同步更新免構建預覽數據 (`preview/js/data.js`)
在 `preview/js/data.js` 中將上一節點改為歷史日期，並在 `checkins` 數組末尾追加新節點：
```javascript
{
  dateZh: "今天",
  dateEn: "Today",
  relZh: "剛剛",
  relEn: "just now",
  place: "香山湖公園",
  titleZh: "香山湖公園",
  subZh: "",
  titleEn: "Xiangshan Lake Park",
  subEn: "",
  cityEn: "Zhuhai",
  preset: "park",
  dayImage: "public/images/{slug}-day.webp",
  nightImage: "public/images/{slug}-night.webp",
  companions: [],
  guideDetailsZh: [
    { label: "門票預約", value: "免費入園（免預約）" },
    { label: "開放時間", value: "06:00 – 22:30（全天候開放）" },
    { label: "建議用時", value: "2 – 3 小時" },
    { label: "最佳時段", value: "清晨吸氧觀鳥 / 傍晚湖畔散步賞夜景" },
    { label: "地理位置", value: "香洲區健民路健民一路交叉口西南" }
  ],
  guideDetailsEn: [
    { label: "Tickets", value: "Free admission (No reservation needed)" },
    { label: "Hours", value: "06:00 – 22:30 (Open daily)" },
    { label: "Duration", value: "2 – 3 Hours" },
    { label: "Best Time", value: "Early morning walk / Sunset & evening lights" },
    { label: "Location", value: "Jianmin Road, Xiangzhou, Zhuhai" }
  ]
}
```

---

## 階段 7：驗證清單

- [ ] **用戶確認把關**：白天圖生成後是否主動展示並獲取用戶確認。
- [ ] **透明度檢驗**：打開 `preview.html`，建築邊緣無白邊、無黑邊，四角完全透明。
- [ ] **日夜切換對齊**：點擊建築或切換深淺色模式時，白天與黑夜版本在尺寸與位置上 100% 像素級對齊，無跳動。
- [ ] **宮格副標題獨立排版**：若名稱包含括號（如 `珠海大劇院（日月貝）`），副標題 `日月貝` 是否獨立以次級灰色樣式排在地名正下方。
- [ ] **遊玩指南展示**：下方 5 項出行速覽（門票、時間、用時、最佳時段、地理位置）是否正確顯示且地理位置點擊可開地圖。
- [ ] **全景畫廊連貫切換**：點擊左下角「全部景點」展開宮格畫廊，點選切換具有前後連貫的 FLIP 飛行動畫。
