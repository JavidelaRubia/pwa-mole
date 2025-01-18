# Mole Game PWA

Este es un juego de Mole Game desarrollado como Progressive Web App (PWA) utilizando Vite y LitElement.

## Características

- Juego clásico de Whack-a-Mole
- Tres niveles de dificultad
- Sistema de puntuación
- Diseño responsive
- PWA instalable
- Tests unitarios

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (viene con Node.js)

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd <nombre-del-proyecto>
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

Para ejecutar los tests en modo watch:
```bash
npm run test:watch
```

## Construcción

Para construir la aplicación para producción:

```bash
npm run build
```

Los archivos de la build se generarán en el directorio `dist/`

## Estructura del Proyecto

```
├── src/
│   ├── components/     # Componentes LitElement
│   ├── views/         # Vistas/páginas
│   ├── app.js         # Componente principal
│   └── index.html     # Punto de entrada HTML
├── test/
│   └── components/    # Tests unitarios
├── public/           # Archivos estáticos
└── vite.config.js    # Configuración de Vite
```

## Tecnologías Utilizadas

- Vite
- LitElement
- @web/test-runner
- @open-wc/testing
- Sinon

