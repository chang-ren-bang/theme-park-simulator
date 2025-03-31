import { Facility } from '../Facility';
import { FacilityConfig, FacilityStatus } from '../types/FacilityTypes';

describe('Facility', () => {
  let facility: Facility;
  const mockConfig: FacilityConfig = {
    id: 'ride-001',
    name: '雲霄飛車',
    position: { x: 100, y: 100 },
    capacity: 30,
    minDuration: 3,
    maxDuration: 5,
    maxQueueLength: 100
  };

  beforeEach(() => {
    facility = new Facility(mockConfig);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('基本資訊獲取', () => {
    it('應該正確返回設施 ID', () => {
      expect(facility.getId()).toBe(mockConfig.id);
    });

    it('應該正確返回設施名稱', () => {
      expect(facility.getName()).toBe(mockConfig.name);
    });

    it('應該正確返回設施位置', () => {
      expect(facility.getPosition()).toEqual(mockConfig.position);
    });

    it('應該正確返回設施容量', () => {
      expect(facility.getCapacity()).toBe(mockConfig.capacity);
    });

    it('應該返回當前設施狀態', () => {
      expect(facility.getStatus()).toBe(FacilityStatus.OPERATIONAL);
    });
  });

  describe('排隊系統', () => {
    it('當設施正常運作且隊伍未滿時應該允許加入隊伍', () => {
      expect(facility.canJoinQueue()).toBe(true);
      expect(facility.joinQueue('visitor-1')).toBe(true);
      expect(facility.getQueueLength()).toBe(1);
    });

    it('當隊伍已滿時不應該允許加入', () => {
      // 填滿隊伍
      for (let i = 0; i < mockConfig.maxQueueLength; i++) {
        facility.joinQueue(`visitor-${i}`);
      }
      expect(facility.canJoinQueue()).toBe(false);
      expect(facility.joinQueue('visitor-new')).toBe(false);
    });

    it('應該允許遊客離開隊伍', () => {
      facility.joinQueue('visitor-1');
      facility.joinQueue('visitor-2');
      expect(facility.leaveQueue('visitor-1')).toBe(true);
      expect(facility.getQueueLength()).toBe(1);
    });

    it('當遊客不在隊伍中時應該返回 false', () => {
      expect(facility.leaveQueue('non-existent')).toBe(false);
    });
  });

  describe('設施操作', () => {
    it('應該正確啟動設施運行流程', () => {
      const statusChanges: FacilityStatus[] = [];
      facility.addEventListener((event) => {
        if ('currentStatus' in event) {
          statusChanges.push(event.currentStatus);
        }
      });

      facility.joinQueue('visitor-1');
      expect(facility.startRide()).toBe(true);
      
      // 檢查立即狀態變更
      expect(statusChanges).toContain(FacilityStatus.LOADING);
      
      // 5秒後應該變為運行狀態
      jest.advanceTimersByTime(5000);
      expect(statusChanges).toContain(FacilityStatus.RUNNING);
      
      // 運行結束後應該恢復正常狀態
      jest.advanceTimersByTime(mockConfig.maxDuration * 1000);
      expect(statusChanges).toContain(FacilityStatus.OPERATIONAL);
    });

    it('當設施非運作狀態時不應該開始新的遊玩', () => {
      facility.startMaintenance();
      expect(facility.startRide()).toBe(false);
    });

    it('當隊伍為空時不應該開始新的遊玩', () => {
      expect(facility.startRide()).toBe(false);
    });
  });

  describe('維護模式', () => {
    it('應該能夠進入維護模式', () => {
      expect(facility.startMaintenance()).toBe(true);
      expect(facility.getStatus()).toBe(FacilityStatus.MAINTENANCE);
    });

    it('在維護模式時不應該接受新的遊客', () => {
      facility.startMaintenance();
      expect(facility.canJoinQueue()).toBe(false);
      expect(facility.joinQueue('visitor-1')).toBe(false);
    });

    it('應該能夠完成維護並恢復運作', () => {
      facility.startMaintenance();
      expect(facility.completeMaintenance()).toBe(true);
      expect(facility.getStatus()).toBe(FacilityStatus.OPERATIONAL);
    });

    it('非維護狀態時不應該完成維護', () => {
      expect(facility.completeMaintenance()).toBe(false);
    });
  });

  describe('統計數據', () => {
    it('應該正確追蹤遊客數量', () => {
      facility.joinQueue('visitor-1');
      facility.joinQueue('visitor-2');
      facility.startRide();
      
      const stats = facility.getStats();
      expect(stats.currentVisitors).toBe(2);
      expect(stats.totalVisitors).toBe(2);
    });

    it('應該正確計算等待時間', () => {
      // 加入足夠的遊客以形成多個批次
      for (let i = 0; i < mockConfig.capacity * 2; i++) {
        facility.joinQueue(`visitor-${i}`);
      }
      
      const stats = facility.getStats();
      const averageDuration = (mockConfig.maxDuration + mockConfig.minDuration) / 2;
      const expectedWaitTime = Math.ceil(mockConfig.capacity * 2 / mockConfig.capacity) * averageDuration;
      
      expect(stats.averageWaitTime).toBe(expectedWaitTime);
    });

    it('應該記錄維護次數', () => {
      facility.startMaintenance();
      facility.completeMaintenance();
      facility.startMaintenance();
      facility.completeMaintenance();
      
      expect(facility.getStats().downtimeCount).toBe(2);
    });
  });

  describe('事件系統', () => {
    it('應該正確發送狀態變更事件', () => {
      const statusListener = jest.fn();
      facility.addEventListener(statusListener);
      
      facility.startMaintenance();
      expect(statusListener).toHaveBeenCalledWith(expect.objectContaining({
        facilityId: mockConfig.id,
        previousStatus: FacilityStatus.OPERATIONAL,
        currentStatus: FacilityStatus.MAINTENANCE
      }));
    });

    it('應該正確發送統計更新事件', () => {
      const statsListener = jest.fn();
      facility.addEventListener(statsListener);
      
      facility.joinQueue('visitor-1');
      expect(statsListener).toHaveBeenCalledWith(expect.objectContaining({
        facilityId: mockConfig.id,
        stats: expect.any(Object)
      }));
    });

    it('應該能夠移除事件監聽器', () => {
      const listener = jest.fn();
      facility.addEventListener(listener);
      facility.removeEventListener(listener);
      
      facility.startMaintenance();
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
