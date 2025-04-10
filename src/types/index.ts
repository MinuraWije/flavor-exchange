export interface Recipe {
    id: string;
    title: string;
    cookingTime: string
    rating: number;
    image: string;
    ingredients: string[];
    instructions: string;
    user: string;
}