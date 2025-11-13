import React from 'react';
import './GameOver.css';

function GameOver({ score, highScore, isNewHighScore, onRestart }) {
  return (
    <div className="game-over-overlay">
      <div className="game-over-content">
        <h2>Game Over!</h2>
        <p className="final-score">Final Score: {score}</p>
        {isNewHighScore && (
          <p className="new-high-score">🎉 New High Score! 🎉</p>
        )}
        <button onClick={onRestart} className="play-again-btn">
          Play Again
        </button>
        <p className="hint">or press SPACE</p>
      </div>
    </div>
  );
}

export default GameOver;