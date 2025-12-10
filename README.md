# semperis-movies

A React + TypeScript application for browsing Marvel movies with filters and detailed movie information.

**[Live Demo](https://galbenshushan.github.io/semperis-movies/)**

## Run Locally

**Prerequisites:**
- Node.js 18+
- npm

**Setup:**
```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Main Features

- **Movies List** - Browse Marvel movies with infinite scroll
- **Filters** - Search by title, year, genre, and minimum rating
- **Movie Details** - View cast, director, overview, and ratings
- **Responsive Design** - Works on desktop, tablet, and mobile

## Technologies

- **Vite** - Build tool and dev server
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Page navigation
- **Material-UI** - Component library
- **styled-components** - CSS-in-JS styling
- **TMDB API** - Movie data source
- **React Testing Library** - Component testing
- **Vitest** - Unit test runner
- **Docker** - Containerization

## Deployment

**GitHub Pages:**
The app is automatically deployed to GitHub Pages on every push to `main`.

Live URL: https://galbenshushan.github.io/semperis-movies/

## Docker

**Build and run locally:**
```bash
docker-compose up -d
```

Access at `http://localhost:8080`

See [DOCKER_SETUP.md](./DOCKER_SETUP.md) for detailed Docker instructions.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # TMDB API service
├── store/         # Redux state management
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
└── theme/         # Global styles and theme
```

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build locally
npm test           # Run unit tests
npm run lint       # Run ESLint
npm run deploy     # Build and deploy to GitHub Pages (gh-pages)
```

## Environment Variables

Create a `.env` file with:
```
VITE_TMDB_API_KEY=your_api_key_here
```

See `.env.example` for reference.

## Testing

```bash
npm test           # Run all tests
```

Current test coverage:
- 21 unit tests across components, hooks, and services
- React Testing Library for component tests
- Vitest for test runner and assertions


