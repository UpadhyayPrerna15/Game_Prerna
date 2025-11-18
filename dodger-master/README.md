# Dodger Master

A simple dodger game where you control a pig and avoid falling mosquitoes.

## Game Description

Control a pig using arrow keys to dodge falling mosquitoes. Each mosquito you dodge adds 1 point to your score. The game ends when you hit a mosquito.

## How to Play

**Controls:**
- Left Arrow: Move left
- Right Arrow: Move right
- Spacebar: Restart game

**Rules:**
- Dodge the falling mosquitoes
- Each dodged mosquito = 1 point
- Game ends on collision
- High score is saved automatically

## How to Run

**Simple Method:**
1. Download or clone the repository
2. Open `index.html` in your web browser

**With Local Server:**
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`

## Technologies Used

- HTML5 Canvas
- CSS3
- JavaScript (ES6)
- localStorage for high score

## Project Structure

```
dodger-master/
├── index.html
├── style.css
├── game.js
├── README.md
├── GDD.md
└── assets/
    ├── pig.png
    └── mosquito.png
```

## Learning Outcomes

**Canvas API:**
- Drawing images with `drawImage()`
- Rendering text with `fillText()`
- Clearing canvas with `clearRect()`

**Data Structures:**
- Arrays for storing mosquitoes
- Objects for player and game entities

**Algorithms:**
- Collision detection (AABB)
- Spawn timing algorithm
- Game loop with requestAnimationFrame

**Functions:**
- Modular code organization
- Reusable functions for game logic

## Credits

Developer: Prerna Upadhyay
Repository: [Game_Prerna](https://github.com/UpadhyayPrerna15/Game_Prerna)
