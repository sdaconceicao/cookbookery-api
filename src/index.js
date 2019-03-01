import express from 'express';
import bodyParser from 'body-parser';
import minimist from 'minimist';

import {setupRoutes} from './routes';

const app = express(),
    args = process.argv.slice(2),
    port = minimist(args).port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

setupRoutes(app);

const server = app.listen(port, () => {
    console.log(`Cookbookery - Listening on Port ${port}`);
});
