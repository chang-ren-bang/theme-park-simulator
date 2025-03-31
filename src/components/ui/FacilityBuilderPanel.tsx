import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { buildFacility, moveFacility, updateCapacity, removeFacility } from '../../store/facilitySlice';
// css styles are handled by the build system

interface FacilityFormData {
  name: string;
  x: number;
  y: number;
  capacity: number;
}

const initialFormData: FacilityFormData = {
  name: '',
  x: 0,
  y: 0,
  capacity: 10,
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
      facility
    }));
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const { name, value } = e.target;
    const setter = isEdit ? setEditFormData : setFormData;
    setter(prev => ({
      ...prev,
      [name]: name === 'name' ? value : Number(value)
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
      minDuration: 1,
      maxDuration: 5,
      maxQueueLength: 50
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
    const facility = facilityItem?.facility;
    if (facility) {
      setSelectedFacilityId(facilityId);
      setEditFormData({
        name: facility.getName(),
        x: facility.getPosition().x,
        y: facility.getPosition().y,
        capacity: facility.getCapacity()
      });
    }
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

        <button type="submit">建造設施</button>
      </form>

      {/* 已建設施列表 */}
      <div className="facilities-list">
        <h3>已建設施</h3>
        <div className="facilities-grid">
          {facilities.map(({ id, facility }) => (
            <div 
              key={id} 
              className={`facility-item ${selectedFacilityId === id ? 'selected' : ''}`}
              onClick={() => handleSelect(id)}
            >
              <div className="facility-info" data-testid="facility-info">
                <strong>{facility.getName()}</strong>
                <div>位置: ({facility.getPosition().x}, {facility.getPosition().y})</div>
                <div>容量: {facility.getCapacity()}</div>
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
