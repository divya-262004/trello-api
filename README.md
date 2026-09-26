# Trello Clone — React + JavaScript

A Trello-style task management application built with React and JavaScript.

## Tech Stack

- React
- JavaScript
- Vite
- Axios
- React Router
- Ant Design
- Tailwind CSS
- Trello REST API

## Features

- View and create boards
- Open boards
- View, create, and archive lists
- View, create, and archive cards
- Create and delete checklists
- Create, toggle, and delete checklist items

## Architecture

This is the React implementation

```text
Trello API
    ↓
React Component
    ↓
useState
    ↓
UI
```

Components communicate through props and callback functions.

```text
BoardPage
   ↓ props
List
   ↓ props
Card
   ↓ props
Checklist
```

## State Management

Local component state is handled with `useState`.

Examples include:

- Modal visibility
- Input values
- Fetched boards, lists, and cards
- Temporary UI state

Example:

```javascript
const [listName, setListName] = useState("");
```

## API Communication

Axios communicates with the Trello REST API.

```javascript
const response = await trelloApi.get(`/boards/${boardId}/lists`);
```

The response is stored in component state and used to render the UI.

## Project Structure

```text
trello-react-divya/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── BoardList.jsx
│   │   ├── Card.jsx
│   │   └── Checklist.jsx
│   │
│   ├── config/
│   │   └── config.js
│   │
│   ├── pages/
│   │   ├── BoardsPage.jsx
│   │   └── BoardPage.jsx
│   │
│   ├── services/
│   │   └── trelloApi.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```