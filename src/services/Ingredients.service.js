import {Ingredients} from "../models";

export function removeIngredientsFromRecipe(recipeId){
    return Ingredients.destroy({
        where: {RecipeId: recipeId}
    })
}

export function addIngredientsToRecipe(recipeId, ingredients){
    return removeIngredientsFromRecipe(recipeId).then(()=>{
        ingredients.forEach((ingredient) =>{ ingredient.RecipeId = recipeId; });
        return Ingredients.bulkCreate(ingredients);
    })
}