import {Router} from 'express';

import {Recipe} from "../models";

const RecipeRouter = Router();

RecipeRouter
    .get('/', (req, res) => {
        Recipe.findAll().then(recipes => {
            res.status(200).send({
                data: recipes
            });
        })
    })
    .get('/:id', (req, res) => {
        Recipe.findAll({
            where: {id: req.param.id}
        }).then(recipe=>{
            res.status(200).send({
                data: recipe
            });
        });
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