import {Router} from 'express';

const recipeRouter = Router();

recipeRouter
    .get('/', (req, res) => {
        res.status(200).send({
            data: []
        });
    })
    .get('/:id', (req, res) => {
        res.status(200).send({
            data: {}
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

export default recipeRouter;