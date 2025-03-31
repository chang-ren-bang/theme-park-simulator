import { FacilityBuilder } from '../FacilityBuilder';
import { Position } from '../types/FacilityTypes';

describe('FacilityBuilder', () => {
  let builder: FacilityBuilder;
  const mapWidth = 10;
  const mapHeight = 10;

  beforeEach(() => {
    builder = new FacilityBuilder(mapWidth, mapHeight);
  });

  describe('建造設施', () => {
    it('應成功建造有效的設施', () => {
      const config = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const facility = builder.buildFacility(config);
      
      expect(facility).not.toBeNull();
      expect(facility?.getName()).toBe('雲霄飛車');
      expect(facility?.getCapacity()).toBe(30);
    });

    it('當位置超出地圖範圍時應建造失敗', () => {
      const config = {
        name: '雲霄飛車',
        position: { x: mapWidth + 1, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const facility = builder.buildFacility(config);
      expect(facility).toBeNull();
    });

    it('當容量無效時應建造失敗', () => {
      const config = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 0,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const facility = builder.buildFacility(config);
      expect(facility).toBeNull();
    });

    it('不應允許在相同位置建造多個設施', () => {
      const config1 = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const config2 = {
        name: '旋轉木馬',
        position: { x: 5, y: 5 },
        capacity: 20,
        minDuration: 2,
        maxDuration: 4,
        maxQueueLength: 40
      };

      const facility1 = builder.buildFacility(config1);
      const facility2 = builder.buildFacility(config2);

      expect(facility1).not.toBeNull();
      expect(facility2).toBeNull();
    });
  });

  describe('移動設施', () => {
    it('應成功移動設施到有效位置', () => {
      const config = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const facility = builder.buildFacility(config);
      const facilityId = facility!.getId();
      const newPosition: Position = { x: 3, y: 3 };

      const moveResult = builder.moveFacility(facilityId, newPosition);
      expect(moveResult).toBe(true);

      const movedFacility = builder.getFacility(facilityId);
      expect(movedFacility?.getPosition()).toEqual(newPosition);
    });

    it('移動到無效位置應失敗', () => {
      const config = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const facility = builder.buildFacility(config);
      const facilityId = facility!.getId();
      const invalidPosition: Position = { x: -1, y: 5 };

      const moveResult = builder.moveFacility(facilityId, invalidPosition);
      expect(moveResult).toBe(false);

      const unmoveFacility = builder.getFacility(facilityId);
      expect(unmoveFacility?.getPosition()).toEqual(config.position);
    });

    it('移動到已被佔用的位置應失敗', () => {
      const config1 = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const config2 = {
        name: '旋轉木馬',
        position: { x: 3, y: 3 },
        capacity: 20,
        minDuration: 2,
        maxDuration: 4,
        maxQueueLength: 40
      };

      const facility1 = builder.buildFacility(config1);
      const facility2 = builder.buildFacility(config2);
      
      expect(facility2).not.toBeNull();
      const moveResult = builder.moveFacility(facility1!.getId(), config2.position);
      expect(moveResult).toBe(false);
    });
  });

  describe('更新容量', () => {
    it('應成功更新有效的容量設定', () => {
      const config = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const facility = builder.buildFacility(config);
      const facilityId = facility!.getId();
      const newCapacity = 40;

      const updateResult = builder.updateCapacity(facilityId, newCapacity);
      expect(updateResult).toBe(true);

      const updatedFacility = builder.getFacility(facilityId);
      expect(updatedFacility?.getCapacity()).toBe(newCapacity);
    });

    it('更新無效容量應失敗', () => {
      const config = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const facility = builder.buildFacility(config);
      const facilityId = facility!.getId();
      const invalidCapacity = -1;

      const updateResult = builder.updateCapacity(facilityId, invalidCapacity);
      expect(updateResult).toBe(false);

      const unchangedFacility = builder.getFacility(facilityId);
      expect(unchangedFacility?.getCapacity()).toBe(config.capacity);
    });
  });

  describe('移除設施', () => {
    it('應成功移除存在的設施', () => {
      const config = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const facility = builder.buildFacility(config);
      const facilityId = facility!.getId();

      const removeResult = builder.removeFacility(facilityId);
      expect(removeResult).toBe(true);
      expect(builder.getFacility(facilityId)).toBeUndefined();
    });

    it('移除不存在的設施應返回 false', () => {
      const removeResult = builder.removeFacility('non-existent-id');
      expect(removeResult).toBe(false);
    });
  });

  describe('設施查詢', () => {
    it('應正確返回所有設施', () => {
      const config1 = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const config2 = {
        name: '旋轉木馬',
        position: { x: 3, y: 3 },
        capacity: 20,
        minDuration: 2,
        maxDuration: 4,
        maxQueueLength: 40
      };

      builder.buildFacility(config1);
      builder.buildFacility(config2);

      const facilities = builder.getFacilities();
      expect(facilities.size).toBe(2);
    });

    it('應正確返回特定設施', () => {
      const config = {
        name: '雲霄飛車',
        position: { x: 5, y: 5 },
        capacity: 30,
        minDuration: 3,
        maxDuration: 5,
        maxQueueLength: 50
      };

      const facility = builder.buildFacility(config);
      const facilityId = facility!.getId();

      const retrievedFacility = builder.getFacility(facilityId);
      expect(retrievedFacility).toBeDefined();
      expect(retrievedFacility?.getName()).toBe(config.name);
    });
  });
});
