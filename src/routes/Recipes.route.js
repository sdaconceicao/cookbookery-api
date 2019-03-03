import {Router} from 'express';

import {RecipesController} from '../controllers';

const RecipeRouter = Router();

RecipeRouter
    .get('/', RecipesController.getAll)
    .get('/:id', RecipesController.getOne)
    .post('/', RecipesController.create)
    .put('/:id', RecipesController.update)
    .delete('/:id', RecipesController.remove);

export default RecipeRouter;