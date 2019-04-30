import {Tags, RecipeTags} from '../models';

export function loadList(query){
    return Tags.findAll({
        where: generateWhereFromQuery(query)
    });
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

export function generateWhereFromQuery(query){
    const where = {};
    if (!query) return null;
    if(query.searchQuery){
        where.name =  { like: '%' + query.searchQuery + '%' };
    }
    return where;
}