import React, { useRef, useEffect, useState } from 'react';
import './Game.css';
import GameCanvas from '../GameCanvas/GameCanvas';
import GameOver from '../GameOver/GameOver';
import { PLAYER_CONFIG, OBSTACLE_CONFIG, REWARD_CONFIG, getResponsiveCanvasSize } from '../../utils/constants';
import { checkPlayerCollisions } from '../../utils/collision';
import {
  createObstacle,
  updateObstacles,
  removeOffScreenObstacles,
  constrainPlayerToBounds,
  createReward,
  updateRewards,
  removeOffScreenRewards
} from '../../utils/gameLogic';

function Game() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Game objects (useRef to persist without re-renders)
  const playerRef = useRef({
    x: canvasSize.width * PLAYER_CONFIG.startXPercent - PLAYER_CONFIG.width / 2,
    y: canvasSize.height * PLAYER_CONFIG.startYPercent,
    width: PLAYER_CONFIG.width,
    height: PLAYER_CONFIG.height,
    speed: PLAYER_CONFIG.speed
  });

  const obstaclesRef = useRef([]);
  const rewardsRef = useRef([]);
  const gameStartTimeRef = useRef(0);
  const animationIdRef = useRef(null);
  const keysPressed = useRef({ left: false, right: false });

  const updateGame = () => {
    if (keysPressed.current.left) {
      playerRef.current.x -= playerRef.current.speed;
    }
    if (keysPressed.current.right) {
      playerRef.current.x += playerRef.current.speed;
    }

    if (keysPressed.current.left || keysPressed.current.right) {
      playerRef.current = constrainPlayerToBounds(playerRef.current, canvasSize.width);
    }

    obstaclesRef.current = updateObstacles(obstaclesRef.current);
    obstaclesRef.current = removeOffScreenObstacles(obstaclesRef.current, canvasSize.height);

    rewardsRef.current = updateRewards(rewardsRef.current);
    rewardsRef.current = removeOffScreenRewards(rewardsRef.current, canvasSize.height);
    if (checkPlayerCollisions(playerRef.current, obstaclesRef.current)) {
      setGameOver(true);
      setIsPlaying(false);
      
      if (score > highScore) {
        setHighScore(score);
        setIsNewHighScore(true);
      }
    }

    rewardsRef.current = rewardsRef.current.filter(reward => {
      const collected = checkPlayerCollisions(playerRef.current, [{
        x: reward.x,
        y: reward.y,
        width: reward.size,
        height: reward.size
      }]);
      
      if (collected) {
        setScore(prevScore => prevScore + reward.points);
        return false; // Remove collected reward
      }
      return true;
    });

    if (Math.random() < OBSTACLE_CONFIG.spawnChance) {
      obstaclesRef.current.push(createObstacle(canvasSize.width));
    }

    if (Math.random() < REWARD_CONFIG.spawnChance) {
      rewardsRef.current.push(createReward(canvasSize.width));
    }
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = () => {
      updateGame();
      animationIdRef.current = requestAnimationFrame(gameLoop);
    };

    animationIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isPlaying, gameOver, score]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const scoreInterval = setInterval(() => {
      setScore(prevScore => prevScore + 1);
    }, 1000);

    return () => clearInterval(scoreInterval);
  }, [isPlaying, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        keysPressed.current.left = true;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        keysPressed.current.right = true;
      }

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (!isPlaying || gameOver) {
          startGame();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft') {
        keysPressed.current.left = false;
      }

      if (e.key === 'ArrowRight') {
        keysPressed.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, gameOver]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setShowTooltip(false);
    setIsNewHighScore(false);
    obstaclesRef.current = [];
    rewardsRef.current = [];
    keysPressed.current = { left: false, right: false };
    playerRef.current.x = canvasSize.width * PLAYER_CONFIG.startXPercent - PLAYER_CONFIG.width / 2;
    playerRef.current.y = canvasSize.height * PLAYER_CONFIG.startYPercent;
    gameStartTimeRef.current = Date.now();
  };

  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = getResponsiveCanvasSize();
      setCanvasSize(newSize);
      if (!isPlaying) {
        playerRef.current.x = newSize.width * PLAYER_CONFIG.startXPercent - PLAYER_CONFIG.width / 2;
        playerRef.current.y = newSize.height * PLAYER_CONFIG.startYPercent;
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isPlaying]);

  return (
    <div className={`game-container ${isNewHighScore && gameOver ? 'high-score-glow' : ''}`}>
      {showTooltip && !isPlaying && !gameOver && (
        <div className="game-tooltip">
          <p>🎮 Welcome to Dodger Master!</p>
          <p>🔴 Avoid falling red obstacles</p>
          <p>🟢 Collect green rewards (+10 points)</p>
          <p>⬅️➡️ Use arrow keys to move left and right</p>
          <p>🚀 Press SPACE to start!</p>
        </div>
      )}
      
      <GameCanvas 
        player={playerRef.current}
        obstacles={obstaclesRef.current}
        rewards={rewardsRef.current}
        score={score}
        highScore={highScore}
        isPlaying={isPlaying}
        gameOver={gameOver}
        canvasWidth={canvasSize.width}
        canvasHeight={canvasSize.height}
      />
      
      {gameOver && (
        <GameOver 
          score={score}
          highScore={highScore}
          isNewHighScore={isNewHighScore}
          onRestart={startGame}
        />
      )}
    </div>
  );
}

export default Game;