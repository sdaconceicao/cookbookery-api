import Sequelize from 'sequelize';
import {getModels} from "../src/utils/models";

const env = process.env.NODE_ENV || "development",
    config = require('../src/config/config.js')[env],
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
    });

getModels(__dirname+'/../src/models/', sequelize);

sequelize.sync();