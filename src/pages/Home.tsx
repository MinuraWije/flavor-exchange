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
            .finally(() => setLoading(false));
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
            <Box
                sx={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: 3,

                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#333' }}
                    className="text-gray-800"
                >
                    Recipe Feed
                </Typography>

                {/* Search bar */}
                <TextField
                    label="Search recipes by title or ingredient"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                        marginBottom: 4,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        },
                    }}
                />

                {/* Recipe Grid */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {filteredRecipes.length > 0 ? (
                            <Grid container spacing={3}>
                                {filteredRecipes.map((recipe: Recipe) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                                        <RecipeCard recipe={recipe} />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography
                                variant="h6"
                                align="center"
                                color="text.secondary"
                                sx={{ mt: 4 }}
                            >
                                No recipes found.
                            </Typography>
                        )}
                    </>
                )}
            </Box>

    );
}

export default Home;
