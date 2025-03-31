import {
  FacilityConfig,
  FacilityStatus,
  FacilityStats,
  Position,
  StatusChangeEvent,
  StatsUpdateEvent
} from './types/FacilityTypes';

export type EventListener = (event: StatusChangeEvent | StatsUpdateEvent) => void;

export class Facility {
  private readonly config: FacilityConfig;
  private status: FacilityStatus;
  private stats: FacilityStats;
  private queue: string[];  // 儲存排隊遊客的 ID
  private currentRideStartTime: number;
  private eventListeners: Set<EventListener>;

  constructor(config: FacilityConfig) {
    this.config = config;
    this.status = FacilityStatus.OPERATIONAL;
    this.queue = [];
    this.currentRideStartTime = 0;
    this.eventListeners = new Set();
    
    this.stats = {
      totalVisitors: 0,
      currentVisitors: 0,
      queueLength: 0,
      averageWaitTime: 0,
      operationalTime: 0,
      downtimeCount: 0
    };
  }

  // 基本資訊獲取方法
  public getId(): string {
    return this.config.id;
  }

  public getName(): string {
    return this.config.name;
  }

  public getPosition(): Position {
    return { ...this.config.position };
  }

  public getCapacity(): number {
    return this.config.capacity;
  }

  public getStatus(): FacilityStatus {
    return this.status;
  }

  public getStats(): FacilityStats {
    return { ...this.stats };
  }

  public getQueueLength(): number {
    return this.queue.length;
  }

  public getMinDuration(): number {
    return this.config.minDuration;
  }

  public getMaxDuration(): number {
    return this.config.maxDuration;
  }

  public getMaxQueueLength(): number {
    return this.config.maxQueueLength;
  }

  // 事件監聽相關方法
  public addEventListener(listener: EventListener): void {
    this.eventListeners.add(listener);
  }

  public removeEventListener(listener: EventListener): void {
    this.eventListeners.delete(listener);
  }

  private emitEvent(event: StatusChangeEvent | StatsUpdateEvent): void {
    this.eventListeners.forEach(listener => listener(event));
  }

  // 排隊系統方法
  public canJoinQueue(): boolean {
    return this.status === FacilityStatus.OPERATIONAL &&
           this.queue.length < this.config.maxQueueLength;
  }

  public joinQueue(visitorId: string): boolean {
    if (!this.canJoinQueue()) {
      return false;
    }

    this.queue.push(visitorId);
    this.updateStats();
    return true;
  }

  public leaveQueue(visitorId: string): boolean {
    const index = this.queue.indexOf(visitorId);
    if (index === -1) {
      return false;
    }

    this.queue.splice(index, 1);
    this.updateStats();
    return true;
  }

  // 設施操作方法
  public startRide(): boolean {
    if (this.status !== FacilityStatus.OPERATIONAL || this.queue.length === 0) {
      return false;
    }

    const previousStatus = this.status;
    this.status = FacilityStatus.LOADING;
    this.currentRideStartTime = Date.now();

    // 從隊伍中移除即將乘坐的遊客
    const ridingVisitors = this.queue.splice(0, this.config.capacity);
    this.stats.currentVisitors = ridingVisitors.length;
    this.stats.totalVisitors += ridingVisitors.length;

    this.emitEvent({
      facilityId: this.config.id,
      previousStatus,
      currentStatus: this.status,
      timestamp: Date.now()
    });

    // 延遲後開始運行
    setTimeout(() => {
      this.status = FacilityStatus.RUNNING;
      this.emitEvent({
        facilityId: this.config.id,
        previousStatus: FacilityStatus.LOADING,
        currentStatus: FacilityStatus.RUNNING,
        timestamp: Date.now()
      });

      // 隨機運行時間後結束
      const duration = this.getRandomDuration();
      setTimeout(() => {
        this.completeRide();
      }, duration * 1000);  // 轉換為毫秒
    }, 5000);  // 5秒裝載時間

    return true;
  }

  private completeRide(): void {
    const previousStatus = this.status;
    this.status = FacilityStatus.OPERATIONAL;
    this.stats.currentVisitors = 0;
    
    // 計算並更新營運時間
    const rideTime = (Date.now() - this.currentRideStartTime) / 60000;  // 轉換為分鐘
    this.stats.operationalTime += rideTime;
    
    this.updateStats();
    this.emitEvent({
      facilityId: this.config.id,
      previousStatus,
      currentStatus: this.status,
      timestamp: Date.now()
    });
  }

  // 維護相關方法
  public startMaintenance(): boolean {
    if (this.status === FacilityStatus.MAINTENANCE) {
      return false;
    }

    const previousStatus = this.status;
    this.status = FacilityStatus.MAINTENANCE;
    this.stats.downtimeCount++;

    this.emitEvent({
      facilityId: this.config.id,
      previousStatus,
      currentStatus: this.status,
      timestamp: Date.now()
    });

    return true;
  }

  public completeMaintenance(): boolean {
    if (this.status !== FacilityStatus.MAINTENANCE) {
      return false;
    }

    const previousStatus = this.status;
    this.status = FacilityStatus.OPERATIONAL;

    this.emitEvent({
      facilityId: this.config.id,
      previousStatus,
      currentStatus: this.status,
      timestamp: Date.now()
    });

    return true;
  }

  // 輔助方法
  private getRandomDuration(): number {
    return Math.floor(
      Math.random() * (this.config.maxDuration - this.config.minDuration + 1) +
      this.config.minDuration
    );
  }

  private updateStats(): void {
    // 更新排隊統計
    this.stats.queueLength = this.queue.length;
    
    // 計算預估等待時間（基於平均遊玩時間和當前隊伍長度）
    const averageDuration = (this.config.maxDuration + this.config.minDuration) / 2;
    const queueGroups = Math.ceil(this.queue.length / this.config.capacity);
    this.stats.averageWaitTime = queueGroups * averageDuration;

    this.emitEvent({
      facilityId: this.config.id,
      stats: this.getStats(),
      timestamp: Date.now()
    });
  }
}
