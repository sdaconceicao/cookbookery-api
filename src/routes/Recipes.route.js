import {Router} from 'express';

import {Recipes} from "../models";

const RecipeRouter = Router();

RecipeRouter
    .get('/', (req, res) => {
        Recipes.findAll().then(recipes => {
            res.status(200).send({
                recipes
            })
        }).catch(error=>{
            res.status(500).send({
                error
            })
        })
    })
    .get('/:id', (req, res) => {
        Recipes.findById(req.params.id).then(recipe=>{
            res.status(200).send({
                ...recipe.dataValues
            });
        }).catch(error=>{
            res.status(500).send({
                error
            })
        })
    })
    .post('/', (req, res) => {
        Recipes.create(req.body).then(recipe => {
            res.status(200).send({
                ...recipe
            });
        }).catch(error => {
            res.status(500).send({
                error
            })
        })
    })
    .put('/:id', (req, res) => {
        Recipes.update(req.body, {
            where: {id: req.params.id}
        }).then(recipe => {
            res.status(200).send({
                ...recipe
            });
        }).catch(error => {
            res.status(500).send({
                error
            })
        })
    })
    .delete('/:id', (req, res) => {
        Recipes.destroy({
            where: {id: req.params.id}
        }).then(()=>{
            res.status(200).send({
                message: `Recipe ${request.params.id} successfully deleted`
            });
        }).catch(error=>{
            res.status(500).send({
                error
            })
        });
    });

export default RecipeRouter;