import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Grid, Typography, Box } from '@mui/material';
import RecipeCard from '../components/RecipeCard.tsx';

const FavoritesPage = () => {
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>Favorite Recipes</Typography>
            <Grid container spacing={3}>
                {favorites.length > 0 ? (
                    favorites.map((recipe) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="textSecondary">No favorites yet.</Typography>
                )}
            </Grid>
        </Box>
    );
};

export default FavoritesPage;
