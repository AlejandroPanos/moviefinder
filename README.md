# 🎬 MovieFinder

A modern and responsive web application for discovering, searching, and saving your favorite movies using The Movie Database (TMDB) API.

![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Tanstack Query](https://img.shields.io/badge/Tanstack_Query-5.0-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Main Components](#main-components)
- [Custom Hooks](#custom-hooks)
- [State Management](#state-management)

---

## Features

- **Explore popular movies** - Browse the most popular movies of the moment
- **Advanced search** - Filter by title, genre, and minimum rating
- **Favorites system** - Save your favorite movies with localStorage persistence
- **Dark/Light mode** - Toggle between themes with preference persistence
- **Responsive design** - Optimized for mobile, tablet, and desktop devices
- **Optimized loading** - Search debouncing and caching with Tanstack Query
- **Pagination** - Navigate through result pages
- **Modern UI** - Clean and attractive interface with Tailwind CSS
- **Loading states** - Visual feedback during requests
- **Error handling** - Clear messages when something goes wrong
- **Movie details** - Dedicated page with complete information

---

## Tech Stack

### Core

- **[React 19.2](https://react.dev/)** - JavaScript library for building user interfaces
- **[Vite](https://vitejs.dev/)** - Fast and modern build tool
- **[React Router v7](https://reactrouter.com/)** - Declarative routing for React

### State Management and Data

- **[Tanstack Query](https://tanstack.com/query)** - Server state management, caching, and synchronization
- **Context API** - Global state management (theme and favorites)
- **localStorage** - Browser data persistence

### Styling

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library

### HTTP Client

- **[Axios](https://axios-http.com/)** - Promise-based HTTP client

### Other Tools

- **[TMDB API](https://www.themoviedb.org/documentation/api)** - Movie database API

---

## Project Structure

```
moviefinder/
├── public/
├── src/
│   ├── components/          # Reusable components
│   │   ├── DisplayMovie.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Loading.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieGrid.jsx
│   │   ├── Nav.jsx
│   │   ├── NavLinks.jsx
│   │   ├── PageHeader.jsx
│   │   └── SearchForm.jsx
│   ├── context/             # Context providers
│   │   ├── FavoritesContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/               # Custom hooks
│   │   ├── useFavorites.js
│   │   └── useTheme.js
│   ├── pages/               # Application pages
│   │   ├── ErrorPage.jsx
│   │   ├── Favorites.jsx
│   │   ├── Home.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── Root.jsx
│   │   └── Search.jsx
│   ├── utils/               # Utilities and services
│   │   └── http.js
│   ├── App.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example             # Environment variables example
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

---

## Key Features

### 1. **Home Page**

- Displays the 20 most popular movies of the moment
- Responsive grid that adapts to different screen sizes
- Each card shows:
  - Movie poster
  - Original title
  - Release year
  - Average rating

### 2. **Advanced Search**

- **Text search**: Type any movie name
- **Genre filter**: Action, Comedy, Drama, Horror, etc.
- **Rating filter**: Slider to select minimum rating (0-10)
- **Debouncing**: Searches execute 500ms after you stop typing
- **Pagination**: Navigate through result pages
- **Real-time updates**: Results update while you filter

### 3. **Movie Details**

- Complete information about the selected movie
- Dedicated page with extended data
- Button to add/remove from favorites

### 4. **Favorites System**

- Save your favorite movies
- Persists in localStorage (doesn't get lost when closing the browser)
- Favorites counter in navigation
- Dedicated page to view all saved movies
- Empty state with motivational message when no favorites exist

### 5. **Dark/Light Theme**

- Toggle between dark and light mode
- Visual icon that changes (sun/moon)
- Preference saved in localStorage
- Smooth transitions between themes
- Entire app optimized for both modes

### 6. **Responsive Navigation**

- Hamburger menu on mobile devices
- NavLinks with active states (highlighted)
- Sticky header that remains visible on scroll
- Smooth animations on transitions

---

## Architecture

### Design Pattern

The project follows a **component-based** architecture with separation of concerns:

- **Presentational Components**: Pure components focused on UI
- **Container Components**: Components that handle logic and state
- **Custom Hooks**: Extracted reusable logic
- **Context Providers**: Shared global state
- **Service Layer**: Functions for API communication

### Data Flow

```
User → Component → Custom Hook → API Service → TMDB API
                       ↓
                Context (Global State)
                       ↓
                localStorage (Persistence)
```

---

## Main Components

### `<Nav />`

Main navigation bar with:

- Logo and brand
- Navigation links (Home, Search, Favorites)
- Theme toggle (dark/light)
- Responsive menu for mobile

### `<MovieGrid />`

Reusable grid for displaying movies:

- Responsive layout (1-4 columns depending on viewport)
- Receives array of movies as prop
- Used in Home, Search, and Favorites

### `<SearchForm />`

Advanced search form with:

- Text input with debounce
- Genre select (dynamically loaded)
- Minimum rating slider
- Integrated pagination
- State handling (loading, error, empty)

### `<PageHeader />`

Reusable header for pages:

- Main title
- Secondary description
- Consistent styles throughout the app

### `<Loading />` and `<ErrorMessage />`

Feedback components:

- Animated spinner for loading states
- User-friendly error messages

---

## Custom Hooks

### `useTheme()`

```javascript
const { darkMode, toggleTheme } = useTheme();
```

Provides access to theme state:

- `darkMode`: boolean indicating if dark mode is active
- `toggleTheme`: function to toggle between themes

### `useFavorites()`

```javascript
const { favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, favoriteCount } =
  useFavorites();
```

Manages the favorites system:

- `favorites`: array with all favorite movies
- `addFavorite(movie)`: adds a movie
- `removeFavorite(id)`: removes by ID
- `toggleFavorite(movie)`: adds or removes based on state
- `isFavorite(id)`: checks if it's in favorites
- `favoriteCount`: total number of favorites

---

## State Management

### Context API

**ThemeContext**

- Manages application theme (dark/light)
- Persists preference in localStorage
- Applies `.dark` class to HTML document

**FavoritesContext**

- Manages favorite movies list
- Automatically syncs with localStorage
- Provides CRUD functions for favorites

### Tanstack Query

Used for server state management:

```javascript
const filtersQuery = useQuery({
  queryKey: ["movies", "filtered", debouncedTerm, filters.genre, filters.rating, filters.page],
  queryFn: () => fetchFilteredMovies({ ... }),
});
```

**Benefits:**

- ✅ Automatic request caching
- ✅ Intelligent re-fetching
- ✅ Loading/error/success states
- ✅ Data invalidation and updates
- ✅ Less boilerplate code

---
