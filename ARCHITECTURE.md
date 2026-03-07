# Madurai Film Library — Architecture

## Tech Stack
- React 19 (Create React App)
- React Router v7 for client-side routing
- Firebase Authentication (email/password)
- Firebase Firestore for cloud data persistence
- React Context API for auth state (`AuthContext`)
- Plain CSS for styling (cinematic dark theme + base/animated mode overrides)

## Deployment
- Hosted on Netlify
- `public/_redirects` handles client-side routing (`/* /index.html 200`)
- Build command: `npm run build` | Publish directory: `build`
- Firebase config loaded from Netlify environment variables (`REACT_APP_FIREBASE_*`)

## Key Files
- `src/App.js` — Root component; `AppContent` holds favorites/watched/watchlist/baseMode/animatedMode state; wrapped by `AuthProvider`
- `src/App.css` — Global styles, all component styles, base mode overrides, animated mode keyframes
- `src/firebase.js` — Firebase app initialization; exports `auth` and `db`
- `src/context/AuthContext.js` — Auth context; provides `currentUser`, `signup`, `login`, `logout`, `updateDisplayName`
- `src/services/firestore.js` — Firestore helper functions for all read/write operations
- `src/components/Navbar.js` — Shared navigation; conditionally shows auth links
- `src/components/MovieCard.js` — Film card with poster, toggles (favorite/watched/watchlist star), average rating
- `src/components/StarRating.js` — Interactive 1–5 star rating component
- `src/components/ProtectedRoute.js` — Redirects to `/login` if user is not authenticated
- `src/pages/Home.js` — Landing page (hero, poster marquee slideshow, about, features)
- `src/pages/Collections.js` — Film gallery with keyword/genre/year/sort filtering
- `src/pages/Movie.js` — Film detail, star rating, text review, community reviews with thumbs up/down voting
- `src/pages/Profile.js` — Editable name/bio, display preferences, favorites/watched/watchlist grids with search
- `src/pages/Login.js` — Login form
- `src/pages/Signup.js` — Signup form with first/last name
- `src/data/movies.js` — Static movie data array (20 films)

## Routes
| Path | Component | Protected |
|---|---|---|
| `/` | Home | No |
| `/collections` | Collections | No |
| `/movie/:id` | Movie | No (auth required to rate/review/toggle) |
| `/profile` | Profile | Yes |
| `/login` | Login | No |
| `/signup` | Signup | No |

## Firestore Data Model

**User data** — `users/{uid}`
```js
{
  favorites:  number[],  // movie IDs
  watched:    number[],  // movie IDs
  watchlist:  number[],  // movie IDs
  bio:        string,
  baseMode:   boolean,
  animatedMode: boolean,
}
```

**Ratings** — `movieRatings/{movieId}/ratings/{uid}`
```js
{ value: number }  // 1–5
```

**Reviews** — `movieReviews/{movieId}/reviews/{uid}`
```js
{
  text:        string,
  displayName: string,
  createdAt:   string,  // ISO timestamp
  likes:       string[], // voter UIDs
  dislikes:    string[], // voter UIDs
}
```

## Firestore Security Rules
- `users/{uid}` — read/write only by matching authenticated user
- `movieRatings/{movieId}/ratings/{uid}` — public read; write only by matching user
- `movieReviews/{movieId}/reviews/{uid}` — public read; create/delete only by author; update allowed by any authenticated user only if changing `likes` or `dislikes` fields

## State Management
- Auth state lives in `AuthContext` via `onAuthStateChanged`
- Favorites, watched, watchlist, baseMode, and animatedMode live in `AppContent` (App.js), loaded from Firestore on login and passed as props
- Theme classes (`theme-base`, `theme-animated`) are toggled on `document.body` via `useEffect`
- Movie detail page uses `onSnapshot` for real-time reviews and ratings

## Movie Data Model
```js
{
  id:          number,   // matches /movie/:id
  title:       string,
  year:        number,
  genres:      string[],
  director:    string,
  cast:        string[],
  description: string,
  posterUrl:   string | null,
}
```
