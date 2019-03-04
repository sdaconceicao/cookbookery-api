import {RecipesService, IngredientsService, StepsService} from '../services'

/**
 * Retrieve all recipes with filters and pagination
 * @param req
 * @param res
 */
export function loadList(req, res){
    //TODO filters and pagination
    RecipesService.loadList(req.params.filters).then(recipes => {
        res.status(200).send({
            recipes
        })
    }).catch(error=>{
        res.status(500).send({
            error
        })
    })
}

/**
 * Retrieve recipe by id
 * @param req
 * @param res
 */
export function load(req, res){
    RecipesService.load(req.params.id).then(recipe=>{
        res.status(200).send({
            ...recipe.dataValues
        });
    }).catch(error=>{
        res.status(500).send({
            error
        })
    })
}

/**
 * Create new recipe
 * @param req
 * @param res
 */
export function create(req, res){
    //TODO image uploads
    RecipesService.create(req.body).then(recipe => {
        res.status(200).send({
            ...recipe
        });
    }).catch(error => {
        console.error(error);
        res.status(500).send({
            error
        })
    })
}

/**
 * Update existing recipe
 * @param req
 * @param res
 */
export function update(req, res){
    //TODO image uploads
    RecipesService.update(req.body).then(recipe => {
        res.status(200).send({
            ...recipe
        });
    }).catch(error => {
        res.status(500).send({
            error
        })
    })
}

/**
 * Remove existing recipe
 * @param req
 * @param res
 */
export function remove(req, res){
    RecipesService.remove(req.params.id).then(()=>{
        res.status(200).send({
            message: `Recipe ${req.params.id} successfully deleted`
        });
    }).catch(error=>{
        res.status(500).send({
            error
        })
    });
}