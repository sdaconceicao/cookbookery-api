import RecipesRouter from './Recipes.route';

export const setupRoutes = app => {
    app.use('/recipes', RecipesRouter);
};