# Game Design Document
## Dodger Master

### Game Overview
**Title:** Dodger Master  
**Genre:** Dodger / Survival  
**Platform:** Web Browser  

### Game Concept
A dodger game where the player controls a pig to avoid falling mosquitoes.

### Objective
- Dodge mosquitoes to survive
- Score 1 point for each dodged mosquito
- Beat your high score

---

## Game Mechanics

### Controls
- Left Arrow: Move left
- Right Arrow: Move right
- Spacebar: Restart

### Player
- Size: 50x50 pixels
- Speed: 5 pixels per frame
- Position: Bottom center

### Obstacles (Mosquitoes)
- Size: 40x40 pixels
- Spawn: Every 1.5 seconds
- Speed: 3 pixels per frame
- Position: Random X, top of screen

---

## Algorithms

### Collision Detection (AABB)
```
If player overlaps with mosquito:
  Game Over
```

### Spawn Algorithm
```
Every 1.5 seconds:
  Create mosquito at random X position
```

### Game Loop
```
1. Clear canvas
2. Update player position
3. Spawn mosquitoes
4. Update mosquito positions
5. Check collisions
6. Draw everything
7. Repeat
```

---

## Data Structures

**Player Object:**
- x, y (position)
- width, height (size)
- speed

**Mosquitoes Array:**
- List of mosquito objects
- Each has x, y, width, height

**Keys Object:**
- left: boolean
- right: boolean

---

## Technical Details

### Technologies
- HTML5 Canvas
- CSS3
- JavaScript
- localStorage

### Key Functions
1. `resizeCanvas()` - Responsive sizing
2. `updatePlayer()` - Player movement
3. `spawnMosquito()` - Create obstacles
4. `updateMosquitoes()` - Update positions
5. `checkCollision()` - Detect collisions
6. `gameLoop()` - Main loop

---

## UI Design

- Current score: Left side
- High score: Right side
- Game over screen with restart option

---

## Testing

**Tested:**
- Player movement
- Collision detection
- Score tracking
- High score persistence
- Canvas responsiveness
- Browser compatibility

---

## Future Improvements

1. Sound effects
2. Difficulty levels
3. Power-ups
4. Multiple lives

---

## Development Notes

**Issues Fixed:**
- Canvas resize on load
- Image loading timing
- Spacebar page scroll
- High score persistence
