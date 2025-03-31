import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { buildFacility, moveFacility, updateCapacity, removeFacility } from '../../store/facilitySlice';
import { FacilityStatus } from '../game/types/FacilityTypes';
// css styles are handled by the build system

interface FacilityFormData {
  name: string;
  x: number;
  y: number;
  capacity: number;
  minDuration: number;
  maxDuration: number;
  maxQueueLength: number;
}

const initialFormData: FacilityFormData = {
  name: '',
  x: 0,
  y: 0,
  capacity: 10,
  minDuration: 1,
  maxDuration: 5,
  maxQueueLength: 50,
};

const FacilityBuilderPanel: React.FC = () => {
  const [formData, setFormData] = useState<FacilityFormData>(initialFormData);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<FacilityFormData>(initialFormData);
  
  const dispatch = useAppDispatch();
  const facilities = useAppSelector((state) => {
    const facilitiesObj = state.facilities.facilities;
    return Object.entries(facilitiesObj).map(([id, facility]) => ({
      id,
      facility,
      status: facility.getStatus(),
      stats: facility.getStats()
    }));
  });

  const getStatusColor = (status: FacilityStatus): string => {
    switch (status) {
      case FacilityStatus.OPERATIONAL: return 'green';
      case FacilityStatus.LOADING: return 'blue';
      case FacilityStatus.RUNNING: return 'purple';
      case FacilityStatus.MAINTENANCE: return 'orange';
      case FacilityStatus.CLOSED: return 'red';
      default: return 'gray';
    }
  };

  const formatDuration = (minutes: number): string => {
    return minutes < 60 ? `${minutes}分鐘` : `${Math.floor(minutes / 60)}小時${minutes % 60}分鐘`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const { name, value } = e.target;
    const setter = isEdit ? setEditFormData : setFormData;
    
    // 數值驗證
    let validatedValue: string | number = value;
    if (name !== 'name') {
      const numValue = Number(value);
      if (name === 'capacity') {
        validatedValue = Math.max(1, Math.min(100, numValue));
      } else if (name === 'minDuration') {
        validatedValue = Math.max(1, Math.min(formData.maxDuration, numValue));
      } else if (name === 'maxDuration') {
        validatedValue = Math.max(formData.minDuration, numValue);
      } else if (name === 'maxQueueLength') {
        validatedValue = Math.max(1, numValue);
      } else {
        // x 和 y 座標
        validatedValue = Math.max(0, numValue);
      }
    }

    setter(prev => ({
      ...prev,
      [name]: name === 'name' ? validatedValue : Number(validatedValue)
    }));
  };

  const handleBuild = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(buildFacility({
      name: formData.name,
      position: {
        x: formData.x,
        y: formData.y
      },
      capacity: formData.capacity,
      minDuration: formData.minDuration,
      maxDuration: formData.maxDuration,
      maxQueueLength: formData.maxQueueLength
    }));
    setFormData(initialFormData);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFacilityId) return;

    dispatch(updateCapacity({
      facilityId: selectedFacilityId,
      capacity: editFormData.capacity
    }));

    dispatch(moveFacility({
      facilityId: selectedFacilityId,
      position: {
        x: editFormData.x,
        y: editFormData.y
      }
    }));

    setSelectedFacilityId(null);
    setEditFormData(initialFormData);
  };

  const handleDelete = (facilityId: string) => {
    if (window.confirm('確定要移除此設施嗎？')) {
      dispatch(removeFacility(facilityId));
      if (selectedFacilityId === facilityId) {
        setSelectedFacilityId(null);
        setEditFormData(initialFormData);
      }
    }
  };

  const handleSelect = (facilityId: string) => {
    const facilityItem = facilities.find(f => f.id === facilityId);
    if (!facilityItem) return;
    
    const { facility } = facilityItem;
    setSelectedFacilityId(facilityId);
    setEditFormData({
      name: facility.getName(),
      x: facility.getPosition().x,
      y: facility.getPosition().y,
      capacity: facility.getCapacity(),
      minDuration: facility.getMinDuration(),
      maxDuration: facility.getMaxDuration(),
      maxQueueLength: facility.getMaxQueueLength()
    });
  };

  return (
    <div className="facility-builder-panel">
      <h2>設施建造面板</h2>
      
      {/* 建造表單 */}
      <form onSubmit={handleBuild}>
        <div>
          <label>
            設施名稱：
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            X 座標：
            <input
              type="number"
              name="x"
              value={formData.x}
              onChange={handleInputChange}
              min="0"
              required
            />
          </label>
        </div>

        <div>
          <label>
            Y 座標：
            <input
              type="number"
              name="y"
              value={formData.y}
              onChange={handleInputChange}
              min="0"
              required
            />
          </label>
        </div>

        <div>
          <label>
            容量：
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              min="1"
              max="100"
              required
            />
          </label>
        </div>

        <div>
          <label>
            最短遊玩時間（分鐘）：
            <input
              type="number"
              name="minDuration"
              value={formData.minDuration}
              onChange={handleInputChange}
              min="1"
              max={formData.maxDuration}
              required
              data-testid="min-duration"
            />
          </label>
        </div>

        <div>
          <label>
            最長遊玩時間（分鐘）：
            <input
              type="number"
              name="maxDuration"
              value={formData.maxDuration}
              onChange={handleInputChange}
              min={formData.minDuration}
              required
              data-testid="max-duration"
            />
          </label>
        </div>

        <div>
          <label>
            最大排隊人數：
            <input
              type="number"
              name="maxQueueLength"
              value={formData.maxQueueLength}
              onChange={handleInputChange}
              min="1"
              required
              data-testid="max-queue-length"
            />
          </label>
        </div>

        <button type="submit">建造設施</button>
      </form>

      {/* 已建設施列表 */}
      <div className="facilities-list">
        <h3>已建設施</h3>
        <div className="facilities-grid">
          {facilities.map(({ id, facility, status, stats }) => (
            <div 
              key={id} 
              className={`facility-item ${selectedFacilityId === id ? 'selected' : ''}`}
              onClick={() => handleSelect(id)}
            >
              <div className="facility-info" data-testid="facility-info">
                <strong>{facility.getName()}</strong>
                <div>位置: ({facility.getPosition().x}, {facility.getPosition().y})</div>
                <div>容量: {facility.getCapacity()}</div>
                <div className="facility-status" style={{ color: getStatusColor(status) }} data-testid="facility-status">
                  狀態: {status}
                </div>
                <div className="facility-stats" data-testid="facility-stats">
                  <div>排隊人數: {stats.queueLength}/{facility.getMaxQueueLength()}</div>
                  <div>目前遊玩: {stats.currentVisitors}/{facility.getCapacity()}</div>
                  <div>等待時間: {formatDuration(stats.averageWaitTime)}</div>
                  <div>總遊客數: {stats.totalVisitors}</div>
                </div>
              </div>
              <button 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(id);
                }}
              >
                移除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 編輯面板 */}
      {selectedFacilityId && (
        <div className="edit-panel">
          <h3>編輯設施</h3>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>
                X 座標：
                <input
                  type="number"
                  name="x"
                  value={editFormData.x}
                  onChange={(e) => handleInputChange(e, true)}
                  min="0"
                  required
                  data-testid="edit-x-coord"
                />
              </label>
            </div>

            <div>
              <label>
                Y 座標：
                <input
                  type="number"
                  name="y"
                  value={editFormData.y}
                  onChange={(e) => handleInputChange(e, true)}
                  min="0"
                  required
                  data-testid="edit-y-coord"
                />
              </label>
            </div>

            <div>
              <label>
                容量：
                <input
                  type="number"
                  name="capacity"
                  value={editFormData.capacity}
                  onChange={(e) => handleInputChange(e, true)}
                  min="1"
                  max="100"
                  required
                  data-testid="edit-capacity"
                />
              </label>
            </div>

            <div className="edit-actions">
              <button type="submit">儲存變更</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => {
                  setSelectedFacilityId(null);
                  setEditFormData(initialFormData);
                }}
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default FacilityBuilderPanel;
