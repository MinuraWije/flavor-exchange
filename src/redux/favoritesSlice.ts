import {Recipe} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type FavoritesState = {
    favorites: Recipe[];
    currentUser: string | null;
};

const initialState: FavoritesState = {
    favorites: [],
    currentUser: null,
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
        setCurrentUser: (state, action: PayloadAction<string | null>) => {
            state.currentUser = action.payload;
            state.favorites = action.payload ? loadFavorites(action.payload) : [];
        },

        addToFavorites: (state, action: PayloadAction<Recipe>) => {
            if(!state.currentUser) return;

            const exists = state.favorites.some(r => r.id === action.payload.id);
            if (!exists) {
                state.favorites.push(action.payload);
                localStorage.setItem(getKey(state.currentUser), JSON.stringify(state.favorites));
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            if(!state.currentUser) return;

            state.favorites = state.favorites.filter(r => r.id !== action.payload);
            localStorage.setItem(getKey(state.currentUser), JSON.stringify(state.favorites));
        },
    },
});

export const { addToFavorites, removeFromFavorites, setCurrentUser } = favoritesSlice.actions;
export default favoritesSlice.reducer;