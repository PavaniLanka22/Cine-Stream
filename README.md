<img width="1915" height="965" alt="Screenshot 2026-06-21 104859" src="https://github.com/user-attachments/assets/94a80303-b4cf-4380-a58c-1aa1d36cc222" />

# Cine Stream
Cine Stream is a high-performance Netflix-inspired Single Page Application (SPA) built using the TMDB (The Movie Database) REST API. The platform enables users to discover trending movies, search media dynamically, save favorites, and experience enterprise-level frontend optimization techniques such as infinite scrolling, debounced API requests, lazy loading, and AI-powered movie recommendations.

## Project Objective
The primary goal of Cine Stream is to simulate real-world frontend engineering challenges involved in rendering and managing large-scale datasets in modern web applications. Rather than statically rendering a small collection of items, the application focuses on scalable UI architecture, efficient state management, and performance optimization for thousands of dynamically loaded media records.

## Core Features
### Popular Movies Dashboard
* Fetches and displays trending/popular movies from the TMDB API
* Responsive CSS Grid layout for media presentation
* Displays: Movie Poster, Movie Title, Release Year, Rating

### Dynamic Search Functionality
* Real-time movie search powered by the TMDB Search API
* Optimized using input debouncing to prevent excessive API requests
* Enhances performance and user experience during rapid typing

### Infinite Scroll Architecture
* Replaces traditional pagination with the Intersection Observer API
* Automatically loads additional pages as users scroll through content
* Efficiently appends movie data to the existing DOM structure

### Favorites Persistence
* Allows users to save movies to a personalized favorites collection
* Favorites are persisted using localStorage
* Dedicated `/favorites` route for viewing saved movies

### Asset Optimization
* Native lazy loading (`loading="lazy"`) implemented for all movie posters
* Reduces initial page load time and unnecessary bandwidth consumption

### AI Mood Matcher
* Integrates OpenAI/Gemini APIs for contextual movie recommendations
* Users can submit prompts such as:

  * “Suggest an emotional sci-fi movie”
  * “I want an uplifting action film”
* The AI model returns a movie title recommendation
* The recommendation is automatically passed into the TMDB search workflow and rendered dynamically

## Engineering Concepts Demonstrated
Cine Stream showcases several advanced frontend engineering concepts, including:

* REST API Integration
* Component-Based Architecture
* Infinite Scrolling
* Intersection Observer API
* Debouncing & Request Optimization
* Local Storage Persistence
* Lazy Loading
* Conditional Rendering
* Asynchronous State Management
* API Error Handling
* Route-Based Navigation
* AI Prompt Engineering
* Frontend Performance Optimization

## Tech Stack
* React.js / Vite
* React Router
* TMDB REST API
* CSS Grid & Flexbox
* LocalStorage API
* Intersection Observer API
* OpenAI / Gemini API
* JavaScript (ES6+)

## Performance Goals
The application is architected to efficiently handle large-scale media rendering while minimizing:
* Excessive DOM nodes
* Unnecessary API requests
* Memory leaks
* Re-render bottlenecks
* Layout shifts
* Image overfetching

## Learning Outcomes
This project demonstrates practical frontend engineering skills commonly required in production-grade applications, including: Scalable frontend architecture, API orchestration, Rendering optimization, Search performance optimization, Persistent client-side state management, AI-assisted user experiences

## Future Enhancements
Potential future improvements for Cine Stream include:
* Virtualized rendering for massive datasets
* Authentication and cloud-synced favorites
* Genre filtering and advanced sorting
* Personalized watchlists
* Offline-first support using service workers
* Accessibility improvements
* Unit, integration, and end-to-end testing
