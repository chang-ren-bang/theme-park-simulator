import { useCallback, useState } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { updateVisitor, selectVisitor } from './store/visitorSlice';
import VisitorInfoPanel from './components/ui/VisitorInfoPanel';
import { VisitorConfigPanel } from './components/ui/VisitorConfigPanel';
import FacilityBuilderPanel from './components/ui/FacilityBuilderPanel';
import { LoadingSpinner } from './components/shared/LoadingSpinner';
import { ErrorMessage } from './components/shared/ErrorMessage';
import { TransitionWrapper } from './components/shared/TransitionWrapper';
import { Vector2D } from './utils/PathFinder';
import { VisitorState } from './components/game/Visitor';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 模擬選擇遊客的函數
  const simulateVisitorSelection = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 模擬異步操作
      await new Promise(resolve => setTimeout(resolve, 1000));

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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '選擇遊客時發生錯誤';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  return (
    <div className="app">
      {isLoading && <LoadingSpinner fullScreen text="載入中..." />}
      
      <TransitionWrapper in={!!error} type="fade">
        {error && (
          <ErrorMessage
            message={error}
            onClose={() => setError(null)}
          />
        )}
      </TransitionWrapper>

      <div className="app-content">
        <button 
          onClick={simulateVisitorSelection}
          disabled={isLoading}
          className="ripple"
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            padding: '10px 20px',
            fontSize: '16px'
          }}
        >
          {isLoading ? '處理中...' : '模擬選擇遊客'}
        </button>

        <TransitionWrapper in={true} type="fade">
          <div className="panels-container">
            <div className="left-panels">
              <VisitorInfoPanel />
              <VisitorConfigPanel />
            </div>
            <div className="right-panels">
              <FacilityBuilderPanel />
            </div>
          </div>
        </TransitionWrapper>
      </div>
    </div>
  );
}

export default App;
