# Project Plans
This is my README file, detailing the project, my plan, and any associated technology.

## The Project Description
"Madurai Film Library" is a Movie Tracker app, which will allow users to view a collection of popular or classic films, and interact with each film title. They will be able to favorite (like) films, mark movies they saw (or unmark, vice versa), provide star ratings, and even provide short descriptive reviews!

## Planned Features (in associated pages)
- Home.js: this will be my landing page, displaying text for now.
- Collections.js: this will contain a gallery/thumbnail view of various movies, and allow users to search or filter movies there. Also, this page will allow them to like films and add it to their profile!
- Profile.html: this page will provide the ability to see favorite films there, and user details.
- Movie.js: this will display a dedicated page for each movie (handled by id, to come in future iterations). It will also provide a box to see reviews and star ratings.
Note that Movie.js is separate from movies.js (which is under the data folder). Movie.js displays individual films!

## Technology
I am utilizing Claude Code on terminal to achieve these results. I am also using React Router, so as to account for the different routes centered under the /pages folder. These are also handled by a _redirects file, which helps to display content when deploying to Netlify. LocalStorage will be used eventually for user data.

Note, I will be using a React app primarily, but deploying everything on Netlify, via GitHub!



