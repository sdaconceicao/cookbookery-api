import Sequelize, {Model} from 'sequelize';

export default class Recipes extends Model {
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

    static associate(models) {
        this.hasMany(models.Ingredients, {
            onDelete: "CASCADE",
            as: 'ingredients',
            foreignKey: {
                allowNull: false
            }
        });
        this.hasMany(models.Steps, {
            onDelete: "CASCADE",
            as: 'steps',
            foreignKey: {
                allowNull: false
            }
        });
        this.belongsToMany(models.Tags, {
            through: 'RecipeTags',
            as: 'tags'
        });
    }
};
