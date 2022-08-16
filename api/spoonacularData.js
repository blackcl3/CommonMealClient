import axios from 'axios';

const spoonacularAPIKEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const spoonURL = process.env.NEXT_PUBLIC_SPOONACULAR_URL;

const getRecipeByIngredient = () => new Promise((resolve, reject) => {
  axios.get(`${spoonURL}/recipes/findByIngredients?ingredients=blueberry,flour&apiKey=${spoonacularAPIKEY}`).then((response) => console.warn(response))
    .catch(reject);
});

const getRecipebyID = () => new Promise((resolve, reject) => {
  axios.get(`${spoonURL}/recipes/635375/information?includeNutrition=false&apiKey=${spoonacularAPIKEY}`).then((response) => console.warn((response)))
    .catch(reject);
});

export { getRecipeByIngredient, getRecipebyID };
