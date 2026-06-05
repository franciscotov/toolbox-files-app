# Toolbox Files App

## Overview

This is a React app that displays file data retrieved from a remote files API. Users can filter the displayed files by adding a `fileName` query parameter to the page URL, and the application will request only that file from the backend.

The app is built with React, Redux Toolkit, and React Bootstrap. The Redux slice manages the file data, loading state, and error state using an async thunk.

## Features

- Fetch file data from a remote API
- Filter results by `fileName` query parameter
- Loading / error / empty states handled by reusable compound components
- Redux Toolkit async thunk and slice pattern
- Client-side tests for service, slice, and page behavior

## Requirements

- Node.js >= 16
- npm installed

## Setup

```bash
npm install
```

## Running locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

If the backend is running locally, update the `API_URL` constant in `src/services/filesService.js` to point to your local API before starting the app.

## Available Scripts

### `npm start`

Starts the development server in hot-reload mode.

### `npm test`

Runs the test suite. This project uses React Testing Library and Jest.

### `npm run build`

Builds the app for production in the `build` folder.

## App architecture

The main layers are:

- `src/services/filesService.js`: HTTP request functions using Axios
- `src/store/filesSlice.js`: Redux state management for files
- `src/pages/files/index.js`: page component that dispatches the async thunk and selects state
- `src/components/files/FilesView.js`: compound view that renders loading, error, empty, or table UI based on state

## Data flow

1. `FilesPage` reads the current `fileName` query parameter from `window.location.search`.
2. `FilesPage` dispatches `fetchFiles(fileName)`.
3. `fetchFiles` is an async thunk that calls `getFiles(fileName)` from the service.
4. The service sends `GET /files/data?fileName=...` to the API.
5. Redux updates state through `extraReducers`:
   - `pending` sets `loading` true and clears previous errors
   - `fulfilled` stores the fetched file data in `items`
   - `rejected` stores the error message and stops loading
6. The UI reads state via selectors and renders the appropriate view.

## Complete Data Flow Diagram

![alt text](<Complete Data Flow Diagram.svg>)

## Configuration

### API URL

The app currently uses the deployed API URL in `src/services/filesService.js`:

```js
const API_URL = "https://toolbox-api-latest.onrender.com";
```

If you want to run against a local backend, replace that line with your local API address, for example:

```js
const API_URL = "http://localhost:3001";
```

## Testing

Run the test suite with:

```bash
npm test
```

To run a specific file test, use:

```bash
npm test -- --runTestsByPath src/tests/components/files/FilesView.test.js --watchAll=false
```

## Docker

Build the Docker image:

```bash
docker build -t toolbox-files-app .
```

Run the image:

```bash
docker run -p 3000:3000 toolbox-files-app
```

## Troubleshooting

- If the app does not display data, verify the API is reachable and the `API_URL` is correct.
- If the app is stuck in loading, check browser console and network requests.
- If tests fail, run `npm test` and inspect the failure output.

## Notes

- The README now includes setup, usage, architecture, data flow, and testing details.
- The app follows modern ES6+ patterns through modules, async/await, destructuring, and arrow functions.
 