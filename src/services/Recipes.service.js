import {Recipes} from "../models";

export function loadList(filter){
    return Recipes.findAll();
}

export function load(id){
    return Recipes.findById(id, {
        include: ['ingredients', 'steps', 'tags']
    })
}

export function create(recipe){
    return Recipes.create(recipe, {
        returning: true
    });
}

export function remove(id){
    return Recipes.destroy({
        where: {id}
    })
}

export function update(recipe){
    return Recipes.update(recipe, {
        where: {id: recipe.id},
        returning: true
    })
}