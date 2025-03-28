/**
 * 管理遊客滿意度的類別
 */
export class SatisfactionManager {
  private satisfaction: number = 100;
  private readonly MAX_SATISFACTION: number = 100;
  private readonly MIN_SATISFACTION: number = 0;
  private readonly PLAY_SATISFACTION_BOOST: number = 10;

  /**
   * 建立一個新的滿意度管理器實例
   * @param initialSatisfaction 初始滿意度值（預設為 100）
   */
  constructor(initialSatisfaction: number = 100) {
    this.setSatisfaction(initialSatisfaction);
  }

  /**
   * 取得目前的滿意度值
   */
  public getSatisfaction(): number {
    return this.satisfaction;
  }

  /**
   * 設置滿意度值
   * @param value 要設置的滿意度值
   */
  private setSatisfaction(value: number): void {
    this.satisfaction = Math.min(Math.max(value, this.MIN_SATISFACTION), this.MAX_SATISFACTION);
  }

  /**
   * 更新滿意度值
   * @param delta 滿意度的變化量
   */
  public updateSatisfaction(delta: number): void {
    this.setSatisfaction(this.satisfaction + delta);
  }

  /**
   * 遊玩設施後提升滿意度
   */
  public boostAfterPlay(): void {
    this.updateSatisfaction(this.PLAY_SATISFACTION_BOOST);
  }

  /**
   * 檢查滿意度是否低於特定閾值
   * @param threshold 閾值（預設為 50）
   */
  public isBelowThreshold(threshold: number = 50): boolean {
    return this.satisfaction < threshold;
  }

  /**
   * 重置滿意度到初始值
   */
  public reset(): void {
    this.satisfaction = this.MAX_SATISFACTION;
  }
}
