import RecipesRouter from './Recipes.route';
import TagsRouter from './Tags.route';

export const setupRoutes = app => {
    app.use('/recipes', RecipesRouter);
    app.use('/tags', TagsRouter);
};