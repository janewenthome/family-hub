# Family Hub — 日本家族旅遊戰情室

> 9 人家族旅遊 PWA・2025/7/24–8/1 河口湖 × 東京
> 部署平台：Zeabur（靜態前端 + 輕量 API）

---

## 一、框架選型：Vite + React + Tailwind CSS ✅（推薦）

### 為何不選 Next.js App Router？

| 面向 | Next.js App Router | Vite + React |
|------|-------------------|--------------|
| 資料需求 | SSR / RSC 最大化 Server 優勢 | **全靜態 JSON**，無 Server 需求 |
| 部署 | Zeabur 需 Node runtime | **純靜態，Zeabur Static 免費方案即可** |
| Bundle 大小 | Next.js runtime overhead ~100KB+ | Vite 打包更精簡 |
| PWA 整合 | 需手動繞過 App Router 限制 | `vite-plugin-pwa` 一行搞定 |
| 開發速度 | 架構較重，需考慮 RSC 邊界 | HMR 更快，適合快速迭代 |
| 學習成本 | Client / Server Component 邊界複雜 | 標準 React 即可 |

**結論**：本專案核心資料 = 靜態 JSON + LocalStorage，完全不需要 SSR。
Vite + React 打包後是純靜態網站，Zeabur 可用 Static Hosting 零成本部署，
啟動速度與 PWA 離線快取支援更優。

---

## 二、技術棧

```
Vite 5         — 建構工具
React 19       — UI 框架
TypeScript     — 型別安全
Tailwind CSS 4 — Mobile-first 樣式
React Router 7 — SPA 路由（底部 Tab 導航）
vite-plugin-pwa — PWA + Service Worker + 離線快取
Zustand        — 輕量全域狀態（行李清單進度）
Open-Meteo API — 免費天氣（無需 API Key）
```

---

## 三、目錄結構

```
family-hub/
│
├── public/
│   ├── icons/              # PWA 圖示（72~512px，必須）
│   │   ├── icon-72.png
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── tickets/            # 票券 QR Code / Barcode 截圖（本地離線備份）
│   │   ├── fujikyu-*.jpg
│   │   ├── omiya-railway-*.jpg
│   │   └── toyota-noah-*.jpg
│   └── manifest.webmanifest
│
├── src/
│   │
│   ├── assets/             # 靜態資源（Logo、旅遊插圖）
│   │
│   ├── components/
│   │   ├── ui/             # 原子元件（可跨模組複用）
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── Accordion.tsx
│   │   │   └── BottomNav.tsx
│   │   │
│   │   ├── dashboard/      # 模組 1：首頁儀表板
│   │   │   ├── CountdownTimer.tsx   # 出發倒數
│   │   │   ├── WeatherCard.tsx      # 河口湖 / 東京雙城天氣
│   │   │   └── EmergencyBlock.tsx   # 緊急聯絡（保險、駐日代表處）
│   │   │
│   │   ├── itinerary/      # 模組 2：每日行程表
│   │   │   ├── DaySelector.tsx      # 7/24–8/1 日期切換 Tab
│   │   │   ├── Timeline.tsx         # 時間軸容器
│   │   │   ├── TimelineEvent.tsx    # 單筆事件（可展開細節）
│   │   │   └── EventDetail.tsx      # 富士急 / 鐵道博物館攻略 Drawer
│   │   │
│   │   ├── tickets/        # 模組 3：票券與物流中心
│   │   │   ├── TicketCard.tsx       # 票券卡片（含展開 QR Code）
│   │   │   ├── QRViewer.tsx         # 全螢幕 QR/Barcode 顯示（亮度拉最高）
│   │   │   └── CarRentalCard.tsx    # Toyota Noah 租車代碼 + Maps 連結
│   │   │
│   │   └── packing/        # 模組 4：動態行李清單
│   │       ├── PackingOverview.tsx  # 整體進度條 + 分類摘要
│   │       ├── CategorySection.tsx  # 分類折疊（家庭共用 / 個人）
│   │       └── CheckItem.tsx        # 單筆勾選項目
│   │
│   ├── data/               # 靜態資料（唯一「後端」）
│   │   ├── itinerary.json  # 每日行程詳細資料（7/24–8/1 九天）
│   │   ├── tickets.json    # 票券資訊（名稱、分類、圖片路徑）
│   │   ├── emergency.json  # 緊急聯絡資訊（不變動，硬編碼）
│   │   └── packing.json    # 行李清單預設分類與項目
│   │
│   ├── hooks/
│   │   ├── useCountdown.ts     # 計算距出發剩餘時間
│   │   ├── useWeather.ts       # Open-Meteo API 呼叫 + 快取
│   │   └── usePackingList.ts   # LocalStorage 讀寫 + 進度計算
│   │
│   ├── store/
│   │   └── packingStore.ts     # Zustand store（行李清單狀態）
│   │
│   ├── lib/
│   │   ├── weather.ts      # Open-Meteo fetch + 型別
│   │   ├── storage.ts      # LocalStorage 存取工具
│   │   └── utils.ts        # 日期格式化、cn() 等共用工具
│   │
│   ├── types/
│   │   └── index.ts        # 所有 TypeScript 型別定義
│   │
│   ├── pages/              # 頁面層（React Router 路由目標）
│   │   ├── DashboardPage.tsx
│   │   ├── ItineraryPage.tsx
│   │   ├── TicketsPage.tsx
│   │   └── PackingPage.tsx
│   │
│   ├── App.tsx             # 路由設定 + Layout
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind base + 全域樣式
│
├── .env.example            # 環境變數範本（目前僅預留 API Key 位置）
├── .gitignore
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 四、功能模組對照

### 模組 1 — 首頁儀表板 (`/`)

| 功能 | 實作方式 |
|------|---------|
| 出發倒數 | `useCountdown` hook，目標 `2025-07-24T09:00:00+09:00` |
| 河口湖天氣 | Open-Meteo，座標 `35.5122, 138.7740` |
| 東京天氣 | Open-Meteo，座標 `35.6895, 139.6917` |
| 緊急聯絡 | `emergency.json` 靜態資料，含保險+駐日代表處電話 |

### 模組 2 — 每日行程 (`/itinerary`)

| 功能 | 實作方式 |
|------|---------|
| 日期切換 | 橫向滑動 Tab（7/24 ~ 8/1，共 9 天）|
| 時間軸 | 垂直 Timeline，事件卡片 |
| 展開攻略 | Drawer / Bottom Sheet 顯示富士急、鐵道博物館詳細資訊 |
| 資料來源 | `itinerary.json` |

**行程 JSON 結構草稿**：
```json
{
  "days": [
    {
      "date": "2025-07-24",
      "label": "Day 1 出發",
      "location": "台灣→河口湖",
      "events": [
        {
          "time": "09:00",
          "title": "桃園國際機場集合",
          "icon": "plane",
          "detail": null
        },
        {
          "time": "14:30",
          "title": "富士急樂園抵達",
          "icon": "ticket",
          "detail": {
            "tips": ["火影忍者主題區入場需提前排隊"],
            "reservation": "已預約 15:30 入場"
          }
        }
      ]
    }
  ]
}
```

### 模組 3 — 票券中心 (`/tickets`)

| 功能 | 實作方式 |
|------|---------|
| 票券列表 | Grid 卡片，分類（樂園、交通、博物館）|
| QR Code 顯示 | 點擊全螢幕展開 + 自動拉高亮度（Screen Brightness API）|
| 租車資訊 | Toyota Noah 代碼 + Google Maps 取車地點外連 |
| 離線可用 | 圖片存 `/public/tickets/`，Service Worker 快取 |

### 模組 4 — 行李清單 (`/packing`)

| 功能 | 實作方式 |
|------|---------|
| 分類 | 家庭共用、爸爸、媽媽、小孩 1/2/3、長輩 |
| 狀態持久化 | Zustand + LocalStorage（`zustand/middleware/persist`）|
| 整體進度 | 已勾 / 總數，圓形或條狀進度條 |
| 重置 | 一鍵重置（有確認對話框）|

---

## 五、UI / UX 設計原則

```
字體大小  — 基礎 16px，重要標題 20–24px（長輩友善）
色彩主題  — 藍天白雲 + 富士山漸層（輕快明亮）
觸控目標  — 最小 44×44px（Apple HIG / Google MD 標準）
底部導航  — 4 個 Tab：儀表板 / 行程 / 票券 / 行李
載入體驗  — Skeleton Loader（天氣 API 未回應時不閃白）
離線模式  — PWA Service Worker 快取 JSON + 票券圖片
```

---

## 六、Zeabur 部署計畫

```
1. Vite build → dist/ (純靜態)
2. Zeabur > New Project > Static
3. Root: /  |  Output: dist/  |  Build: pnpm build
4. 自訂網域（可選）: family-hub.zeabur.app
5. HTTPS 自動由 Zeabur 處理（PWA 必須）
```

**Weather API (Open-Meteo) 說明**：完全免費、無需 API Key，
直接在前端呼叫 `https://api.open-meteo.com/v1/forecast`，
無 CORS 問題，不需要後端 Proxy。

---

## 七、實作順序（等確認後依此順序進行）

| 步驟 | 內容 |
|------|------|
| Step 1 | 初始化 Vite 專案 + Tailwind + PWA 設定 |
| Step 2 | 建立 Layout + BottomNav + 路由骨架 |
| Step 3 | 填寫 `itinerary.json` / `tickets.json` / `packing.json` 靜態資料 |
| Step 4 | 模組 1：首頁儀表板（倒數 + 天氣 + 緊急聯絡）|
| Step 5 | 模組 2：每日行程表（Timeline + 展開攻略）|
| Step 6 | 模組 3：票券中心（QR Viewer + 租車資訊）|
| Step 7 | 模組 4：行李清單（LocalStorage + 進度條）|
| Step 8 | PWA 設定驗證 + Lighthouse 跑分 |
| Step 9 | Zeabur 部署設定 + 測試 |
