import {Recipes} from "../models";

/**
 * Retrieve all recipes with filters and pagination
 * @param req
 * @param res
 */
export function getAll(req, res){
    //TODO filters and pagination
    Recipes.findAll().then(recipes => {
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
export function getOne(req, res){
    Recipes.findById(req.params.id, {
        include: ['ingredients', 'steps', 'tags']
    }).then(recipe=>{
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
    //TODO handle associations and image uploads
    Recipes.create(req.body, {
        returning: true
    }).then(result => {
        res.status(200).send({
            ...result.dataValues
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
    //TODO handle associations and image uploads
    Recipes.update(req.body, {
        where: {id: req.params.id},
        returning: true
    }).then(result => {
        res.status(200).send({
            ...result[1][0].dataValues
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
    Recipes.destroy({
        where: {id: req.params.id}
    }).then(()=>{
        res.status(200).send({
            message: `Recipe ${req.params.id} successfully deleted`
        });
    }).catch(error=>{
        res.status(500).send({
            error
        })
    });
}