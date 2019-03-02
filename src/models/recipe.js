import Sequelize, {Model} from 'sequelize';

export default class Recipe extends Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            desc: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING
            },
            servingSize: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            prepTime: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            cookTime: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, {sequelize})
    };
};
