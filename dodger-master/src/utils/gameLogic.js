import { OBSTACLE_CONFIG, REWARD_CONFIG } from './constants';
export const createObstacle = (canvasWidth = 800) => {
  return {
    id: Date.now() + Math.random(),
    x: Math.random() * (canvasWidth - OBSTACLE_CONFIG.maxWidth),
    y: -50,
    width: OBSTACLE_CONFIG.minWidth + Math.random() * (OBSTACLE_CONFIG.maxWidth - OBSTACLE_CONFIG.minWidth),
    height: OBSTACLE_CONFIG.minHeight + Math.random() * (OBSTACLE_CONFIG.maxHeight - OBSTACLE_CONFIG.minHeight),
    speed: OBSTACLE_CONFIG.minSpeed + Math.random() * (OBSTACLE_CONFIG.maxSpeed - OBSTACLE_CONFIG.minSpeed)
  };
};

export const updateObstacles = (obstacles) => {
  return obstacles.map(obstacle => ({
    ...obstacle,
    y: obstacle.y + obstacle.speed
  }));
};

export const removeOffScreenObstacles = (obstacles, canvasHeight) => {
  return obstacles.filter(obstacle => obstacle.y < canvasHeight);
};

export const calculateScore = (startTime) => {
  return Math.floor((Date.now() - startTime) / 100);
};

export const constrainPlayerToBounds = (player, canvasWidth) => {
  let newX = player.x;
  
  if (newX < 0) {
    newX = 0;
  } else if (newX + player.width > canvasWidth) {
    newX = canvasWidth - player.width;
  }
  
  return { ...player, x: newX };
};

export const createReward = (canvasWidth = 800) => {
  return {
    id: Date.now() + Math.random(),
    x: Math.random() * (canvasWidth - REWARD_CONFIG.size),
    y: -50,
    size: REWARD_CONFIG.size,
    speed: REWARD_CONFIG.speed,
    points: REWARD_CONFIG.points
  };
};

export const updateRewards = (rewards) => {
  return rewards.map(reward => ({
    ...reward,
    y: reward.y + reward.speed
  }));
};

export const removeOffScreenRewards = (rewards, canvasHeight) => {
  return rewards.filter(reward => reward.y < canvasHeight);
};