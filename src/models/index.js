import Sequelize from 'sequelize';

import Ingredients from './Ingredients.model';
import Recipes from './Recipes.model';
import RecipeTags from './RecipeTags.model';
import Steps from './Steps.model';
import Tags from './Tags.model';

export function getModels(sequelize){
    const models = [];

    models['Ingredients'] = Ingredients(sequelize);
    models['Steps'] =  Steps(sequelize);
    models['Tags'] =  Tags(sequelize);
    models['Recipes'] =  Recipes(sequelize, models);
    models['RecipeTags'] =  RecipeTags(sequelize, models);

    models.Tags.setAssociations(models);
    models.Recipes.setAssociations(models);

    return models
};

const env = process.env.NODE_ENV || "development",
    config = require('../../config/sequelize.config.js')[env],
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
    }),
    models = getModels(sequelize);

module.exports = models;