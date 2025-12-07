// Scrabble Levels Configuration

export const scrabbleLevels = [
    {
        id: 1,
        name: 'Principiante',
        icon: '🌱',
        description: 'Forma 10 palabras válidas',
        difficulty: 'easy',
        wordsRequired: 10,
        minWordLength: 2,
        minScore: 0,
        timeLimit: null, // unlimited
        wildcardsAvailable: true
    },
    {
        id: 2,
        name: 'Intermedio',
        icon: '🌿',
        description: 'Forma 25 palabras de 3+ letras',
        difficulty: 'medium',
        wordsRequired: 25,
        minWordLength: 3,
        minScore: 150,
        timeLimit: null,
        wildcardsAvailable: true
    },
    {
        id: 3,
        name: 'Avanzado',
        icon: '🌳',
        description: 'Forma 35 palabras de 4+ letras en 15 minutos',
        difficulty: 'hard',
        wordsRequired: 35,
        minWordLength: 4,
        minScore: 300,
        timeLimit: 15 * 60, // 15 minutes in seconds
        wildcardsAvailable: false
    }
];

// Sample word meanings (in production, use a dictionary API)
export const wordMeanings = {
    // English
    'CAT': 'A small domesticated carnivorous mammal',
    'DOG': 'A domesticated carnivorous mammal',
    'WORD': 'A single distinct meaningful element of speech or writing',
    'GAME': 'A form of play or sport',
    'PLAY': 'Engage in activity for enjoyment',
    'SCORE': 'The number of points achieved',
    'TILE': 'A thin rectangular slab',
    'BOARD': 'A flat panel used for various purposes',
    
    // Italian
    'GATTO': 'Un piccolo mammifero carnivoro domestico',
    'CANE': 'Un mammifero carnivoro domesticato',
    'PAROLA': 'Un singolo elemento significativo del discorso',
    'GIOCO': 'Una forma di gioco o sport',
    
    // German
    'KATZE': 'Ein kleines domestiziertes fleischfressendes Säugetier',
    'HUND': 'Ein domestiziertes fleischfressendes Säugetier',
    'WORT': 'Ein einzelnes bedeutsames Element der Sprache',
    'SPIEL': 'Eine Form des Spiels oder Sports',
    
    // French
    'CHAT': 'Un petit mammifère carnivore domestiqué',
    'CHIEN': 'Un mammifère carnivore domestiqué',
    'MOT': 'Un seul élément significatif du discours',
    'JEU': 'Une forme de jeu ou de sport'
};

export function getWordMeaning(word, language) {
    const upperWord = word.toUpperCase();
    return wordMeanings[upperWord] || 'Palabra válida sin definición disponible / Valid word, definition unavailable';
}

export function getLevelById(id) {
    return scrabbleLevels.find(level => level.id === id);
}

export function renderLevelSelection() {
    const levelGrid = document.querySelector('.scrabble-level-grid');
    if (!levelGrid) return;
    
    levelGrid.innerHTML = '';

    scrabbleLevels.forEach(level => {
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
            const event = new CustomEvent('startScrabbleLevel', { 
                detail: { levelId: level.id } 
            });
            document.dispatchEvent(event);
        });

        levelGrid.appendChild(levelCard);
    });
}
