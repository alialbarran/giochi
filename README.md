# 🎮 Giochi

Juegos retro re-diseñados y otros más originales - Una colección moderna de juegos clásicos con un toque contemporáneo.

## 🌟 Características

- **Diseño Modular**: Estructura profesional que facilita la adición de nuevos juegos
- **Visual Moderno**: Paleta de colores minimalista inspirada en diseños contemporáneos
- **Múltiples Niveles**: Cada juego incluye niveles temáticos con dificultad progresiva
- **Personalización**: Sistema de skins y escenarios fácilmente modificable
- **Responsive**: Funciona en desktop y dispositivos móviles
- **Sin Dependencias**: JavaScript vanilla puro, sin frameworks pesados

## 🐍 Snake - Primer Juego

### Niveles Temáticos

El juego incluye 10 niveles únicos con temáticas diversas:

1. **🌴 Amazonas** - La selva tropical con sus secretos (Fácil)
2. **🦁 África** - La sabana africana al atardecer (Fácil)
3. **🕌 India** - Los templos místicos de India (Medio)
4. **🏮 China** - El jardín imperial chino (Medio)
5. **🗾 Japón** - El zen de los jardines japoneses (Medio)
6. **🗽 América** - La ruta 66 americana (Difícil)
7. **🏰 Europa** - Los castillos medievales europeos (Difícil)
8. **🦘 Australia** - El outback australiano (Difícil)
9. **🚇 Metro Londres** - El laberinto del metro londinense (Difícil)
10. **🌍 Metro Internacional** - Los metros de París, NY, Japón y México unidos (Difícil)

### Características del Juego

- **Obstáculos Únicos**: Cada nivel tiene patrones de obstáculos temáticos
- **Sistema de Premios**: Comida normal (+10-30 pts) y especial (⭐ +50-150 pts)
- **Dificultad Progresiva**: Velocidad y complejidad aumentan con cada nivel
- **Récord Personal**: Sistema de high score guardado localmente

### Controles

- **Flechas del teclado** o **WASD**: Mover la serpiente
- **P o Espacio**: Pausar/Reanudar
- **ESC**: Volver al menú de niveles

## 🚀 Inicio Rápido

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/alialbarran/giochi.git
cd giochi

# Instalar dependencias (opcional, solo para desarrollo)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Uso Directo

Simplemente abre `index.html` en tu navegador. No requiere servidor para funcionar.

## 📁 Estructura del Proyecto

```
giochi/
├── index.html              # Punto de entrada HTML
├── package.json            # Configuración del proyecto
├── README.md              # Este archivo
├── src/
│   ├── games/             # Directorio de juegos
│   │   └── snake/         # Juego Snake
│   │       ├── game.js    # Motor del juego
│   │       └── levels.js  # Configuración de niveles
│   ├── components/        # Componentes reutilizables
│   │   └── navigation.js  # Sistema de navegación
│   ├── styles/            # Estilos CSS
│   │   ├── main.css       # Estilos globales
│   │   └── snake.css      # Estilos específicos de Snake
│   ├── assets/            # Recursos multimedia
│   │   ├── images/        # Imágenes y sprites
│   │   ├── sounds/        # Efectos de sonido
│   │   └── fonts/         # Fuentes personalizadas
│   └── telegram/          # Integración Telegram (futuro)
└── .gitignore            # Archivos ignorados por Git
```

## 🎨 Personalización

### Agregar un Nuevo Nivel

1. Abre `src/games/snake/levels.js`
2. Agrega un nuevo objeto al array `levels`:

```javascript
{
    id: 11,
    name: 'Tu Nivel',
    icon: '🎯',
    description: 'Descripción del nivel',
    difficulty: 'medium',  // easy, medium, hard
    speed: 100,            // ms por frame (menor = más rápido)
    theme: {
        bgColor: '#1a1a1a',
        snakeColor: '#00ff88',
        foodColor: '#ff0066',
        obstacleColor: '#333333'
    },
    obstacles: [
        { x: 10, y: 10, width: 3, height: 1 }
    ],
    rewards: {
        food: 20,
        special: 100
    },
    winCondition: 200
}
```

### Cambiar Colores y Tema

Los colores principales se definen en `src/styles/main.css` usando variables CSS:

```css
:root {
    --primary-bg: #0a0a0a;
    --accent-color: #00ff88;
    /* ... más variables */
}
```

### Agregar Assets

1. Coloca tus imágenes en `src/assets/images/`
2. Sonidos en `src/assets/sounds/`
3. Fuentes en `src/assets/fonts/`
4. Referencia desde CSS o JavaScript según sea necesario

## 🤝 Cómo Contribuir

¡Las contribuciones son bienvenidas! Aquí está cómo puedes ayudar:

### Agregar un Nuevo Juego

1. Crea un nuevo directorio en `src/games/tu-juego/`
2. Implementa el motor del juego siguiendo la estructura de Snake
3. Agrega estilos en `src/styles/tu-juego.css`
4. Registra el juego en el selector principal (`index.html`)
5. Actualiza este README con la documentación del juego

### Agregar Niveles o Skins

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nuevo-nivel`)
3. Agrega tus cambios en los archivos correspondientes
4. Commit tus cambios (`git commit -m 'feat: Agregar nivel Océano'`)
5. Push a la rama (`git push origin feature/nuevo-nivel`)
6. Abre un Pull Request

### Reportar Bugs

Abre un [issue](https://github.com/alialbarran/giochi/issues) describiendo:
- El problema encontrado
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots si es posible

## 🗺️ Hoja de Ruta

### Versión 0.2 (Próximamente)
- [ ] Efectos de sonido y música
- [ ] Animaciones mejoradas
- [ ] Modo multijugador local
- [ ] Más skins para Snake
- [ ] Sistema de logros

### Versión 0.3
- [ ] Segundo juego: Tetris con niveles temáticos
- [ ] Integración con Telegram
- [ ] Tabla de clasificación global
- [ ] Modo torneo

### Versión 1.0
- [ ] 5+ juegos completos
- [ ] Editor de niveles
- [ ] Sistema de mods
- [ ] PWA (Progressive Web App)

## 🎯 Objetivos del Proyecto

1. **Educativo**: Servir como ejemplo de código limpio y modular
2. **Colaborativo**: Facilitar contribuciones de la comunidad
3. **Divertido**: Crear experiencias de juego entretenidas y nostálgicas
4. **Moderno**: Aplicar diseño y técnicas contemporáneas a clásicos
5. **Accesible**: Mantener el código simple y sin barreras de entrada

## 📄 Licencia

MIT License - siéntete libre de usar, modificar y distribuir.

## 🙏 Agradecimientos

- Inspiración de diseño: [huxe.com](https://huxe.com)
- Comunidad de desarrolladores de juegos retro
- Todos los contribuidores del proyecto

## 📞 Contacto

- GitHub Issues: [alialbarran/giochi/issues](https://github.com/alialbarran/giochi/issues)
- Proyecto: [github.com/alialbarran/giochi](https://github.com/alialbarran/giochi)

---

**¡Diviértete jugando y desarrollando!** 🎮✨
