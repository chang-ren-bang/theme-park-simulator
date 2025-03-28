import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { VisitorConfigPanel } from '../VisitorConfigPanel';
import visitorConfigReducer from '../../../store/visitorConfigSlice';

describe('VisitorConfigPanel', () => {
  const renderWithRedux = () => {
    const store = configureStore({
      reducer: {
        visitorConfig: visitorConfigReducer
      }
    });

    return render(
      <Provider store={store}>
        <VisitorConfigPanel />
      </Provider>
    );
  };

  it('應該正確渲染所有配置項目', () => {
    renderWithRedux();

    // 檢查滿意度參數區段
    expect(screen.getByText('滿意度參數')).toBeInTheDocument();
    expect(screen.getByText('初始滿意度')).toBeInTheDocument();
    expect(screen.getByText('滿意度衰減率')).toBeInTheDocument();
    expect(screen.getByText('遊玩提升值')).toBeInTheDocument();
    expect(screen.getByText('臨界滿意度')).toBeInTheDocument();
    expect(screen.getByText('最大失敗次數')).toBeInTheDocument();

    // 檢查行為參數區段
    expect(screen.getByText('行為參數')).toBeInTheDocument();
    expect(screen.getByText('更新間隔 (ms)')).toBeInTheDocument();
    expect(screen.getByText('尋路範圍')).toBeInTheDocument();
    expect(screen.getByText('最大排隊時間 (s)')).toBeInTheDocument();

    // 檢查重置按鈕
    expect(screen.getByText('重置設定')).toBeInTheDocument();
  });

  it('應該能夠更新滿意度參數', () => {
    renderWithRedux();

    // 獲取初始滿意度的輸入框
    const initialValueInput = screen.getAllByLabelText('初始滿意度')[0] as HTMLInputElement;
    
    // 更改值
    fireEvent.change(initialValueInput, { target: { value: '90' } });

    // 確認值已更新
    expect(initialValueInput.value).toBe('90');
  });

  it('應該能夠更新行為參數', () => {
    renderWithRedux();

    // 獲取更新間隔的輸入框
    const updateIntervalInput = screen.getAllByLabelText('更新間隔 (ms)')[0] as HTMLInputElement;
    
    // 更改值
    fireEvent.change(updateIntervalInput, { target: { value: '2000' } });

    // 確認值已更新
    expect(updateIntervalInput.value).toBe('2000');
  });

  it('應該能夠重置所有參數', () => {
    renderWithRedux();

    // 先修改一些值
    const initialValueInput = screen.getAllByLabelText('初始滿意度')[0] as HTMLInputElement;
    fireEvent.change(initialValueInput, { target: { value: '90' } });

    const updateIntervalInput = screen.getAllByLabelText('更新間隔 (ms)')[0] as HTMLInputElement;
    fireEvent.change(updateIntervalInput, { target: { value: '2000' } });

    // 點擊重置按鈕
    fireEvent.click(screen.getByText('重置設定'));

    // 確認值已重置
    expect(initialValueInput.value).toBe('100');
    expect(updateIntervalInput.value).toBe('1000');
  });

  it('應該限制參數在有效範圍內', () => {
    renderWithRedux();

    // 測試滿意度衰減率的範圍限制
    const decayRateInput = screen.getAllByLabelText('滿意度衰減率')[0] as HTMLInputElement;
    
    // 嘗試設定超出範圍的值
    fireEvent.change(decayRateInput, { target: { value: '2' } });
    expect(decayRateInput.value).toBe('1');

    fireEvent.change(decayRateInput, { target: { value: '-1' } });
    expect(decayRateInput.value).toBe('0');
  });

  it('應該正確處理小數點數值', () => {
    renderWithRedux();

    // 測試滿意度衰減率的小數點處理
    const decayRateInput = screen.getAllByLabelText('滿意度衰減率')[0] as HTMLInputElement;
    
    fireEvent.change(decayRateInput, { target: { value: '0.05' } });
    expect(decayRateInput.value).toBe('0.05');
  });
});
