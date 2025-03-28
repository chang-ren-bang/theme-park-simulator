import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import VisitorInfoPanel from '../VisitorInfoPanel';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { VisitorState } from '../../game/Visitor';

// Mock useAppSelector hook
jest.mock('../../../hooks/useAppSelector');
const mockUseAppSelector = useAppSelector as jest.Mock;

describe('VisitorInfoPanel', () => {
  const mockVisitor = {
    id: 'visitor1',
    position: { x: 10, y: 20 },
    state: 'IDLE' as VisitorState,
    satisfaction: 75,
    lowSatisfactionCount: 0,
    currentDestination: null,
    isSelected: false,
    isMoving: false,
    path: [],
    targetQueue: null,
    targetFacility: null,
    waitTime: 0,
    playTime: 0
  };

  const mockState = {
    visitors: {
      selectedVisitorId: 'visitor1',
      visitors: {
        visitor1: mockVisitor
      }
    }
  };

  beforeEach(() => {
    // 使用更精確的 mock 實現
    mockUseAppSelector.mockImplementation((selector) => {
      return selector(mockState);
    });
  });

  it('應該正確顯示遊客基本資訊', () => {
    render(<VisitorInfoPanel />);
    
    expect(screen.getByText('遊客 visitor1')).toBeInTheDocument();
    expect(screen.getByText('狀態: IDLE')).toBeInTheDocument();
    expect(screen.getByText('位置: (10, 20)')).toBeInTheDocument();
  });

  it('應該根據滿意度顯示正確的情緒表情', () => {
    const testCases = [
      { satisfaction: 95, expected: '😄' },
      { satisfaction: 75, expected: '🙂' },
      { satisfaction: 55, expected: '😐' },
      { satisfaction: 35, expected: '🙁' },
      { satisfaction: 25, expected: '😫' },
    ];

    testCases.forEach(({ satisfaction, expected }) => {
      const updatedState = {
        visitors: {
          selectedVisitorId: 'visitor1',
          visitors: {
            visitor1: { ...mockVisitor, satisfaction }
          }
        }
      };

      mockUseAppSelector.mockImplementation((selector) => selector(updatedState));

      const { rerender } = render(<VisitorInfoPanel />);
      expect(screen.getByText(expected)).toBeInTheDocument();
      rerender(<></>);
    });
  });

  it('當狀態為 LEAVING 時應該顯示不開心表情', () => {
    const updatedState = {
      visitors: {
        selectedVisitorId: 'visitor1',
        visitors: {
          visitor1: { ...mockVisitor, state: 'LEAVING' as VisitorState, satisfaction: 100 }
        }
      }
    };

    mockUseAppSelector.mockImplementation((selector) => selector(updatedState));

    render(<VisitorInfoPanel />);
    expect(screen.getByText('😫')).toBeInTheDocument();
  });

  it('情緒表情應該有正確的樣式', () => {
    render(<VisitorInfoPanel />);
    
    const moodElement = screen.getByText('🙂', { selector: 'div' });
    
    // 在所有父元素中尋找具有特定樣式的元素
    let currentElement = moodElement.parentElement;
    while (currentElement && !currentElement.getAttribute('style')?.includes('animation: moodBounce')) {
      currentElement = currentElement.parentElement;
    }
    
    expect(currentElement).toBeTruthy();
    const styleAttr = currentElement?.getAttribute('style') || '';
    
    // 檢查必要的樣式是否存在
    expect(styleAttr).toContain('font-size: 24px');
    expect(styleAttr).toContain('animation: moodBounce');
    expect(styleAttr).toContain('text-align: center');
  });

  it('當 lowSatisfactionCount > 0 時應該顯示警告', () => {
    const updatedState = {
      visitors: {
        selectedVisitorId: 'visitor1',
        visitors: {
          visitor1: { ...mockVisitor, lowSatisfactionCount: 2 }
        }
      }
    };

    mockUseAppSelector.mockImplementation((selector) => selector(updatedState));

    render(<VisitorInfoPanel />);
    expect(screen.getByText(/連續低滿意度次數:.*2/, { exact: false })).toBeInTheDocument();
  });
});
