import {Recipes} from "../models";
import {IngredientsService, StepsService, TagsService} from "./index";
import {saveImage} from "../helpers/files";
import {getComparison} from "../helpers/query";

export function loadList(query){
    return Recipes.findAll({
        where: generateWhereFromQuery(query)
    });
}

export function load(id){
    return new Promise(resolve=> {
        return Recipes.findAll({ //TODO findById is missing virtual fields, only all method picking fields up
            where: {id: id},
            include: ['ingredients', 'steps', 'tags']
        }).then(results=>{
            const result = JSON.parse(JSON.stringify(results));
            resolve(result[0])
        });
    });
}

export function create(recipe){
    return new Promise(resolve=>{
        saveRecipeImage(recipe).then(recipe=> {
            Recipes.create(recipe, {
                returning: true
            }).then(result => {
                saveAssociations(result.dataValues.id, recipe.ingredients, recipe.steps, recipe.tags).then(() => {
                    resolve(result.dataValues);
                })
            });
        });
    });
}

export function generateWhereFromQuery(query){
    const where = {};
    if (!query) return null;
    if(query.searchQuery){
        where.$or = [
            {title: { like: '%' + query.searchQuery + '%' }},
            {desc: { like: '%' + query.searchQuery + '%' }}
        ];
        order: [query.orderBy || 'createdAt', query.orderDirection || 'DESC']
    }
    if(query.prepTime){
       where.prepTime = getComparison(query.prepTime, query.prepTimeComparator);
    }
    if(query.cookTime){
        where.cookTime = getComparison(query.cookTime, query.cookTimeComparator);
    }
    return where;
}



export function remove(id){
    return Recipes.destroy({
        where: {id}
    })
}

export function update(recipe){
    return new Promise(resolve=>{
        saveRecipeImage(recipe).then(recipe=>{
            Recipes.update(recipe, {
                where: {id: recipe.id},
                returning: true
            }).then(result=>{
                saveAssociations(result[1][0].dataValues.id, recipe.ingredients, recipe.steps, recipe.tags).then(()=>{
                    resolve(result[1][0].dataValues);
                })
            });
        });

    });
}

export function saveAssociations(id, ingredients, steps, tags){
    return new Promise(resolve=>{
        Promise.all([
            IngredientsService.addIngredientsToRecipe(id, ingredients),
            StepsService.addStepsToRecipe(id, steps),
            TagsService.addTagsToRecipe(id, tags)
        ]).then(()=>{
            resolve(true);
        });
    });
}

export function saveRecipeImage(recipe) {
    return new Promise(resolve => {
        saveImage(recipe.image, 'img').then(imageLocation => {
            if (imageLocation) {
                recipe.image = imageLocation;
            } else if (!recipe.image) {
                recipe.image = null;
            }
        }).catch(error=>{
            console.error("Error in saving recipe image", error);
        }).finally(()=>{
            resolve(recipe);
        });
    })
}