import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import facilityReducer from '../../../store/facilitySlice';
import visitorReducer from '../../../store/visitorSlice';
import visitorConfigReducer from '../../../store/visitorConfigSlice';
import FacilityBuilderPanel from '../FacilityBuilderPanel';

import { buildFacility } from '../../../store/facilitySlice';

// 創建測試用的 store
const createTestStore = () => {
  return configureStore({
    reducer: {
      facilities: facilityReducer,
      visitors: visitorReducer,
      visitorConfig: visitorConfigReducer
    }
  });
};

// 創建測試用設施數據
const testFacilityData = {
  name: '測試設施',
  position: { x: 10, y: 20 },
  capacity: 50,
  minDuration: 1,
  maxDuration: 5,
  maxQueueLength: 50
};

// 封裝渲染函數
const renderWithRedux = (component: React.ReactElement) => {
  const store = createTestStore();
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe('FacilityBuilderPanel', () => {
  it('應該正確渲染建造表單', () => {
    renderWithRedux(<FacilityBuilderPanel />);

    expect(screen.getByText('設施建造面板')).toBeInTheDocument();
    expect(screen.getByLabelText('設施名稱：')).toBeInTheDocument();
    expect(screen.getByLabelText('X 座標：')).toBeInTheDocument();
    expect(screen.getByLabelText('Y 座標：')).toBeInTheDocument();
    expect(screen.getByLabelText('容量：')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '建造設施' })).toBeInTheDocument();
  });

  it('應該可以提交建造表單', () => {
    renderWithRedux(<FacilityBuilderPanel />);

    // 填寫表單
    fireEvent.change(screen.getByLabelText('設施名稱：'), {
      target: { value: '測試設施' }
    });
    fireEvent.change(screen.getByLabelText('X 座標：'), {
      target: { value: '10' }
    });
    fireEvent.change(screen.getByLabelText('Y 座標：'), {
      target: { value: '20' }
    });
    fireEvent.change(screen.getByLabelText('容量：'), {
      target: { value: '50' }
    });

    // 提交表單
    fireEvent.click(screen.getByRole('button', { name: '建造設施' }));

    // 檢查表單是否重設
    expect(screen.getByLabelText('設施名稱：')).toHaveValue('');
    expect(screen.getByLabelText('X 座標：')).toHaveValue(0);
    expect(screen.getByLabelText('Y 座標：')).toHaveValue(0);
    expect(screen.getByLabelText('容量：')).toHaveValue(10);
  });

  it('應該顯示已建設施列表', async () => {
    const { store } = renderWithRedux(<FacilityBuilderPanel />);

    await act(async () => {
      store.dispatch(buildFacility(testFacilityData));
    });

    // 檢查是否正確顯示
    expect(screen.getByText('已建設施')).toBeInTheDocument();
    const facilityElement = screen.getByTestId('facility-info');
    expect(facilityElement).toHaveTextContent(testFacilityData.name);
    expect(facilityElement).toHaveTextContent(`位置: (${testFacilityData.position.x}, ${testFacilityData.position.y})`);
    expect(facilityElement).toHaveTextContent(`容量: ${testFacilityData.capacity}`);
  });

  it('應該能夠選擇和編輯設施', async () => {
    const { store } = renderWithRedux(<FacilityBuilderPanel />);
    
    await act(async () => {
      store.dispatch(buildFacility(testFacilityData));
    });
    
    // 點擊設施項目
    const facilityElement = screen.getByTestId('facility-info');
    fireEvent.click(facilityElement);

    // 檢查編輯面板是否出現
    expect(screen.getByText('編輯設施')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '儲存變更' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '取消' })).toBeInTheDocument();

    // 驗證表單欄位值
    expect(screen.getByTestId('edit-x-coord')).toHaveValue(10);
    expect(screen.getByTestId('edit-y-coord')).toHaveValue(20);
    expect(screen.getByTestId('edit-capacity')).toHaveValue(50);
  });

  it('應該能夠取消編輯', async () => {
    const { store } = renderWithRedux(<FacilityBuilderPanel />);
    
    await act(async () => {
      store.dispatch(buildFacility(testFacilityData));
    });
    
    // 選擇設施
    const facilityElement = screen.getByTestId('facility-info');
    fireEvent.click(facilityElement);
    
    // 點擊取消按鈕
    fireEvent.click(screen.getByRole('button', { name: '取消' }));

    // 確認編輯面板已關閉
    expect(screen.queryByText('編輯設施')).not.toBeInTheDocument();
  });

  it('應該能夠刪除設施', async () => {
    const { store } = renderWithRedux(<FacilityBuilderPanel />);
    
    await act(async () => {
      store.dispatch(buildFacility(testFacilityData));
    });

    // 模擬 window.confirm
    const confirmSpy = jest.spyOn(window, 'confirm');
    confirmSpy.mockImplementation(() => true);

    // 點擊刪除按鈕
    fireEvent.click(screen.getByRole('button', { name: '移除' }));

    // 確認彈出確認視窗
    expect(confirmSpy).toHaveBeenCalled();

    // 確認設施已被刪除
    expect(screen.queryByTestId('facility-info')).not.toBeInTheDocument();

    // 清理 spy
    confirmSpy.mockRestore();
  });

  it('應該能夠儲存設施編輯', async () => {
    const { store } = renderWithRedux(<FacilityBuilderPanel />);
    
    await act(async () => {
      store.dispatch(buildFacility(testFacilityData));
    });
    
    // 選擇設施
    const facilityElement = screen.getByTestId('facility-info');
    fireEvent.click(facilityElement);
    
    // 修改設施資訊
    fireEvent.change(screen.getByTestId('edit-x-coord'), {
      target: { value: '15' }
    });
    fireEvent.change(screen.getByTestId('edit-y-coord'), {
      target: { value: '25' }
    });
    fireEvent.change(screen.getByTestId('edit-capacity'), {
      target: { value: '60' }
    });

    // 儲存變更
    fireEvent.click(screen.getByRole('button', { name: '儲存變更' }));

    // 確認更新後的資訊
    const updatedFacilityInfo = screen.getByTestId('facility-info');
    expect(updatedFacilityInfo).toHaveTextContent('位置: (15, 25)');
    expect(updatedFacilityInfo).toHaveTextContent('容量: 60');
  });

  it('應該驗證輸入值', () => {
    renderWithRedux(<FacilityBuilderPanel />);

    // 測試負數座標
    const xInput = screen.getByLabelText('X 座標：');
    fireEvent.change(xInput, { target: { value: '-1' } });
    expect(xInput).toHaveValue(0);

    // 測試容量範圍
    const capacityInput = screen.getByLabelText('容量：');
    fireEvent.change(capacityInput, { target: { value: '0' } });
    expect(capacityInput).toHaveAttribute('min', '1');
    fireEvent.change(capacityInput, { target: { value: '101' } });
    expect(capacityInput).toHaveAttribute('max', '100');
  });

  it('應該在設施建造後正確更新 UI', async () => {
    const { store } = renderWithRedux(<FacilityBuilderPanel />);
    
    // 建造多個設施
    await act(async () => {
      store.dispatch(buildFacility({
        ...testFacilityData,
        name: '設施 A'
      }));
      store.dispatch(buildFacility({
        ...testFacilityData,
        name: '設施 B',
        position: { x: 30, y: 40 }
      }));
    });

    // 確認所有設施都被顯示
    const facilityInfos = screen.getAllByTestId('facility-info');
    expect(facilityInfos).toHaveLength(2);
    expect(facilityInfos[0]).toHaveTextContent('設施 A');
    expect(facilityInfos[1]).toHaveTextContent('設施 B');
  });
});
