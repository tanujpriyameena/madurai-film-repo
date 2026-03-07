# Project Plans
This is my README file, detailing the project, my plans (finished), and any associated technology.

## The Project Description
"Madurai Film Library" is a Movie Tracker app, which will allow users to view a collection of popular or classic films, and interact with each film title. They will be able to favorite (like) films, mark movies they saw (or unmark, vice versa), provide star ratings, and even provide short descriptive reviews!

## Existing Features (as of March 6, 2026)
Core features:
1. Browse and filter the film collection — keyword search, genre, year range, sort by rating
2. Add/remove movies from Favorites
3. Mark/unmark movies as Watched
4. Rate and review movies (star rating + text review)
5. Sign up, log in, log out with session persistence
6. User preferences options, which modify site appearance and some animations

Additional features:
1. User profile with editable info — editable name, editable bio, initials avatar
2. Categories/tags/advanced filtering — you can mix and match too, and tackle some major edge cases like whitespace
3. Comments, reviews (which can also be interacted with), or ratings — community reviews visible to all users, average star rating on cards and detail page, real-time via Firestore
4. Real-time updates — onSnapshot on reviews and ratings

## Technologies Used
I am utilizing Claude Code on terminal to achieve these results. I am also using React Router, so as to account for the different routes centered under the /pages folder. These are also handled by a _redirects file, which helps to display content when deploying to Netlify. As of recent (Week 8) updates, the following points detail all technologies used, better:
- React 19 — The core UI framework. The app is built as a single-page application (SPA) using React components, hooks, and state management.
- React Router v7 — Handles client-side navigation between pages (Home, Collections, Movie detail, Profile) without full page reloads.
- Firebase v12 — Provides the backend. Used for storing and retrieving movie data, user interactions (ratings, reviews, favorites, watched status) via Firestore, and authentication if applicable.
- Create React App — The build toolchain that bundles and compiles the app for both development and production.
- Netlify — Hosts and deploys the live site automatically from the GitHub main branch. A _redirects file is included to handle client-side routing on Netlify properly.
- Environment Variables — Sensitive credentials (Firebase config keys) are stored in a .env file locally and configured as environment variables in Netlify, keeping them out of the codebase.

## Setup instructions
1. Clone the repository, with the git clone command, and the URL of the repository (attained from GitHub)
2. Ensure you use the cd command to navigate to the project folder (madurai-film-library) on terminal
3. Install dependencies - npm install should work, but when I made the project, I utilized "npm install --save-dev ajv@^7", which is a command I frequently use. Please try this if the first command doesn't work!
4. Set up environment variables, first with a .env file locally in your root folder. Then, add your Firebase project credentials (this would be your API key, auth domain, etc.). You can get these from your project settings at Firebase!
5. Finally, run everything locally with npm start.
6. If everything was set up correctly, your app will open at localhost.

## Known bugs or limitations
- The site cannot utilize most modern movie posters due to copyright laws. Alternatives are often needed for films that are modern (post 1970s, typically).
- While there is a significant amount of added features for users, they cannot interact among one another outside reviews.
- Site functionality becomes limited when the user wants more preferences (like review hiding, anonymous usage, modifying more aesthetics like profile pictures, etc.)
- "Forgot password" is not a feature, this may be an issue for users who lose access to their passwords along the line.

## What I Learned
The experience was incredibly tasking, but once more, I understood why planning was emphasized a lot prior to starting this project. The iterative process was the best, and the AI worked better when when it had a predetermiend list of items it had to follow. Furthermore, as previous modules showed, for edge cases, the AI needed to be informed of them manually if it had to make corrections (it did not trace everything)! Overall, the experience was time-consuming, yet informative, as I learnt a lot - environment variables, commits/amending, some code logic, and more.

## Architecture Overview

**Frontend:** Built with React 19 as a single-page application. React Router v7 handles client-side navigation across six routes (Home, Collections, Movie detail, Profile, Login, Signup). Auth state is managed globally via React Context (`AuthContext`), while favorites, watched, and watchlist state live in the root `App.js` and are passed down as props. Styling is plain CSS with a cinematic dark theme and two user-selectable display modes.

**Backend:** Firebase handles both authentication (email/password) and data persistence (Firestore). A `firestore.js` service layer contains all read/write functions. The app is deployed on Netlify, with Firebase credentials stored as environment variables.

**Database:** Firestore stores three collections:
- `users/{uid}` — favorites, watched, watchlist, bio, and display preferences per user
- `movieRatings/{movieId}/ratings/{uid}` — individual star ratings (1–5)
- `movieReviews/{movieId}/reviews/{uid}` — review text, display name, timestamp, and like/dislike votes

Movie data itself is static, stored locally in `src/data/movies.js`.

Note: refer to ARCHITECTURE.md to view all Architecture and Database-related content in detail!