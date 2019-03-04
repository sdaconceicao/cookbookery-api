import {Ingredients, Steps} from "../models";

export function removeIngredientsFromRecipe(recipeId){
    return Ingredients.destroy({
        where: {RecipeId: recipeId}
    })
}

export function addIngredientsToRecipe(recipeId, ingredients){
    return new Promise(resolve=> {
        removeIngredientsFromRecipe(recipeId).then(() => {
            if(ingredients){
                ingredients.forEach((ingredient) => {
                    ingredient.RecipeId = recipeId;
                });
                Ingredients.bulkCreate(ingredients);
            }
            resolve(true);
        })
    });
}