# 技術上下文

## 開發環境
- Node.js 
- TypeScript
- React + Vite
- Redux Toolkit
- Jest + Cypress

## 系統實現

### 遊客系統
- 使用 TypeScript 類別實現遊客行為
- 狀態管理與轉換邏輯
- 事件驅動的更新機制
- 完整的單元測試覆蓋

### 設施系統
- 基於 TypeScript 的類別結構設計
- 事件驅動架構
  - 狀態變更事件
  - 統計數據更新事件
  - 遊客互動事件
- 運營管理功能
  - 排隊系統（FIFO 佇列）
  - 容量管理
  - 維護週期
- 效能考量
  - 使用事件委派優化事件處理
  - 批次處理排隊更新
  - 統計數據緩存
- 測試策略
  - Jest 單元測試
  - 模擬時間控制
  - 事件監聽驗證
  - 邊界條件測試

## 核心功能實現

### 狀態管理
```typescript
// Redux store 配置
import { configureStore } from '@reduxjs/toolkit';
import visitorReducer from './visitorSlice';
import facilityReducer from './facilitySlice';

export const store = configureStore({
  reducer: {
    visitors: visitorReducer,
    facilities: facilityReducer
  }
});
```

### 事件系統
```typescript
// 事件類型定義
export type FacilityEvent = StatusChangeEvent | StatsUpdateEvent;

// 事件處理介面
export interface EventListener {
  handleEvent(event: FacilityEvent): void;
}
```

### 效能優化
```typescript
// 批次處理示例
class QueueManager {
  private updateQueue: QueueUpdate[] = [];
  
  public scheduleUpdate(update: QueueUpdate): void {
    this.updateQueue.push(update);
    this.processBatch();
  }
  
  private processBatch(): void {
    if (this.processTimeout) return;
    
    this.processTimeout = setTimeout(() => {
      // 批次處理佇列更新
      this.processQueue();
      this.processTimeout = null;
    }, 16); // 約60fps
  }
}
```

## 開發工具

### 編輯器配置
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### ESLint 規則
```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

## 測試配置

### Jest 配置
```typescript
// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  }
};
```

### 測試工具函數
```typescript
// test-utils.ts
export const createMockFacility = (config: Partial<FacilityConfig>): Facility => {
  return new Facility({
    id: 'test-facility',
    name: 'Test Facility',
    position: { x: 0, y: 0 },
    capacity: 30,
    minDuration: 3,
    maxDuration: 5,
    maxQueueLength: 100,
    ...config
  });
};
```

## CI/CD 配置

### GitHub Actions
```yaml
name: Test and Build
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm test
      - run: npm run build
```

## 性能基準

### 測試結果
- 單元測試執行時間: <2s
- 端到端測試執行時間: <30s
- 程式碼覆蓋率: >80%
- 記憶體使用峰值: <100MB

### 效能目標
- 遊戲迴圈更新: 60fps
- UI 響應時間: <100ms
- 最大同時遊客數: 1000
- 最大同時設施數: 100

## 依賴版本
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@reduxjs/toolkit": "^1.9.0",
    "typescript": "^4.9.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "ts-jest": "^29.0.0",
    "@testing-library/react": "^13.0.0",
    "cypress": "^12.0.0"
  }
}
```

## 調試工具
- Chrome DevTools
- React DevTools
- Redux DevTools
- VS Code Debugger

## 部署考慮
- 靜態資源優化
- 程式碼分割
- 快取策略
- 錯誤追蹤
