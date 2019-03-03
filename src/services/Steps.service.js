import {Steps} from "../models";

export function removeStepsFromRecipe(recipeId){
    return Steps.destroy({
        where: {RecipeId: recipeId}
    })
}

export function addStepsToRecipe(recipeId, steps){
    return removeStepsFromRecipe(recipeId).then(()=>{
        steps.forEach((step) =>{ step.RecipeId = recipeId; });
        return Steps.bulkCreate(steps);
    })
}