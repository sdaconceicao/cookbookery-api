import {Router} from 'express';

import {RecipesController} from '../controllers';

const RecipeRouter = Router();

RecipeRouter
    .get('/', RecipesController.loadList)
    .get('/:id', RecipesController.load)
    .post('/', RecipesController.create)
    .put('/:id', RecipesController.update)
    .delete('/:id', RecipesController.remove);

export default RecipeRouter;