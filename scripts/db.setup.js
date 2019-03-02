import Sequelize from 'sequelize';
import {getModels} from "../utils/models";

const env = process.env.NODE_ENV || "development",
    config = require('../config/config.js')[env],
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
    });

getModels('../src/models', sequelize);

sequelize.sync();