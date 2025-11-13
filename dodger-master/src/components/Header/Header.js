import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <h1 className="game-title">🎮 Dodger Master 🎮</h1>
      <p className="game-subtitle">Avoid the red obstacles and collect green rewards!</p>
    </header>
  );
}

export default Header;