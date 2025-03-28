import { useCallback } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { updateVisitor, selectVisitor } from './store/visitorSlice';
import VisitorInfoPanel from './components/ui/VisitorInfoPanel';
import './App.css';
import { Vector2D } from './utils/PathFinder';
import { VisitorState } from './components/game/Visitor';

function App() {
  const dispatch = useAppDispatch();

  // 模擬選擇遊客的函數
  const simulateVisitorSelection = useCallback(() => {
    // 創建一個模擬的遊客資料
    const mockVisitor = {
      id: 'VISITOR_001',
      position: { x: 10, y: 20 } as Vector2D,
      state: VisitorState.MOVING,
      satisfaction: 75,
      lowSatisfactionCount: 1
    };

    // 更新遊客資料並選擇該遊客
    dispatch(updateVisitor(mockVisitor));
    dispatch(selectVisitor(mockVisitor.id));
  }, [dispatch]);

  return (
    <div className="app">
      <button 
        onClick={simulateVisitorSelection}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        模擬選擇遊客
      </button>
      <VisitorInfoPanel />
    </div>
  );
}

export default App;
