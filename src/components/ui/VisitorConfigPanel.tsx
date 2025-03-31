import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectSatisfactionParams,
  selectBehaviorParams,
  selectVisitorParams,
  updateSatisfactionParams,
  updateBehaviorParams,
  updateVisitorParams,
  resetConfig
} from '../../store/visitorConfigSlice';

interface ConfigItemProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const ConfigItem: React.FC<ConfigItemProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1
}) => {
  const id = label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div className="config-item">
      <label htmlFor={id}>{label}</label>
      <div className="config-controls">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
        />
        <input
          id={`${id}-number`}
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`${label} (數值輸入)`}
        />
      </div>
    </div>
  );
};

export const VisitorConfigPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const satisfactionParams = useAppSelector(selectSatisfactionParams);
  const behaviorParams = useAppSelector(selectBehaviorParams);
  const visitorParams = useAppSelector(selectVisitorParams);

  return (
    <div className="visitor-config-panel">
      <div className="config-section">
        <h3>滿意度參數</h3>
        <ConfigItem
          label="初始滿意度"
          value={satisfactionParams.initialValue}
          onChange={(value) =>
            dispatch(updateSatisfactionParams({ initialValue: value }))
          }
          min={0}
          max={100}
        />
        <ConfigItem
          label="滿意度衰減率"
          value={satisfactionParams.decayRate}
          onChange={(value) =>
            dispatch(updateSatisfactionParams({ decayRate: value }))
          }
          min={0}
          max={1}
          step={0.01}
        />
        <ConfigItem
          label="遊玩提升值"
          value={satisfactionParams.playBoost}
          onChange={(value) =>
            dispatch(updateSatisfactionParams({ playBoost: value }))
          }
          min={0}
          max={50}
        />
        <ConfigItem
          label="臨界滿意度"
          value={satisfactionParams.criticalLevel}
          onChange={(value) =>
            dispatch(updateSatisfactionParams({ criticalLevel: value }))
          }
          min={0}
          max={100}
        />
        <ConfigItem
          label="最大失敗次數"
          value={satisfactionParams.maxFailCount}
          onChange={(value) =>
            dispatch(updateSatisfactionParams({ maxFailCount: value }))
          }
          min={1}
          max={10}
        />
      </div>

      <div className="config-section">
        <h3>行為參數</h3>
        <ConfigItem
          label="更新間隔 (ms)"
          value={behaviorParams.updateInterval}
          onChange={(value) =>
            dispatch(updateBehaviorParams({ updateInterval: value }))
          }
          min={100}
          max={5000}
          step={100}
        />
        <ConfigItem
          label="尋路範圍"
          value={behaviorParams.pathfindingRange}
          onChange={(value) =>
            dispatch(updateBehaviorParams({ pathfindingRange: value }))
          }
          min={50}
          max={500}
          step={10}
        />
        <ConfigItem
          label="最大排隊時間 (s)"
          value={behaviorParams.queueingTimeLimit}
          onChange={(value) =>
            dispatch(updateBehaviorParams({ queueingTimeLimit: value }))
          }
          min={60}
          max={900}
          step={30}
        />
      </div>

      <div className="config-section">
        <h3>遊客參數</h3>
        <ConfigItem
          label="遊客總數"
          value={visitorParams.totalVisitors}
          onChange={(value) =>
            dispatch(updateVisitorParams({ totalVisitors: value }))
          }
          min={1}
          max={200}
        />
        <ConfigItem
          label="生成間隔 (ms)"
          value={visitorParams.spawnInterval}
          onChange={(value) =>
            dispatch(updateVisitorParams({ spawnInterval: value }))
          }
          min={500}
          max={5000}
          step={100}
        />
        <ConfigItem
          label="移動速度"
          value={visitorParams.moveSpeed}
          onChange={(value) =>
            dispatch(updateVisitorParams({ moveSpeed: value }))
          }
          min={1}
          max={5}
          step={0.1}
        />
      </div>

      <div className="config-actions">
        <button onClick={() => dispatch(resetConfig())}>重置設定</button>
      </div>

      <style>{`
        .visitor-config-panel {
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 8px;
          width: 100%;
          max-width: 500px;
        }

        .config-section {
          margin-bottom: 1.5rem;
        }

        .config-section h3 {
          margin-bottom: 1rem;
          color: #333;
        }

        .config-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.8rem;
        }

        .config-item label {
          flex: 1;
          margin-right: 1rem;
        }

        .config-controls {
          flex: 2;
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .config-controls input[type="range"] {
          flex: 1;
        }

        .config-controls input[type="number"] {
          width: 80px;
        }

        .config-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
        }

        button {
          padding: 0.5rem 1rem;
          background: #4a90e2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background: #357abd;
        }
      `}</style>
    </div>
  );
};
