export const recipesRoutes = app => {
    app.get('/recipes', (request, response) => {
        response.status(200).send({
            data: []
        });
    });
    app.get('/recipes/:id', (request, response) => {
        response.status(200).send({
            data: {}
        });
    });
    app.post('/recipes/', (request, response) => {
        response.status(200).send({
            data: {}
        });
    });
    app.put('/recipes/:id', (request, response) => {
        response.status(200).send({
            data: {}
        });
    });
    app.delete('/recipes/:id', (request, response) => {
        response.status(200).send({
            data: {
                message: `Recipe ${request.params.id} successfully deleted`
            }
        });
    });
};