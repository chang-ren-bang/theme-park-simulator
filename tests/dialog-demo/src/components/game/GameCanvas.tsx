import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import gsap from 'gsap';

interface Character {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { message, isVisible } = useAppSelector((state) => state.dialog);
  const character: Character = {
    x: 200,
    y: 150,
    width: 50,
    height: 100
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清除畫布
    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // 繪製人物
    const drawCharacter = () => {
      ctx.fillStyle = '#4a90e2';
      ctx.fillRect(character.x, character.y, character.width, character.height);
      
      // 繪製臉部特徵
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(character.x + 10, character.y + 20, 10, 10); // 左眼
      ctx.fillRect(character.x + 30, character.y + 20, 10, 10); // 右眼
      ctx.beginPath();
      ctx.arc(character.x + 25, character.y + 50, 15, 0, Math.PI); // 微笑
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    };

    // 繪製對話框
    const drawDialog = () => {
      if (!isVisible || !message) return;

      const padding = 10;
      const maxWidth = 200;
      const lineHeight = 20;

      // 設置文字樣式
      ctx.font = '16px Arial';
      ctx.fillStyle = '#000000';
      ctx.textBaseline = 'top';

      // 計算文字換行
      const words = message.split(' ');
      let line = '';
      const lines: string[] = [];

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      // 計算對話框尺寸
      const boxWidth = maxWidth + padding * 2;
      const boxHeight = lines.length * lineHeight + padding * 2;
      const boxX = character.x + character.width + 20;
      const boxY = character.y;

      // 繪製對話框背景
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 10);
      ctx.fill();
      ctx.stroke();

      // 繪製文字
      ctx.fillStyle = '#000000';
      lines.forEach((line, i) => {
        ctx.fillText(line, boxX + padding, boxY + padding + (i * lineHeight));
      });

      // 繪製對話框箭頭
      ctx.beginPath();
      ctx.moveTo(boxX, boxY + 20);
      ctx.lineTo(boxX - 10, boxY + 30);
      ctx.lineTo(boxX, boxY + 40);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.stroke();
    };

    // 動畫循環
    const animate = () => {
      clearCanvas();
      drawCharacter();
      drawDialog();
    };

    // 設置動畫
    gsap.ticker.add(animate);

    return () => {
      gsap.ticker.remove(animate);
    };
  }, [message, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      style={{
        border: '1px solid #ccc',
        backgroundColor: '#f0f0f0'
      }}
    />
  );
};
