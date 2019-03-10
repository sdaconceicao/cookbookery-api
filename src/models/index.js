import Sequelize from 'sequelize';
import {getModels} from "../helpers/models";

const env = process.env.NODE_ENV || "development",
    config = require('../../config/sequelize.config.js')[env],
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
    }),
    models = getModels(__dirname, sequelize);

module.exports = models;