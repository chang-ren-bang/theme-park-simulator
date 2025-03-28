import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import VisitorInfoPanel from '../VisitorInfoPanel';
import visitorReducer, { updateVisitor, selectVisitor } from '../../../store/visitorSlice';
import { VisitorState } from '../../game/Visitor';

describe('VisitorInfoPanel', () => {
  const mockStore = configureStore({
    reducer: {
      visitors: visitorReducer
    }
  });

  const mockVisitor = {
    id: 'TEST_001',
    position: { x: 10, y: 20 },
    state: VisitorState.MOVING,
    satisfaction: 75,
    lowSatisfactionCount: 1
  };

  beforeEach(() => {
    mockStore.dispatch(updateVisitor(mockVisitor));
    mockStore.dispatch(selectVisitor(mockVisitor.id));
  });

  it('顯示遊客基本資訊', () => {
    render(
      <Provider store={mockStore}>
        <VisitorInfoPanel />
      </Provider>
    );

    expect(screen.getByText(/TEST_001/)).toBeInTheDocument();
    expect(screen.getByText(/MOVING/)).toBeInTheDocument();
    expect(screen.getByText(/\(10, 20\)/)).toBeInTheDocument();
  });

  it('顯示滿意度資訊', () => {
    render(
      <Provider store={mockStore}>
        <VisitorInfoPanel />
      </Provider>
    );

    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('當滿意度低時顯示警告', () => {
    render(
      <Provider store={mockStore}>
        <VisitorInfoPanel />
      </Provider>
    );

    expect(screen.getByText(/連續低滿意度次數: 1/)).toBeInTheDocument();
  });

  it('未選擇遊客時不顯示面板', () => {
    mockStore.dispatch(selectVisitor(null));
    
    const { container } = render(
      <Provider store={mockStore}>
        <VisitorInfoPanel />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });
});
