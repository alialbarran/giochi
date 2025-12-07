// Navigation component to handle screen transitions

let screens;

// Navigate to a specific screen
export function navigateTo(screenName) {
    if (!screens) return;
    
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    if (screens[screenName]) {
        screens[screenName].classList.add('active');
    }
}

export function initNavigation() {
    // Get all screens
    screens = {
        gameSelection: document.getElementById('game-selection'),
        levelSelection: document.getElementById('level-selection'),
        gameScreen: document.getElementById('game-screen'),
        scrabbleScreen: document.getElementById('scrabble-screen')
    };

    // Game selection
    const gameCards = document.querySelectorAll('.game-card[data-game]');
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            if (game === 'snake') {
                navigateTo('levelSelection');
            } else if (game === 'scrabble') {
                navigateTo('scrabbleScreen');
            }
        });
    });

    // Back buttons
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentScreen = document.querySelector('.screen.active');
            if (currentScreen.id === 'level-selection') {
                navigateTo('gameSelection');
            } else if (currentScreen.id === 'game-screen') {
                navigateTo('levelSelection');
                // Stop game if running
                const event = new CustomEvent('stopGame');
                document.dispatchEvent(event);
            } else if (currentScreen.id === 'scrabble-screen') {
                navigateTo('gameSelection');
            }
        });
    });

    // Expose navigation function globally for other modules
    window.navigateTo = navigateTo;
}
