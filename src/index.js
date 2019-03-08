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
app.use(express.static('public'));
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
}));

setupRoutes(app);

const server = app.listen(port, () => {
    console.log(`Cookbookery - Listening on Port ${port}`);
});
