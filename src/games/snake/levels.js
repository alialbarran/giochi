// Snake Game Levels Configuration
// 10 themed levels with progressive difficulty

export const levels = [
    {
        id: 1,
        name: 'Amazonas',
        icon: '🌴',
        description: 'La selva tropical con sus secretos',
        difficulty: 'easy',
        speed: 150,
        theme: {
            bgColor: '#1a4d2e',
            snakeColor: '#4cb963',
            foodColor: '#ff6b35',
            obstacleColor: '#2d5016'
        },
        obstacles: [
            { x: 10, y: 10, width: 3, height: 1 },
            { x: 20, y: 15, width: 1, height: 3 }
        ],
        rewards: {
            food: 10,
            special: 50
        },
        winCondition: 100
    },
    {
        id: 2,
        name: 'África',
        icon: '🦁',
        description: 'La sabana africana al atardecer',
        difficulty: 'easy',
        speed: 140,
        theme: {
            bgColor: '#d4a574',
            snakeColor: '#8b4513',
            foodColor: '#ff4444',
            obstacleColor: '#6b4423'
        },
        obstacles: [
            { x: 8, y: 8, width: 2, height: 2 },
            { x: 22, y: 12, width: 2, height: 2 },
            { x: 15, y: 18, width: 3, height: 1 }
        ],
        rewards: {
            food: 10,
            special: 50
        },
        winCondition: 120
    },
    {
        id: 3,
        name: 'India',
        icon: '🕌',
        description: 'Los templos místicos de India',
        difficulty: 'medium',
        speed: 130,
        theme: {
            bgColor: '#ff6b35',
            snakeColor: '#ffd23f',
            foodColor: '#ee4266',
            obstacleColor: '#c44536'
        },
        obstacles: [
            { x: 5, y: 5, width: 2, height: 4 },
            { x: 23, y: 8, width: 2, height: 4 },
            { x: 12, y: 15, width: 4, height: 2 }
        ],
        rewards: {
            food: 15,
            special: 75
        },
        winCondition: 150
    },
    {
        id: 4,
        name: 'China',
        icon: '🏮',
        description: 'El jardín imperial chino',
        difficulty: 'medium',
        speed: 120,
        theme: {
            bgColor: '#c41e3a',
            snakeColor: '#ffd700',
            foodColor: '#ffffff',
            obstacleColor: '#8b0000'
        },
        obstacles: [
            { x: 7, y: 7, width: 3, height: 3 },
            { x: 20, y: 10, width: 3, height: 3 },
            { x: 10, y: 17, width: 2, height: 2 },
            { x: 18, y: 17, width: 2, height: 2 }
        ],
        rewards: {
            food: 15,
            special: 75
        },
        winCondition: 180
    },
    {
        id: 5,
        name: 'Japón',
        icon: '🗾',
        description: 'El zen de los jardines japoneses',
        difficulty: 'medium',
        speed: 110,
        theme: {
            bgColor: '#1a1a2e',
            snakeColor: '#ff6b9d',
            foodColor: '#c6538c',
            obstacleColor: '#0f0f1e'
        },
        obstacles: [
            { x: 6, y: 6, width: 4, height: 1 },
            { x: 6, y: 12, width: 4, height: 1 },
            { x: 6, y: 18, width: 4, height: 1 },
            { x: 20, y: 6, width: 4, height: 1 },
            { x: 20, y: 12, width: 4, height: 1 },
            { x: 20, y: 18, width: 4, height: 1 }
        ],
        rewards: {
            food: 20,
            special: 100
        },
        winCondition: 200
    },
    {
        id: 6,
        name: 'América',
        icon: '🗽',
        description: 'La ruta 66 americana',
        difficulty: 'hard',
        speed: 100,
        theme: {
            bgColor: '#2c3e50',
            snakeColor: '#e74c3c',
            foodColor: '#f39c12',
            obstacleColor: '#1a252f'
        },
        obstacles: [
            { x: 4, y: 8, width: 1, height: 8 },
            { x: 12, y: 4, width: 1, height: 8 },
            { x: 20, y: 8, width: 1, height: 8 },
            { x: 26, y: 4, width: 1, height: 8 }
        ],
        rewards: {
            food: 20,
            special: 100
        },
        winCondition: 220
    },
    {
        id: 7,
        name: 'Europa',
        icon: '🏰',
        description: 'Los castillos medievales europeos',
        difficulty: 'hard',
        speed: 90,
        theme: {
            bgColor: '#34495e',
            snakeColor: '#3498db',
            foodColor: '#e67e22',
            obstacleColor: '#2c3e50'
        },
        obstacles: [
            { x: 8, y: 8, width: 6, height: 1 },
            { x: 18, y: 8, width: 6, height: 1 },
            { x: 8, y: 15, width: 6, height: 1 },
            { x: 18, y: 15, width: 6, height: 1 },
            { x: 10, y: 10, width: 1, height: 4 },
            { x: 21, y: 10, width: 1, height: 4 }
        ],
        rewards: {
            food: 25,
            special: 125
        },
        winCondition: 250
    },
    {
        id: 8,
        name: 'Australia',
        icon: '🦘',
        description: 'El outback australiano',
        difficulty: 'hard',
        speed: 85,
        theme: {
            bgColor: '#d35400',
            snakeColor: '#27ae60',
            foodColor: '#f1c40f',
            obstacleColor: '#a04000'
        },
        obstacles: [
            { x: 5, y: 5, width: 3, height: 3 },
            { x: 24, y: 5, width: 3, height: 3 },
            { x: 5, y: 16, width: 3, height: 3 },
            { x: 24, y: 16, width: 3, height: 3 },
            { x: 14, y: 10, width: 4, height: 4 }
        ],
        rewards: {
            food: 25,
            special: 125
        },
        winCondition: 280
    },
    {
        id: 9,
        name: 'Metro Londres',
        icon: '🚇',
        description: 'El laberinto del metro londinense',
        difficulty: 'hard',
        speed: 75,
        theme: {
            bgColor: '#16213e',
            snakeColor: '#e94560',
            foodColor: '#f39c12',
            obstacleColor: '#0a1929'
        },
        obstacles: [
            { x: 8, y: 6, width: 1, height: 12 },
            { x: 14, y: 6, width: 1, height: 12 },
            { x: 20, y: 6, width: 1, height: 12 },
            { x: 26, y: 6, width: 1, height: 12 },
            { x: 4, y: 10, width: 10, height: 1 },
            { x: 18, y: 13, width: 10, height: 1 }
        ],
        rewards: {
            food: 30,
            special: 150
        },
        winCondition: 300
    },
    {
        id: 10,
        name: 'Metro Internacional',
        icon: '🌍',
        description: 'Los metros de París, NY, Japón y México unidos',
        difficulty: 'hard',
        speed: 65,
        theme: {
            bgColor: '#000000',
            snakeColor: '#00ff88',
            foodColor: '#ff0066',
            obstacleColor: '#1a1a1a'
        },
        obstacles: [
            // Complex maze pattern
            { x: 4, y: 4, width: 8, height: 1 },
            { x: 20, y: 4, width: 8, height: 1 },
            { x: 4, y: 9, width: 1, height: 6 },
            { x: 27, y: 9, width: 1, height: 6 },
            { x: 10, y: 12, width: 12, height: 1 },
            { x: 4, y: 19, width: 8, height: 1 },
            { x: 20, y: 19, width: 8, height: 1 },
            { x: 14, y: 6, width: 4, height: 4 },
            { x: 14, y: 14, width: 4, height: 4 }
        ],
        rewards: {
            food: 30,
            special: 150
        },
        winCondition: 350
    }
];

export function getLevelById(id) {
    return levels.find(level => level.id === id);
}

export function renderLevelSelection() {
    const levelGrid = document.querySelector('.level-grid');
    levelGrid.innerHTML = '';

    levels.forEach(level => {
        const levelCard = document.createElement('button');
        levelCard.className = 'level-card';
        levelCard.dataset.levelId = level.id;
        
        levelCard.innerHTML = `
            <div class="level-icon">${level.icon}</div>
            <h3>${level.name}</h3>
            <p class="level-description">${level.description}</p>
            <span class="level-difficulty ${level.difficulty}">
                ${level.difficulty === 'easy' ? 'Fácil' : level.difficulty === 'medium' ? 'Medio' : 'Difícil'}
            </span>
        `;

        levelCard.addEventListener('click', () => {
            const event = new CustomEvent('startLevel', { detail: { levelId: level.id } });
            document.dispatchEvent(event);
        });

        levelGrid.appendChild(levelCard);
    });
}
