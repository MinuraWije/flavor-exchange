import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"
import {Recipe} from "../types";


interface RecipeState{
    recipes: Recipe[]
    loading:boolean
    error:string | null
}

const initialState:RecipeState = {
    recipes: [],
    loading: false,
    error: null,
}

export const fetchRecipes = createAsyncThunk('recipes/fetch', async () => {
    const res = await axios.get('http://localhost:3001/recipes')
    return res.data;
})

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers:{
        addRecipe: (state, action:PayloadAction<Recipe>) => {
            state.recipes.push(action.payload)
        },
    },

    extraReducers:(builder) => {
        builder
            .addCase(fetchRecipes.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false
                state.recipes = action.payload
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message || 'Failed to fetch recipes'
            })
    }
})

export const {addRecipe} = recipeSlice.actions;
export default recipeSlice.reducer