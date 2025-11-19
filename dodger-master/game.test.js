const { test } = require('@jest/globals');
const { checkCollisionBetween, isWithinBounds } = require ('./gameLogic');

test ('detects collision between two objects', () => {
    const player = { x:100, y:100, width: 50, height: 50 };
    const mosquito = { x:120, y:120, width: 30, height: 30 };
    
    const result = checkCollisionBetween(player, mosquito);
    expect(result).toBe(true);
});

test ('detects no collision between two objects', () => {
    const player = { x:100, y:100, width: 50, height: 50 };
    const mosquito = { x:200, y:200, width: 30, height: 30 };
    
    const result = checkCollisionBetween(player, mosquito);
    expect(result).toBe(false);
});

test ( 'checks if an object is within bounds', () => {
    const x = 100;
    const width = 50;
    const canvasWidth = 500;

    const result = isWithinBounds(x, width, canvasWidth);
    expect(result).toBe(true);
});

test ( 'checks if an object is out of bounds', () => {
    const x = 480;
    const width = 50;
    const canvasWidth = 500;

    const result = isWithinBounds(x, width, canvasWidth);
    expect(result).toBe(false);
});