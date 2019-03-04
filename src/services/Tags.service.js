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
                Tags.bulkCreate(tags.filter(tag=>!tag.id), {
                    ignoreDuplicates: true,
                    returning: true
                }).then((results)=>{
                    const recipeTags = [],
                        existingTags = tags.filter(tag=>tag.id);
                    existingTags.forEach(existingTag =>{
                        recipeTags.push({TagId: existingTag.id, RecipeId: recipeId});
                    });
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