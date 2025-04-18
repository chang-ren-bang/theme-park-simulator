# 系統架構與設計模式

## 系統架構概覽

```mermaid
flowchart TD
    subgraph State [狀態管理]
        Redux[Redux Store] --> GameState[遊戲狀態]
        Redux --> UIState[UI狀態]
        GameState --> Canvas[Canvas渲染]
    end

    subgraph Components [React組件]
        UI[使用者界面] --> Redux
        Controls[控制面板] --> Redux
        GameCanvas[遊戲畫布] --> Canvas
    end

    subgraph Engine [遊戲引擎]
        Canvas --> Renderer[渲染系統]
        Canvas --> Physics[物理計算]
        Canvas --> Animation[動畫系統]
    end
```

## 核心設計模式

### 1. Flux 架構
- 使用 Redux 單向數據流
- Action 觸發狀態更新
- Reducer 處理狀態變化
- Selector 優化性能

### 2. 組件化設計
- 功能組件優先
- Props 類型定義
- 自定義 Hooks
- 組件複用策略

### 3. 狀態管理
- Redux 集中管理
- 本地狀態管理
- 緩存策略
- 性能優化

### 4. 觀察者模式
- 事件訂閱系統
- 狀態變更通知
- 組件間通信
- 異步處理

## 已實現的系統模式

### 遊客系統
1. 狀態模式
   - 遊客狀態管理（IDLE, MOVING, QUEUING, PLAYING, LEAVING）
   - 狀態轉換邏輯
   - 行為控制

2. 策略模式
   - 路徑尋找策略
   - 設施選擇邏輯
   - 決策機制

3. 觀察者模式
   - 狀態變更通知
   - 事件處理系統
   - 即時更新

4. 命令模式
   - 遊客行為控制
   - 動作執行
   - 操作序列

### 設施系統
1. 工廠模式
   - 設施類型註冊
   - 實例創建管理
   - 配置驅動

2. 觀察者模式
   - 狀態變更事件
   - 營運數據更新
   - 遊客互動通知

3. 狀態模式
   - 設施狀態管理（OPERATIONAL, LOADING, RUNNING, MAINTENANCE, CLOSED）
   - 運營流程控制
   - 維護週期

4. 隊列模式
   - 排隊系統實現
   - 容量管理
   - 批次處理

## 主要系統組件

### Canvas 引擎
- 場景管理
- 精靈系統
- 碰撞檢測
- 動畫控制

### 遊戲邏輯
- 遊客行為
- 設施運營
- 經濟系統
- 天氣效果

### UI系統
- 控制面板
- 狀態顯示
- 互動選單
- 反饋系統

## 數據流架構

```mermaid
flowchart LR
    subgraph Input [使用者輸入]
        UI[UI事件]
        Game[遊戲事件]
    end

    subgraph Process [Redux處理]
        Actions[Actions]
        Reducers[Reducers]
        Store[Store]
    end

    subgraph Output [輸出]
        Canvas[Canvas更新]
        Interface[介面更新]
    end

    Input --> Actions
    Actions --> Reducers
    Reducers --> Store
    Store --> Output
```

## 設施系統類圖

```mermaid
classDiagram
    class FacilityConfig {
        +id: string
        +name: string
        +position: Position
        +capacity: number
        +minDuration: number
        +maxDuration: number
        +maxQueueLength: number
    }
    
    class Facility {
        -config: FacilityConfig
        -status: FacilityStatus
        -stats: FacilityStats
        -queue: string[]
        +getId(): string
        +getName(): string
        +getPosition(): Position
        +getStatus(): FacilityStatus
        +canJoinQueue(): boolean
        +joinQueue(visitorId: string): boolean
        +startRide(): boolean
        +startMaintenance(): boolean
    }
    
    class FacilityBuilder {
        -facilities: Map<string, Facility>
        -mapWidth: number
        -mapHeight: number
        +buildFacility(config: FacilityConfig): Facility
        +moveFacility(id: string, pos: Position): boolean
        +updateCapacity(id: string, capacity: number): boolean
        +removeFacility(id: string): boolean
        +getFacilities(): Map<string, Facility>
        -isValidPosition(pos: Position): boolean
        -isValidCapacity(capacity: number): boolean
        -isOverlappingWithExisting(pos: Position): boolean
    }
    
    class EventListener {
        <<interface>>
        +handleEvent(event: FacilityEvent)
    }
    
    Facility --> FacilityConfig
    Facility --> EventListener
    FacilityBuilder --> Facility
```

### 建造者模式
- FacilityBuilder 負責設施的創建、驗證和管理
- 提供完整的生命週期管理
- 確保設施放置的有效性
- 維護設施之間的空間關係

## 擴展性考慮

### 模組化設計
- 高內聚低耦合
- 插件式架構
- 動態載入
- 配置驅動

### 效能優化
- 記憶體管理
- 渲染優化
- 狀態更新優化
- 事件節流

### 可測試性
- 單元測試
- 組件測試
- 狀態測試
- 效能測試

## 主要設計原則

### 組件設計
```typescript
// 功能組件範例
interface AttractionProps {
  id: string;
  position: Vector2D;
  onSelect: (id: string) => void;
}

const Attraction: React.FC<AttractionProps> = ({
  id,
  position,
  onSelect
}) => {
  // 組件實現
};
```

### 狀態管理
```typescript
// Redux Slice 範例
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    updateVisitors: (state, action) => {
      state.visitors = action.payload;
    },
    addAttraction: (state, action) => {
      state.attractions.push(action.payload);
    }
  }
});
```

### Canvas 管理
```typescript
// Canvas 管理器範例
class CanvasManager {
  private context: CanvasRenderingContext2D;
  private entities: Entity[];

  public render(): void {
    // 渲染實現
  }

  public update(deltaTime: number): void {
    // 更新邏輯
  }
}
