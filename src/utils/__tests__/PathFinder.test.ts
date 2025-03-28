import { PathFinder, Vector2D, calculateDistance } from '../PathFinder';

describe('PathFinder', () => {
  let pathFinder: PathFinder;

  beforeEach(() => {
    pathFinder = new PathFinder(1, [], 0.5);
  });

  describe('基本路徑尋找', () => {
    it('應該能找到起點到終點的直線路徑', () => {
      const start: Vector2D = { x: 0, y: 0 };
      const goal: Vector2D = { x: 2, y: 0 };
      
      const path = pathFinder.findPath(start, goal);
      
      expect(path).toEqual([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 }
      ]);
    });

    it('當起點等於終點時應該返回單點路徑', () => {
      const point: Vector2D = { x: 0, y: 0 };
      
      const path = pathFinder.findPath(point, point);
      
      expect(path).toEqual([point]);
    });

    it('應該能找到起點到終點的對角線路徑', () => {
      const start: Vector2D = { x: 0, y: 0 };
      const goal: Vector2D = { x: 2, y: 2 };
      
      const path = pathFinder.findPath(start, goal);
      
      // 由於使用曼哈頓距離，路徑可能是先水平後垂直，或先垂直後水平
      expect(path.length).toBe(5); // 應該包含起點、終點和 3 個中間點
      expect(path[0]).toEqual(start);
      expect(path[path.length - 1]).toEqual(goal);
    });
  });

  describe('障礙物處理', () => {
    it('應該能繞過障礙物找到路徑', () => {
      const start: Vector2D = { x: 0, y: 0 };
      const goal: Vector2D = { x: 2, y: 0 };
      const obstacles = [{ x: 1, y: 0 }];
      
      pathFinder.setObstacles(obstacles);
      const path = pathFinder.findPath(start, goal);
      
      // 期望路徑會繞過障礙物
      expect(path).toEqual([
        { x: 0, y: 0 },
        { x: 0, y: 1 }, // 向上繞過
        { x: 1, y: 1 }, // 繞過障礙物
        { x: 2, y: 1 }, 
        { x: 2, y: 0 }
      ]);
    });

    it('當被障礙物完全包圍時應該返回空路徑', () => {
      const start: Vector2D = { x: 1, y: 1 };
      const goal: Vector2D = { x: 3, y: 3 };
      const obstacles = [
        { x: 0, y: 1 }, { x: 1, y: 0 },
        { x: 2, y: 1 }, { x: 1, y: 2 }
      ];
      
      pathFinder.setObstacles(obstacles);
      const path = pathFinder.findPath(start, goal);
      
      expect(path).toEqual([]);
    });

    it('應該能新增和移除障礙物', () => {
      const obstacle: Vector2D = { x: 1, y: 1 };
      
      // 確認添加障礙物
      pathFinder.addObstacle(obstacle);
      const pathWithObstacle = pathFinder.findPath(
        { x: 0, y: 0 },
        { x: 2, y: 2 }
      );
      expect(pathWithObstacle).not.toContainEqual(obstacle);
      
      // 確認移除障礙物後，該點可以被包含在可能的路徑中
      pathFinder.removeObstacle(obstacle);
      const neighbors = pathFinder['getNeighbors']({
        position: { x: 0, y: 1 },
        g: 0,
        h: 0,
        f: 0,
        parent: null
      });
      expect(neighbors).toContainEqual(obstacle);
    });
  });

  describe('網格大小設定', () => {
    it('應該能正確設定網格大小', () => {
      pathFinder.setGridSize(2);
      
      const start: Vector2D = { x: 0, y: 0 };
      const goal: Vector2D = { x: 4, y: 0 };
      
      const path = pathFinder.findPath(start, goal);
      
      expect(path).toEqual([
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 4, y: 0 }
      ]);
    });

    it('設定無效的網格大小時應該拋出錯誤', () => {
      expect(() => pathFinder.setGridSize(0)).toThrow('網格大小必須大於 0');
      expect(() => pathFinder.setGridSize(-1)).toThrow('網格大小必須大於 0');
    });
  });

  describe('路徑平滑化', () => {
    it('應該能平滑化簡單路徑', () => {
      const start: Vector2D = { x: 0, y: 0 };
      const goal: Vector2D = { x: 2, y: 2 };
      
      const path = pathFinder.findPath(start, goal);
      
      // 驗證路徑的起點和終點
      expect(path[0]).toEqual(start);
      expect(path[path.length - 1]).toEqual(goal);
      
      // 驗證平滑化後的路徑點數應該大於原始路徑
      expect(path.length).toBeGreaterThan(2);
      
      // 檢查所有點是否形成平滑曲線
      for (let i = 1; i < path.length - 1; i++) {
        const prev = path[i - 1];
        const curr = path[i];
        const next = path[i + 1];
        
        // 檢查路徑的連續性和平滑度
      const d1 = calculateDistance(prev, curr);
      const d2 = calculateDistance(curr, next);
      
      // 確保相鄰點之間的距離合理
      expect(d1).toBeLessThan(2);
      expect(d2).toBeLessThan(2);
      }
    });

    it('平滑化路徑應避開障礙物', () => {
      const start: Vector2D = { x: 0, y: 0 };
      const goal: Vector2D = { x: 4, y: 0 };
      const obstacle: Vector2D = { x: 2, y: 0 };
      
      pathFinder.setObstacles([obstacle]);
      const path = pathFinder.findPath(start, goal);
      
      // 驗證所有路徑點都不與障礙物重疊
      path.forEach(point => {
        const distance = calculateDistance(point, obstacle);
        expect(distance).toBeGreaterThan(0.5); // 考慮網格大小
      });
    });

    it('設定平滑化因子時應驗證範圍', () => {
      expect(() => pathFinder.setSmoothingFactor(-0.1))
        .toThrow('平滑化因子必須在 0 到 1 之間');
      expect(() => pathFinder.setSmoothingFactor(1.1))
        .toThrow('平滑化因子必須在 0 到 1 之間');
      
      // 正常範圍應該可以設定
      expect(() => pathFinder.setSmoothingFactor(0.7))
        .not.toThrow();
    });
  });

  describe('路徑優化', () => {
    it('應該移除冗餘的路徑點', () => {
      const start: Vector2D = { x: 0, y: 0 };
      const goal: Vector2D = { x: 4, y: 0 };
      
      // 在沒有障礙物的情況下，應該生成一條直線
      const path = pathFinder.findPath(start, goal);
      
      // 檢查是否為最佳路徑（考慮平滑化後的點）
      expect(path.length).toBeLessThanOrEqual(7);
      expect(path[0]).toEqual(start);
      expect(path[path.length - 1]).toEqual(goal);
    });

    it('應該保留必要的轉折點', () => {
      const start: Vector2D = { x: 0, y: 0 };
      const goal: Vector2D = { x: 4, y: 0 };
      const obstacles = [
        { x: 2, y: 0 },
        { x: 2, y: 1 }
      ];
      
      pathFinder.setObstacles(obstacles);
      const path = pathFinder.findPath(start, goal);
      
      // 路徑應該包含必要的轉折點以避開障礙物
      expect(path.length).toBeGreaterThan(2);
      
      // 驗證路徑的每一段都不與障礙物相交
      for (let i = 0; i < path.length - 1; i++) {
        const current = path[i];
        const next = path[i + 1];
        
        obstacles.forEach(obstacle => {
          const distance = pathFinder['pointToLineDistance'](obstacle, current, next);
          expect(distance).toBeGreaterThan(0.5);
        });
      }
    });
  });

  describe('效能相關', () => {
    it('應該能處理較大的路徑尋找請求', () => {
      const start: Vector2D = { x: 0, y: 0 };
      const goal: Vector2D = { x: 10, y: 10 };
      
      const path = pathFinder.findPath(start, goal);
      
      expect(path.length).toBeGreaterThan(0);
      expect(path[0]).toEqual(start);
      expect(path[path.length - 1]).toEqual(goal);
    });

    it('應該能處理多個障礙物', () => {
      const obstacles: Vector2D[] = Array(50).fill(0).map(() => ({
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
      }));
      
      pathFinder.setObstacles(obstacles);
      const path = pathFinder.findPath({ x: 0, y: 0 }, { x: 19, y: 19 });
      
      // 不論是否找到路徑，都不應該崩潰
      expect(path).toBeDefined();
    });
  });
});
