# My Steps for this midterm project

Documenting my steps for future reference!

## Phase 1 — Foundation (Complete)
1. Set up React Router and define your four routes (/, /collections, /profile, /movie/:id)
2. Create a static movie data file (JSON) — title, genre, year, poster image, description, cast, etc.
3. Build a shared layout with a navbar that links between pages

## Phase 2 — Collection & Browse (Complete)
4. Build the Collections page with a grid/gallery of movie cards
5. Add filter controls — by genre, keyword search, and release year range
6. Wire filters to state so the gallery updates reactively

## Phase 3 — Movie Detail Page (Complete)
7. Build the individual movie page, pulling data by ID from your JSON
8. Add a star rating component (1–5 stars, stored in localStorage)
9. Add a text review form, stored and displayed per movie

## Phase 4 — Favorites & Watched (Complete)
10. Add "Add to Favorites" and "Mark as Watched" toggle buttons (on movie cards and the detail page)
11. Persist both states to localStorage, keyed by movie ID
12. Display favorites and watched films on the Profile page

## Phase 5 — Profile Page (Complete)
13. Build the Profile page with a bio section (editable or static)
14. Pull and display the user's favorites and watched list from localStorage

## Phase 6 — Polish (Complete)
15. Add responsive styling
16. Handle edge cases (no results, empty favorites, etc.)
17. Optional: sort options (by rating, year, title)

## Backend content follows!

## Phase 7 - User Authentication (Complete)
18. Sign up, login, and logout
19. Protected routes (some pages require login - in our case, profile will require it, and to actually post a review, rate it, or like/mark as seen, one should be logged in)
20. Session persistence (users stay logged in on refresh)
21. Recommended: Firebase Auth (we will use this)

## Phase 8. Cloud Database (Complete)
22. Replace localStorage with Firebase Firestore.
23. User-specific data (each user sees only their own data)
24. Security rules so users can’t read or modify each other’s data (but, they can read each other’s reviews in a listing, and general ratings.)

## Phase 9. Extra Features to be added
25. Allow users to upload a profile picture from their device, change, or clear it to the default.
26. Allow users to change their preferences for the site UI. In this case, a toggle button in profile that allows them to view "base mode," which makes the background color white, lines black, and makes it a more "basic" CSS view. Their preferences must be remembered!
27. Add a second toggle button in the profile that allows users to view an advanced "animated" view - we could make this simple. We could make a simple shine effect to the main headers, and a little "pop" effect when someone clicks on a "favorite" or "watched" in collections. This is for accessibility purposes!
28. Add an automated slideshow just before "About the Library," at Home.js. Very gradually, the movie posters must go right to left. This will use a CSS keyframes marquee animation — a duplicated row of posters translates continuously from right to left in an infinite loop, with no JavaScript timers needed.

## Phase 10. Final Reference — Before Deploying to Netlify
- src/firebase.js is gitignored and will NOT be on GitHub.
- Netlify’s build will fail if firebase.js is missing.
- Solution: use Netlify environment variables (Site Settings → Environment Variables).
  Store each Firebase config value as a REACT_APP_* variable, then update
  firebase.js to read from process.env instead of hardcoded values.
- Do this step before the final push intended for Netlify deployment.