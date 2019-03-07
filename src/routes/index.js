import swaggerUi from 'swagger-ui-express';

import RecipesRouter from './Recipes.route';
import TagsRouter from './Tags.route';

export const setupRoutes = app => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require("../config/swagger")));
    app.use('/recipes', RecipesRouter);
    app.use('/tags', TagsRouter);
};