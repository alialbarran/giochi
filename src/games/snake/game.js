// Snake Game Engine
import { levels, getLevelById, renderLevelSelection } from './levels.js';

// Constants
const CANVAS_SIZE = 600;
const TILE_COUNT = 30;
const SPECIAL_FOOD_RESPAWN_DELAY = 5000;
const SPECIAL_FOOD_TIMEOUT = 10000;

let canvas, ctx;
let gameState = {
    running: false,
    paused: false,
    score: 0,
    highScore: 0,
    currentLevel: null,
    snake: [],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: null,
    specialFood: null,
    gameLoop: null,
    gridSize: 20,
    tileCount: TILE_COUNT
};

export function initSnakeGame() {
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    
    // Calculate grid settings
    gameState.gridSize = canvas.width / gameState.tileCount;
    
    // Load high score from localStorage
    gameState.highScore = parseInt(localStorage.getItem('snakeHighScore') || '0');
    updateHighScore();
    
    // Render level selection
    renderLevelSelection();
    
    // Listen for level start
    document.addEventListener('startLevel', (e) => {
        startLevel(e.detail.levelId);
    });
    
    // Listen for game stop
    document.addEventListener('stopGame', () => {
        stopGame();
    });
    
    // Game controls
    document.getElementById('pause-button').addEventListener('click', togglePause);
    document.getElementById('restart-button').addEventListener('click', restartGame);
    document.getElementById('levels-button').addEventListener('click', () => {
        stopGame();
        window.navigateTo('levelSelection');
    });
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
}

function startLevel(levelId) {
    const level = getLevelById(levelId);
    if (!level) return;
    
    gameState.currentLevel = level;
    gameState.score = 0;
    gameState.running = true;
    gameState.paused = false;
    
    // Initialize snake in center
    const centerX = Math.floor(gameState.tileCount / 2);
    const centerY = Math.floor(gameState.tileCount / 2);
    gameState.snake = [
        { x: centerX, y: centerY },
        { x: centerX - 1, y: centerY },
        { x: centerX - 2, y: centerY }
    ];
    
    gameState.direction = { x: 1, y: 0 };
    gameState.nextDirection = { x: 1, y: 0 };
    
    // Place initial food
    spawnFood();
    spawnSpecialFood();
    
    // Update UI
    document.getElementById('level-name').textContent = level.name + ' ' + level.icon;
    updateScore();
    document.getElementById('game-over').classList.remove('active');
    document.getElementById('pause-button').textContent = 'Pausar';
    
    // Navigate to game screen
    window.navigateTo('gameScreen');
    
    // Start game loop
    if (gameState.gameLoop) clearInterval(gameState.gameLoop);
    gameState.gameLoop = setInterval(gameUpdate, level.speed);
}

function gameUpdate() {
    if (!gameState.running || gameState.paused) return;
    
    // Update direction
    gameState.direction = { ...gameState.nextDirection };
    
    // Calculate new head position
    const head = { ...gameState.snake[0] };
    head.x += gameState.direction.x;
    head.y += gameState.direction.y;
    
    // Check wall collision
    if (head.x < 0 || head.x >= gameState.tileCount || 
        head.y < 0 || head.y >= gameState.tileCount) {
        gameOver();
        return;
    }
    
    // Check self collision
    if (gameState.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    // Check obstacle collision
    if (checkObstacleCollision(head)) {
        gameOver();
        return;
    }
    
    // Add new head
    gameState.snake.unshift(head);
    
    // Check food collision
    let ate = false;
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
        gameState.score += gameState.currentLevel.rewards.food;
        updateScore();
        spawnFood();
        ate = true;
    }
    
    // Check special food collision
    if (gameState.specialFood && 
        head.x === gameState.specialFood.x && 
        head.y === gameState.specialFood.y) {
        gameState.score += gameState.currentLevel.rewards.special;
        updateScore();
        gameState.specialFood = null;
        // Spawn new special food later
        setTimeout(spawnSpecialFood, SPECIAL_FOOD_RESPAWN_DELAY);
        ate = true;
    }
    
    // Remove tail if didn't eat
    if (!ate) {
        gameState.snake.pop();
    }
    
    // Check win condition
    if (gameState.score >= gameState.currentLevel.winCondition) {
        levelComplete();
        return;
    }
    
    draw();
}

function draw() {
    const level = gameState.currentLevel;
    
    // Clear canvas
    ctx.fillStyle = level.theme.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid (subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= gameState.tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gameState.gridSize, 0);
        ctx.lineTo(i * gameState.gridSize, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * gameState.gridSize);
        ctx.lineTo(canvas.width, i * gameState.gridSize);
        ctx.stroke();
    }
    
    // Draw obstacles
    ctx.fillStyle = level.theme.obstacleColor;
    level.obstacles.forEach(obstacle => {
        ctx.fillRect(
            obstacle.x * gameState.gridSize,
            obstacle.y * gameState.gridSize,
            obstacle.width * gameState.gridSize,
            obstacle.height * gameState.gridSize
        );
        // Add border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        ctx.strokeRect(
            obstacle.x * gameState.gridSize,
            obstacle.y * gameState.gridSize,
            obstacle.width * gameState.gridSize,
            obstacle.height * gameState.gridSize
        );
    });
    
    // Draw snake
    gameState.snake.forEach((segment, index) => {
        if (index === 0) {
            // Head - brighter
            ctx.fillStyle = level.theme.snakeColor;
        } else {
            // Body - slightly darker
            ctx.fillStyle = adjustBrightness(level.theme.snakeColor, -20);
        }
        
        ctx.fillRect(
            segment.x * gameState.gridSize + 1,
            segment.y * gameState.gridSize + 1,
            gameState.gridSize - 2,
            gameState.gridSize - 2
        );
        
        // Add shine effect on head
        if (index === 0) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(
                segment.x * gameState.gridSize + 2,
                segment.y * gameState.gridSize + 2,
                gameState.gridSize / 2,
                gameState.gridSize / 2
            );
        }
    });
    
    // Draw food
    if (gameState.food) {
        ctx.fillStyle = level.theme.foodColor;
        ctx.beginPath();
        ctx.arc(
            gameState.food.x * gameState.gridSize + gameState.gridSize / 2,
            gameState.food.y * gameState.gridSize + gameState.gridSize / 2,
            gameState.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = level.theme.foodColor;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    
    // Draw special food
    if (gameState.specialFood) {
        ctx.fillStyle = '#ffdd00';
        ctx.beginPath();
        ctx.arc(
            gameState.specialFood.x * gameState.gridSize + gameState.gridSize / 2,
            gameState.specialFood.y * gameState.gridSize + gameState.gridSize / 2,
            gameState.gridSize / 2 - 1,
            0,
            Math.PI * 2
        );
        ctx.fill();
        
        // Star effect
        ctx.fillStyle = '#ffffff';
        ctx.font = `${gameState.gridSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            '⭐',
            gameState.specialFood.x * gameState.gridSize + gameState.gridSize / 2,
            gameState.specialFood.y * gameState.gridSize + gameState.gridSize / 2
        );
    }
}

function spawnFood() {
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * gameState.tileCount),
            y: Math.floor(Math.random() * gameState.tileCount)
        };
    } while (
        gameState.snake.some(segment => segment.x === position.x && segment.y === position.y) ||
        checkObstacleCollision(position) ||
        (gameState.specialFood && position.x === gameState.specialFood.x && position.y === gameState.specialFood.y)
    );
    
    gameState.food = position;
}

function spawnSpecialFood() {
    if (!gameState.running) return;
    
    let position;
    do {
        position = {
            x: Math.floor(Math.random() * gameState.tileCount),
            y: Math.floor(Math.random() * gameState.tileCount)
        };
    } while (
        gameState.snake.some(segment => segment.x === position.x && segment.y === position.y) ||
        checkObstacleCollision(position) ||
        (gameState.food && position.x === gameState.food.x && position.y === gameState.food.y)
    );
    
    gameState.specialFood = position;
    
    // Special food disappears after timeout
    setTimeout(() => {
        if (gameState.specialFood === position) {
            gameState.specialFood = null;
        }
    }, SPECIAL_FOOD_TIMEOUT);
}

function checkObstacleCollision(position) {
    return gameState.currentLevel.obstacles.some(obstacle => {
        return position.x >= obstacle.x && 
               position.x < obstacle.x + obstacle.width &&
               position.y >= obstacle.y && 
               position.y < obstacle.y + obstacle.height;
    });
}

function handleKeyPress(e) {
    if (!gameState.running) return;
    
    const key = e.key.toLowerCase();
    
    // Prevent default for arrow keys
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
    }
    
    // Change direction (can't go backwards)
    if ((key === 'arrowup' || key === 'w') && gameState.direction.y === 0) {
        gameState.nextDirection = { x: 0, y: -1 };
    } else if ((key === 'arrowdown' || key === 's') && gameState.direction.y === 0) {
        gameState.nextDirection = { x: 0, y: 1 };
    } else if ((key === 'arrowleft' || key === 'a') && gameState.direction.x === 0) {
        gameState.nextDirection = { x: -1, y: 0 };
    } else if ((key === 'arrowright' || key === 'd') && gameState.direction.x === 0) {
        gameState.nextDirection = { x: 1, y: 0 };
    } else if (key === 'p' || key === ' ') {
        togglePause();
    } else if (key === 'escape') {
        stopGame();
        window.navigateTo('levelSelection');
    }
}

function togglePause() {
    if (!gameState.running) return;
    
    gameState.paused = !gameState.paused;
    document.getElementById('pause-button').textContent = gameState.paused ? 'Reanudar' : 'Pausar';
}

function updateScore() {
    document.getElementById('score').textContent = `Puntos: ${gameState.score}`;
    
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('snakeHighScore', gameState.highScore.toString());
        updateHighScore();
    }
}

function updateHighScore() {
    document.getElementById('high-score').textContent = `Récord: ${gameState.highScore}`;
}

function gameOver() {
    gameState.running = false;
    if (gameState.gameLoop) clearInterval(gameState.gameLoop);
    
    document.getElementById('final-score').textContent = `Puntuación: ${gameState.score}`;
    document.getElementById('level-complete').textContent = '';
    document.getElementById('game-over').classList.add('active');
}

function levelComplete() {
    gameState.running = false;
    if (gameState.gameLoop) clearInterval(gameState.gameLoop);
    
    document.getElementById('final-score').textContent = `Puntuación: ${gameState.score}`;
    document.getElementById('level-complete').textContent = '🎉 ¡Nivel Completado! 🎉';
    document.getElementById('game-over').classList.add('active');
}

function restartGame() {
    if (gameState.currentLevel) {
        startLevel(gameState.currentLevel.id);
    }
}

function stopGame() {
    gameState.running = false;
    if (gameState.gameLoop) {
        clearInterval(gameState.gameLoop);
        gameState.gameLoop = null;
    }
}

function adjustBrightness(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
}
