export type Position = {
  x: number;
  y: number;
};

export type FacilityConfig = {
  id: string;
  name: string;
  position: Position;
  capacity: number;
  minDuration: number;  // 最短遊玩時間（分鐘）
  maxDuration: number;  // 最長遊玩時間（分鐘）
  maxQueueLength: number;  // 最大排隊人數
};

export enum FacilityStatus {
  OPERATIONAL = 'operational',  // 正常運作中
  LOADING = 'loading',         // 正在上下客
  RUNNING = 'running',         // 遊玩中
  MAINTENANCE = 'maintenance', // 維護中
  CLOSED = 'closed'           // 關閉
}

export type FacilityStats = {
  totalVisitors: number;      // 總遊客數
  currentVisitors: number;    // 當前遊客數
  queueLength: number;        // 目前排隊長度
  averageWaitTime: number;    // 平均等待時間（分鐘）
  operationalTime: number;    // 運作時間（分鐘）
  downtimeCount: number;      // 停機次數
};

// 營運數據更新事件
export type StatsUpdateEvent = {
  facilityId: string;
  stats: FacilityStats;
  timestamp: number;
};

// 狀態變更事件
export type StatusChangeEvent = {
  facilityId: string;
  previousStatus: FacilityStatus;
  currentStatus: FacilityStatus;
  timestamp: number;
};
