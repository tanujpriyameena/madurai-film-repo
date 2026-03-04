# Madurai Film Library — Architecture

## Tech Stack
- React 19 (Create React App)
- React Router v6 for client-side routing
- localStorage for data persistence (favorites, watched, ratings, reviews)
- Plain CSS for styling

## Deployment
- Hosted on Netlify
- `public/_redirects` handles client-side routing (`/* /index.html 200`)
- Build command: `npm run build` | Publish directory: `build`

## Key Files
- `src/App.js` — Root component, router setup, route definitions
- `src/App.css` — Global styles and all component styles
- `src/components/Navbar.js` — Shared navigation bar
- `src/pages/Home.js` — Landing page (hero, about, features)
- `src/pages/Collections.js` — Film gallery with filtering (Phase 2)
- `src/pages/Movie.js` — Individual film detail, ratings, reviews (Phase 3)
- `src/pages/Profile.js` — User favorites and watched list (Phase 4)
- `src/data/movies.js` — Static movie data array

## Routes
| Path | Component |
|---|---|
| `/` | Home |
| `/collections` | Collections |
| `/profile` | Profile |
| `/movie/:id` | Movie |

## Data Model

**Movie** (defined in `src/data/movies.js`)
```js
{
  id,          // number — matches /movie/:id
  title,       // string
  year,        // number
  genres,      // string[]
  director,    // string
  cast,        // string[]
  description, // string
  posterUrl,   // string
}
```

**localStorage keys** (planned — Phase 3/4)
- `favorites` — array of movie IDs
- `watched` — array of movie IDs
- `ratings` — object keyed by movie ID (`{ "1": 4, "2": 5 }`)
- `reviews` — object keyed by movie ID (`{ "1": "Great film." }`)
