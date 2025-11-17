const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    speed: 5
}

// Mosquitoes array
const mosquitoes = [];
const mosquitoImage = new Image();
mosquitoImage.src = 'assets/mosquito.png';

// Mosquito properties
const mosquitoWidth = 40;
const mosquitoHeight = 40;
const mosquitoSpeed = 3;
const spawnInterval = 1500; // milliseconds

// Game state
let score = 0;
let highScore = localStorage.getItem('dodgerHighScore') || 0;
let gameOver = false;
let lastSpawnTime = 0;

// Make canvas responsive
function resizeCanvas() {
    const gameArea = document.getElementById('gameArea');
    canvas.width = gameArea.clientWidth;
    canvas.height = gameArea.clientHeight;
    
    // Update player position
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - 80;
}

// Initial resize
resizeCanvas();

// Resize on window resize
window.addEventListener('resize', resizeCanvas);

const pigImage = new Image();
pigImage.src = 'assets/pig.png';

const keys = {
    left: false,
    right: false
};

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') keys.left = true;
    if(e.key === 'ArrowRight') keys.right = true;
});

document.addEventListener('keyup', (e) =>{
    if(e.key === 'ArrowLeft') keys.left = false;
    if(e.key === 'ArrowRight') keys.right = false;
});

function updatePlayer(){
    if(keys.left && player.x > 10){
        player.x -= player.speed;
    }

    if(keys.right && player.x < canvas.width - player.width - 10){
        player.x += player.speed;
    }
}

// Spawn mosquitoes
function spawnMosquito(currentTime) {
    if (currentTime - lastSpawnTime > spawnInterval) {
        const x = Math.random() * (canvas.width - mosquitoWidth);
        mosquitoes.push({
            x: x,
            y: -mosquitoHeight,
            width: mosquitoWidth,
            height: mosquitoHeight
        });
        lastSpawnTime = currentTime;
    }
}

// Update mosquitoes
function updateMosquitoes() {
    for (let i = mosquitoes.length - 1; i >= 0; i--) {
        mosquitoes[i].y += mosquitoSpeed;
        
        // Remove mosquitoes that fall off screen
        if (mosquitoes[i].y > canvas.height) {
            mosquitoes.splice(i, 1);
            score++; // Increase score when mosquito is dodged
            updateScoreDisplay();
        }
    }
}

// Check collision
function checkCollision() {
    for (let mosquito of mosquitoes) {
        if (player.x < mosquito.x + mosquito.width &&
            player.x + player.width > mosquito.x &&
            player.y < mosquito.y + mosquito.height &&
            player.y + player.height > mosquito.y) {
            gameOver = true;
            
            // Update high score
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('dodgerHighScore', highScore);
                updateScoreDisplay();
            }
        }
    }
}

function drawPlayer(){
    ctx.drawImage(pigImage, player.x, player.y, player.width, player.height);
}

// Draw mosquitoes
function drawMosquitoes() {
    for (let mosquito of mosquitoes) {
        ctx.drawImage(mosquitoImage, mosquito.x, mosquito.y, mosquito.width, mosquito.height);
    }
}

// Update score display
function updateScoreDisplay() {
    document.getElementById('currentScore').textContent = score;
    document.getElementById('highScore').textContent = highScore;
}

// Draw score on canvas
function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeText('Score: ' + score, 20, 35);
    ctx.fillText('Score: ' + score, 20, 35);
}

// Draw game over
function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.textAlign = 'center';
    
    // Game Over text with glow effect
    ctx.fillStyle = 'red';
    ctx.font = 'bold 56px Arial';
    ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
    ctx.shadowBlur = 20;
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 50);
    
    ctx.shadowBlur = 0;
    
    // Score
    ctx.fillStyle = 'white';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 10);
    
    // High score
    if (score === highScore && score > 0) {
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('🎉 NEW HIGH SCORE! 🎉', canvas.width / 2, canvas.height / 2 + 50);
    } else {
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('High Score: ' + highScore, canvas.width / 2, canvas.height / 2 + 50);
    }
    
    // Restart instruction
    ctx.fillStyle = 'lightgreen';
    ctx.font = '20px Arial';
    ctx.fillText('Press SPACEBAR to Restart', canvas.width / 2, canvas.height / 2 + 90);
    
    ctx.textAlign = 'left';
}

// Restart game
function restartGame() {
    gameOver = false;
    score = 0;
    mosquitoes.length = 0;
    lastSpawnTime = 0;
    player.x = canvas.width / 2 - player.width / 2;
    player.y = canvas.height - 80;
    updateScoreDisplay();
}

// Listen for restart
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.code === 'Space') {
        if (gameOver) {
            e.preventDefault(); // Prevent page scroll
            restartGame();
        }
    }
});

function gameLoop(currentTime){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!gameOver) {
        updatePlayer();
        spawnMosquito(currentTime);
        updateMosquitoes();
        checkCollision();
        
        drawPlayer();
        drawMosquitoes();
        drawScore();
    } else {
        drawPlayer();
        drawMosquitoes();
        drawGameOver();
    }
    
    requestAnimationFrame(gameLoop);
}

let imagesLoaded = 0;
const totalImages = 2;

function checkImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        console.log('All images loaded successfully');
        updateScoreDisplay(); // Initialize score display
        gameLoop(0);
    }
}

pigImage.onerror = () => {
    console.error('Failed to load pig image!');
};

pigImage.onload = () => {
    console.log('Pig image loaded');
    checkImagesLoaded();
};

mosquitoImage.onerror = () => {
    console.error('Failed to load mosquito image!');
};

mosquitoImage.onload = () => {
    console.log('Mosquito image loaded');
    checkImagesLoaded();
};