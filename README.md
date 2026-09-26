# Trello Clone — React + Redux Toolkit + JavaScript

A Trello-style task management application built with **React, JavaScript, and Redux Toolkit**.

This version builds on the original React + JavaScript implementation by introducing centralized state management with Redux Toolkit.

## Tech Stack

- React
- JavaScript
- Redux Toolkit
- React Redux
- Vite
- Axios
- React Router
- Ant Design
- Tailwind CSS
- Trello REST API

## Features

- View Trello boards
- Create a board
- Open a board
- View lists inside a board
- Create lists
- Archive lists
- View cards inside a list
- Create cards
- Archive cards
- View checklists inside a card
- Create checklists
- Delete checklists
- View checklist items
- Create checklist items
- Toggle checklist items
- Delete checklist items

## Why Redux?

The original React version stored fetched data inside individual components.

As the application became more nested:

```text
Board
  ↓
List
  ↓
Card
  ↓
Checklist
  ↓
Check Item
```

Shared application data became easier to manage with Redux.

## Main Redux Flow

The main flow is:

```text
Trello API
    ↓
React Component
    ↓
dispatch(action)
    ↓
Redux Store
    ↓
Reducer
    ↓
Updated State
    ↓
useSelector
    ↓
Component
    ↓
UI
```

# Redux Store

```text
store
├── boards
│   └── boards
├── lists
│   └── lists
├── cards
│   └── cardsByList
├── checklists
│   └── checklistsByCard
└── checkItems
    └── checkItemsByChecklist
```

## Keyed State

Cards are stored by list ID:

```javascript
cardsByList: {
  "list-id-1": [card1, card2],
  "list-id-2": [card3]
}
```

Checklists are stored by card ID, and check items are stored by checklist ID.

This keeps child data associated with the correct parent and prevents different components from overwriting each other's data.

## Redux Slices

The project has the following Redux slices:

```text
boardsSlice
listsSlice
cardsSlice
checklistsSlice
checkItemsSlice
```

A slice contains a name, initial state, reducers, and generated actions.

### Example

```javascript
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, action) => {
      const { listId, cards } = action.payload;
      state.cardsByList[listId] = cards;
    },
  },
});
```

## Dispatch and Selectors

### Sending Data to Redux

```javascript
dispatch(setCards({
  listId: list.id,
  cards: response.data,
}));
```

### Reading Data from Redux

```javascript
const cards = useSelector(
  state => state.cards.cardsByList[list.id]
);
```

## Local UI State

Temporary UI state remains local to React components.

### Redux State

```text
- boards
- lists
- cards
- checklists
- check items
```

### React `useState`

```text
- modal state
- input values
- temporary UI state
```

## API Communication

Axios requests are made directly from React components.

The response is then dispatched to Redux.

### Example Flow

```text
React Component
      │
      ▼
Axios API Request
      │
      ▼
API Response
      │
      ▼
Redux Action
      │
      ▼
Redux Store
      │
      ▼
React Component
```

## Project Structure

```text
src/
│
├── assets/
│
├── components/
│   ├── Header.jsx
│   ├── BoardList.jsx
│   ├── Card.jsx
│   └── Checklist.jsx
│
├── config/
│   └── config.js
│
├── pages/
│   ├── BoardsPage.jsx
│   └── BoardPage.jsx
│
├── services/
│   └── trelloApi.js
│
├── store/
│   ├── store.js
│   ├── boardSlice.js
│   ├── listSlice.js
│   ├── checklistSlice.js
│   └── checkItemSlice.js
│
├── App.jsx
├── index.css
└── main.jsx

```
