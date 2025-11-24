# World Explorer Application

## Description

In this application, you can explore the world by clicking on the map. On each map click, you will get information about the place including:

- Coordinates
- Country name
- Country flag
- A list of the top 5 most recent wildlife observations (that include photos of high quality)

You can click on each observation to see the first photo in larger resolution in a modal.

## Screenrecording

https://github.com/user-attachments/assets/7148791f-bb70-4b0f-9a4a-7e2f614e9c6f


## To Run Locally

- clone repo
- npm i
- npm run dev


## Technical Thought Process

### Data Fetching Architecture

- Use custom hooks to fetch specific data (country info and wildlife). However, because we want to update the sidebar all-at-once once all the data is ready, we use these hooks together in the sidebar component. We pass in only the relevant info to the tile components and memoize them so they only re-render when needed.

### React Query

- Using react-query to make use of the built in caching, loading, and error states though we don't actually use those too much as of yet. Caching is nice but it only really is applicable if the user clicks on the *exact same* coordinates multiple times which is unlikely in a large map.

### UI Components

- React resizable panels to allow adjustment of the sidebar
- Therefore had to use resize observer to adjust the size of the map when the sidebar changed size

## Points of Improvement

### Code Quality

- General code clean up - removing console logs, any duplication of code, organising folders better (hooks folder maybe, styled components in their own file)
- Double check that no unnecessary re-rendering is happening (may need to wrap country name in a memo - haven't double checked). In this case very minimal performance issue because it's just a string. But good practice

### Error Handling

- Handle error state from oceans/bodies of water better. Right now there's a small bug that when you click on diff parts of the ocean, you get a flicker of the last "valid" state before the error. This is because we are using "placeholderData: keepPreviousData. We're doing this because I don't like the look of the loading state between clicks and prefer for a smoother transition. But there is probably a diff approach to do this without the ocean bug
- More robust testing (all hooks, but also the react components themselves)
- But also, it would be good to find an API that handles water geolocation and use that In combination with the current geolocation API to get water info too

### UI/UX Enhancements

- Some small UI/UX things like: a larger flag in the sidebar would be nice, showing the species name alongside the common name (which is usually in the local language). Also fixing the issue of being able to span/zoom out to non-map grey areas

### Features

- Feature: Be able use an arrow in the modal to click between all photos in an observation. Right now, we are just showing the first one
- Feature: Being able to search in the map and land on the country of interest
- Being able to specify radius for wildlife search (right now hardcoded to 10 km, not exposed in the UI)

## Use of AI

Although I use AI (Cursor, Claude, Gemini) all the time in my day-to-day work, I tried to limit its use while doing this take-home assignment.

### Where I Used AI

- As a quick proof of concept integrating react-leaflet and speaking my idea into existence. This was done in a diff repo (exists locally) just to see that the final output was possible. I briefly looked at the code but did not study it too much, so that it wouldn't sway my technical approach later

- I then created a fresh repo and my goal was to code the project with minimal AI use. I ended up using AI for the following:

  - Autogenerating types for my API responses based on the received response + API docs
  - Getting some react-leaflet CSS working (requires importing the CSS and setting some fixed height values). The map can still zoom/pan out of the viewport, but I didn't explore much further there
  - Discussing the pro/cons to using the specific queries in the relevant components vs just storing all the info in local state. Also discussing some flickering state issues when using keepPreviousData. Also discussing the benefit of useQueries() vs just calling the individual queries directly
  - Making the CSS/UI pretty (see before/after)

I did most of this in "Ask" mode, allowing me to do all the coding myself -- except the typescript autogeneration stuff and the CSS "make this pretty", Cursor did that for me directly.

Before AI styling:
<img width="1791" height="915" alt="Screenshot 2025-11-23 at 21 54 48" src="https://github.com/user-attachments/assets/d0d24c45-2c9f-49e9-80da-a2f15b779ec5" />

After: see recording at the top of this description
