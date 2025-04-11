import {Recipe} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type FavoritesState = {
    favorites: Recipe[];
};

const initialState: FavoritesState = {
    favorites: [],
};

const getKey = (user: string) => `favorites_${user}`;

const loadFavorites = (user: string): Recipe[] => {
    const stored = localStorage.getItem(getKey(user));
    return stored ? JSON.parse(stored) : [];
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        loadUserFavorites: (state, action: PayloadAction<string>) => {
            state.favorites = loadFavorites(action.payload);
        },

        addToFavorites: (state, action: PayloadAction<{user:string; recipe:Recipe}>) => {
            const { user, recipe } = action.payload;
            const exists = state.favorites.some(r => r.id === recipe.id);
            if (!exists) {
                state.favorites.push(recipe);
                localStorage.setItem(getKey(user), JSON.stringify(state.favorites));
            }

        },
        removeFromFavorites: (state, action: PayloadAction<{ user: string; recipeId: string }>) => {
            const { user, recipeId } = action.payload;
            state.favorites = state.favorites.filter(r => r.id !== recipeId);
            localStorage.setItem(getKey(user), JSON.stringify(state.favorites));

        },
    },
});

export const { addToFavorites, removeFromFavorites, loadUserFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;