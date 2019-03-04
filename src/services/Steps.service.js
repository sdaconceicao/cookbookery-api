import {Steps} from "../models";

export function removeStepsFromRecipe(recipeId){
    return Steps.destroy({
        where: {RecipeId: recipeId}
    })
}

export function addStepsToRecipe(recipeId, steps){
    return new Promise(resolve=>{
        removeStepsFromRecipe(recipeId).then(()=>{
            if(steps){
                steps.forEach((step) =>{ step.RecipeId = recipeId; });
                Steps.bulkCreate(steps);
            }
            resolve(true);
        })
    });
}