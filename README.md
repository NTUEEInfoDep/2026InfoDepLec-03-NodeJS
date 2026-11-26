# Simple Expense Tracker

A plain HTML/CSS/JavaScript frontend backed by a Node.js and Express API.

## Prerequisites

- Node.js and npm
- A modern web browser

## Project structure

```text
backend/   Express API running on http://localhost:8000
frontend/  Static expense tracker files
```

## 1. Start the backend

Open a terminal in the project root:

```bash
cd backend
npm install
```

Start the API normally:

```bash
npm start
```

Or start it with automatic restarts during development:

```bash
npm run dev
```

The backend listens on `http://localhost:8000`. Verify it with:

```bash
curl http://localhost:8000/api
curl http://localhost:8000/expense
```

The expense data is stored in memory in `backend/db.js`, so changes are reset whenever the backend restarts.

## 2. Start the frontend

Open a second terminal in the project root and serve the frontend with Python:

```bash
cd frontend
python3 -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

You can also open `frontend/index.html` directly or use the Live Server extension in VS Code. The frontend sends requests to `http://localhost:8000`.

## Available API routes

| Method | URL | Purpose |
| --- | --- | --- |
| `GET` | `/expense` | List all expenses |
| `POST` | `/expense` | Create an expense |
| `PUT` | `/expense/:id` | Update an expense |
| `DELETE` | `/expense/:id` | Delete an expense |
| `GET` | `/api` | Test route |
