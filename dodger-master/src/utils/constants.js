export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;
export const getResponsiveCanvasSize = () => {
  const maxWidth = Math.min(window.innerWidth - 40, 800);
  const maxHeight = Math.min(window.innerHeight - 300, 600);
  return {
    width: maxWidth,
    height: maxHeight
  };
};

export const PLAYER_CONFIG = {
  width: 40,
  height: 40,
  speed: 8,
  startXPercent: 0.5,
  startYPercent: 0.87,
  color: '#ff6b35'
};

export const OBSTACLE_CONFIG = {
  minWidth: 30,
  maxWidth: 60,
  minHeight: 30,
  maxHeight: 60,
  minSpeed: 1.5,
  maxSpeed: 3.5,
  spawnChance: 0.02,
  color: '#ff0044'
};

export const REWARD_CONFIG = {
  size: 25,
  speed: 4,
  spawnChance: 0.01,
  points: 10,
  color: '#00cc66'
};

export const COLORS = {
  background: {
    start: '#ffffff',
    end: '#fffacd'
  },
  player: '#ff6b35',
  obstacle: '#ff0000',
  text: '#333333',
  gameOverBg: 'rgba(255, 255, 255, 0.95)'
};

export const GAME_SETTINGS = {
  fps: 60,
  scoreMultiplier: 100
};