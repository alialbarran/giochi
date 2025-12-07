# Assets - Fonts

Este directorio contiene fuentes personalizadas para el juego.

## Formato Recomendado

- WOFF2 (mejor compresión, navegadores modernos)
- WOFF (fallback para navegadores más antiguos)
- TTF (fallback adicional)

## Uso

Para agregar una fuente personalizada:

1. Coloca los archivos de fuente aquí
2. Declara la fuente en CSS:

```css
@font-face {
    font-family: 'MiFuente';
    src: url('../assets/fonts/mi-fuente.woff2') format('woff2'),
         url('../assets/fonts/mi-fuente.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
```

3. Úsala en tu CSS:

```css
body {
    font-family: 'MiFuente', sans-serif;
}
```

## Licencias

Asegúrate de que las fuentes tienen licencia apropiada para uso web.

## Placeholder

Actualmente usamos fuentes del sistema. Fuentes personalizadas pueden agregarse aquí.
