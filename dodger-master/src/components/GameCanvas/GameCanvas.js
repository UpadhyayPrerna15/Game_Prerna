import React, { useRef, useEffect } from 'react';
import './GameCanvas.css';
import { COLORS, REWARD_CONFIG } from '../../utils/constants';

function GameCanvas({ player, obstacles, rewards, score, highScore, isPlaying, gameOver, canvasWidth, canvasHeight }) {
  const canvasRef = useRef(null);
  const drawBackground = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    gradient.addColorStop(0, COLORS.background.start);
    gradient.addColorStop(1, COLORS.background.end);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const drawPlayer = (ctx) => {
    ctx.fillStyle = COLORS.player;
    ctx.shadowBlur = 10;
    ctx.shadowColor = COLORS.player;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.shadowBlur = 0;
  };

  const drawObstacles = (ctx) => {
    ctx.fillStyle = COLORS.obstacle;
    ctx.shadowBlur = 8;
    ctx.shadowColor = COLORS.obstacle;
    obstacles.forEach(obstacle => {
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
    ctx.shadowBlur = 0;
  };

  const drawRewards = (ctx) => {
    ctx.fillStyle = REWARD_CONFIG.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = REWARD_CONFIG.color;
    rewards.forEach(reward => {
      ctx.beginPath();
      ctx.arc(reward.x + reward.size / 2, reward.y + reward.size / 2, reward.size / 2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;
  };

  const drawScore = (ctx) => {
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 24px Arial';
    ctx.fillText(`Score: ${score}`, 20, 40);
    ctx.fillText(`High Score: ${highScore}`, 20, 70);
  };

  const drawInstructions = (ctx) => {
    if (!isPlaying && !gameOver) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = 'bold 30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Press SPACE to Start', canvasWidth / 2, canvasHeight / 2);
      ctx.font = '20px Arial';
      ctx.fillText('Use ← → Arrow Keys to Move', canvasWidth / 2, canvasHeight / 2 + 40);
      ctx.textAlign = 'left';
    }
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground(ctx);
    drawPlayer(ctx);
    drawObstacles(ctx);
    drawRewards(ctx);
    drawScore(ctx);
    drawInstructions(ctx);
  };

  useEffect(() => {
    render();
  }, [player, obstacles, rewards, score, highScore, isPlaying, gameOver, canvasWidth, canvasHeight]);

  return (
    <canvas 
      ref={canvasRef} 
      width={canvasWidth} 
      height={canvasHeight}
      className="game-canvas"
    />
  );
}

export default GameCanvas;