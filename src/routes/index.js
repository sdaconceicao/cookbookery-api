import recipeRouter from './recipes';

export const setupRoutes = app => {
    app.use('/recipes', recipeRouter);
};