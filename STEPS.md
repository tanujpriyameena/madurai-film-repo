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

## Phase 6 — Polish
15. Add responsive styling
16. Handle edge cases (no results, empty favorites, etc.)
17. Optional: sort options (by rating, year, title)

## Backend content follows!

## Phase 7 - User Authentication
18. Sign up, login, and logout
18. Protected routes (some pages require login - in our case, profile will require it, and to actually post a review, rate it, or like/mark as seen, one should be logged in)
18. Session persistence (users stay logged in on refresh)
18. Recommended: Firebase Auth (we will use this)

## Phase 8. Cloud Database
19. Replace localStorage with Firebase Firestore.
20. User-specific data (each user sees only their own data)
21. Security rules so users can’t read or modify each other’s data (but, they can read each other's reviews in a listing, and general ratings.)