// Scrabble Game - Multi-language word game
// Supports: English, Italian, German, French

// Language-specific letter distributions and points
export const languageData = {
    en: {
        name: 'English',
        flag: '🇬🇧',
        letters: {
            'A': { count: 9, points: 1 }, 'B': { count: 2, points: 3 }, 'C': { count: 2, points: 3 },
            'D': { count: 4, points: 2 }, 'E': { count: 12, points: 1 }, 'F': { count: 2, points: 4 },
            'G': { count: 3, points: 2 }, 'H': { count: 2, points: 4 }, 'I': { count: 9, points: 1 },
            'J': { count: 1, points: 8 }, 'K': { count: 1, points: 5 }, 'L': { count: 4, points: 1 },
            'M': { count: 2, points: 3 }, 'N': { count: 6, points: 1 }, 'O': { count: 8, points: 1 },
            'P': { count: 2, points: 3 }, 'Q': { count: 1, points: 10 }, 'R': { count: 6, points: 1 },
            'S': { count: 4, points: 1 }, 'T': { count: 6, points: 1 }, 'U': { count: 4, points: 1 },
            'V': { count: 2, points: 4 }, 'W': { count: 2, points: 4 }, 'X': { count: 1, points: 8 },
            'Y': { count: 2, points: 4 }, 'Z': { count: 1, points: 10 }, '_': { count: 2, points: 0 }
        }
    },
    it: {
        name: 'Italiano',
        flag: '🇮🇹',
        letters: {
            'A': { count: 11, points: 1 }, 'B': { count: 3, points: 5 }, 'C': { count: 6, points: 2 },
            'D': { count: 3, points: 5 }, 'E': { count: 11, points: 1 }, 'F': { count: 3, points: 5 },
            'G': { count: 2, points: 8 }, 'H': { count: 2, points: 8 }, 'I': { count: 12, points: 1 },
            'L': { count: 5, points: 3 }, 'M': { count: 5, points: 3 }, 'N': { count: 5, points: 3 },
            'O': { count: 15, points: 1 }, 'P': { count: 3, points: 5 }, 'Q': { count: 1, points: 10 },
            'R': { count: 6, points: 2 }, 'S': { count: 6, points: 2 }, 'T': { count: 6, points: 2 },
            'U': { count: 5, points: 3 }, 'V': { count: 3, points: 5 }, 'Z': { count: 2, points: 8 },
            '_': { count: 2, points: 0 }
        }
    },
    de: {
        name: 'Deutsch',
        flag: '🇩🇪',
        letters: {
            'A': { count: 5, points: 1 }, 'Ä': { count: 1, points: 6 }, 'B': { count: 2, points: 3 },
            'C': { count: 2, points: 4 }, 'D': { count: 4, points: 1 }, 'E': { count: 15, points: 1 },
            'F': { count: 2, points: 4 }, 'G': { count: 3, points: 2 }, 'H': { count: 4, points: 2 },
            'I': { count: 6, points: 1 }, 'J': { count: 1, points: 6 }, 'K': { count: 2, points: 4 },
            'L': { count: 3, points: 2 }, 'M': { count: 4, points: 3 }, 'N': { count: 9, points: 1 },
            'O': { count: 3, points: 2 }, 'Ö': { count: 1, points: 8 }, 'P': { count: 1, points: 4 },
            'Q': { count: 1, points: 10 }, 'R': { count: 6, points: 1 }, 'S': { count: 7, points: 1 },
            'T': { count: 6, points: 1 }, 'U': { count: 6, points: 1 }, 'Ü': { count: 1, points: 6 },
            'V': { count: 1, points: 6 }, 'W': { count: 1, points: 3 }, 'X': { count: 1, points: 8 },
            'Y': { count: 1, points: 10 }, 'Z': { count: 1, points: 3 }, '_': { count: 2, points: 0 }
        }
    },
    fr: {
        name: 'Français',
        flag: '🇫🇷',
        letters: {
            'A': { count: 9, points: 1 }, 'B': { count: 2, points: 3 }, 'C': { count: 2, points: 3 },
            'D': { count: 3, points: 2 }, 'E': { count: 15, points: 1 }, 'F': { count: 2, points: 4 },
            'G': { count: 2, points: 2 }, 'H': { count: 2, points: 4 }, 'I': { count: 8, points: 1 },
            'J': { count: 1, points: 8 }, 'K': { count: 1, points: 10 }, 'L': { count: 5, points: 1 },
            'M': { count: 3, points: 2 }, 'N': { count: 6, points: 1 }, 'O': { count: 6, points: 1 },
            'P': { count: 2, points: 3 }, 'Q': { count: 1, points: 8 }, 'R': { count: 6, points: 1 },
            'S': { count: 6, points: 1 }, 'T': { count: 6, points: 1 }, 'U': { count: 6, points: 1 },
            'V': { count: 2, points: 4 }, 'W': { count: 1, points: 10 }, 'X': { count: 1, points: 10 },
            'Y': { count: 1, points: 10 }, 'Z': { count: 1, points: 10 }, '_': { count: 2, points: 0 }
        }
    }
};

// Basic word lists for validation (simplified - in production, use a dictionary API)
export const basicWords = {
    en: ['CAT', 'DOG', 'WORD', 'GAME', 'PLAY', 'SCORE', 'TILE', 'BOARD'],
    it: ['GATTO', 'CANE', 'PAROLA', 'GIOCO', 'GIOCA', 'PUNTO'],
    de: ['KATZE', 'HUND', 'WORT', 'SPIEL', 'PUNKT', 'BRETT'],
    fr: ['CHAT', 'CHIEN', 'MOT', 'JEU', 'JOUER', 'POINT']
};

export function isValidWord(word, language) {
    // Simplified validation - accepts any word of 2+ letters
    // In production, integrate with a dictionary API
    if (word.length < 2) return false;
    
    // Check against basic word list if available
    const wordList = basicWords[language];
    if (wordList && wordList.includes(word.toUpperCase())) {
        return true;
    }
    
    // Accept any word with 2+ letters for now (flexible gameplay)
    return word.length >= 2;
}
