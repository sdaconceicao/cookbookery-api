import express from 'express';
import minimist from 'minimist';

const server = express(),
    args = process.argv.slice(2),
    port = minimist(args).port || 3000;

server.listen(port, () => {
    console.log(`Cookbookery - Listening on Port ${port}`);
});
