import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
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

export const addRecipe = createAsyncThunk('recipes/add', async (recipe: Recipe) => {
    const res = await axios.post('http://localhost:3001/recipes', recipe);
    return res.data;
});

export const updateRecipe = createAsyncThunk('recipes/update', async (recipe: Recipe) => {
    try {
        const response = await axios.put(`http://localhost:3001/recipes/${recipe.id}`, recipe);
        return response.data;
    } catch (error) {
        console.error('Error updating recipe:', error);
        throw error;
    }
});

export const deleteRecipe = createAsyncThunk('recipes/delete', async (id: string) => {
    await axios.delete(`http://localhost:3001/recipes/${id}`);
    return id;
});

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers:{},

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
            // Add a new recipe
            .addCase(addRecipe.pending, (state) => {
                state.loading = true;
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes.push(action.payload);
            })
            .addCase(addRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add recipe';
            })
            // Update an existing recipe
            .addCase(updateRecipe.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateRecipe.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
                if (index !== -1) {
                    state.recipes[index] = action.payload;
                }
            })
            .addCase(updateRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update recipe';
            })
            // Delete a recipe
            .addCase(deleteRecipe.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
            })
            .addCase(deleteRecipe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete recipe';
            });

    }
})


export default recipeSlice.reducer