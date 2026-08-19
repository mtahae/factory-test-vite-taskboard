# Sprintboard

A lightweight task board for small teams. No accounts, no backend — the board
lives in your browser's local storage.

Built with Vite + React.

## Features

- Add tasks with an assignee and a priority
- Tick tasks off as they get done
- Filter by status (all / open / done) and search by title or assignee
- Paged list so long backlogs stay readable
- Board state persists between visits via `localStorage`

## Running locally

```bash
npm install
npm run dev
```

Vite serves the app on <http://localhost:5173>.

To check a production build:

```bash
npm run build
npm run preview
```

## Project layout

```
src/
  App.jsx              board state, filtering and paging
  components/          task row and the new-task form
  lib/storage.js       localStorage read/write
  lib/seed.js          starter tasks for a fresh board
```
