import { SatisfactionManager } from '../SatisfactionManager';

describe('SatisfactionManager', () => {
  let manager: SatisfactionManager;

  beforeEach(() => {
    manager = new SatisfactionManager();
  });

  describe('初始化', () => {
    test('默認初始值應為 100', () => {
      expect(manager.getSatisfaction()).toBe(100);
    });

    test('應接受自定義初始值', () => {
      const customManager = new SatisfactionManager(80);
      expect(customManager.getSatisfaction()).toBe(80);
    });

    test('初始值不應超過最大值 100', () => {
      const customManager = new SatisfactionManager(150);
      expect(customManager.getSatisfaction()).toBe(100);
    });

    test('初始值不應低於最小值 0', () => {
      const customManager = new SatisfactionManager(-50);
      expect(customManager.getSatisfaction()).toBe(0);
    });
  });

  describe('滿意度更新', () => {
    test('應正確增加滿意度', () => {
      manager.updateSatisfaction(10);
      expect(manager.getSatisfaction()).toBe(100); // 已達最大值
      
      manager.updateSatisfaction(-20);
      expect(manager.getSatisfaction()).toBe(80);
      manager.updateSatisfaction(10);
      expect(manager.getSatisfaction()).toBe(90);
    });

    test('應正確減少滿意度', () => {
      manager.updateSatisfaction(-30);
      expect(manager.getSatisfaction()).toBe(70);
    });

    test('不應超過最大值 100', () => {
      manager.updateSatisfaction(20);
      expect(manager.getSatisfaction()).toBe(100);
    });

    test('不應低於最小值 0', () => {
      manager.updateSatisfaction(-150);
      expect(manager.getSatisfaction()).toBe(0);
    });
  });

  describe('遊玩後提升', () => {
    test('應在遊玩後提升 10 點滿意度', () => {
      manager.updateSatisfaction(-30); // 降至 70
      manager.boostAfterPlay();
      expect(manager.getSatisfaction()).toBe(80);
    });

    test('提升後不應超過最大值', () => {
      manager.updateSatisfaction(-5); // 降至 95
      manager.boostAfterPlay();
      expect(manager.getSatisfaction()).toBe(100);
    });
  });

  describe('閾值檢查', () => {
    test('應正確判斷是否低於閾值', () => {
      expect(manager.isBelowThreshold(50)).toBeFalsy();
      
      manager.updateSatisfaction(-60); // 降至 40
      expect(manager.isBelowThreshold(50)).toBeTruthy();
    });

    test('使用默認閾值 50', () => {
      manager.updateSatisfaction(-60); // 降至 40
      expect(manager.isBelowThreshold()).toBeTruthy();
    });
  });

  describe('重置功能', () => {
    test('應重置到最大值 100', () => {
      manager.updateSatisfaction(-30);
      expect(manager.getSatisfaction()).toBe(70);
      
      manager.reset();
      expect(manager.getSatisfaction()).toBe(100);
    });
  });
});
