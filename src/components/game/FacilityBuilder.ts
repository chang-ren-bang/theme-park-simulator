import { FacilityConfig, Position } from './types/FacilityTypes';
import { Facility } from './Facility';

export class FacilityBuilder {
  // 存放所有已建造的設施
  private facilities: Map<string, Facility> = new Map();
  // 地圖大小設定
  private mapWidth: number;
  private mapHeight: number;

  constructor(mapWidth: number, mapHeight: number) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  /**
   * 建造新設施
   * @param config 設施配置
   * @returns 建造的設施實例，如果建造失敗則返回 null
   */
  public buildFacility(config: Omit<FacilityConfig, 'id'>): Facility | null {
    // 生成唯一 ID
    const id = this.generateFacilityId();
    const fullConfig: FacilityConfig = {
      ...config,
      id
    };

    // 驗證設施位置
    if (!this.isValidPosition(fullConfig.position)) {
      return null;
    }

    // 驗證容量設定
    if (!this.isValidCapacity(fullConfig.capacity)) {
      return null;
    }

    // 檢查是否與其他設施重疊
    if (this.isOverlappingWithExisting(fullConfig.position)) {
      return null;
    }

    // 建造並儲存設施
    const facility = new Facility(fullConfig);
    this.facilities.set(id, facility);

    return facility;
  }

  /**
   * 移動現有設施
   * @param facilityId 設施 ID
   * @param newPosition 新位置
   * @returns 是否移動成功
   */
  public moveFacility(facilityId: string, newPosition: Position): boolean {
    const facility = this.facilities.get(facilityId);
    if (!facility) {
      return false;
    }

    // 確認新位置有效
    if (!this.isValidPosition(newPosition)) {
      return false;
    }

    // 確認不會與其他設施重疊（排除自己）
    if (this.isOverlappingWithExisting(newPosition, facilityId)) {
      return false;
    }

    // 更新設施位置
    const currentConfig = {
      id: facility.getId(),
      name: facility.getName(),
      position: newPosition,
      capacity: facility.getCapacity(),
      minDuration: 1, // 使用預設值，因為無法從 Facility 實例獲取
      maxDuration: 5,
      maxQueueLength: 50
    };

    // 移除舊設施
    this.facilities.delete(facilityId);

    // 建立新設施（保持相同 ID）
    const newFacility = new Facility(currentConfig);
    this.facilities.set(facilityId, newFacility);

    return true;
  }

  /**
   * 更新設施容量
   * @param facilityId 設施 ID
   * @param newCapacity 新容量
   * @returns 是否更新成功
   */
  public updateCapacity(facilityId: string, newCapacity: number): boolean {
    const facility = this.facilities.get(facilityId);
    if (!facility) {
      return false;
    }

    if (!this.isValidCapacity(newCapacity)) {
      return false;
    }

    // 更新設施配置
    const currentConfig = {
      id: facility.getId(),
      name: facility.getName(),
      position: facility.getPosition(),
      capacity: newCapacity,
      minDuration: 1, // 使用預設值
      maxDuration: 5,
      maxQueueLength: 50
    };

    // 移除舊設施
    this.facilities.delete(facilityId);

    // 建立新設施（保持相同 ID）
    const newFacility = new Facility(currentConfig);
    this.facilities.set(facilityId, newFacility);

    return true;
  }

  /**
   * 移除設施
   * @param facilityId 設施 ID
   * @returns 是否移除成功
   */
  public removeFacility(facilityId: string): boolean {
    return this.facilities.delete(facilityId);
  }

  /**
   * 取得所有設施
   * @returns 設施 Map
   */
  public getFacilities(): Map<string, Facility> {
    return new Map(this.facilities);
  }

  /**
   * 取得特定設施
   * @param facilityId 設施 ID
   * @returns 設施實例或 undefined
   */
  public getFacility(facilityId: string): Facility | undefined {
    return this.facilities.get(facilityId);
  }

  // 私有輔助方法

  private generateFacilityId(): string {
    return `facility-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private isValidPosition(position: Position): boolean {
    return position.x >= 0 &&
           position.x < this.mapWidth &&
           position.y >= 0 &&
           position.y < this.mapHeight;
  }

  private isValidCapacity(capacity: number): boolean {
    return capacity > 0 && capacity <= 100; // 設定最大容量限制為 100
  }

  private isOverlappingWithExisting(position: Position, excludeId?: string): boolean {
    for (const [id, facility] of this.facilities.entries()) {
      if (excludeId && id === excludeId) {
        continue;
      }

      const facilityPos = facility.getPosition();
      // 目前使用簡單的重疊檢查（假設每個設施佔據 1x1 的空間）
      if (facilityPos.x === position.x && facilityPos.y === position.y) {
        return true;
      }
    }
    return false;
  }
}
