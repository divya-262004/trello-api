# Trello Clone - React, Redux, TypeScript

A Trello-inspired task management application built with **React, TypeScript, Redux Toolkit, Tailwind CSS, Ant Design, and the Trello REST API**.

The application allows users to view boards, lists, cards, checklists, and checklist items while interacting with real Trello data through the API.

## 🚀 Features

- View Trello boards
- View lists inside a board
- View cards inside lists
- Create and manage lists
- View checklists associated with cards
- View checklist items and their completion status
- Redux Toolkit for global state management
- TypeScript for type safety
- Axios for API requests
- Responsive UI using Tailwind CSS
- Ant Design components
- React Router for navigation
- Environment variables for API credentials

## 🛠️ Tech Stack

- **React**
- **TypeScript**
- **Redux Toolkit**
- **React Redux**
- **React Router**
- **Tailwind CSS**
- **Ant Design**
- **Axios**
- **Vite**
- **Trello REST API**

## 🔷 TypeScript Implementation

TypeScript is used throughout the project to provide **static type checking**, improve code reliability, and clearly define the structure of Trello data and Redux state.

### 1. Typed Trello API Data

I created TypeScript interfaces to define the structure of data received from the Trello REST API.

```ts
interface Board {
  id: string;
  name: string;
  closed: boolean;
}

interface TrelloList {
  id: string;
  name: string;
  idBoard: string;
}

interface TrelloCard {
  id: string;
  name: string;
  idList: string;
}

interface TrelloChecklist {
  id: string;
  name: string;
  idCard: string;
}
```
## 📁 Project Structure

```text
trello-react-divya/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── dist/
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.js
└── README.md