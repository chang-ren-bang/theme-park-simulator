# 技術背景與環境

## 技術棧選擇

### 核心技術
- **前端框架**: React 18.2
- **狀態管理**: Redux Toolkit 2.2
- **渲染引擎**: Canvas API
- **版本控制**: Git

### 開發工具
- **IDE**: Visual Studio Code
- **版本管理**: GitHub
- **專案管理**: GitHub Projects
- **文件管理**: Markdown
- **建置工具**: Vite 5.4
- **測試框架**:
  - Jest 29.7 (單元測試)
  - Testing Library (@testing-library/react, @testing-library/jest-dom)
  - Cypress 13.6 (端到端測試)

### 第三方框架
- **UI Framework**: Material-UI (MUI) 5.15
- **動畫**: GSAP 3.12
- **樣式**: Emotion 11.11
- **遊戲引擎**: Custom Canvas Engine
- **路由**: React Router

## 開發環境設置

### 系統要求
- **Node.js**: 20.12.0 或更高版本
- **npm**: 10.0.0 或更高版本
- **瀏覽器**: 支援最新版本的 Chrome/Firefox/Safari

### 開發工具安裝
1. Node.js 和 npm
2. Visual Studio Code
3. Git
4. 瀏覽器開發者工具

### 環境配置
```json
{
  "node": ">=20.12.0",
  "dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@mui/material": "^5.15.11",
    "@reduxjs/toolkit": "^2.2.1",
    "gsap": "^3.12.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.1.0"
  },
  "devDependencies": {
    "@testing-library/react": "^14.2.1",
    "@testing-library/jest-dom": "^6.4.2",
    "@types/testing-library__jest-dom": "^5.14.9",
    "@testing-library/cypress": "^10.0.1",
    "cypress": "^13.6.6",
    "typescript": "^5.2.2",
    "vite": "^5.1.4",
    "eslint": "^8.56.0"
  }
}
```

## 技術限制與考量

### 效能目標
- **FPS**: 60 (標準)
- **初始載入時間**: <3秒
- **互動響應時間**: <100ms
- **記憶體使用**: <500MB

### 平台支援
1. 現代瀏覽器 (Chrome, Firefox, Safari, Edge)
2. 行動裝置瀏覽器（響應式設計）
3. PWA 支援

### 技術債務追蹤
- Canvas 渲染優化
- 狀態管理最佳實踐
- 組件重用性
- 瀏覽器相容性

## 開發規範

### 程式碼規範
- 使用 TypeScript 5.2 強型別
- ESLint 8.56 + Prettier 程式碼格式化
- React 最佳實踐指南
- 單元測試覆蓋率 >80%

### 測試規範
- Jest 單元測試
  - TypeScript 支援
  - 狀態管理測試
  - 組件測試
  - 效能測試
  - Testing Library 整合
    - @testing-library/react 用於組件測試
    - @testing-library/jest-dom 用於 DOM 斷言
    - screen.getByText 與正則表達式支援
    - style 屬性測試支援
    - 動態樣式與動畫測試
    - 行為預測系統測試
      - 狀態預測測試
      - 滿意度趨勢測試
      - 時間預估測試
      - 位置預測測試
  - 自定義 TypeScript 配置 (tsconfig.test.json)
    - 支援 JSX
    - ESModule 相容性
    - Jest 類型定義
  - Redux Mock 支援
    - useSelector hook 模擬
    - 狀態變更測試
    - 複雜狀態樹測試
    - 預測資訊狀態測試
- Cypress 端到端測試
  - 自動化截圖測試
  - 狀態管理測試
  - Headless 測試支援

### 資料結構與演算法
```typescript
// 路徑尋找演算法
interface Vector2D {
  x: number;
  y: number;
}

interface PathNode {
  position: Vector2D;
  g: number;  // 起點到此節點的成本
  h: number;  // 預估此節點到終點的成本
  f: number;  // 總成本 (g + h)
  parent: PathNode | null;
}

// 預測系統介面
interface Prediction {
  nextState: VisitorState;
  nextPosition?: Vector2D;
  satisfactionTrend: number;
  timeToNextState: number;
}

// A* 演算法實現
class PathFinder {
  // 使用曼哈頓距離作為啟發函數
  // 支援動態障礙物處理
  // 可配置網格大小
  // Catmull-Rom 曲線路徑平滑化
  // 智能避障系統
  // 路徑優化
}

// 路徑平滑化演算法
- Catmull-Rom 曲線插值
- 動態避障檢測
- 路徑優化與簡化

// 核心狀態介面
interface GameState {
  economy: Economy;
  attractions: Attraction[];
  visitors: Visitor[];
  weather: Weather;
}

// Redux store 結構
interface RootState {
  game: GameState;
  ui: UIState;
  settings: SettingsState;
}
```

### 演算法效能優化
- 路徑快取機制
- 動態障礙物處理
- 路徑平滑化優化
- 避障計算優化
- 預測系統優化
  - 狀態轉換計算優化
  - 時間預估精確度提升
  - 趨勢計算效能優化

### API 設計原則
- 組件化設計
- Props 類型定義
- 狀態隔離
- 效能監控
- 預測系統設計
  - 狀態預測介面
  - 趨勢分析介面
  - 時間估算介面

## 前端架構

### 開發環境
1. Vite 開發伺服器
2. 熱重載
3. 開發者工具
4. 效能監控

### 建置流程
1. TypeScript 編譯
2. 程式碼壓縮
3. 資源優化
4. 打包發布

## 監控與維護

### 監控指標
- FPS 監控
- 效能分析
- 錯誤追蹤
- 使用者行為
- 測試覆蓋率
- 預測準確度監控
- 預測系統效能監控

### 維護計畫
- 定期更新依賴
- 程式碼優化
- 效能調校
- 功能擴展
- 自動化測試維護
- 預測系統調校與優化
