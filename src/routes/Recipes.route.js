import {Router} from 'express';

import {Recipes} from "../models";

const RecipeRouter = Router();

RecipeRouter
    .get('/', (req, res) => {
        Recipes.findAll().then(recipes => {
            res.status(200).send({
                data: recipes
            })
        }).catch(error=>{
            res.status(500).send({
                error
            })
        })
    })
    .get('/:id', (req, res) => {
        Recipes.findAll({
            where: {id: req.params.id}
        }).then(recipe=>{
            res.status(200).send({
                data: recipe
            });
        }).catch(error=>{
            res.status(500).send({
                error
            })
        })
    })
    .post('/', (req, res) => {
        res.status(200).send({
            data: {}
        });
    })
    .put('/:id', (req, res) => {
        res.status(200).send({
            data: {}
        });
    })
    .delete('/:id', (req, res) => {
        res.status(200).send({
            data: {
                message: `Recipe ${request.params.id} successfully deleted`
            }
        });
    });

export default RecipeRouter;