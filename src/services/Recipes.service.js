import {Recipes} from "../models";
import {IngredientsService, StepsService, TagsService} from "./index";
import {saveImage} from "../helpers/files";

export function loadList(filters){
    return Recipes.findAll({
        include: ['ingredients', 'steps', 'tags']
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
        saveImage(recipe.image, 'public/img').then((imageLocation)=> {
            if (imageLocation) {
                recipe.image = imageLocation.substr(imageLocation.indexOf('img/'));
            }
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

export function remove(id){
    return Recipes.destroy({
        where: {id}
    })
}

export function update(recipe){
    return new Promise(resolve=>{
        saveImage(recipe.image, 'public/img').then((imageLocation)=>{
            if(imageLocation){
                recipe.image = imageLocation.substr(imageLocation.indexOf('img/'));
            }
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