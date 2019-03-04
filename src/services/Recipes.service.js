import {Recipes} from "../models";
import {IngredientsService, StepsService, TagsService} from "./index";

export function loadList(filters){
    return Recipes.findAll();
}

export function load(id){
    return Recipes.findById(id, {
        include: ['ingredients', 'steps', 'tags']
    })
}

export function create(recipe){
    return new Promise(resolve=>{
        Recipes.create(recipe, {
            returning: true
        }).then(result=>{
            saveAssociations(result.dataValues.id, recipe.ingredients, recipe.steps, recipe.tags).then(()=>{
                resolve(result.dataValues);
            })
        });
    });
}

export function remove(id){
    return Recipes.destroy({
        where: {id}
    })
}

export function update(recipe){
    return new Promise(resolve=>{
        Recipes.update(recipe, {
            where: {id: recipe.id},
            returning: true
        }).then(result=>{
            saveAssociations(result[1][0].dataValues.id, recipe.ingredients, recipe.steps, recipe.tags).then(()=>{
                resolve(result[1][0].dataValues);
            })
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