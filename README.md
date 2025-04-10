# 🍽️ Flavor Exchange

A modern recipe-sharing platform built with React, Redux, and Material-UI, where users can explore, favorite, and share their favorite dishes. This project demonstrates dynamic data handling, modern UI practices, and mock authentication features.

## 🌟 Features

### ✅ Core Functionalities
- **Recipe Feed**  
  View a grid of recipes with cooking time, rating, and images, powered by a mock API.

- **Search & Filter**  
  Instantly search recipes by title or ingredients with real-time filtering.

- **Recipe Details**  
  View detailed recipe pages with ingredients, step-by-step instructions, and the ability to favorite.

- **Mock Authentication**  
  Users can sign up/log in with a simple form. Data is persisted in localStorage.

- **Recipe CRUD**  
  Authenticated users can add, edit, and delete their own recipes.

- **Favorites System**  
  Favorite and unfavorite recipes with persistent state via Redux and localStorage.

- **Responsive Design**  
  Built with Material-UI for a clean, responsive user experience.

### 🔥 Optional Features
- **Social Sharing (Mock)**  
  Share your favorite dishes with the world (simulated functionality with buttons).

- **Dark Mode (Coming Soon)**  
  Toggle between light and dark themes for a more personalized experience.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Routing**: React Router
- **State Management**: Redux Toolkit
- **Styling**: Material-UI (MUI v5)
- **Mock API**: [JSON Server](https://github.com/typicode/json-server)
- **Auth & Persistence**: localStorage



## 🚀 Getting Started

### 1. Clone the Repository
```bash
  git clone https://github.com/your-username/flavor-exchange.git
  cd flavor-exchange
```
### 2. Install Dependencies
```bash
  npm install
```
### 3. Start JSON Server (Mock API)
```bash
  npx json-server --watch db.json --port 3001
```
### 4. Start the Development Server
```bash
  npm run dev
```

## 🧪 Testing Features
- Try signing up and logging in with a mock username.

- Browse recipes and use the search bar to filter.

- Add a new recipe and view it on your "My Recipes" page.

- Use the "Favorite" icon to save and unsave recipes.

- Edit or delete your own recipes.

- Click "Share" icons to simulate social sharing.


## 📝 Future Improvements

- 🌙 Dark mode toggle

- ⏱️ Cooking timer with countdown

- 🍽️ Ingredient substitution suggestions