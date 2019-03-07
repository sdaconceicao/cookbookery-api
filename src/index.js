import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import minimist from 'minimist';
import logger from 'morgan';


import {setupRoutes} from './routes';

const app = express(),
    args = process.argv.slice(2),
    port = minimist(args).port || 3000;



app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

setupRoutes(app);

const server = app.listen(port, () => {
    console.log(`Cookbookery - Listening on Port ${port}`);
});
