import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes } from '../redux/recipeSlice';
import RecipeCard from '../components/RecipeCard.tsx';
import { TextField, Grid, Typography, CircularProgress, Box } from '@mui/material';
import { Recipe } from '../types';
import {RootState} from "../redux/store.ts";

export const Home = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state:RootState) => state.recipes.recipes);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(fetchRecipes())
            .unwrap()
            .catch((err) => console.error("Error fetching recipes : ",err))
            .finally(() => setLoading(false)); // Assuming fetchRecipes returns a promise
    }, [dispatch]);


    const filteredRecipes = Array.isArray(recipes)
        ? recipes.filter((recipe: Recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            recipe.ingredients.some((ingredient) =>
                ingredient.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
        : [];

    return (
        <Box sx={{ minHeight: '100vh', padding: 2, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ maxWidth: 1200, margin: '0 auto' }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Recipe Feed
                </Typography>

                {/* Search bar */}
                <TextField
                    label="Search recipes by title or ingredient"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ marginBottom: 4 }}
                />

                {/* Recipe Grid */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe:Recipe) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                                    <RecipeCard recipe={recipe} />
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="h6" align="center" color="textSecondary">
                                No recipes found.
                            </Typography>
                        )}
                    </Grid>

                )}
            </Box>
        </Box>

    );
}

export default Home;
