import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.ts'
import recipeReducer from './recipeSlice.ts'
import favoritesReducer from './favoritesSlice.ts'

const store = configureStore({
    reducer: {
        auth:authReducer,
        recipes:recipeReducer,
        favorites:favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;

export default store;