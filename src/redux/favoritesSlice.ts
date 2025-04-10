import {Recipe} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FavoritesState{
    favorites: Recipe[];
}

const initialState: FavoritesState = {
    favorites: [],
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<Recipe>) => {
            const exists = state.favorites.find((r) => r.id === action.payload.id);
            if (!exists) {
                state.favorites.push(action.payload);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            state.favorites = state.favorites.filter((r) => r.id !== action.payload);
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;