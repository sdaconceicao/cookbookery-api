import fs from 'fs';
import path from 'path';

export function getModels(directory, sequelize){
    const models = Object.assign({}, ...fs.readdirSync(directory)
        .filter(file =>
            (file.indexOf(".") !== 0) && (file !== "index.js")
        )
        .map((file) => {
            const model = require(path.join(directory, file)).default;
            return {
                [model.name]: model.init(sequelize),
            };
        })
    );

    for (const model of Object.keys(models)) {
        typeof models[model].associate === 'function' && models[model].associate(models);
    }
    return models
};
