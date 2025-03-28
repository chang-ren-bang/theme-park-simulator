import { Visitor, VisitorState } from '../Visitor';
import { Vector2D } from '../../../utils/PathFinder';

describe('Visitor', () => {
  const testId = 'testVisitor';
  const initialPosition: Vector2D = { x: 0, y: 0 };
  let visitor: Visitor;

  beforeEach(() => {
    visitor = new Visitor(testId, initialPosition, []);
  });

  describe('基本功能', () => {
    it('應該正確初始化遊客', () => {
      expect(visitor.id).toBe(testId);
      expect(visitor.position).toEqual(initialPosition);
      expect(visitor.state).toBe(VisitorState.IDLE);
      expect(visitor.satisfaction).toBe(100);
    });

    it('應該正確移動到指定位置', () => {
      const target: Vector2D = { x: 5, y: 5 };
      visitor.moveTo(target);
      
      expect(visitor.state).toBe(VisitorState.MOVING);
      
      // 更新遊客狀態來移動
      visitor.update(1); // 1秒更新
      
      // 位置應該已經改變
      expect(visitor.position).not.toEqual(initialPosition);
    });

    it('應該在排隊時降低滿意度', () => {
      const initialSatisfaction = visitor.satisfaction;
      const waitingTime = 60; // 1分鐘等待
      
      visitor.startQueuing(waitingTime);
      expect(visitor.state).toBe(VisitorState.QUEUING);
      expect(visitor.satisfaction).toBeLessThan(initialSatisfaction);
    });

    it('應該在遊玩後提高滿意度', () => {
      // 先降低滿意度
      visitor.startQueuing(120); // 2分鐘等待
      const satisfactionAfterQueuing = visitor.satisfaction;
      
      // 開始並完成遊玩
      visitor.startPlaying();
      expect(visitor.state).toBe(VisitorState.PLAYING);
      
      visitor.finishPlaying();
      expect(visitor.state).toBe(VisitorState.IDLE);
      expect(visitor.satisfaction).toBeGreaterThan(satisfactionAfterQueuing);
    });

    it('應該在連續低滿意度後準備離開', () => {
      // 連續顯著降低滿意度
      visitor.startQueuing(300); // 5分鐘等待
      visitor.update(1);
      visitor.startQueuing(300); // 另外5分鐘
      visitor.update(1);
      visitor.startQueuing(300); // 又5分鐘
      
      // 第三次更新應該觸發離開狀態
      const shouldLeave = visitor.update(1);
      
      expect(shouldLeave).toBe(true);
      expect(visitor.state).toBe(VisitorState.LEAVING);
    });

    it('應該能夠更新障礙物', () => {
      const newObstacles: Vector2D[] = [{ x: 3, y: 3 }, { x: 4, y: 4 }];
      visitor.updateObstacles(newObstacles);
      // 如果沒有拋出錯誤，測試通過
    });
  });

  describe('邊界情況', () => {
    it('應該正確處理移動和路徑尋找', () => {
      // 測試移動情況
      const validTarget: Vector2D = { x: 5, y: 5 };
      
      visitor.moveTo(validTarget);
      expect(visitor.state).toBe(VisitorState.MOVING);
      
      // 移動然後嘗試更新
      visitor.update(1);
      expect(visitor.position).not.toEqual(initialPosition);
    });
  });

  describe('行為預測', () => {
    it('應該在閒置狀態下提供正確的預測', () => {
      // 先降低滿意度使遊客需要尋找新設施
      visitor.startQueuing(180); // 3分鐘等待
      visitor.update(1);
      
      expect(visitor.prediction).toBeDefined();
      expect(visitor.prediction?.nextState).toBe(VisitorState.MOVING);
      expect(visitor.prediction?.satisfactionTrend).toBeLessThan(0);
    });

    it('應該在移動狀態下提供位置預測', () => {
      const target: Vector2D = { x: 5, y: 5 };
      visitor.moveTo(target);
      
      expect(visitor.prediction).toBeDefined();
      expect(visitor.prediction?.nextPosition).toBeDefined();
      expect(visitor.prediction?.timeToNextState).toBeGreaterThan(0);
    });

    it('應該在排隊狀態下預測遊玩狀態', () => {
      visitor.startQueuing(60);
      visitor.update(1);
      
      expect(visitor.prediction).toBeDefined();
      expect(visitor.prediction?.nextState).toBe(VisitorState.PLAYING);
      expect(visitor.prediction?.satisfactionTrend).toBeLessThan(0);
    });

    it('應該在遊玩狀態下預測滿意度上升', () => {
      visitor.startPlaying();
      visitor.update(1);
      
      expect(visitor.prediction).toBeDefined();
      expect(visitor.prediction?.nextState).toBe(VisitorState.IDLE);
      expect(visitor.prediction?.satisfactionTrend).toBeGreaterThan(0);
    });

    it('應該在離開狀態下預測滿意度持續下降', () => {
      // 強制進入離開狀態
      for (let i = 0; i < 3; i++) {
        visitor.startQueuing(300);
        visitor.update(1);
      }
      
      expect(visitor.prediction).toBeDefined();
      expect(visitor.state).toBe(VisitorState.LEAVING);
      expect(visitor.prediction?.satisfactionTrend).toBeLessThan(0);
    });
  });
});
