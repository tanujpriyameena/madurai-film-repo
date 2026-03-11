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
5. User preferences options, which modify site appearance and some animations

Additional features:
1. Sign up, log in, log out with session persistence. Some features and 1 page (profile) requires login!
2. User profile with editable info — editable name, editable bio, static avatar (with initials)
3. Categories/tags/advanced filtering — feel free to mix filters, and tackle major edge cases like whitespace, and even clear filters
4. Comments, reviews (which can also be interacted with), or ratings — community reviews visible to all users, average star rating are shown on cards in collections and in each individual movie page, displayed real-time via Firestore
5. Real-time updates — onSnapshot on reviews and ratings

## Technologies Used
I am utilizing Claude Code on terminal to achieve these results. I am also using React Router, so as to account for the different routes centered under the /pages folder. These are also handled by a _redirects file, which helps to display content when deploying to Netlify. As of recent (Week 8) updates, the following points detail all technologies used, better:
- React 19 — This is a react app, built with React components, hooks, and state management.
- React Router v7 — Handles navigation between pages like the following: Home, Collections, Movie detail (for each movie), Profile. This works without full page reloads.
- Firebase v12 — This is our backend logic. We use it to store and retrieve movie data, user interactions (ratings, reviews, favorites, watched status) through Firestore, and authentication (which we facilitate with email) if applicable.
- Create React App — The build command that handles and compiles the app for creation and development.
- Netlify — This is the hosting service which hosts and deploys the live site from the GitHub main branch. A _redirects file is included, to handle client-side routing on Netlify properly.
- Environment Variables — Sensitive credentials (Firebase config keys, API info, etc.) are stored in a .env file locally and added as environment variables in Netlify. This is for security purposes, and to avoid any misuse.

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
The experience was incredibly tasking, but once more, I understood why planning was emphasized a lot prior to starting this project. The iterative process was the best, and the AI worked better when when it had a predetermined list of items it had to follow. Furthermore, as previous modules showed, for edge cases, the AI needed to be informed of them manually if it had to make corrections (it did not trace everything)! Overall, the experience was time-consuming, yet informative, as I learnt a lot - environment variables, commits/amending, some code logic, and more.

## Architecture Overview

**Frontend:** This site was built using React 19. React Router v7 handles user navigation across six routes within the site (Home.js, Collections.js, MMovie.js (for each movie), Profile.js, Login.js, and Signup.js). Authentication state is managed globally with React Context (`AuthContext`), while favorites, watched, and watchlist state live in the root `App.js` and are passed down as props. Styling is in a cinematic dark theme, which can be modified with two user preference options at Profile.js.

**Backend:** Firebase handles both authentication (email/password) and data persistence with Firestore. A `firestore.js` service layer contains all read/write functions. All backend content is secured with a set of rules, also established on the Firestore "Rules" section. The app is deployed on Netlify, with necessary Firebase credentials stored as environment variables.

**Database:** Firestore is storing three collections, as of now:
- `users/{uid}` — (the following are variables) favorites, watched, watchlist, bio, and display preferences for the user — animatedMode and baseMode, which is either marked as true or false
- `movieRatings/{movieId}/ratings/{uid}` — This handles individual star ratings, and a user can assigna  rating of 1 to 5 stars
- `movieReviews/{movieId}/reviews/{uid}` — This handles review text, user's display name, timestamp, and like/dislike votes (which one can view beneath the review itself)

Movie data itself is static, stored locally in `src/data/movies.js`.

Note: If you would like a much more in-depth analysis, refer to ARCHITECTURE.md to view all Architecture and Database-related content!