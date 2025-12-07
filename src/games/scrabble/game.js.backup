// Scrabble Game Engine
import { languageData, isValidWord } from './languages.js';

const BOARD_SIZE = 11; // 11x11 board (smaller than standard 15x15 for web)
const TILE_SIZE = 45;
const HAND_SIZE = 7;

let canvas, ctx;
let gameState = {
    running: false,
    language: 'en',
    board: [],
    bag: [],
    playerHand: [],
    currentWord: [],
    score: 0,
    selectedTile: null,
    draggedTile: null
};

export function initScrabbleGame() {
    canvas = document.getElementById('scrabble-canvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    canvas.width = BOARD_SIZE * TILE_SIZE + 100;
    canvas.height = BOARD_SIZE * TILE_SIZE + 150;
    
    // Render language selection
    renderLanguageSelection();
    
    // Setup mouse events
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleClick);
    
    // Setup buttons
    document.getElementById('new-word-btn')?.addEventListener('click', clearCurrentWord);
    document.getElementById('submit-word-btn')?.addEventListener('click', submitWord);
    document.getElementById('shuffle-btn')?.addEventListener('click', shuffleHand);
    document.getElementById('pass-btn')?.addEventListener('click', pass);
}

export function startGame(language) {
    gameState.language = language;
    gameState.score = 0;
    gameState.board = createEmptyBoard();
    gameState.bag = createLetterBag(language);
    gameState.playerHand = drawTiles(HAND_SIZE);
    gameState.currentWord = [];
    gameState.running = true;
    
    document.getElementById('scrabble-language-select').style.display = 'none';
    document.getElementById('scrabble-game-area').style.display = 'block';
    
    updateScore();
    draw();
}

function createEmptyBoard() {
    const board = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = { letter: null, locked: false };
        }
    }
    return board;
}

function createLetterBag(language) {
    const bag = [];
    const letters = languageData[language].letters;
    
    for (const [letter, data] of Object.entries(letters)) {
        for (let i = 0; i < data.count; i++) {
            bag.push({ letter, points: data.points });
        }
    }
    
    // Shuffle bag
    for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    
    return bag;
}

function drawTiles(count) {
    const tiles = [];
    for (let i = 0; i < count && gameState.bag.length > 0; i++) {
        tiles.push(gameState.bag.pop());
    }
    return tiles;
}

function draw() {
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw board
    drawBoard();
    
    // Draw player hand
    drawHand();
    
    // Draw current word being formed
    drawCurrentWord();
    
    // Draw dragged tile
    if (gameState.draggedTile) {
        drawTile(gameState.draggedTile.letter, gameState.draggedTile.points, 
                 gameState.draggedTile.x, gameState.draggedTile.y, true);
    }
}

function drawBoard() {
    const startX = 50;
    const startY = 50;
    
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const x = startX + j * TILE_SIZE;
            const y = startY + i * TILE_SIZE;
            
            // Draw cell background
            if (i === Math.floor(BOARD_SIZE / 2) && j === Math.floor(BOARD_SIZE / 2)) {
                ctx.fillStyle = '#ff6b35'; // Center star
            } else {
                ctx.fillStyle = '#2a2a2a';
            }
            ctx.fillRect(x, y, TILE_SIZE - 2, TILE_SIZE - 2);
            
            // Draw border
            ctx.strokeStyle = '#3a3a3a';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, TILE_SIZE - 2, TILE_SIZE - 2);
            
            // Draw letter if present
            const cell = gameState.board[i][j];
            if (cell.letter) {
                drawTile(cell.letter.letter, cell.letter.points, x, y, false, cell.locked);
            }
        }
    }
}

function drawHand() {
    const startX = 50;
    const startY = canvas.height - 90;
    
    // Background
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(startX - 10, startY - 10, HAND_SIZE * (TILE_SIZE + 5) + 10, TILE_SIZE + 20);
    
    // Draw tiles
    gameState.playerHand.forEach((tile, index) => {
        if (tile && (!gameState.draggedTile || gameState.draggedTile.index !== index)) {
            const x = startX + index * (TILE_SIZE + 5);
            drawTile(tile.letter, tile.points, x, startY, false);
        }
    });
}

function drawCurrentWord() {
    if (gameState.currentWord.length === 0) return;
    
    const startX = 50;
    const startY = canvas.height - 140;
    
    ctx.fillStyle = '#00ff88';
    ctx.font = '14px Arial';
    ctx.fillText('Palabra actual:', startX, startY - 10);
    
    gameState.currentWord.forEach((tile, index) => {
        const x = startX + index * (TILE_SIZE + 5);
        drawTile(tile.letter, tile.points, x, startY, true);
    });
}

function drawTile(letter, points, x, y, highlighted = false, locked = false) {
    // Tile background
    if (locked) {
        ctx.fillStyle = '#4a4a4a';
    } else if (highlighted) {
        ctx.fillStyle = '#00cc6f';
    } else {
        ctx.fillStyle = '#f4e4c1';
    }
    ctx.fillRect(x + 2, y + 2, TILE_SIZE - 6, TILE_SIZE - 6);
    
    // Tile border
    ctx.strokeStyle = locked ? '#666666' : '#d4a574';
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 2, y + 2, TILE_SIZE - 6, TILE_SIZE - 6);
    
    // Letter
    ctx.fillStyle = locked ? '#aaaaaa' : '#2a2a2a';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, x + TILE_SIZE / 2, y + TILE_SIZE / 2 - 5);
    
    // Points
    ctx.font = '10px Arial';
    ctx.fillText(points, x + TILE_SIZE - 12, y + TILE_SIZE - 8);
}

function handleMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Check if clicking on hand
    const startY = canvas.height - 90;
    const startX = 50;
    
    if (mouseY >= startY && mouseY <= startY + TILE_SIZE) {
        const index = Math.floor((mouseX - startX) / (TILE_SIZE + 5));
        if (index >= 0 && index < gameState.playerHand.length && gameState.playerHand[index]) {
            gameState.draggedTile = {
                ...gameState.playerHand[index],
                index: index,
                x: mouseX - TILE_SIZE / 2,
                y: mouseY - TILE_SIZE / 2
            };
        }
    }
}

function handleMouseMove(e) {
    if (gameState.draggedTile) {
        const rect = canvas.getBoundingClientRect();
        gameState.draggedTile.x = e.clientX - rect.left - TILE_SIZE / 2;
        gameState.draggedTile.y = e.clientY - rect.top - TILE_SIZE / 2;
        draw();
    }
}

function handleMouseUp(e) {
    if (gameState.draggedTile) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Check if dropped on current word area
        const wordY = canvas.height - 140;
        if (mouseY >= wordY && mouseY <= wordY + TILE_SIZE) {
            // Add to current word
            gameState.currentWord.push({
                letter: gameState.draggedTile.letter,
                points: gameState.draggedTile.points
            });
            gameState.playerHand[gameState.draggedTile.index] = null;
        }
        
        gameState.draggedTile = null;
        draw();
    }
}

function handleClick(e) {
    // Handle board clicks if needed
}

function clearCurrentWord() {
    // Return tiles to hand
    gameState.currentWord.forEach(tile => {
        const emptyIndex = gameState.playerHand.findIndex(t => t === null);
        if (emptyIndex !== -1) {
            gameState.playerHand[emptyIndex] = tile;
        }
    });
    gameState.currentWord = [];
    draw();
}

function submitWord() {
    if (gameState.currentWord.length < 2) {
        alert('La palabra debe tener al menos 2 letras');
        return;
    }
    
    const word = gameState.currentWord.map(t => t.letter).join('');
    
    if (isValidWord(word, gameState.language)) {
        // Calculate score
        const wordScore = gameState.currentWord.reduce((sum, tile) => sum + tile.points, 0);
        gameState.score += wordScore;
        
        // Clear current word
        gameState.currentWord = [];
        
        // Refill hand
        const newTiles = drawTiles(HAND_SIZE - gameState.playerHand.filter(t => t !== null).length);
        newTiles.forEach(tile => {
            const emptyIndex = gameState.playerHand.findIndex(t => t === null);
            if (emptyIndex !== -1) {
                gameState.playerHand[emptyIndex] = tile;
            }
        });
        
        updateScore();
        draw();
        
        alert(`¡Palabra válida! +${wordScore} puntos`);
    } else {
        alert('Palabra no válida');
    }
}

function shuffleHand() {
    const tiles = gameState.playerHand.filter(t => t !== null);
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    
    gameState.playerHand = [];
    tiles.forEach(tile => gameState.playerHand.push(tile));
    while (gameState.playerHand.length < HAND_SIZE) {
        gameState.playerHand.push(null);
    }
    
    draw();
}

function pass() {
    // Exchange current word tiles
    clearCurrentWord();
}

function updateScore() {
    document.getElementById('scrabble-score').textContent = `Puntos: ${gameState.score}`;
    document.getElementById('scrabble-tiles-left').textContent = `Fichas restantes: ${gameState.bag.length}`;
}

function renderLanguageSelection() {
    const container = document.getElementById('scrabble-language-select');
    if (!container) return;
    
    container.innerHTML = '<h2>Selecciona Idioma / Select Language</h2><div class="language-grid"></div>';
    const grid = container.querySelector('.language-grid');
    
    Object.entries(languageData).forEach(([code, data]) => {
        const button = document.createElement('button');
        button.className = 'language-card';
        button.innerHTML = `
            <div class="language-flag">${data.flag}</div>
            <h3>${data.name}</h3>
        `;
        button.addEventListener('click', () => startGame(code));
        grid.appendChild(button);
    });
}
