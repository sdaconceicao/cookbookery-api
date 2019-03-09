import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';

import {setupRoutes} from './routes';

const app = express(),
    port = process.env.PORT;

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
