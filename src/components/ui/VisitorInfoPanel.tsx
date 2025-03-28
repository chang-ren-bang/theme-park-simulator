import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { VisitorState } from '../game/Visitor';

// 遊客狀態對應的顏色
const statusColors: Record<VisitorState, string> = {
  'IDLE': '#808080',     // 灰色
  'MOVING': '#4CAF50',   // 綠色
  'QUEUING': '#FFC107',  // 黃色
  'PLAYING': '#2196F3',  // 藍色
  'LEAVING': '#F44336',  // 紅色
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
      <div style={headerStyle}>
        <div style={statusIndicatorStyle} />
        <h3 style={{ margin: 0 }}>遊客 {visitor.id}</h3>
      </div>

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
    </div>
  );
};

export default VisitorInfoPanel;
