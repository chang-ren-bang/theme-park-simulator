**User:**

<task>
畫面仍然會出現 瀏覽器沒有回應 的錯誤訊息，可能是初始化的時候哪一段卡住了。請分階段加上 alert 訊息，讓開發者知道是在哪一個階段之後卡住。
</task>
<environment_details>
# VSCode Visible Files
../../../../144
memory-bank/05_activeContext.md
memory-bank/05_activeContext.md
src/components/game/GameCanvas.tsx

# VSCode Open Tabs
src/components/game/Visitor.ts
src/components/game/GameCanvas.tsx
src/store/facilitySlice.ts
src/App.tsx
src/store/visitorSlice.ts
src/store/visitorConfigSlice.ts

# Current Time
3/31/2025, 2:30:43 PM (Asia/Taipei, UTC+8:00)

# Current Working Directory (/home/ben/github.com/theme-park-simulator) Files
🔒 .clineignore
.clinerules
.gitignore
eslint.config.js
index.html
jest.config.ts
jest.setup.ts
package-lock.json
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
tsconfig.test.json
vite.config.ts
cypress/
cypress/fixtures/
cypress/support/
memory-bank/
memory-bank/01_projectbrief.md
memory-bank/02_productContext.md
memory-bank/03_systemPatterns.md
memory-bank/04_techContext.md
memory-bank/05_activeContext.md
memory-bank/06_progress.md
public/
public/vite.svg
src/
src/App.css
src/App.tsx
src/index.css
src/main.tsx
src/vite-env.d.ts
src/assets/
src/assets/react.svg
src/components/
src/components/game/
src/components/game/Facility.ts
src/components/game/FacilityBuilder.ts
src/components/game/GameCanvas.tsx
src/components/game/Visitor.ts
src/components/game/__tests__/
src/components/game/__tests__/Facility.test.ts
src/components/game/__tests__/FacilityBuilder.test.ts
src/components/game/__tests__/Visitor.test.ts
src/components/game/__tests__/Visitor.test.ts.bak
src/components/game/types/
src/components/game/types/FacilityTypes.ts
src/components/game/types/MapConfig.ts
src/components/shared/
src/components/shared/ErrorMessage.css
src/components/shared/ErrorMessage.tsx
src/components/shared/LoadingSpinner.css
src/components/shared/LoadingSpinner.tsx
src/components/shared/Transition.css
src/components/shared/TransitionWrapper.tsx
src/components/ui/
src/components/ui/FacilityBuilderPanel.css
src/components/ui/FacilityBuilderPanel.tsx
src/components/ui/VisitorConfigPanel.tsx
src/components/ui/VisitorInfoPanel.tsx
src/components/ui/__tests__/
src/components/ui/__tests__/FacilityBuilderPanel.test.tsx
src/components/ui/__tests__/VisitorConfigPanel.test.tsx
src/components/ui/__tests__/VisitorInfoPanel.test.tsx
src/engine/
src/hooks/
src/hooks/useAppDispatch.ts
src/hooks/useAppSelector.ts
src/store/
src/store/facilitySlice.ts
src/store/index.ts
src/store/visitorConfigSlice.ts
src/store/visitorSlice.ts
src/types/
src/utils/
src/utils/PathFinder.ts
src/utils/SatisfactionManager.ts
src/utils/__tests__/
src/utils/__tests__/PathFinder.test.ts
src/utils/__tests__/SatisfactionManager.test.ts
tests/
tests/dialog-demo/
tests/dialog-demo/.gitignore
tests/dialog-demo/cypress.config.mjs
tests/dialog-demo/eslint.config.js
tests/dialog-demo/index.html
tests/dialog-demo/package-lock.json
tests/dialog-demo/package.json
tests/dialog-demo/README.md
tests/dialog-demo/tsconfig.app.json
tests/dialog-demo/tsconfig.json
tests/dialog-demo/tsconfig.node.json
tests/dialog-demo/vite.config.ts
tests/dialog-demo/cypress/
tests/dialog-demo/cypress/e2e/
tests/dialog-demo/cypress/e2e/dialog.cy.ts
tests/dialog-demo/cypress/snapshots/
tests/dialog-demo/cypress/snapshots/dialog.cy.ts/
tests/dialog-demo/cypress/snapshots/dialog.cy.ts/dialog-shown.png
tests/dialog-demo/cypress/snapshots/dialog.cy.ts/initial-state.png
tests/dialog-demo/cypress/snapshots/dialog.cy.ts/message-1.png
tests/dialog-demo/cypress/snapshots/dialog.cy.ts/message-2.png
tests/dialog-demo/cypress/snapshots/dialog.cy.ts/message-3.png
tests/dialog-demo/cypress/snapshots/dialog.cy.ts/typing-state.png
tests/dialog-demo/cypress/support/
tests/dialog-demo/cypress/support/e2e.ts
tests/dialog-demo/public/
tests/dialog-demo/public/vite.svg
tests/dialog-demo/src/
tests/dialog-demo/src/App.css
tests/dialog-demo/src/App.tsx
tests/dialog-demo/src/index.css
tests/dialog-demo/src/main.tsx
tests/dialog-demo/src/vite-env.d.ts
tests/dialog-demo/src/assets/
tests/dialog-demo/src/assets/react.svg
tests/dialog-demo/src/components/
tests/dialog-demo/src/components/game/
tests/dialog-demo/src/components/game/GameCanvas.tsx
tests/dialog-demo/src/components/ui/
tests/dialog-demo/src/components/ui/DialogInput.tsx
tests/dialog-demo/src/hooks/
tests/dialog-demo/src/hooks/useAppDispatch.ts
tests/dialog-demo/src/hooks/useAppSelector.ts
tests/dialog-demo/src/store/
tests/dialog-demo/src/store/dialogSlice.ts
tests/dialog-demo/src/store/index.ts
tests/dialog-demo/src/utils/

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
我需要檢查 GameCanvas.tsx 的內容，因為它是主要的遊戲畫布組件，可能在初始化過程中有效能問題。

讓我用 read_file 來查看其內容，然後在關鍵的初始化階段加入 alert 訊息。
</thinking>

<read_file>
<path>src/components/game/GameCanvas.tsx</path>
</read_file>

<thinking>
查看了 GameCanvas.

[Response interrupted by a tool use result. Only one tool may be used at a time and should be placed at the end of the message.]

---

**User:**

[read_file for 'src/components/game/GameCanvas.tsx'] Result:
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Facility } from './Facility';
import type { IVisitor as VisitorInfo } from './Visitor';
import { Visitor, VisitorState } from './Visitor';
import { FacilityStatus } from './types/FacilityTypes';
import { selectVisitorParams } from '../../store/visitorConfigSlice';
import { updateVisitor } from '../../store/visitorSlice';
import { PathFinder } from '../../utils/PathFinder';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const visitorInstancesRef = useRef<Map<string, Visitor>>(new Map());
  const pathFinderRef = useRef<PathFinder>(new PathFinder(40, []));
  const lastObstaclesHashRef = useRef<string>("");
  
  const facilitiesMap = useAppSelector(state => state.facilities.facilities);
  const visitorsMap = useAppSelector(state => state.visitors.visitors);
  const visitorParams = useAppSelector(selectVisitorParams);
  
  // 使用 useMemo 記憶化設施陣列
  const facilities = useMemo(() => Object.values(facilitiesMap), [facilitiesMap]);

  // 建立遊客生成函數
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }

    // 在地圖邊緣隨機生成遊客
    const spawnPoints = [
      { x: 0, y: Math.floor(Math.random() * 15) },
      { x: 19, y: Math.floor(Math.random() * 15) },
      { x: Math.floor(Math.random() * 20), y: 0 },
      { x: Math.floor(Math.random() * 20), y: 14 }
    ];
    
    const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    const newVisitor = new Visitor(
      `visitor_${Date.now()}`,
      spawnPoint,
      pathFinderRef.current,
      visitorParams.moveSpeed
    );

    // 先將遊客實例加入記憶體管理
    visitorInstancesRef.current.set(newVisitor.id, newVisitor);

    // 更新 Redux store
    dispatch(updateVisitor({
      id: newVisitor.id,
      position: newVisitor.position,
      state: newVisitor.state,
      satisfaction: newVisitor.satisfaction,
      prediction: newVisitor.prediction,
      lowSatisfactionCount: newVisitor.lowSatisfactionCount
    }));

    // 更新遊客計數
    setVisitorCount(prev => prev + 1);
  }, [dispatch, visitorCount, visitorParams.totalVisitors, visitorParams.moveSpeed, facilities]);

  // 設置遊客生成定時器
  useEffect(() => {
    const spawnTimer = setInterval(spawnVisitor, visitorParams.spawnInterval);
    return () => clearInterval(spawnTimer);
  }, [spawnVisitor, visitorParams.spawnInterval]);

  // 將 visitors 移到 useEffect 外部並使用 useMemo 優化
  const visitors = useMemo(() => Object.values(visitorsMap), [visitorsMap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setContext(ctx);

    // 設置 Canvas 的實際大小
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    // 設置 CSS 大小
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // 調整比例
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, [width, height]);

  useEffect(() => {
    if (!context) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;

      // 清除畫布
      context.clearRect(0, 0, width, height);

      // 繪製網格
      drawGrid(context, width, height);
      
      // 繪製設施
      facilities.forEach(facility => {
        drawFacility(context, facility);
      });

      // 更新並繪製每個遊客
      visitors.forEach((visitor: VisitorInfo) => {
        // 獲取或創建 Visitor 實例
        let visitorInstance = visitorInstancesRef.current.get(visitor.id);
        if (!visitorInstance) {
          visitorInstance = new Visitor(
            visitor.id,
            visitor.position,
            pathFinderRef.current,
            visitorParams.moveSpeed
          );
          visitorInstancesRef.current.set(visitor.id, visitorInstance);
        }

        // 更新移動速度
        visitorInstance.setMoveSpeed(visitorParams.moveSpeed);
        
        // 檢查是否需要設定新目標
        if (visitorInstance.state === VisitorState.IDLE) {
          if (facilities.length > 0) {
            // 隨機選擇一個設施作為目標
            const targetFacility = facilities[Math.floor(Math.random() * facilities.length)];
            visitorInstance.moveTo(targetFacility.getPosition());
          }
        }

        const needsUpdate = visitorInstance.update(deltaTime);
        
        // 限制更新頻率，配合 10 FPS 的更新頻率
        if (needsUpdate && currentTime % 1000 < 100) {
          dispatch(updateVisitor({
            id: visitorInstance.id,
            position: visitorInstance.position,
            state: visitorInstance.state,
            satisfaction: visitorInstance.satisfaction,
            prediction: visitorInstance.prediction,
            lowSatisfactionCount: visitorInstance.lowSatisfactionCount
          }));
        }

        // 立即繪製遊客
        drawVisitor(context, {
          ...visitor,
          position: visitorInstance.position,
          state: visitorInstance.state,
          satisfaction: visitorInstance.satisfaction,
          prediction: visitorInstance.prediction,
          lowSatisfactionCount: visitorInstance.lowSatisfactionCount
        });
      });

      // 定期清理遊客實例，而不是每幀都清理
  if (currentTime % 1000 < 100) { // 配合 10 FPS 的更新頻率
    const currentIds = new Set(visitors.map((v: VisitorInfo) => v.id));
    let deletedCount = 0;
    for (const [id] of visitorInstancesRef.current) {
      if (!currentIds.has(id)) {
        visitorInstancesRef.current.delete(id);
        deletedCount++;
      }
    }
    if (deletedCount > 0) {
      // 更新遊客計數
      setVisitorCount(prev => Math.max(0, prev - deletedCount));
    }
  }

      // 請求下一幀
      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, facilities, visitors, width, height, visitorParams]);

  const drawGrid = (
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number
  ) => {
    const gridSize = 40;
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    // 繪製垂直線
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // 繪製水平線
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const drawFacility = (
    ctx: CanvasRenderingContext2D, 
    facility: Facility,
  ) => {
    const size = 38; // 略小於網格大小
    const position = facility.getPosition();
    const x = position.x * 40 + 1;
    const y = position.y * 40 + 1;

    // 根據設施狀態設置顏色
    let fillColor = '#4CAF50';  // 預設：營運中
    let strokeColor = '#388E3C';
    
    switch(facility.getStatus()) {
      case FacilityStatus.MAINTENANCE:
        fillColor = '#FFC107';  // 維護中
        strokeColor = '#FFA000';
        break;
      case FacilityStatus.CLOSED:
        fillColor = '#F44336';  // 關閉中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製設施外框
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.stroke();

    // 繪製設施名稱
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(facility.getName(), x + size/2, y + size/2 - 8);

    // 繪製等候人數
    const queueLength = facility.getQueueLength();
    if (queueLength > 0) {
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`等候: ${queueLength}人`, x + size/2, y + size/2 + 8);
    }
  };

  const drawVisitor = (
    ctx: CanvasRenderingContext2D, 
    visitor: VisitorInfo
  ) => {
    const radius = 10;
    // 不再將位置四捨五入，使動畫更平滑
    const x = visitor.position.x * 40 + 20;
    const y = visitor.position.y * 40 + 20;

    // 如果遊客正在移動，添加動畫效果
    if (visitor.state === VisitorState.MOVING && visitor.prediction?.nextPosition) {
      ctx.save();
      
      // 繪製移動軌跡
      ctx.strokeStyle = '#2196F3';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        visitor.prediction.nextPosition.x * 40 + 20,
        visitor.prediction.nextPosition.y * 40 + 20
      );
      ctx.stroke();

      // 添加移動方向指示器
      const dx = visitor.prediction.nextPosition.x * 40 + 20 - x;
      const dy = visitor.prediction.nextPosition.y * 40 + 20 - y;
      const angle = Math.atan2(dy, dx);
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(radius + 5, 0);
      ctx.lineTo(radius + 12, -4);
      ctx.lineTo(radius + 12, 4);
      ctx.closePath();
      ctx.fillStyle = '#2196F3';
      ctx.fill();
      
      ctx.restore();
    }

    // 根據遊客狀態設置顏色
    let fillColor = '#2196F3';   // 預設：遊覽中
    let strokeColor = '#1976D2';
    
    switch(visitor.state) {
      case VisitorState.QUEUING:
        fillColor = '#FF9800';   // 排隊中
        strokeColor = '#F57C00';
        break;
      case VisitorState.PLAYING:
        fillColor = '#4CAF50';   // 遊玩中
        strokeColor = '#388E3C';
        break;
      case VisitorState.LEAVING:
        fillColor = '#F44336';   // 離開中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製遊客圖示
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 繪製遊客狀態
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(visitor.state, x, y - 15);

    // 繪製滿意度指標
    const satisfactionIcon = visitor.satisfaction >= 80 ? '😊' : 
                           visitor.satisfaction >= 50 ? '😐' : '😞';
    ctx.font = '12px Arial';
    ctx.fillText(satisfactionIcon, x, y + 15);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff'
      }}
    />
  );
};

export default GameCanvas;

<environment_details>
# VSCode Visible Files
../../../../144
memory-bank/05_activeContext.md
memory-bank/05_activeContext.md
src/components/game/GameCanvas.tsx

# VSCode Open Tabs
src/components/game/Visitor.ts
src/components/game/GameCanvas.tsx
src/store/facilitySlice.ts
src/App.tsx
src/store/visitorSlice.ts
src/store/visitorConfigSlice.ts

# Current Time
3/31/2025, 2:30:55 PM (Asia/Taipei, UTC+8:00)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
我看到了 GameCanvas 的關鍵初始化階段，我會在以下幾個重要階段加入 alert 訊息：
1. Canvas 初始化
2. PathFinder 初始化
3. 遊戲迴圈開始
4. 遊客生成
5. 遊戲迴圈更新

我將使用 replace_in_file 來修改這些部分。
</thinking>

<replace_in_file>
<path>src/components/game/GameCanvas.tsx</path>
<diff>
<<<<<<< SEARCH
    setContext(ctx);

    // 設置 Canvas 的實際大小
=======
    alert("Stage 1: Canvas 初始化開始");
    setContext(ctx);

    // 設置 Canvas 的實際大小
>>>>>>> REPLACE

<<<<<<< SEARCH
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }
=======
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      alert("Stage 2: PathFinder 更新開始");

[Response interrupted by a tool use result. Only one tool may be used at a time and should be placed at the end of the message.]

---

**User:**

[replace_in_file for 'src/components/game/GameCanvas.tsx'] Result:
The tool execution failed with the following error:
<error>
The SEARCH block:
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }
...does not match anything in the file.

This is likely because the SEARCH block content doesn't match exactly with what's in the file, or if you used multiple SEARCH/REPLACE blocks they may not have been in the order they appear in the file.

The file was reverted to its original state:

<file_content path="src/components/game/GameCanvas.tsx">
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Facility } from './Facility';
import type { IVisitor as VisitorInfo } from './Visitor';
import { Visitor, VisitorState } from './Visitor';
import { FacilityStatus } from './types/FacilityTypes';
import { selectVisitorParams } from '../../store/visitorConfigSlice';
import { updateVisitor } from '../../store/visitorSlice';
import { PathFinder } from '../../utils/PathFinder';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const visitorInstancesRef = useRef<Map<string, Visitor>>(new Map());
  const pathFinderRef = useRef<PathFinder>(new PathFinder(40, []));
  const lastObstaclesHashRef = useRef<string>("");
  
  const facilitiesMap = useAppSelector(state => state.facilities.facilities);
  const visitorsMap = useAppSelector(state => state.visitors.visitors);
  const visitorParams = useAppSelector(selectVisitorParams);
  
  // 使用 useMemo 記憶化設施陣列
  const facilities = useMemo(() => Object.values(facilitiesMap), [facilitiesMap]);

  // 建立遊客生成函數
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }

    // 在地圖邊緣隨機生成遊客
    const spawnPoints = [
      { x: 0, y: Math.floor(Math.random() * 15) },
      { x: 19, y: Math.floor(Math.random() * 15) },
      { x: Math.floor(Math.random() * 20), y: 0 },
      { x: Math.floor(Math.random() * 20), y: 14 }
    ];
    
    const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    const newVisitor = new Visitor(
      `visitor_${Date.now()}`,
      spawnPoint,
      pathFinderRef.current,
      visitorParams.moveSpeed
    );

    // 先將遊客實例加入記憶體管理
    visitorInstancesRef.current.set(newVisitor.id, newVisitor);

    // 更新 Redux store
    dispatch(updateVisitor({
      id: newVisitor.id,
      position: newVisitor.position,
      state: newVisitor.state,
      satisfaction: newVisitor.satisfaction,
      prediction: newVisitor.prediction,
      lowSatisfactionCount: newVisitor.lowSatisfactionCount
    }));

    // 更新遊客計數
    setVisitorCount(prev => prev + 1);
  }, [dispatch, visitorCount, visitorParams.totalVisitors, visitorParams.moveSpeed, facilities]);

  // 設置遊客生成定時器
  useEffect(() => {
    const spawnTimer = setInterval(spawnVisitor, visitorParams.spawnInterval);
    return () => clearInterval(spawnTimer);
  }, [spawnVisitor, visitorParams.spawnInterval]);

  // 將 visitors 移到 useEffect 外部並使用 useMemo 優化
  const visitors = useMemo(() => Object.values(visitorsMap), [visitorsMap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setContext(ctx);

    // 設置 Canvas 的實際大小
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    // 設置 CSS 大小
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // 調整比例
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, [width, height]);

  useEffect(() => {
    if (!context) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;

      // 清除畫布
      context.clearRect(0, 0, width, height);

      // 繪製網格
      drawGrid(context, width, height);
      
      // 繪製設施
      facilities.forEach(facility => {
        drawFacility(context, facility);
      });

      // 更新並繪製每個遊客
      visitors.forEach((visitor: VisitorInfo) => {
        // 獲取或創建 Visitor 實例
        let visitorInstance = visitorInstancesRef.current.get(visitor.id);
        if (!visitorInstance) {
          visitorInstance = new Visitor(
            visitor.id,
            visitor.position,
            pathFinderRef.current,
            visitorParams.moveSpeed
          );
          visitorInstancesRef.current.set(visitor.id, visitorInstance);
        }

        // 更新移動速度
        visitorInstance.setMoveSpeed(visitorParams.moveSpeed);
        
        // 檢查是否需要設定新目標
        if (visitorInstance.state === VisitorState.IDLE) {
          if (facilities.length > 0) {
            // 隨機選擇一個設施作為目標
            const targetFacility = facilities[Math.floor(Math.random() * facilities.length)];
            visitorInstance.moveTo(targetFacility.getPosition());
          }
        }

        const needsUpdate = visitorInstance.update(deltaTime);
        
        // 限制更新頻率，配合 10 FPS 的更新頻率
        if (needsUpdate && currentTime % 1000 < 100) {
          dispatch(updateVisitor({
            id: visitorInstance.id,
            position: visitorInstance.position,
            state: visitorInstance.state,
            satisfaction: visitorInstance.satisfaction,
            prediction: visitorInstance.prediction,
            lowSatisfactionCount: visitorInstance.lowSatisfactionCount
          }));
        }

        // 立即繪製遊客
        drawVisitor(context, {
          ...visitor,
          position: visitorInstance.position,
          state: visitorInstance.state,
          satisfaction: visitorInstance.satisfaction,
          prediction: visitorInstance.prediction,
          lowSatisfactionCount: visitorInstance.lowSatisfactionCount
        });
      });

      // 定期清理遊客實例，而不是每幀都清理
  if (currentTime % 1000 < 100) { // 配合 10 FPS 的更新頻率
    const currentIds = new Set(visitors.map((v: VisitorInfo) => v.id));
    let deletedCount = 0;
    for (const [id] of visitorInstancesRef.current) {
      if (!currentIds.has(id)) {
        visitorInstancesRef.current.delete(id);
        deletedCount++;
      }
    }
    if (deletedCount > 0) {
      // 更新遊客計數
      setVisitorCount(prev => Math.max(0, prev - deletedCount));
    }
  }

      // 請求下一幀
      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, facilities, visitors, width, height, visitorParams]);

  const drawGrid = (
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number
  ) => {
    const gridSize = 40;
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    // 繪製垂直線
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // 繪製水平線
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const drawFacility = (
    ctx: CanvasRenderingContext2D, 
    facility: Facility,
  ) => {
    const size = 38; // 略小於網格大小
    const position = facility.getPosition();
    const x = position.x * 40 + 1;
    const y = position.y * 40 + 1;

    // 根據設施狀態設置顏色
    let fillColor = '#4CAF50';  // 預設：營運中
    let strokeColor = '#388E3C';
    
    switch(facility.getStatus()) {
      case FacilityStatus.MAINTENANCE:
        fillColor = '#FFC107';  // 維護中
        strokeColor = '#FFA000';
        break;
      case FacilityStatus.CLOSED:
        fillColor = '#F44336';  // 關閉中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製設施外框
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.stroke();

    // 繪製設施名稱
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(facility.getName(), x + size/2, y + size/2 - 8);

    // 繪製等候人數
    const queueLength = facility.getQueueLength();
    if (queueLength > 0) {
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`等候: ${queueLength}人`, x + size/2, y + size/2 + 8);
    }
  };

  const drawVisitor = (
    ctx: CanvasRenderingContext2D, 
    visitor: VisitorInfo
  ) => {
    const radius = 10;
    // 不再將位置四捨五入，使動畫更平滑
    const x = visitor.position.x * 40 + 20;
    const y = visitor.position.y * 40 + 20;

    // 如果遊客正在移動，添加動畫效果
    if (visitor.state === VisitorState.MOVING && visitor.prediction?.nextPosition) {
      ctx.save();
      
      // 繪製移動軌跡
      ctx.strokeStyle = '#2196F3';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        visitor.prediction.nextPosition.x * 40 + 20,
        visitor.prediction.nextPosition.y * 40 + 20
      );
      ctx.stroke();

      // 添加移動方向指示器
      const dx = visitor.prediction.nextPosition.x * 40 + 20 - x;
      const dy = visitor.prediction.nextPosition.y * 40 + 20 - y;
      const angle = Math.atan2(dy, dx);
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(radius + 5, 0);
      ctx.lineTo(radius + 12, -4);
      ctx.lineTo(radius + 12, 4);
      ctx.closePath();
      ctx.fillStyle = '#2196F3';
      ctx.fill();
      
      ctx.restore();
    }

    // 根據遊客狀態設置顏色
    let fillColor = '#2196F3';   // 預設：遊覽中
    let strokeColor = '#1976D2';
    
    switch(visitor.state) {
      case VisitorState.QUEUING:
        fillColor = '#FF9800';   // 排隊中
        strokeColor = '#F57C00';
        break;
      case VisitorState.PLAYING:
        fillColor = '#4CAF50';   // 遊玩中
        strokeColor = '#388E3C';
        break;
      case VisitorState.LEAVING:
        fillColor = '#F44336';   // 離開中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製遊客圖示
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 繪製遊客狀態
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(visitor.state, x, y - 15);

    // 繪製滿意度指標
    const satisfactionIcon = visitor.satisfaction >= 80 ? '😊' : 
                           visitor.satisfaction >= 50 ? '😐' : '😞';
    ctx.font = '12px Arial';
    ctx.fillText(satisfactionIcon, x, y + 15);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff'
      }}
    />
  );
};

export default GameCanvas;

</file_content>

Try again with fewer/more precise SEARCH blocks.
(If you run into this error two times in a row, you may use the write_to_file tool as a fallback.)
</error>
<environment_details>
# VSCode Visible Files
../../../../144
memory-bank/05_activeContext.md
memory-bank/05_activeContext.md
src/components/game/GameCanvas.tsx

# VSCode Open Tabs
src/components/game/Visitor.ts
src/components/game/GameCanvas.tsx
src/store/facilitySlice.ts
src/App.tsx
src/store/visitorSlice.ts
src/store/visitorConfigSlice.ts

# Current Time
3/31/2025, 2:31:11 PM (Asia/Taipei, UTC+8:00)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
讓我更精確地定義 SEARCH 區塊。我會分多次使用 replace_in_file 來添加各個階段的 alert。
</thinking>

<replace_in_file>
<path>src/components/game/GameCanvas.tsx</path>
<diff>
<<<<<<< SEARCH
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setContext(ctx);
=======
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    alert("Stage 1: Canvas 初始化開始");
    setContext(ctx);
>>>>>>> REPLACE
</diff>
</replace_in_file>

<thinking>
讓我添加第二個階段的 alert。
</thinking>

<replace_in_file>
<path>src/components/game/GameCanvas.tsx</path>
<diff>
<<<<<<< SEARCH
    if (!context) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
=======
    if (!context) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    alert("Stage 2: 遊戲迴圈初始化");
    const render = (currentTime: number) => {
>>>>>>> REPLACE
</diff>
</replace_in_file>

<thinking>
讓我添加遊客生成和 PathFinder 初始化的 alert。
</thinking>

<replace_in_file>
<path>src/components/game/GameCanvas.tsx</path>
<diff>
<<<<<<< SEARCH
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
=======
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    alert("Stage 3: 遊客生成開始");
    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
>>>>>>> REPLACE

<<<<<<< SEARCH
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      pathFinderRef.current = new PathFinder(40, obstacles);
=======
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      alert("Stage 4: PathFinder 更新");
      pathFinderRef.current = new PathFinder(40, obstacles);
>>>>>>> REPLACE
</diff>
</replace_in_file>

<thinking>
最後添加遊戲迴圈更新階段的 alert。
</thinking>

<replace_in_file>
<path>src/components/game/GameCanvas.tsx</path>
<diff>
<<<<<<< SEARCH
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
=======
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        alert("Stage 5: 遊戲迴圈更新");
>>>>>>> REPLACE
</diff>
</replace_in_file>

<thinking>
現在我已經在關鍵階段都加上了 alert 訊息，這樣可以幫助開發者追蹤哪個階段可能導致瀏覽器沒有回應。介面會依序顯示：

1. Stage 1: Canvas 初始化開始
2. Stage 2: 遊戲迴圈初始化
3. Stage 3: 遊客生成開始
4. Stage 4: PathFinder 更新
5. Stage 5: 遊戲迴圈更新

讓我告知用戶這些變更。
</thinking>

<attempt_completion>
<result>
我已經在關鍵階段加入了 alert 訊息，以便追蹤可能導致瀏覽器沒有回應的階段：

1. Canvas 初始化
2. 遊戲迴圈初始化
3. 遊客生成
4. PathFinder 更新
5. 遊戲迴圈更新

當你重新載入頁面時，這些 alert 會依序出現。如果某個階段之後沒有看到下一個 alert，就

[Response interrupted by a tool use result. Only one tool may be used at a time and should be placed at the end of the message.]

---

**User:**

[replace_in_file for 'src/components/game/GameCanvas.tsx'] Result:
The content was successfully saved to src/components/game/GameCanvas.tsx.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/components/game/GameCanvas.tsx">
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Facility } from './Facility';
import type { IVisitor as VisitorInfo } from './Visitor';
import { Visitor, VisitorState } from './Visitor';
import { FacilityStatus } from './types/FacilityTypes';
import { selectVisitorParams } from '../../store/visitorConfigSlice';
import { updateVisitor } from '../../store/visitorSlice';
import { PathFinder } from '../../utils/PathFinder';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const visitorInstancesRef = useRef<Map<string, Visitor>>(new Map());
  const pathFinderRef = useRef<PathFinder>(new PathFinder(40, []));
  const lastObstaclesHashRef = useRef<string>("");
  
  const facilitiesMap = useAppSelector(state => state.facilities.facilities);
  const visitorsMap = useAppSelector(state => state.visitors.visitors);
  const visitorParams = useAppSelector(selectVisitorParams);
  
  // 使用 useMemo 記憶化設施陣列
  const facilities = useMemo(() => Object.values(facilitiesMap), [facilitiesMap]);

  // 建立遊客生成函數
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }

    // 在地圖邊緣隨機生成遊客
    const spawnPoints = [
      { x: 0, y: Math.floor(Math.random() * 15) },
      { x: 19, y: Math.floor(Math.random() * 15) },
      { x: Math.floor(Math.random() * 20), y: 0 },
      { x: Math.floor(Math.random() * 20), y: 14 }
    ];
    
    const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    const newVisitor = new Visitor(
      `visitor_${Date.now()}`,
      spawnPoint,
      pathFinderRef.current,
      visitorParams.moveSpeed
    );

    // 先將遊客實例加入記憶體管理
    visitorInstancesRef.current.set(newVisitor.id, newVisitor);

    // 更新 Redux store
    dispatch(updateVisitor({
      id: newVisitor.id,
      position: newVisitor.position,
      state: newVisitor.state,
      satisfaction: newVisitor.satisfaction,
      prediction: newVisitor.prediction,
      lowSatisfactionCount: newVisitor.lowSatisfactionCount
    }));

    // 更新遊客計數
    setVisitorCount(prev => prev + 1);
  }, [dispatch, visitorCount, visitorParams.totalVisitors, visitorParams.moveSpeed, facilities]);

  // 設置遊客生成定時器
  useEffect(() => {
    const spawnTimer = setInterval(spawnVisitor, visitorParams.spawnInterval);
    return () => clearInterval(spawnTimer);
  }, [spawnVisitor, visitorParams.spawnInterval]);

  // 將 visitors 移到 useEffect 外部並使用 useMemo 優化
  const visitors = useMemo(() => Object.values(visitorsMap), [visitorsMap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    alert("Stage 1: Canvas 初始化開始");
    setContext(ctx);

    // 設置 Canvas 的實際大小
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    // 設置 CSS 大小
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // 調整比例
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, [width, height]);

  useEffect(() => {
    if (!context) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;

      // 清除畫布
      context.clearRect(0, 0, width, height);

      // 繪製網格
      drawGrid(context, width, height);
      
      // 繪製設施
      facilities.forEach(facility => {
        drawFacility(context, facility);
      });

      // 更新並繪製每個遊客
      visitors.forEach((visitor: VisitorInfo) => {
        // 獲取或創建 Visitor 實例
        let visitorInstance = visitorInstancesRef.current.get(visitor.id);
        if (!visitorInstance) {
          visitorInstance = new Visitor(
            visitor.id,
            visitor.position,
            pathFinderRef.current,
            visitorParams.moveSpeed
          );
          visitorInstancesRef.current.set(visitor.id, visitorInstance);
        }

        // 更新移動速度
        visitorInstance.setMoveSpeed(visitorParams.moveSpeed);
        
        // 檢查是否需要設定新目標
        if (visitorInstance.state === VisitorState.IDLE) {
          if (facilities.length > 0) {
            // 隨機選擇一個設施作為目標
            const targetFacility = facilities[Math.floor(Math.random() * facilities.length)];
            visitorInstance.moveTo(targetFacility.getPosition());
          }
        }

        const needsUpdate = visitorInstance.update(deltaTime);
        
        // 限制更新頻率，配合 10 FPS 的更新頻率
        if (needsUpdate && currentTime % 1000 < 100) {
          dispatch(updateVisitor({
            id: visitorInstance.id,
            position: visitorInstance.position,
            state: visitorInstance.state,
            satisfaction: visitorInstance.satisfaction,
            prediction: visitorInstance.prediction,
            lowSatisfactionCount: visitorInstance.lowSatisfactionCount
          }));
        }

        // 立即繪製遊客
        drawVisitor(context, {
          ...visitor,
          position: visitorInstance.position,
          state: visitorInstance.state,
          satisfaction: visitorInstance.satisfaction,
          prediction: visitorInstance.prediction,
          lowSatisfactionCount: visitorInstance.lowSatisfactionCount
        });
      });

      // 定期清理遊客實例，而不是每幀都清理
  if (currentTime % 1000 < 100) { // 配合 10 FPS 的更新頻率
    const currentIds = new Set(visitors.map((v: VisitorInfo) => v.id));
    let deletedCount = 0;
    for (const [id] of visitorInstancesRef.current) {
      if (!currentIds.has(id)) {
        visitorInstancesRef.current.delete(id);
        deletedCount++;
      }
    }
    if (deletedCount > 0) {
      // 更新遊客計數
      setVisitorCount(prev => Math.max(0, prev - deletedCount));
    }
  }

      // 請求下一幀
      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, facilities, visitors, width, height, visitorParams]);

  const drawGrid = (
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number
  ) => {
    const gridSize = 40;
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    // 繪製垂直線
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // 繪製水平線
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const drawFacility = (
    ctx: CanvasRenderingContext2D, 
    facility: Facility,
  ) => {
    const size = 38; // 略小於網格大小
    const position = facility.getPosition();
    const x = position.x * 40 + 1;
    const y = position.y * 40 + 1;

    // 根據設施狀態設置顏色
    let fillColor = '#4CAF50';  // 預設：營運中
    let strokeColor = '#388E3C';
    
    switch(facility.getStatus()) {
      case FacilityStatus.MAINTENANCE:
        fillColor = '#FFC107';  // 維護中
        strokeColor = '#FFA000';
        break;
      case FacilityStatus.CLOSED:
        fillColor = '#F44336';  // 關閉中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製設施外框
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.stroke();

    // 繪製設施名稱
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(facility.getName(), x + size/2, y + size/2 - 8);

    // 繪製等候人數
    const queueLength = facility.getQueueLength();
    if (queueLength > 0) {
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`等候: ${queueLength}人`, x + size/2, y + size/2 + 8);
    }
  };

  const drawVisitor = (
    ctx: CanvasRenderingContext2D, 
    visitor: VisitorInfo
  ) => {
    const radius = 10;
    // 不再將位置四捨五入，使動畫更平滑
    const x = visitor.position.x * 40 + 20;
    const y = visitor.position.y * 40 + 20;

    // 如果遊客正在移動，添加動畫效果
    if (visitor.state === VisitorState.MOVING && visitor.prediction?.nextPosition) {
      ctx.save();
      
      // 繪製移動軌跡
      ctx.strokeStyle = '#2196F3';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        visitor.prediction.nextPosition.x * 40 + 20,
        visitor.prediction.nextPosition.y * 40 + 20
      );
      ctx.stroke();

      // 添加移動方向指示器
      const dx = visitor.prediction.nextPosition.x * 40 + 20 - x;
      const dy = visitor.prediction.nextPosition.y * 40 + 20 - y;
      const angle = Math.atan2(dy, dx);
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(radius + 5, 0);
      ctx.lineTo(radius + 12, -4);
      ctx.lineTo(radius + 12, 4);
      ctx.closePath();
      ctx.fillStyle = '#2196F3';
      ctx.fill();
      
      ctx.restore();
    }

    // 根據遊客狀態設置顏色
    let fillColor = '#2196F3';   // 預設：遊覽中
    let strokeColor = '#1976D2';
    
    switch(visitor.state) {
      case VisitorState.QUEUING:
        fillColor = '#FF9800';   // 排隊中
        strokeColor = '#F57C00';
        break;
      case VisitorState.PLAYING:
        fillColor = '#4CAF50';   // 遊玩中
        strokeColor = '#388E3C';
        break;
      case VisitorState.LEAVING:
        fillColor = '#F44336';   // 離開中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製遊客圖示
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 繪製遊客狀態
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(visitor.state, x, y - 15);

    // 繪製滿意度指標
    const satisfactionIcon = visitor.satisfaction >= 80 ? '😊' : 
                           visitor.satisfaction >= 50 ? '😐' : '😞';
    ctx.font = '12px Arial';
    ctx.fillText(satisfactionIcon, x, y + 15);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff'
      }}
    />
  );
};

export default GameCanvas;

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


Tool [replace_in_file] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
Tool [replace_in_file] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
Tool [replace_in_file] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
Tool [attempt_completion] was not executed because a tool has already been used in this message. Only one tool may be used per message. You must assess the first tool's result before proceeding to use the next tool.
<environment_details>
# VSCode Visible Files
../../../../144
memory-bank/05_activeContext.md
memory-bank/05_activeContext.md
src/components/game/GameCanvas.tsx

# VSCode Open Tabs
src/components/game/Visitor.ts
src/components/game/GameCanvas.tsx
src/store/facilitySlice.ts
src/App.tsx
src/store/visitorSlice.ts
src/store/visitorConfigSlice.ts

# Current Time
3/31/2025, 2:31:45 PM (Asia/Taipei, UTC+8:00)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
我注意到第一個 replace_in_file 操作已經成功執行。讓我繼續執行下一個階段的修改。
</thinking>

<replace_in_file>
<path>src/components/game/GameCanvas.tsx</path>
<diff>
<<<<<<< SEARCH
    if (!context) return;

    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
=======
    if (!context) return;

    alert("Stage 2: 遊戲迴圈初始化開始");
    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
>>>>>>> REPLACE
</diff>
</replace_in_file>

---

**User:**

[replace_in_file for 'src/components/game/GameCanvas.tsx'] Result:
The content was successfully saved to src/components/game/GameCanvas.tsx.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/components/game/GameCanvas.tsx">
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Facility } from './Facility';
import type { IVisitor as VisitorInfo } from './Visitor';
import { Visitor, VisitorState } from './Visitor';
import { FacilityStatus } from './types/FacilityTypes';
import { selectVisitorParams } from '../../store/visitorConfigSlice';
import { updateVisitor } from '../../store/visitorSlice';
import { PathFinder } from '../../utils/PathFinder';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const visitorInstancesRef = useRef<Map<string, Visitor>>(new Map());
  const pathFinderRef = useRef<PathFinder>(new PathFinder(40, []));
  const lastObstaclesHashRef = useRef<string>("");
  
  const facilitiesMap = useAppSelector(state => state.facilities.facilities);
  const visitorsMap = useAppSelector(state => state.visitors.visitors);
  const visitorParams = useAppSelector(selectVisitorParams);
  
  // 使用 useMemo 記憶化設施陣列
  const facilities = useMemo(() => Object.values(facilitiesMap), [facilitiesMap]);

  // 建立遊客生成函數
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }

    // 在地圖邊緣隨機生成遊客
    const spawnPoints = [
      { x: 0, y: Math.floor(Math.random() * 15) },
      { x: 19, y: Math.floor(Math.random() * 15) },
      { x: Math.floor(Math.random() * 20), y: 0 },
      { x: Math.floor(Math.random() * 20), y: 14 }
    ];
    
    const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    const newVisitor = new Visitor(
      `visitor_${Date.now()}`,
      spawnPoint,
      pathFinderRef.current,
      visitorParams.moveSpeed
    );

    // 先將遊客實例加入記憶體管理
    visitorInstancesRef.current.set(newVisitor.id, newVisitor);

    // 更新 Redux store
    dispatch(updateVisitor({
      id: newVisitor.id,
      position: newVisitor.position,
      state: newVisitor.state,
      satisfaction: newVisitor.satisfaction,
      prediction: newVisitor.prediction,
      lowSatisfactionCount: newVisitor.lowSatisfactionCount
    }));

    // 更新遊客計數
    setVisitorCount(prev => prev + 1);
  }, [dispatch, visitorCount, visitorParams.totalVisitors, visitorParams.moveSpeed, facilities]);

  // 設置遊客生成定時器
  useEffect(() => {
    const spawnTimer = setInterval(spawnVisitor, visitorParams.spawnInterval);
    return () => clearInterval(spawnTimer);
  }, [spawnVisitor, visitorParams.spawnInterval]);

  // 將 visitors 移到 useEffect 外部並使用 useMemo 優化
  const visitors = useMemo(() => Object.values(visitorsMap), [visitorsMap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    alert("Stage 1: Canvas 初始化開始");
    setContext(ctx);

    // 設置 Canvas 的實際大小
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    // 設置 CSS 大小
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // 調整比例
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, [width, height]);

  useEffect(() => {
    if (!context) return;

    alert("Stage 2: 遊戲迴圈初始化開始");
    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;

      // 清除畫布
      context.clearRect(0, 0, width, height);

      // 繪製網格
      drawGrid(context, width, height);
      
      // 繪製設施
      facilities.forEach(facility => {
        drawFacility(context, facility);
      });

      // 更新並繪製每個遊客
      visitors.forEach((visitor: VisitorInfo) => {
        // 獲取或創建 Visitor 實例
        let visitorInstance = visitorInstancesRef.current.get(visitor.id);
        if (!visitorInstance) {
          visitorInstance = new Visitor(
            visitor.id,
            visitor.position,
            pathFinderRef.current,
            visitorParams.moveSpeed
          );
          visitorInstancesRef.current.set(visitor.id, visitorInstance);
        }

        // 更新移動速度
        visitorInstance.setMoveSpeed(visitorParams.moveSpeed);
        
        // 檢查是否需要設定新目標
        if (visitorInstance.state === VisitorState.IDLE) {
          if (facilities.length > 0) {
            // 隨機選擇一個設施作為目標
            const targetFacility = facilities[Math.floor(Math.random() * facilities.length)];
            visitorInstance.moveTo(targetFacility.getPosition());
          }
        }

        const needsUpdate = visitorInstance.update(deltaTime);
        
        // 限制更新頻率，配合 10 FPS 的更新頻率
        if (needsUpdate && currentTime % 1000 < 100) {
          dispatch(updateVisitor({
            id: visitorInstance.id,
            position: visitorInstance.position,
            state: visitorInstance.state,
            satisfaction: visitorInstance.satisfaction,
            prediction: visitorInstance.prediction,
            lowSatisfactionCount: visitorInstance.lowSatisfactionCount
          }));
        }

        // 立即繪製遊客
        drawVisitor(context, {
          ...visitor,
          position: visitorInstance.position,
          state: visitorInstance.state,
          satisfaction: visitorInstance.satisfaction,
          prediction: visitorInstance.prediction,
          lowSatisfactionCount: visitorInstance.lowSatisfactionCount
        });
      });

      // 定期清理遊客實例，而不是每幀都清理
  if (currentTime % 1000 < 100) { // 配合 10 FPS 的更新頻率
    const currentIds = new Set(visitors.map((v: VisitorInfo) => v.id));
    let deletedCount = 0;
    for (const [id] of visitorInstancesRef.current) {
      if (!currentIds.has(id)) {
        visitorInstancesRef.current.delete(id);
        deletedCount++;
      }
    }
    if (deletedCount > 0) {
      // 更新遊客計數
      setVisitorCount(prev => Math.max(0, prev - deletedCount));
    }
  }

      // 請求下一幀
      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, facilities, visitors, width, height, visitorParams]);

  const drawGrid = (
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number
  ) => {
    const gridSize = 40;
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    // 繪製垂直線
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // 繪製水平線
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const drawFacility = (
    ctx: CanvasRenderingContext2D, 
    facility: Facility,
  ) => {
    const size = 38; // 略小於網格大小
    const position = facility.getPosition();
    const x = position.x * 40 + 1;
    const y = position.y * 40 + 1;

    // 根據設施狀態設置顏色
    let fillColor = '#4CAF50';  // 預設：營運中
    let strokeColor = '#388E3C';
    
    switch(facility.getStatus()) {
      case FacilityStatus.MAINTENANCE:
        fillColor = '#FFC107';  // 維護中
        strokeColor = '#FFA000';
        break;
      case FacilityStatus.CLOSED:
        fillColor = '#F44336';  // 關閉中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製設施外框
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.stroke();

    // 繪製設施名稱
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(facility.getName(), x + size/2, y + size/2 - 8);

    // 繪製等候人數
    const queueLength = facility.getQueueLength();
    if (queueLength > 0) {
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`等候: ${queueLength}人`, x + size/2, y + size/2 + 8);
    }
  };

  const drawVisitor = (
    ctx: CanvasRenderingContext2D, 
    visitor: VisitorInfo
  ) => {
    const radius = 10;
    // 不再將位置四捨五入，使動畫更平滑
    const x = visitor.position.x * 40 + 20;
    const y = visitor.position.y * 40 + 20;

    // 如果遊客正在移動，添加動畫效果
    if (visitor.state === VisitorState.MOVING && visitor.prediction?.nextPosition) {
      ctx.save();
      
      // 繪製移動軌跡
      ctx.strokeStyle = '#2196F3';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        visitor.prediction.nextPosition.x * 40 + 20,
        visitor.prediction.nextPosition.y * 40 + 20
      );
      ctx.stroke();

      // 添加移動方向指示器
      const dx = visitor.prediction.nextPosition.x * 40 + 20 - x;
      const dy = visitor.prediction.nextPosition.y * 40 + 20 - y;
      const angle = Math.atan2(dy, dx);
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(radius + 5, 0);
      ctx.lineTo(radius + 12, -4);
      ctx.lineTo(radius + 12, 4);
      ctx.closePath();
      ctx.fillStyle = '#2196F3';
      ctx.fill();
      
      ctx.restore();
    }

    // 根據遊客狀態設置顏色
    let fillColor = '#2196F3';   // 預設：遊覽中
    let strokeColor = '#1976D2';
    
    switch(visitor.state) {
      case VisitorState.QUEUING:
        fillColor = '#FF9800';   // 排隊中
        strokeColor = '#F57C00';
        break;
      case VisitorState.PLAYING:
        fillColor = '#4CAF50';   // 遊玩中
        strokeColor = '#388E3C';
        break;
      case VisitorState.LEAVING:
        fillColor = '#F44336';   // 離開中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製遊客圖示
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 繪製遊客狀態
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(visitor.state, x, y - 15);

    // 繪製滿意度指標
    const satisfactionIcon = visitor.satisfaction >= 80 ? '😊' : 
                           visitor.satisfaction >= 50 ? '😐' : '😞';
    ctx.font = '12px Arial';
    ctx.fillText(satisfactionIcon, x, y + 15);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff'
      }}
    />
  );
};

export default GameCanvas;

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
../../../../144
memory-bank/05_activeContext.md
memory-bank/05_activeContext.md
src/components/game/GameCanvas.tsx

# VSCode Open Tabs
src/components/game/Visitor.ts
src/components/game/GameCanvas.tsx
src/store/facilitySlice.ts
src/App.tsx
src/store/visitorSlice.ts
src/store/visitorConfigSlice.ts

# Current Time
3/31/2025, 2:33:43 PM (Asia/Taipei, UTC+8:00)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
我看到第二個階段的修改已經成功完成。現在讓我添加遊客生成和 PathFinder 更新的 alert。
</thinking>

<replace_in_file>
<path>src/components/game/GameCanvas.tsx</path>
<diff>
<<<<<<< SEARCH
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
=======
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    alert("Stage 3: 遊客生成開始");
    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      alert("Stage 4: PathFinder 更新開始");
>>>>>>> REPLACE
</diff>
</replace_in_file>

---

**User:**

[replace_in_file for 'src/components/game/GameCanvas.tsx'] Result:
The content was successfully saved to src/components/game/GameCanvas.tsx.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/components/game/GameCanvas.tsx">
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Facility } from './Facility';
import type { IVisitor as VisitorInfo } from './Visitor';
import { Visitor, VisitorState } from './Visitor';
import { FacilityStatus } from './types/FacilityTypes';
import { selectVisitorParams } from '../../store/visitorConfigSlice';
import { updateVisitor } from '../../store/visitorSlice';
import { PathFinder } from '../../utils/PathFinder';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const visitorInstancesRef = useRef<Map<string, Visitor>>(new Map());
  const pathFinderRef = useRef<PathFinder>(new PathFinder(40, []));
  const lastObstaclesHashRef = useRef<string>("");
  
  const facilitiesMap = useAppSelector(state => state.facilities.facilities);
  const visitorsMap = useAppSelector(state => state.visitors.visitors);
  const visitorParams = useAppSelector(selectVisitorParams);
  
  // 使用 useMemo 記憶化設施陣列
  const facilities = useMemo(() => Object.values(facilitiesMap), [facilitiesMap]);

  // 建立遊客生成函數
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    alert("Stage 3: 遊客生成開始");
    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      alert("Stage 4: PathFinder 更新開始");
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }

    // 在地圖邊緣隨機生成遊客
    const spawnPoints = [
      { x: 0, y: Math.floor(Math.random() * 15) },
      { x: 19, y: Math.floor(Math.random() * 15) },
      { x: Math.floor(Math.random() * 20), y: 0 },
      { x: Math.floor(Math.random() * 20), y: 14 }
    ];
    
    const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    const newVisitor = new Visitor(
      `visitor_${Date.now()}`,
      spawnPoint,
      pathFinderRef.current,
      visitorParams.moveSpeed
    );

    // 先將遊客實例加入記憶體管理
    visitorInstancesRef.current.set(newVisitor.id, newVisitor);

    // 更新 Redux store
    dispatch(updateVisitor({
      id: newVisitor.id,
      position: newVisitor.position,
      state: newVisitor.state,
      satisfaction: newVisitor.satisfaction,
      prediction: newVisitor.prediction,
      lowSatisfactionCount: newVisitor.lowSatisfactionCount
    }));

    // 更新遊客計數
    setVisitorCount(prev => prev + 1);
  }, [dispatch, visitorCount, visitorParams.totalVisitors, visitorParams.moveSpeed, facilities]);

  // 設置遊客生成定時器
  useEffect(() => {
    const spawnTimer = setInterval(spawnVisitor, visitorParams.spawnInterval);
    return () => clearInterval(spawnTimer);
  }, [spawnVisitor, visitorParams.spawnInterval]);

  // 將 visitors 移到 useEffect 外部並使用 useMemo 優化
  const visitors = useMemo(() => Object.values(visitorsMap), [visitorsMap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    alert("Stage 1: Canvas 初始化開始");
    setContext(ctx);

    // 設置 Canvas 的實際大小
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    // 設置 CSS 大小
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // 調整比例
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, [width, height]);

  useEffect(() => {
    if (!context) return;

    alert("Stage 2: 遊戲迴圈初始化開始");
    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;

      // 清除畫布
      context.clearRect(0, 0, width, height);

      // 繪製網格
      drawGrid(context, width, height);
      
      // 繪製設施
      facilities.forEach(facility => {
        drawFacility(context, facility);
      });

      // 更新並繪製每個遊客
      visitors.forEach((visitor: VisitorInfo) => {
        // 獲取或創建 Visitor 實例
        let visitorInstance = visitorInstancesRef.current.get(visitor.id);
        if (!visitorInstance) {
          visitorInstance = new Visitor(
            visitor.id,
            visitor.position,
            pathFinderRef.current,
            visitorParams.moveSpeed
          );
          visitorInstancesRef.current.set(visitor.id, visitorInstance);
        }

        // 更新移動速度
        visitorInstance.setMoveSpeed(visitorParams.moveSpeed);
        
        // 檢查是否需要設定新目標
        if (visitorInstance.state === VisitorState.IDLE) {
          if (facilities.length > 0) {
            // 隨機選擇一個設施作為目標
            const targetFacility = facilities[Math.floor(Math.random() * facilities.length)];
            visitorInstance.moveTo(targetFacility.getPosition());
          }
        }

        const needsUpdate = visitorInstance.update(deltaTime);
        
        // 限制更新頻率，配合 10 FPS 的更新頻率
        if (needsUpdate && currentTime % 1000 < 100) {
          dispatch(updateVisitor({
            id: visitorInstance.id,
            position: visitorInstance.position,
            state: visitorInstance.state,
            satisfaction: visitorInstance.satisfaction,
            prediction: visitorInstance.prediction,
            lowSatisfactionCount: visitorInstance.lowSatisfactionCount
          }));
        }

        // 立即繪製遊客
        drawVisitor(context, {
          ...visitor,
          position: visitorInstance.position,
          state: visitorInstance.state,
          satisfaction: visitorInstance.satisfaction,
          prediction: visitorInstance.prediction,
          lowSatisfactionCount: visitorInstance.lowSatisfactionCount
        });
      });

      // 定期清理遊客實例，而不是每幀都清理
  if (currentTime % 1000 < 100) { // 配合 10 FPS 的更新頻率
    const currentIds = new Set(visitors.map((v: VisitorInfo) => v.id));
    let deletedCount = 0;
    for (const [id] of visitorInstancesRef.current) {
      if (!currentIds.has(id)) {
        visitorInstancesRef.current.delete(id);
        deletedCount++;
      }
    }
    if (deletedCount > 0) {
      // 更新遊客計數
      setVisitorCount(prev => Math.max(0, prev - deletedCount));
    }
  }

      // 請求下一幀
      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, facilities, visitors, width, height, visitorParams]);

  const drawGrid = (
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number
  ) => {
    const gridSize = 40;
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    // 繪製垂直線
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // 繪製水平線
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const drawFacility = (
    ctx: CanvasRenderingContext2D, 
    facility: Facility,
  ) => {
    const size = 38; // 略小於網格大小
    const position = facility.getPosition();
    const x = position.x * 40 + 1;
    const y = position.y * 40 + 1;

    // 根據設施狀態設置顏色
    let fillColor = '#4CAF50';  // 預設：營運中
    let strokeColor = '#388E3C';
    
    switch(facility.getStatus()) {
      case FacilityStatus.MAINTENANCE:
        fillColor = '#FFC107';  // 維護中
        strokeColor = '#FFA000';
        break;
      case FacilityStatus.CLOSED:
        fillColor = '#F44336';  // 關閉中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製設施外框
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.stroke();

    // 繪製設施名稱
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(facility.getName(), x + size/2, y + size/2 - 8);

    // 繪製等候人數
    const queueLength = facility.getQueueLength();
    if (queueLength > 0) {
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`等候: ${queueLength}人`, x + size/2, y + size/2 + 8);
    }
  };

  const drawVisitor = (
    ctx: CanvasRenderingContext2D, 
    visitor: VisitorInfo
  ) => {
    const radius = 10;
    // 不再將位置四捨五入，使動畫更平滑
    const x = visitor.position.x * 40 + 20;
    const y = visitor.position.y * 40 + 20;

    // 如果遊客正在移動，添加動畫效果
    if (visitor.state === VisitorState.MOVING && visitor.prediction?.nextPosition) {
      ctx.save();
      
      // 繪製移動軌跡
      ctx.strokeStyle = '#2196F3';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        visitor.prediction.nextPosition.x * 40 + 20,
        visitor.prediction.nextPosition.y * 40 + 20
      );
      ctx.stroke();

      // 添加移動方向指示器
      const dx = visitor.prediction.nextPosition.x * 40 + 20 - x;
      const dy = visitor.prediction.nextPosition.y * 40 + 20 - y;
      const angle = Math.atan2(dy, dx);
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(radius + 5, 0);
      ctx.lineTo(radius + 12, -4);
      ctx.lineTo(radius + 12, 4);
      ctx.closePath();
      ctx.fillStyle = '#2196F3';
      ctx.fill();
      
      ctx.restore();
    }

    // 根據遊客狀態設置顏色
    let fillColor = '#2196F3';   // 預設：遊覽中
    let strokeColor = '#1976D2';
    
    switch(visitor.state) {
      case VisitorState.QUEUING:
        fillColor = '#FF9800';   // 排隊中
        strokeColor = '#F57C00';
        break;
      case VisitorState.PLAYING:
        fillColor = '#4CAF50';   // 遊玩中
        strokeColor = '#388E3C';
        break;
      case VisitorState.LEAVING:
        fillColor = '#F44336';   // 離開中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製遊客圖示
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 繪製遊客狀態
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(visitor.state, x, y - 15);

    // 繪製滿意度指標
    const satisfactionIcon = visitor.satisfaction >= 80 ? '😊' : 
                           visitor.satisfaction >= 50 ? '😐' : '😞';
    ctx.font = '12px Arial';
    ctx.fillText(satisfactionIcon, x, y + 15);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff'
      }}
    />
  );
};

export default GameCanvas;

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
../../../../144
memory-bank/05_activeContext.md
memory-bank/05_activeContext.md
src/components/game/GameCanvas.tsx

# VSCode Open Tabs
src/components/game/Visitor.ts
src/components/game/GameCanvas.tsx
src/store/facilitySlice.ts
src/App.tsx
src/store/visitorSlice.ts
src/store/visitorConfigSlice.ts

# Current Time
3/31/2025, 2:35:23 PM (Asia/Taipei, UTC+8:00)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
我看到前面的修改都已經成功完成。現在讓我添加最後一個階段的 alert：遊戲迴圈更新。
</thinking>

<replace_in_file>
<path>src/components/game/GameCanvas.tsx</path>
<diff>
<<<<<<< SEARCH
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;

      // 清除畫布
=======
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;
      alert("Stage 5: 遊戲迴圈更新開始");

      // 清除畫布
>>>>>>> REPLACE
</diff>
</replace_in_file>

---

**User:**

[replace_in_file for 'src/components/game/GameCanvas.tsx'] Result:
The content was successfully saved to src/components/game/GameCanvas.tsx.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/components/game/GameCanvas.tsx">
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Facility } from './Facility';
import type { IVisitor as VisitorInfo } from './Visitor';
import { Visitor, VisitorState } from './Visitor';
import { FacilityStatus } from './types/FacilityTypes';
import { selectVisitorParams } from '../../store/visitorConfigSlice';
import { updateVisitor } from '../../store/visitorSlice';
import { PathFinder } from '../../utils/PathFinder';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const visitorInstancesRef = useRef<Map<string, Visitor>>(new Map());
  const pathFinderRef = useRef<PathFinder>(new PathFinder(40, []));
  const lastObstaclesHashRef = useRef<string>("");
  
  const facilitiesMap = useAppSelector(state => state.facilities.facilities);
  const visitorsMap = useAppSelector(state => state.visitors.visitors);
  const visitorParams = useAppSelector(selectVisitorParams);
  
  // 使用 useMemo 記憶化設施陣列
  const facilities = useMemo(() => Object.values(facilitiesMap), [facilitiesMap]);

  // 建立遊客生成函數
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    alert("Stage 3: 遊客生成開始");
    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      alert("Stage 4: PathFinder 更新開始");
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }

    // 在地圖邊緣隨機生成遊客
    const spawnPoints = [
      { x: 0, y: Math.floor(Math.random() * 15) },
      { x: 19, y: Math.floor(Math.random() * 15) },
      { x: Math.floor(Math.random() * 20), y: 0 },
      { x: Math.floor(Math.random() * 20), y: 14 }
    ];
    
    const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    const newVisitor = new Visitor(
      `visitor_${Date.now()}`,
      spawnPoint,
      pathFinderRef.current,
      visitorParams.moveSpeed
    );

    // 先將遊客實例加入記憶體管理
    visitorInstancesRef.current.set(newVisitor.id, newVisitor);

    // 更新 Redux store
    dispatch(updateVisitor({
      id: newVisitor.id,
      position: newVisitor.position,
      state: newVisitor.state,
      satisfaction: newVisitor.satisfaction,
      prediction: newVisitor.prediction,
      lowSatisfactionCount: newVisitor.lowSatisfactionCount
    }));

    // 更新遊客計數
    setVisitorCount(prev => prev + 1);
  }, [dispatch, visitorCount, visitorParams.totalVisitors, visitorParams.moveSpeed, facilities]);

  // 設置遊客生成定時器
  useEffect(() => {
    const spawnTimer = setInterval(spawnVisitor, visitorParams.spawnInterval);
    return () => clearInterval(spawnTimer);
  }, [spawnVisitor, visitorParams.spawnInterval]);

  // 將 visitors 移到 useEffect 外部並使用 useMemo 優化
  const visitors = useMemo(() => Object.values(visitorsMap), [visitorsMap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    alert("Stage 1: Canvas 初始化開始");
    setContext(ctx);

    // 設置 Canvas 的實際大小
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    // 設置 CSS 大小
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // 調整比例
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, [width, height]);

  useEffect(() => {
    if (!context) return;

    alert("Stage 2: 遊戲迴圈初始化開始");
    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;
      alert("Stage 5: 遊戲迴圈更新開始");

      // 清除畫布
      context.clearRect(0, 0, width, height);

      // 繪製網格
      drawGrid(context, width, height);
      
      // 繪製設施
      facilities.forEach(facility => {
        drawFacility(context, facility);
      });

      // 更新並繪製每個遊客
      visitors.forEach((visitor: VisitorInfo) => {
        // 獲取或創建 Visitor 實例
        let visitorInstance = visitorInstancesRef.current.get(visitor.id);
        if (!visitorInstance) {
          visitorInstance = new Visitor(
            visitor.id,
            visitor.position,
            pathFinderRef.current,
            visitorParams.moveSpeed
          );
          visitorInstancesRef.current.set(visitor.id, visitorInstance);
        }

        // 更新移動速度
        visitorInstance.setMoveSpeed(visitorParams.moveSpeed);
        
        // 檢查是否需要設定新目標
        if (visitorInstance.state === VisitorState.IDLE) {
          if (facilities.length > 0) {
            // 隨機選擇一個設施作為目標
            const targetFacility = facilities[Math.floor(Math.random() * facilities.length)];
            visitorInstance.moveTo(targetFacility.getPosition());
          }
        }

        const needsUpdate = visitorInstance.update(deltaTime);
        
        // 限制更新頻率，配合 10 FPS 的更新頻率
        if (needsUpdate && currentTime % 1000 < 100) {
          dispatch(updateVisitor({
            id: visitorInstance.id,
            position: visitorInstance.position,
            state: visitorInstance.state,
            satisfaction: visitorInstance.satisfaction,
            prediction: visitorInstance.prediction,
            lowSatisfactionCount: visitorInstance.lowSatisfactionCount
          }));
        }

        // 立即繪製遊客
        drawVisitor(context, {
          ...visitor,
          position: visitorInstance.position,
          state: visitorInstance.state,
          satisfaction: visitorInstance.satisfaction,
          prediction: visitorInstance.prediction,
          lowSatisfactionCount: visitorInstance.lowSatisfactionCount
        });
      });

      // 定期清理遊客實例，而不是每幀都清理
  if (currentTime % 1000 < 100) { // 配合 10 FPS 的更新頻率
    const currentIds = new Set(visitors.map((v: VisitorInfo) => v.id));
    let deletedCount = 0;
    for (const [id] of visitorInstancesRef.current) {
      if (!currentIds.has(id)) {
        visitorInstancesRef.current.delete(id);
        deletedCount++;
      }
    }
    if (deletedCount > 0) {
      // 更新遊客計數
      setVisitorCount(prev => Math.max(0, prev - deletedCount));
    }
  }

      // 請求下一幀
      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, facilities, visitors, width, height, visitorParams]);

  const drawGrid = (
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number
  ) => {
    const gridSize = 40;
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    // 繪製垂直線
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // 繪製水平線
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const drawFacility = (
    ctx: CanvasRenderingContext2D, 
    facility: Facility,
  ) => {
    const size = 38; // 略小於網格大小
    const position = facility.getPosition();
    const x = position.x * 40 + 1;
    const y = position.y * 40 + 1;

    // 根據設施狀態設置顏色
    let fillColor = '#4CAF50';  // 預設：營運中
    let strokeColor = '#388E3C';
    
    switch(facility.getStatus()) {
      case FacilityStatus.MAINTENANCE:
        fillColor = '#FFC107';  // 維護中
        strokeColor = '#FFA000';
        break;
      case FacilityStatus.CLOSED:
        fillColor = '#F44336';  // 關閉中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製設施外框
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.stroke();

    // 繪製設施名稱
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(facility.getName(), x + size/2, y + size/2 - 8);

    // 繪製等候人數
    const queueLength = facility.getQueueLength();
    if (queueLength > 0) {
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`等候: ${queueLength}人`, x + size/2, y + size/2 + 8);
    }
  };

  const drawVisitor = (
    ctx: CanvasRenderingContext2D, 
    visitor: VisitorInfo
  ) => {
    const radius = 10;
    // 不再將位置四捨五入，使動畫更平滑
    const x = visitor.position.x * 40 + 20;
    const y = visitor.position.y * 40 + 20;

    // 如果遊客正在移動，添加動畫效果
    if (visitor.state === VisitorState.MOVING && visitor.prediction?.nextPosition) {
      ctx.save();
      
      // 繪製移動軌跡
      ctx.strokeStyle = '#2196F3';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        visitor.prediction.nextPosition.x * 40 + 20,
        visitor.prediction.nextPosition.y * 40 + 20
      );
      ctx.stroke();

      // 添加移動方向指示器
      const dx = visitor.prediction.nextPosition.x * 40 + 20 - x;
      const dy = visitor.prediction.nextPosition.y * 40 + 20 - y;
      const angle = Math.atan2(dy, dx);
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(radius + 5, 0);
      ctx.lineTo(radius + 12, -4);
      ctx.lineTo(radius + 12, 4);
      ctx.closePath();
      ctx.fillStyle = '#2196F3';
      ctx.fill();
      
      ctx.restore();
    }

    // 根據遊客狀態設置顏色
    let fillColor = '#2196F3';   // 預設：遊覽中
    let strokeColor = '#1976D2';
    
    switch(visitor.state) {
      case VisitorState.QUEUING:
        fillColor = '#FF9800';   // 排隊中
        strokeColor = '#F57C00';
        break;
      case VisitorState.PLAYING:
        fillColor = '#4CAF50';   // 遊玩中
        strokeColor = '#388E3C';
        break;
      case VisitorState.LEAVING:
        fillColor = '#F44336';   // 離開中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製遊客圖示
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 繪製遊客狀態
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(visitor.state, x, y - 15);

    // 繪製滿意度指標
    const satisfactionIcon = visitor.satisfaction >= 80 ? '😊' : 
                           visitor.satisfaction >= 50 ? '😐' : '😞';
    ctx.font = '12px Arial';
    ctx.fillText(satisfactionIcon, x, y + 15);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff'
      }}
    />
  );
};

export default GameCanvas;

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
../../../../144
memory-bank/05_activeContext.md
memory-bank/05_activeContext.md
src/components/game/GameCanvas.tsx

# VSCode Open Tabs
src/components/game/Visitor.ts
src/components/game/GameCanvas.tsx
src/store/facilitySlice.ts
src/App.tsx
src/store/visitorSlice.ts
src/store/visitorConfigSlice.ts

# Current Time
3/31/2025, 2:36:04 PM (Asia/Taipei, UTC+8:00)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
所有的 alert 訊息都已經成功添加完成。我現在可以總結這些變更並解釋它們如何幫助追蹤問題。
</thinking>

<attempt_completion>
<result>
我已經在遊戲初始化和運行的關鍵階段加入了 alert 訊息，依序為：

1. Stage 1: Canvas 初始化開始
2. Stage 2: 遊戲迴圈初始化開始
3. Stage 3: 遊客生成開始
4. Stage 4: PathFinder 更新開始
5. Stage 5: 遊戲迴圈更新開始

當你重新載入頁面時，這些 alert 會依序出現。如果在某個階段之後沒有看到下一個 alert，就表示程式在那個階段之後卡住了。例如，如果你只看到前三個 alert，就表示問題出在 PathFinder 的更新過程中。這樣可以幫助我們更精準地定位效能問題。
</result>
</attempt_completion>

---

**User:**

[attempt_completion] Result:
The user has provided feedback on the results. Consider their input to continue the task, and then attempt completion again.
<feedback>
請在畫面上增加一個 TEXT 區塊，顯示整個系統現在的狀態，將先前用 alert 顯示的訊息 改到 TEXT 中累加記錄下來。
</feedback>
<environment_details>
# VSCode Visible Files
../../../../144
memory-bank/05_activeContext.md
memory-bank/05_activeContext.md
src/components/game/GameCanvas.tsx

# VSCode Open Tabs
src/components/game/Visitor.ts
src/components/game/GameCanvas.tsx
src/store/facilitySlice.ts
src/App.tsx
src/store/visitorSlice.ts
src/store/visitorConfigSlice.ts

# Current Time
3/31/2025, 2:37:25 PM (Asia/Taipei, UTC+8:00)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
我需要：
1. 新增一個 state 來儲存系統狀態訊息
2. 修改現有的 alert 為更新狀態訊息
3. 在 Canvas 旁邊添加一個文字區塊顯示這些訊息
</thinking>

<replace_in_file>
<path>src/components/game/GameCanvas.tsx</path>
<diff>
<<<<<<< SEARCH
const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
=======
const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState<string[]>([]);

  const addStatus = (message: string) => {
    setSystemStatus(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };
>>>>>>> REPLACE

<<<<<<< SEARCH
    alert("Stage 1: Canvas 初始化開始");
=======
    addStatus("Stage 1: Canvas 初始化開始");
>>>>>>> REPLACE

<<<<<<< SEARCH
    alert("Stage 2: 遊戲迴圈初始化開始");
=======
    addStatus("Stage 2: 遊戲迴圈初始化開始");
>>>>>>> REPLACE

<<<<<<< SEARCH
    alert("Stage 3: 遊客生成開始");
=======
    addStatus("Stage 3: 遊客生成開始");
>>>>>>> REPLACE

<<<<<<< SEARCH
      alert("Stage 4: PathFinder 更新開始");
=======
      addStatus("Stage 4: PathFinder 更新開始");
>>>>>>> REPLACE

<<<<<<< SEARCH
      alert("Stage 5: 遊戲迴圈更新開始");
=======
      addStatus("Stage 5: 遊戲迴圈更新開始");
>>>>>>> REPLACE

<<<<<<< SEARCH
  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff'
      }}
    />
=======
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#fff'

[Response interrupted by a tool use result. Only one tool may be used at a time and should be placed at the end of the message.]

---

**User:**

[replace_in_file for 'src/components/game/GameCanvas.tsx'] Result:
The tool execution failed with the following error:
<error>
The SEARCH block:
    alert("Stage 3: 遊客生成開始");
...does not match anything in the file.

This is likely because the SEARCH block content doesn't match exactly with what's in the file, or if you used multiple SEARCH/REPLACE blocks they may not have been in the order they appear in the file.

The file was reverted to its original state:

<file_content path="src/components/game/GameCanvas.tsx">
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Facility } from './Facility';
import type { IVisitor as VisitorInfo } from './Visitor';
import { Visitor, VisitorState } from './Visitor';
import { FacilityStatus } from './types/FacilityTypes';
import { selectVisitorParams } from '../../store/visitorConfigSlice';
import { updateVisitor } from '../../store/visitorSlice';
import { PathFinder } from '../../utils/PathFinder';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const visitorInstancesRef = useRef<Map<string, Visitor>>(new Map());
  const pathFinderRef = useRef<PathFinder>(new PathFinder(40, []));
  const lastObstaclesHashRef = useRef<string>("");
  
  const facilitiesMap = useAppSelector(state => state.facilities.facilities);
  const visitorsMap = useAppSelector(state => state.visitors.visitors);
  const visitorParams = useAppSelector(selectVisitorParams);
  
  // 使用 useMemo 記憶化設施陣列
  const facilities = useMemo(() => Object.values(facilitiesMap), [facilitiesMap]);

  // 建立遊客生成函數
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    alert("Stage 3: 遊客生成開始");
    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      alert("Stage 4: PathFinder 更新開始");
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }

    // 在地圖邊緣隨機生成遊客
    const spawnPoints = [
      { x: 0, y: Math.floor(Math.random() * 15) },
      { x: 19, y: Math.floor(Math.random() * 15) },
      { x: Math.floor(Math.random() * 20), y: 0 },
      { x: Math.floor(Math.random() * 20), y: 14 }
    ];
    
    const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    const newVisitor = new Visitor(
      `visitor_${Date.now()}`,
      spawnPoint,
      pathFinderRef.current,
      visitorParams.moveSpeed
    );

    // 先將遊客實例加入記憶體管理
    visitorInstancesRef.current.set(newVisitor.id, newVisitor);

    // 更新 Redux store
    dispatch(updateVisitor({
      id: newVisitor.id,
      position: newVisitor.position,
      state: newVisitor.state,
      satisfaction: newVisitor.satisfaction,
      prediction: newVisitor.prediction,
      lowSatisfactionCount: newVisitor.lowSatisfactionCount
    }));

    // 更新遊客計數
    setVisitorCount(prev => prev + 1);
  }, [dispatch, visitorCount, visitorParams.totalVisitors, visitorParams.moveSpeed, facilities]);

  // 設置遊客生成定時器
  useEffect(() => {
    const spawnTimer = setInterval(spawnVisitor, visitorParams.spawnInterval);
    return () => clearInterval(spawnTimer);
  }, [spawnVisitor, visitorParams.spawnInterval]);

  // 將 visitors 移到 useEffect 外部並使用 useMemo 優化
  const visitors = useMemo(() => Object.values(visitorsMap), [visitorsMap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    alert("Stage 1: Canvas 初始化開始");
    setContext(ctx);

    // 設置 Canvas 的實際大小
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    // 設置 CSS 大小
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // 調整比例
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, [width, height]);

  useEffect(() => {
    if (!context) return;

    alert("Stage 2: 遊戲迴圈初始化開始");
    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;
      alert("Stage 5: 遊戲迴圈更新開始");

      // 清除畫布
      context.clearRect(0, 0, width, height);

      // 繪製網格
      drawGrid(context, width, height);
      
      // 繪製設施
      facilities.forEach(facility => {
        drawFacility(context, facility);
      });

      // 更新並繪製每個遊客
      visitors.forEach((visitor: VisitorInfo) => {
        // 獲取或創建 Visitor 實例
        let visitorInstance = visitorInstancesRef.current.get(visitor.id);
        if (!visitorInstance) {
          visitorInstance = new Visitor(
            visitor.id,
            visitor.position,
            pathFinderRef.current,
            visitorParams.moveSpeed
          );
          visitorInstancesRef.current.set(visitor.id, visitorInstance);
        }

        // 更新移動速度
        visitorInstance.setMoveSpeed(visitorParams.moveSpeed);
        
        // 檢查是否需要設定新目標
        if (visitorInstance.state === VisitorState.IDLE) {
          if (facilities.length > 0) {
            // 隨機選擇一個設施作為目標
            const targetFacility = facilities[Math.floor(Math.random() * facilities.length)];
            visitorInstance.moveTo(targetFacility.getPosition());
          }
        }

        const needsUpdate = visitorInstance.update(deltaTime);
        
        // 限制更新頻率，配合 10 FPS 的更新頻率
        if (needsUpdate && currentTime % 1000 < 100) {
          dispatch(updateVisitor({
            id: visitorInstance.id,
            position: visitorInstance.position,
            state: visitorInstance.state,
            satisfaction: visitorInstance.satisfaction,
            prediction: visitorInstance.prediction,
            lowSatisfactionCount: visitorInstance.lowSatisfactionCount
          }));
        }

        // 立即繪製遊客
        drawVisitor(context, {
          ...visitor,
          position: visitorInstance.position,
          state: visitorInstance.state,
          satisfaction: visitorInstance.satisfaction,
          prediction: visitorInstance.prediction,
          lowSatisfactionCount: visitorInstance.lowSatisfactionCount
        });
      });

      // 定期清理遊客實例，而不是每幀都清理
  if (currentTime % 1000 < 100) { // 配合 10 FPS 的更新頻率
    const currentIds = new Set(visitors.map((v: VisitorInfo) => v.id));
    let deletedCount = 0;
    for (const [id] of visitorInstancesRef.current) {
      if (!currentIds.has(id)) {
        visitorInstancesRef.current.delete(id);
        deletedCount++;
      }
    }
    if (deletedCount > 0) {
      // 更新遊客計數
      setVisitorCount(prev => Math.max(0, prev - deletedCount));
    }
  }

      // 請求下一幀
      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, facilities, visitors, width, height, visitorParams]);

  const drawGrid = (
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number
  ) => {
    const gridSize = 40;
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    // 繪製垂直線
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // 繪製水平線
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const drawFacility = (
    ctx: CanvasRenderingContext2D, 
    facility: Facility,
  ) => {
    const size = 38; // 略小於網格大小
    const position = facility.getPosition();
    const x = position.x * 40 + 1;
    const y = position.y * 40 + 1;

    // 根據設施狀態設置顏色
    let fillColor = '#4CAF50';  // 預設：營運中
    let strokeColor = '#388E3C';
    
    switch(facility.getStatus()) {
      case FacilityStatus.MAINTENANCE:
        fillColor = '#FFC107';  // 維護中
        strokeColor = '#FFA000';
        break;
      case FacilityStatus.CLOSED:
        fillColor = '#F44336';  // 關閉中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製設施外框
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.stroke();

    // 繪製設施名稱
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(facility.getName(), x + size/2, y + size/2 - 8);

    // 繪製等候人數
    const queueLength = facility.getQueueLength();
    if (queueLength > 0) {
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`等候: ${queueLength}人`, x + size/2, y + size/2 + 8);
    }
  };

  const drawVisitor = (
    ctx: CanvasRenderingContext2D, 
    visitor: VisitorInfo
  ) => {
    const radius = 10;
    // 不再將位置四捨五入，使動畫更平滑
    const x = visitor.position.x * 40 + 20;
    const y = visitor.position.y * 40 + 20;

    // 如果遊客正在移動，添加動畫效果
    if (visitor.state === VisitorState.MOVING && visitor.prediction?.nextPosition) {
      ctx.save();
      
      // 繪製移動軌跡
      ctx.strokeStyle = '#2196F3';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        visitor.prediction.nextPosition.x * 40 + 20,
        visitor.prediction.nextPosition.y * 40 + 20
      );
      ctx.stroke();

      // 添加移動方向指示器
      const dx = visitor.prediction.nextPosition.x * 40 + 20 - x;
      const dy = visitor.prediction.nextPosition.y * 40 + 20 - y;
      const angle = Math.atan2(dy, dx);
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(radius + 5, 0);
      ctx.lineTo(radius + 12, -4);
      ctx.lineTo(radius + 12, 4);
      ctx.closePath();
      ctx.fillStyle = '#2196F3';
      ctx.fill();
      
      ctx.restore();
    }

    // 根據遊客狀態設置顏色
    let fillColor = '#2196F3';   // 預設：遊覽中
    let strokeColor = '#1976D2';
    
    switch(visitor.state) {
      case VisitorState.QUEUING:
        fillColor = '#FF9800';   // 排隊中
        strokeColor = '#F57C00';
        break;
      case VisitorState.PLAYING:
        fillColor = '#4CAF50';   // 遊玩中
        strokeColor = '#388E3C';
        break;
      case VisitorState.LEAVING:
        fillColor = '#F44336';   // 離開中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製遊客圖示
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 繪製遊客狀態
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(visitor.state, x, y - 15);

    // 繪製滿意度指標
    const satisfactionIcon = visitor.satisfaction >= 80 ? '😊' : 
                           visitor.satisfaction >= 50 ? '😐' : '😞';
    ctx.font = '12px Arial';
    ctx.fillText(satisfactionIcon, x, y + 15);
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#fff'
      }}
    />
  );
};

export default GameCanvas;

</file_content>

Try again with fewer/more precise SEARCH blocks.
(If you run into this error two times in a row, you may use the write_to_file tool as a fallback.)
</error>
<environment_details>
# VSCode Visible Files
../../../../144
memory-bank/05_activeContext.md
memory-bank/05_activeContext.md
src/components/game/GameCanvas.tsx

# VSCode Open Tabs
src/components/game/Visitor.ts
src/components/game/GameCanvas.tsx
src/store/facilitySlice.ts
src/App.tsx
src/store/visitorSlice.ts
src/store/visitorConfigSlice.ts

# Current Time
3/31/2025, 2:38:30 PM (Asia/Taipei, UTC+8:00)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
由於多個 SEARCH/REPLACE 區塊可能會造成問題，我將使用 write_to_file 來一次性更新整個文件。我會：
1. 保留所有現有功能
2. 添加系統狀態管理
3. 將 alert 替換為狀態更新
4. 添加狀態顯示區域
</thinking>

<write_to_file>
<path>src/components/game/GameCanvas.tsx</path>
<content>
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Facility } from './Facility';
import type { IVisitor as VisitorInfo } from './Visitor';
import { Visitor, VisitorState } from './Visitor';
import { FacilityStatus } from './types/FacilityTypes';
import { selectVisitorParams } from '../../store/visitorConfigSlice';
import { updateVisitor } from '../../store/visitorSlice';
import { PathFinder } from '../../utils/PathFinder';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState<string[]>([]);
  const visitorInstancesRef = useRef<Map<string, Visitor>>(new Map());
  const pathFinderRef = useRef<PathFinder>(new PathFinder(40, []));
  const lastObstaclesHashRef = useRef<string>("");
  
  const facilitiesMap = useAppSelector(state => state.facilities.facilities);
  const visitorsMap = useAppSelector(state => state.visitors.visitors);
  const visitorParams = useAppSelector(selectVisitorParams);
  
  const addStatus = useCallback((message: string) => {
    setSystemStatus(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  }, []);

  // 使用 useMemo 記憶化設施陣列
  const facilities = useMemo(() => Object.values(facilitiesMap), [facilitiesMap]);

  // 建立遊客生成函數
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    addStatus("Stage 3: 遊客生成開始");
    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      addStatus("Stage 4: PathFinder 更新開始");
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }

    // 在地圖邊緣隨機生成遊客
    const spawnPoints = [
      { x: 0, y: Math.floor(Math.random() * 15) },
      { x: 19, y: Math.floor(Math.random() * 15) },
      { x: Math.floor(Math.random() * 20), y: 0 },
      { x: Math.floor(Math.random() * 20), y: 14 }
    ];
    
    const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    const newVisitor = new Visitor(
      `visitor_${Date.now()}`,
      spawnPoint,
      pathFinderRef.current,
      visitorParams.moveSpeed
    );

    // 先將遊客實例加入記憶體管理
    visitorInstancesRef.current.set(newVisitor.id, newVisitor);

    // 更新 Redux store
    dispatch(updateVisitor({
      id: newVisitor.id,
      position: newVisitor.position,
      state: newVisitor.state,
      satisfaction: newVisitor.satisfaction,
      prediction: newVisitor.prediction,
      lowSatisfactionCount: newVisitor.lowSatisfactionCount
    }));

    // 更新遊客計數
    setVisitorCount(prev => prev + 1);
  }, [dispatch, visitorCount, visitorParams.totalVisitors, visitorParams.moveSpeed, facilities, addStatus]);

  // 設置遊客生成定時器
  useEffect(() => {
    const spawnTimer = setInterval(spawnVisitor, visitorParams.spawnInterval);
    return () => clearInterval(spawnTimer);
  }, [spawnVisitor, visitorParams.spawnInterval]);

  // 將 visitors 移到 useEffect 外部並使用 useMemo 優化
  const visitors = useMemo(() => Object.values(visitorsMap), [visitorsMap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    addStatus("Stage 1: Canvas 初始化開始");
    setContext(ctx);

    // 設置 Canvas 的實際大小
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    // 設置 CSS 大小
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // 調整比例
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, [width, height, addStatus]);

  useEffect(() => {
    if (!context) return;

    addStatus("Stage 2: 遊戲迴圈初始化開始");
    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;

      addStatus("Stage 5: 遊戲迴圈更新開始");
      // 清除畫布
      context.clearRect(0, 0, width, height);

      // 繪製網格
      drawGrid(context, width, height);
      
      // 繪製設施
      facilities.forEach(facility => {
        drawFacility(context, facility);
      });

      // 更新並繪製每個遊客
      visitors.forEach((visitor: VisitorInfo) => {
        // 獲取或創建 Visitor 實例
        let visitorInstance = visitorInstancesRef.current.get(visitor.id);
        if (!visitorInstance) {
          visitorInstance = new Visitor(
            visitor.id,
            visitor.position,
            pathFinderRef.current,
            visitorParams.moveSpeed
          );
          visitorInstancesRef.current.set(visitor.id, visitorInstance);
        }

        // 更新移動速度
        visitorInstance.setMoveSpeed(visitorParams.moveSpeed);
        
        // 檢查是否需要設定新目標
        if (visitorInstance.state === VisitorState.IDLE) {
          if (facilities.length > 0) {
            // 隨機選擇一個設施作為目標
            const targetFacility = facilities[Math.floor(Math.random() * facilities.length)];
            visitorInstance.moveTo(targetFacility.getPosition());
          }
        }

        const needsUpdate = visitorInstance.update(deltaTime);
        
        // 限制更新頻率，配合 10 FPS 的更新頻率
        if (needsUpdate && currentTime % 1000 < 100) {
          dispatch(updateVisitor({
            id: visitorInstance.id,
            position: visitorInstance.position,
            state: visitorInstance.state,
            satisfaction: visitorInstance.satisfaction,
            prediction: visitorInstance.prediction,
            lowSatisfactionCount: visitorInstance.lowSatisfactionCount
          }));
        }

        // 立即繪製遊客
        drawVisitor(context, {
          ...visitor,
          position: visitorInstance.position,
          state: visitorInstance.state,
          satisfaction: visitorInstance.satisfaction,
          prediction: visitorInstance.prediction,
          lowSatisfactionCount: visitorInstance.lowSatisfactionCount
        });
      });

      // 定期清理遊客實例，而不是每幀都清理
      if (currentTime % 1000 < 100) { // 配合 10 FPS 的更新頻率
        const currentIds = new Set(visitors.map((v: VisitorInfo) => v.id));
        let deletedCount = 0;
        for (const [id] of visitorInstancesRef.current) {
          if (!currentIds.has(id)) {
            visitorInstancesRef.current.delete(id);
            deletedCount++;
          }
        }
        if (deletedCount > 0) {
          // 更新遊客計數
          setVisitorCount(prev => Math.max(0, prev - deletedCount));
        }
      }

      // 請求下一幀
      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, facilities, visitors, width, height, visitorParams, addStatus]);

  const drawGrid = (
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number
  ) => {
    const gridSize = 40;
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    // 繪製垂直線
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // 繪製水平線
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const drawFacility = (
    ctx: CanvasRenderingContext2D, 
    facility: Facility,
  ) => {
    const size = 38; // 略小於網格大小
    const position = facility.getPosition();
    const x = position.x * 40 + 1;
    const y = position.y * 40 + 1;

    // 根據設施狀態設置顏色
    let fillColor = '#4CAF50';  // 預設：營運中
    let strokeColor = '#388E3C';
    
    switch(facility.getStatus()) {
      case FacilityStatus.MAINTENANCE:
        fillColor = '#FFC107';  // 維護中
        strokeColor = '#FFA000';
        break;
      case FacilityStatus.CLOSED:
        fillColor = '#F44336';  // 關閉中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製設施外框
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.stroke();

    // 繪製設施名稱
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(facility.getName(), x + size/2, y + size/2 - 8);

    // 繪製等候人數
    const queueLength = facility.getQueueLength();
    if (queueLength > 0) {
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`等候: ${queueLength}人`, x + size/2, y + size/2 + 8);
    }
  };

  const drawVisitor = (
    ctx: CanvasRenderingContext2D, 
    visitor: VisitorInfo
  ) => {
    const radius = 10;
    // 不再將位置四捨五入，使動畫更平滑
    const x = visitor.position.x * 40 + 20;
    const y = visitor.position.y * 40 + 20;

    // 如果遊客正在移動，添加動畫效果
    if (visitor.state === VisitorState.MOVING && visitor.prediction?.nextPosition) {
      ctx.save();
      
      // 繪製移動軌跡
      ctx.strokeStyle = '#2196F3';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        visitor.prediction.nextPosition.x * 40 + 20,
        visitor.prediction.nextPosition.y * 40 + 20
      );
      ctx.stroke();

      // 添加移動方向指示器
      const dx = visitor.prediction.nextPosition.x * 40 + 20 - x;
      const dy = visitor.prediction.nextPosition.y * 40 + 20 - y;
      const angle = Math.atan2(dy, dx);
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(radius + 5, 0);
      ctx.lineTo(radius + 12, -4);
      ctx.lineTo(radius + 12, 4);
      ctx.closePath();
      ctx.fillStyle = '#2196F3';
      ctx.fill();
      
      ctx.restore();
    }

    // 根據遊客狀態設置顏色
    let fillColor = '#2196F3';   // 預設：遊覽中
    let strokeColor = '#1976D2';
    
    switch(visitor.state) {
      case VisitorState.QUEUING:
        fillColor = '#FF9800';   // 排隊中
        strokeColor = '#F57C00';
        break;
      case VisitorState.PLAYING:
        fillColor = '#4CAF50';   // 遊玩中
        strokeColor = '#388E3C';
        break;
      case VisitorState.LEAVING:
        fillColor = '#F44336';   // 離開中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製遊客圖示
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 繪製遊客狀態
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(visitor.state, x, y - 15);

    // 繪製滿意度指標
    const satisfactionIcon = visitor.satisfaction >= 80 ? '😊' : 
                           visitor.satisfaction >= 50 ? '😐' : '😞';
    ctx.font = '12px Arial';
    ctx.fillText(satisfactionIcon, x, y + 15);
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#fff'
        }}
      />
      <div
        style={{
          width: '300px',
          height: `${height}px`,
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          overflowY: 'auto',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0' }}>系統狀態記錄</h3>
        {systemStatus.map((status, index) => (
          <div key={index} style={{ 
            marginBottom: '5px',
            padding: '5px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCanvas;
</content>
</write_to_file>

---

**User:**

[write_to_file for 'src/components/game/GameCanvas.tsx'] Result:
The content was successfully saved to src/components/game/GameCanvas.tsx.

Here is the full, updated content of the file that was saved:

<final_file_content path="src/components/game/GameCanvas.tsx">
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Facility } from './Facility';
import type { IVisitor as VisitorInfo } from './Visitor';
import { Visitor, VisitorState } from './Visitor';
import { FacilityStatus } from './types/FacilityTypes';
import { selectVisitorParams } from '../../store/visitorConfigSlice';
import { updateVisitor } from '../../store/visitorSlice';
import { PathFinder } from '../../utils/PathFinder';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = 800, 
  height = 600 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dispatch = useAppDispatch();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState<string[]>([]);
  const visitorInstancesRef = useRef<Map<string, Visitor>>(new Map());
  const pathFinderRef = useRef<PathFinder>(new PathFinder(40, []));
  const lastObstaclesHashRef = useRef<string>("");
  
  const facilitiesMap = useAppSelector(state => state.facilities.facilities);
  const visitorsMap = useAppSelector(state => state.visitors.visitors);
  const visitorParams = useAppSelector(selectVisitorParams);
  
  const addStatus = useCallback((message: string) => {
    setSystemStatus(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  }, []);

  // 使用 useMemo 記憶化設施陣列
  const facilities = useMemo(() => Object.values(facilitiesMap), [facilitiesMap]);

  // 建立遊客生成函數
  const spawnVisitor = useCallback(() => {
    if (visitorCount >= visitorParams.totalVisitors) return;

    addStatus("Stage 3: 遊客生成開始");
    // 使用記憶化的 facilities 陣列檢查設施變更並更新 PathFinder
    const obstacles = facilities.map(f => f.getPosition());
    const obstaclesHash = JSON.stringify(obstacles);
    
    if (obstaclesHash !== lastObstaclesHashRef.current) {
      addStatus("Stage 4: PathFinder 更新開始");
      pathFinderRef.current = new PathFinder(40, obstacles);
      lastObstaclesHashRef.current = obstaclesHash;
    }

    // 在地圖邊緣隨機生成遊客
    const spawnPoints = [
      { x: 0, y: Math.floor(Math.random() * 15) },
      { x: 19, y: Math.floor(Math.random() * 15) },
      { x: Math.floor(Math.random() * 20), y: 0 },
      { x: Math.floor(Math.random() * 20), y: 14 }
    ];
    
    const spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
    const newVisitor = new Visitor(
      `visitor_${Date.now()}`,
      spawnPoint,
      pathFinderRef.current,
      visitorParams.moveSpeed
    );

    // 先將遊客實例加入記憶體管理
    visitorInstancesRef.current.set(newVisitor.id, newVisitor);

    // 更新 Redux store
    dispatch(updateVisitor({
      id: newVisitor.id,
      position: newVisitor.position,
      state: newVisitor.state,
      satisfaction: newVisitor.satisfaction,
      prediction: newVisitor.prediction,
      lowSatisfactionCount: newVisitor.lowSatisfactionCount
    }));

    // 更新遊客計數
    setVisitorCount(prev => prev + 1);
  }, [dispatch, visitorCount, visitorParams.totalVisitors, visitorParams.moveSpeed, facilities, addStatus]);

  // 設置遊客生成定時器
  useEffect(() => {
    const spawnTimer = setInterval(spawnVisitor, visitorParams.spawnInterval);
    return () => clearInterval(spawnTimer);
  }, [spawnVisitor, visitorParams.spawnInterval]);

  // 將 visitors 移到 useEffect 外部並使用 useMemo 優化
  const visitors = useMemo(() => Object.values(visitorsMap), [visitorsMap]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    addStatus("Stage 1: Canvas 初始化開始");
    setContext(ctx);

    // 設置 Canvas 的實際大小
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    // 設置 CSS 大小
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // 調整比例
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, [width, height, addStatus]);

  useEffect(() => {
    if (!context) return;

    addStatus("Stage 2: 遊戲迴圈初始化開始");
    let lastTime = performance.now();
    let animationFrameId: number;

    const render = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;  // 轉換為秒
      
      // 控制更新頻率為約 10 FPS (100ms 間隔)
      if (deltaTime < 0.1) {  // 0.1 秒 = 100ms
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      
      lastTime = currentTime;

      addStatus("Stage 5: 遊戲迴圈更新開始");
      // 清除畫布
      context.clearRect(0, 0, width, height);

      // 繪製網格
      drawGrid(context, width, height);
      
      // 繪製設施
      facilities.forEach(facility => {
        drawFacility(context, facility);
      });

      // 更新並繪製每個遊客
      visitors.forEach((visitor: VisitorInfo) => {
        // 獲取或創建 Visitor 實例
        let visitorInstance = visitorInstancesRef.current.get(visitor.id);
        if (!visitorInstance) {
          visitorInstance = new Visitor(
            visitor.id,
            visitor.position,
            pathFinderRef.current,
            visitorParams.moveSpeed
          );
          visitorInstancesRef.current.set(visitor.id, visitorInstance);
        }

        // 更新移動速度
        visitorInstance.setMoveSpeed(visitorParams.moveSpeed);
        
        // 檢查是否需要設定新目標
        if (visitorInstance.state === VisitorState.IDLE) {
          if (facilities.length > 0) {
            // 隨機選擇一個設施作為目標
            const targetFacility = facilities[Math.floor(Math.random() * facilities.length)];
            visitorInstance.moveTo(targetFacility.getPosition());
          }
        }

        const needsUpdate = visitorInstance.update(deltaTime);
        
        // 限制更新頻率，配合 10 FPS 的更新頻率
        if (needsUpdate && currentTime % 1000 < 100) {
          dispatch(updateVisitor({
            id: visitorInstance.id,
            position: visitorInstance.position,
            state: visitorInstance.state,
            satisfaction: visitorInstance.satisfaction,
            prediction: visitorInstance.prediction,
            lowSatisfactionCount: visitorInstance.lowSatisfactionCount
          }));
        }

        // 立即繪製遊客
        drawVisitor(context, {
          ...visitor,
          position: visitorInstance.position,
          state: visitorInstance.state,
          satisfaction: visitorInstance.satisfaction,
          prediction: visitorInstance.prediction,
          lowSatisfactionCount: visitorInstance.lowSatisfactionCount
        });
      });

      // 定期清理遊客實例，而不是每幀都清理
      if (currentTime % 1000 < 100) { // 配合 10 FPS 的更新頻率
        const currentIds = new Set(visitors.map((v: VisitorInfo) => v.id));
        let deletedCount = 0;
        for (const [id] of visitorInstancesRef.current) {
          if (!currentIds.has(id)) {
            visitorInstancesRef.current.delete(id);
            deletedCount++;
          }
        }
        if (deletedCount > 0) {
          // 更新遊客計數
          setVisitorCount(prev => Math.max(0, prev - deletedCount));
        }
      }

      // 請求下一幀
      animationFrameId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [context, facilities, visitors, width, height, visitorParams, addStatus]);

  const drawGrid = (
    ctx: CanvasRenderingContext2D, 
    w: number, 
    h: number
  ) => {
    const gridSize = 40;
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;

    // 繪製垂直線
    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // 繪製水平線
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const drawFacility = (
    ctx: CanvasRenderingContext2D, 
    facility: Facility,
  ) => {
    const size = 38; // 略小於網格大小
    const position = facility.getPosition();
    const x = position.x * 40 + 1;
    const y = position.y * 40 + 1;

    // 根據設施狀態設置顏色
    let fillColor = '#4CAF50';  // 預設：營運中
    let strokeColor = '#388E3C';
    
    switch(facility.getStatus()) {
      case FacilityStatus.MAINTENANCE:
        fillColor = '#FFC107';  // 維護中
        strokeColor = '#FFA000';
        break;
      case FacilityStatus.CLOSED:
        fillColor = '#F44336';  // 關閉中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製設施外框
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.fill();
    ctx.stroke();

    // 繪製設施名稱
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(facility.getName(), x + size/2, y + size/2 - 8);

    // 繪製等候人數
    const queueLength = facility.getQueueLength();
    if (queueLength > 0) {
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText(`等候: ${queueLength}人`, x + size/2, y + size/2 + 8);
    }
  };

  const drawVisitor = (
    ctx: CanvasRenderingContext2D, 
    visitor: VisitorInfo
  ) => {
    const radius = 10;
    // 不再將位置四捨五入，使動畫更平滑
    const x = visitor.position.x * 40 + 20;
    const y = visitor.position.y * 40 + 20;

    // 如果遊客正在移動，添加動畫效果
    if (visitor.state === VisitorState.MOVING && visitor.prediction?.nextPosition) {
      ctx.save();
      
      // 繪製移動軌跡
      ctx.strokeStyle = '#2196F3';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        visitor.prediction.nextPosition.x * 40 + 20,
        visitor.prediction.nextPosition.y * 40 + 20
      );
      ctx.stroke();

      // 添加移動方向指示器
      const dx = visitor.prediction.nextPosition.x * 40 + 20 - x;
      const dy = visitor.prediction.nextPosition.y * 40 + 20 - y;
      const angle = Math.atan2(dy, dx);
      
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(radius + 5, 0);
      ctx.lineTo(radius + 12, -4);
      ctx.lineTo(radius + 12, 4);
      ctx.closePath();
      ctx.fillStyle = '#2196F3';
      ctx.fill();
      
      ctx.restore();
    }

    // 根據遊客狀態設置顏色
    let fillColor = '#2196F3';   // 預設：遊覽中
    let strokeColor = '#1976D2';
    
    switch(visitor.state) {
      case VisitorState.QUEUING:
        fillColor = '#FF9800';   // 排隊中
        strokeColor = '#F57C00';
        break;
      case VisitorState.PLAYING:
        fillColor = '#4CAF50';   // 遊玩中
        strokeColor = '#388E3C';
        break;
      case VisitorState.LEAVING:
        fillColor = '#F44336';   // 離開中
        strokeColor = '#D32F2F';
        break;
    }

    // 繪製遊客圖示
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 繪製遊客狀態
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(visitor.state, x, y - 15);

    // 繪製滿意度指標
    const satisfactionIcon = visitor.satisfaction >= 80 ? '😊' : 
                           visitor.satisfaction >= 50 ? '😐' : '😞';
    ctx.font = '12px Arial';
    ctx.fillText(satisfactionIcon, x, y + 15);
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#fff'
        }}
      />
      <div
        style={{
          width: '300px',
          height: `${height}px`,
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '10px',
          overflowY: 'auto',
          backgroundColor: '#f5f5f5',
        }}
      >
        <h3 style={{ margin: '0 0 10px 0' }}>系統狀態記錄</h3>
        {systemStatus.map((status, index) => (
          <div key={index} style={{ 
            marginBottom: '5px',
            padding: '5px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            {status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCanvas;

</final_file_content>

IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.


<environment_details>
# VSCode Visible Files
../../../../144
memory-bank/05_activeContext.md
memory-bank/05_activeContext.md
src/components/game/GameCanvas.tsx

# VSCode Open Tabs
src/components/game/Visitor.ts
src/components/game/GameCanvas.tsx
src/store/facilitySlice.ts
src/App.tsx
src/store/visitorSlice.ts
src/store/visitorConfigSlice.ts

# Current Time
3/31/2025, 2:41:00 PM (Asia/Taipei, UTC+8:00)

# Current Mode
ACT MODE
</environment_details>

---

**Assistant:**

<thinking>
文件已經成功更新。我已經：
1. 新增了 systemStatus 狀態來儲存系統狀態訊息
2. 建立了 addStatus 函數來新增狀態訊息
3. 將所有 alert 替換為 addStatus 調用
4. 在畫面右側添加了狀態記錄區塊
5. 為每個狀態訊息添加了時間戳記

讓我總結這些變更。
</thinking>

<attempt_completion>
<result>
我已經將原本的 alert 訊息改為畫面上的狀態記錄區域：

1. 在 Canvas 右側新增了一個狀態記錄面板
2. 每個狀態訊息都會包含時間戳記
3. 訊息會自動累積並可以滾動查看
4. 面板使用淺灰色背景，訊息使用白色背景，提高可讀性

這樣可以更清楚地追蹤系統的運作狀態，而且不會像 alert 一樣阻擋使用者操作。當系統卡住時，你可以從最後一條記錄看出是在哪個階段停止的。
</result>
</attempt_completion>

