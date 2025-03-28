import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { VisitorState } from '../game/Visitor';

// 遊客情緒對應的表情符號
const moodEmojis = {
  veryHappy: '😄',
  happy: '🙂',
  neutral: '😐',
  unhappy: '🙁',
  veryUnhappy: '😫',
};

// 遊客狀態對應的顏色
const statusColors: Record<VisitorState, string> = {
  'IDLE': '#808080',     // 灰色
  'MOVING': '#4CAF50',   // 綠色
  'QUEUING': '#FFC107',  // 黃色
  'PLAYING': '#2196F3',  // 藍色
  'LEAVING': '#F44336',  // 紅色
};

interface MoodIndicatorProps {
  satisfaction: number;
  state: VisitorState;
}

const MoodIndicator: React.FC<MoodIndicatorProps> = ({ satisfaction, state }) => {
  // 根據滿意度和狀態計算情緒
  const getMoodEmoji = (satisfaction: number, state: VisitorState): string => {
    // 如果正在離開，一律顯示不開心
    if (state === 'LEAVING') return moodEmojis.veryUnhappy;
    
    // 根據滿意度決定表情
    if (satisfaction >= 90) return moodEmojis.veryHappy;
    if (satisfaction >= 70) return moodEmojis.happy;
    if (satisfaction >= 50) return moodEmojis.neutral;
    if (satisfaction >= 30) return moodEmojis.unhappy;
    return moodEmojis.veryUnhappy;
  };

  const emoji = getMoodEmoji(satisfaction, state);

  return (
    <div className="mood-container" style={{ 
      fontSize: '24px',
      animation: 'moodBounce 0.3s ease',
      marginBottom: '10px',
      textAlign: 'center'
    }}>
      <div className="mood-emoji">{emoji}</div>
    </div>
  );
};

const VisitorInfoPanel: React.FC = () => {
  const selectedVisitorId = useAppSelector(state => state.visitors.selectedVisitorId);
  const visitor = useAppSelector(state => 
    selectedVisitorId ? state.visitors.visitors[selectedVisitorId] : null
  );

  if (!visitor) {
    return null;
  }

  // 計算滿意度指示器的顏色
  const getSatisfactionColor = (satisfaction: number): string => {
    if (satisfaction >= 80) return '#4CAF50'; // 綠色
    if (satisfaction >= 50) return '#FFC107'; // 黃色
    return '#F44336'; // 紅色
  };

  const panelStyle: React.CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    minWidth: '200px',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const statusIndicatorStyle: React.CSSProperties = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: statusColors[visitor.state],
    marginRight: '8px',
  };

  const satisfactionBarStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '5px',
  };

  const satisfactionFillStyle: React.CSSProperties = {
    width: `${visitor.satisfaction}%`,
    height: '100%',
    backgroundColor: getSatisfactionColor(visitor.satisfaction),
    transition: 'width 0.3s ease-out',
  };

  return (
    <div style={panelStyle}>
      <style>
        {`
          @keyframes moodBounce {
            0% { transform: scale(0.8); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
      
      <div style={headerStyle}>
        <div style={statusIndicatorStyle} />
        <h3 style={{ margin: 0 }}>遊客 {visitor.id}</h3>
      </div>

      <MoodIndicator satisfaction={visitor.satisfaction} state={visitor.state} />

      <div style={{ marginBottom: '10px' }}>
        <div>狀態: {visitor.state}</div>
        <div>位置: ({visitor.position.x}, {visitor.position.y})</div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>滿意度</span>
          <span>{visitor.satisfaction}%</span>
        </div>
        <div style={satisfactionBarStyle}>
          <div style={satisfactionFillStyle} />
        </div>
      </div>

      {visitor.lowSatisfactionCount > 0 && (
        <div style={{ 
          marginTop: '10px', 
          color: '#F44336',
          fontSize: '0.9em' 
        }}>
          ⚠️ 連續低滿意度次數: {visitor.lowSatisfactionCount}
        </div>
      )}

      {visitor.prediction && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          borderRadius: '4px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            預測資訊
          </div>
          
          <div style={{ fontSize: '0.9em' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>下一個狀態:</span>
              <span style={{ color: statusColors[visitor.prediction.nextState] }}>
                {visitor.prediction.nextState}
              </span>
            </div>

            {visitor.prediction.nextPosition && (
              <div style={{ marginBottom: '4px' }}>
                目標位置: ({visitor.prediction.nextPosition.x}, {visitor.prediction.nextPosition.y})
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <span>滿意度趨勢:</span>
              <span style={{
                marginLeft: '8px',
                color: visitor.prediction.satisfactionTrend > 0 ? '#4CAF50' : '#F44336'
              }}>
                {visitor.prediction.satisfactionTrend > 0 ? '↑' : '↓'}
                {Math.abs(visitor.prediction.satisfactionTrend)}%
              </span>
            </div>

            <div>
              預計時間: {visitor.prediction.timeToNextState.toFixed(1)}秒
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorInfoPanel;
