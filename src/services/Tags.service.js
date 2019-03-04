import {Tags, RecipeTags} from '../models';

export function loadList(filters){
    return Tags.findAll();
}

export function removeTagsFromRecipe(recipeId){
    return RecipeTags.destroy({
        where: {RecipeId: recipeId}
    })
}

export function addTagsToRecipe(recipeId, tags){
    return new Promise(resolve=>{
        removeTagsFromRecipe(recipeId).then(()=>{
            if(tags){
                Tags.bulkCreate(tags, {
                    ignoreDuplicates: true,
                    returning: true
                }).then((results)=>{
                    const recipeTags = [];
                    results.forEach((result) => {
                        recipeTags.push({TagId: result.dataValues.id, RecipeId: recipeId});
                    });
                    RecipeTags.bulkCreate(recipeTags);
                });
            }
            resolve(true)
        })
    });
}