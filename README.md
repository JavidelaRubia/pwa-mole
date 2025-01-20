# Author

Javier de la Rubia Sánchez

# Mole Game PWA

Mole Game es un juego desarrollado como Progressive Web App (PWA) utilizando Vite y LitElement.

## Características

- Juego clásico de Whack-a-Mole
- Registro de usuario
- Tres niveles de dificultad
- 30 segundos en cada intento
- Sistema de puntuación según dificultad (facil: 10 puntos, medio: 20 puntos, dificil: 30 puntos)
- Diseño responsive
- PWA instalable
- Tests unitarios

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/JavidelaRubia/pwa-mole.git
cd pwa-mole
```

2. Instala las dependencias:

```bash
npm install
```

## Desarrollo Local

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

## Tests

El proyecto utiliza @web/test-runner para los tests unitarios.

Para ejecutar los tests:

```bash
npm run test
```

## Construcción

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos de la build se generarán en el directorio `dist/`


Para analizar y corregir problemas de estilo y calidad en el código:

```bash
npm run lint
```

## Tecnologías Utilizadas

- Vite
- LitElement
- @web/test-runner
- @open-wc/testing
- Sinon
- ESLint
- Prettier

## Iconos

[Mole-icon](https://www.flaticon.es/iconos-gratis/fauna)
[Choque](https://www.flaticon.es/iconos-gratis/choque)
