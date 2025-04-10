import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Recipe } from "../types";
import {Grid, Typography, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from "@mui/material";
import RecipeCard from "../components/RecipeCard";
import { addRecipe, updateRecipe, deleteRecipe } from "../redux/recipeSlice";

const MyRecipesPage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector((state: RootState) => state.recipes.recipes);

    const currentUser = useSelector((state: RootState) => state.favorites.currentUser);


    const [open, setOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [newRecipe, setNewRecipe] = useState<Recipe>({
        id: '',
        title: '',
        image: '',
        ingredients: [],
        cookingTime: '',
        instructions: '',
        rating: 0,
        user: currentUser ?? '',
    });

    const userRecipes = recipes.filter((recipe) => recipe.user === currentUser);

    const handleOpenAddRecipe = () => {
        setSelectedRecipe(null);
        setNewRecipe({
            id: "",
            title: "",
            image: "",
            ingredients: [],
            cookingTime: "",
            instructions: "",
            rating: 0,
            user: currentUser ?? "",
        });
        setOpen(true);
    };
    const handleOpenEditRecipe = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setNewRecipe(recipe);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newRecipe.title && newRecipe.image && newRecipe.ingredients.length > 0) {
            const newRecipeWithUser = {
                ...newRecipe,
                id: `${Date.now()}`,
                user: currentUser,
            };
            dispatch(addRecipe(newRecipeWithUser));
            handleClose();
        } else {
            alert("Please fill all fields.");
        }
    };

    const handleOpen = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setNewRecipe(recipe);
        setOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewRecipe((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewRecipe((prev) => ({
            ...prev,
            ingredients: value.split(','),
        }));
    };

    const handleUpdate = () => {
        console.log('Updating recipe with ID:', newRecipe.id);
        if (newRecipe.title && newRecipe.image && newRecipe.ingredients.length > 0) {
            dispatch(updateRecipe(newRecipe));
            handleClose();
        } else {
            alert("Please fill all fields.");
        }
    };

    const handleDelete = () => {
        if (selectedRecipe) {
            dispatch(deleteRecipe(selectedRecipe.id));
            handleClose();
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>My Recipes</Typography>
            <Button className="py-4 px-4 mb-5" variant="contained" onClick={handleOpenAddRecipe}>
                Add New Recipe
            </Button>

            <Grid container spacing={3}>
                {userRecipes.length > 0 ? (
                    userRecipes.map((recipe) => (
                        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                            <RecipeCard
                                recipe={recipe}
                                onDelete={() => handleOpenEditRecipe(recipe)}
                                onEdit={() => handleOpenEditRecipe(recipe)}
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="textSecondary">No recipes available.</Typography>
                )}
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Recipe</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Recipe Title"
                        name="title"
                        value={newRecipe.title}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Image URL"
                        name="image"
                        value={newRecipe.image}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Ingredients (comma separated)"
                        name="ingredients"
                        value={newRecipe.ingredients.join(', ')}
                        onChange={handleIngredientsChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Cooking Time"
                        name="cookingTime"
                        value={newRecipe.cookingTime}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Instructions"
                        name="instructions"
                        value={newRecipe.instructions}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Rating"
                        name="rating"
                        type="number"
                        value={newRecipe.rating}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {selectedRecipe ? (
                        <>
                            <Button onClick={handleUpdate} color="primary">
                                Update Recipe
                            </Button>
                            <Button onClick={handleDelete} color="secondary">
                                Delete Recipe
                            </Button>
                        </>
                    ) : (
                        <Button onClick={handleAdd} color="primary">
                            Add Recipe
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default MyRecipesPage;
