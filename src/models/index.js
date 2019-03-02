import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || "development",
    config = require('../config/config.js')[env],
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
    });

const models = Object.assign({}, ...fs.readdirSync(__dirname)
    .filter(file =>
        (file.indexOf(".") !== 0) && (file !== "index.js")
    )
    .map((file) => {
        const model = require(path.join(__dirname, file)).default;
        return {
            [model.name]: model.init(sequelize),
        };
    })
);

for (const model of Object.keys(models)) {
    typeof models[model].associate === 'function' && models[model].associate(models);
}

module.exports = models;