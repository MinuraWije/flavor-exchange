import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice.ts'
import recipeReducer from './recipeSlice.ts'

const store = configureStore({
    reducer: {
        auth:authReducer,
        recipes:recipeReducer,
    },
});

export type RootState = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;

export default store;