import {Card, CardMedia, CardContent, Typography, CardActions, Button, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Recipe } from '../types';
import {useNavigate} from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {addToFavorites, removeFromFavorites} from "../redux/favoritesSlice.ts";
import SocialShare from './SocialShare';


const RecipeCard = ({ recipe, onEdit, onDelete }: { recipe: Recipe }) => {
    //console.log('Recipe:', recipe);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    const isFavorite = favorites.some((fav) => fav.id === recipe.id);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(recipe.id));
        } else {
            dispatch(addToFavorites(recipe));
        }
    };


    return (

        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <CardMedia
                component="img"
                image={recipe.image}
                alt={recipe.title}
                sx={{
                    height: 180,
                    width: '100%',
                    objectFit: 'cover'
                }}
                onClick={onEdit}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {recipe.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {recipe.cookingTime} • ⭐ {recipe.rating}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    sx={{color: 'grey.600',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                            /*color: 'primary.main',*/
                            backgroundColor: 'grey.200',
                        },
                    }}
                    size="small" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                    View Recipe
                </Button>
                <IconButton onClick={toggleFavorite}>
                    {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
                <Button size="small" onClick={onDelete} hidden>Delete</Button>
                <SocialShare recipeTitle={recipe.title} />
            </CardActions>
        </Card>
    );
};

export default RecipeCard;
