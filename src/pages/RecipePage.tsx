import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe } from '../types';
import {
    Box,
    Typography,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Chip,
    Stack
} from '@mui/material';
import {useDispatch} from "react-redux";

const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:3001/recipes/${id}`);
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (!recipe) {
        return (
            <Typography variant="h5" align="center" mt={5}>
                Recipe not found
            </Typography>
        );
    }

    return (
        <Box maxWidth={800} mx="auto" mt={4} px={2}>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={recipe.image}
                    alt={recipe.title}
                    sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                    <Typography variant="h4" gutterBottom>{recipe.title}</Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        Cooking Time: {recipe.cookingTime} • ⭐ {recipe.rating}
                    </Typography>

                    <Typography variant="h6" gutterBottom mt={2}>Ingredients</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {recipe.ingredients.map((ingredient, index) => (
                            <Chip key={index} label={ingredient} />
                        ))}
                    </Stack>

                    <Typography variant="h6" gutterBottom mt={3}>Instructions</Typography>
                    <Typography variant="body1">{recipe.instructions}</Typography>
                </CardContent>

            </Card>
        </Box>
    );
};

export default RecipePage;
