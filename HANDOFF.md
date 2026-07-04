# 🗻 Family Hub — AI 交接文件

> **最後更新**: 2026-07-05 01:50 (台灣時間)
> **專案路徑**: `/Volumes/2TB/program/family-hub`

---

## 專案概述

日本家族旅遊戰情室 PWA 網站。2026/07/24–08/01，9天8夜，5人家庭（爸媽+大寶10y+二寶4y+三寶2y）。
部署在 Zeabur Static Hosting。密碼鎖：`0000`。語言：繁體中文。

## 技術棧

| 項目 | 版本/工具 |
|------|----------|
| 建構 | Vite 8 |
| 框架 | React 19 |
| 語言 | TypeScript 6 |
| 樣式 | Tailwind CSS 4 (`@tailwindcss/vite`) |
| 路由 | React Router DOM 7 |
| 狀態 | Zustand 5（行李清單 persist to LocalStorage） |
| PWA | vite-plugin-pwa 1.3 |
| 天氣 | Open-Meteo API（免費無 Key） |
| 套件管理 | **pnpm**（不要用 npm/yarn） |
| 部署 | Zeabur Static Hosting |

## 已完成 ✅

### Step 1 — 初始化（100%）
- [x] Vite + React + TypeScript 初始化
- [x] `pnpm install` 所有依賴
- [x] `vite.config.ts` — React + Tailwind + PWA 設定
- [x] `tsconfig.json` + `tsconfig.app.json` — `@/*` 路徑別名
- [x] `index.html` — PWA meta、Google Fonts（Noto Sans TC + Inter）、safe area
- [x] `src/index.css` — Tailwind v4 `@theme` 色彩系統、glassmorphism、漸層

### 靜態資料檔（100%）
- [x] `src/data/itinerary.json` — 完整 9 天行程
- [x] `src/data/hotels.json` — 3 間住宿完整資訊
- [x] `src/data/tickets.json` — 10 張票券/預約
- [x] `src/data/packing.json` — 7 類行李清單
- [x] `src/data/emergency.json` — 緊急聯絡/保險
- [x] `src/data/members.json` — 5 位家庭成員
- [x] `src/types/index.ts` — 完整 TypeScript 型別定義

## 待完成 ⬜

### Step 2 — Layout + 路由骨架
- [/] `src/main.tsx` — 入口 + BrowserRouter
- [/] `src/App.tsx` — 路由設定 + Layout + 密碼鎖（PIN: 0000）
- [/] `src/components/ui/BottomNav.tsx` — 底部 4 Tab
- [ ] 通用 UI 元件（Card, Badge, Accordion, ProgressBar）

### Step 4–7 — 4 大模組頁面
- [ ] 儀表板（CountdownTimer, WeatherCard, HotelQuickView, EmergencyBlock）
- [ ] 行程表（DaySelector, Timeline, TimelineEvent, EventDetail）
- [ ] 票券中心（TicketCard, QRViewer, CarRentalCard）
- [ ] 行李清單（PackingOverview, CategorySection, CheckItem, packingStore）

### Step 8–9 — PWA + 部署
- [ ] PWA icons、Lighthouse 驗證
- [ ] `zeabur.json` 部署設定

## 設計要點

### 色彩系統（`src/index.css` @theme）
- 主色：`--color-fuji-blue: #4A90D9` / 強調：`--color-sakura-pink: #F2A7B3`
- 警告：`--color-sunset-orange: #FF8C42` / 成功：`--color-forest-green: #2D936C`
- 深色：`--color-dark-navy: #1A2744` / 背景：`--color-fuji-snow: #F0F4F8`

### UI 規範
- Mobile-first，基礎 16px，標題 20-24px，觸控 ≥ 44px
- BottomNav 4 Tab：🏠 首頁 / 📅 行程 / 🎟️ 票券 / 🧳 行李
- 密碼鎖 PIN: `0000`，用 localStorage `family-hub-auth` 存狀態

### 天氣 API
- Open-Meteo: `https://api.open-meteo.com/v1/forecast`
- 河口湖：`lat=35.5122&lon=138.7740` / 東京：`lat=35.6895&lon=139.6917`

## 指令備忘
```bash
cd /Volumes/2TB/program/family-hub
pnpm dev          # 開發
pnpm build        # 建構（輸出 dist/）
pnpm tsc --noEmit # 型別檢查
```
