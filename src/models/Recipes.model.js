import Sequelize, {Model} from 'sequelize';

export default class Recipes extends Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: 'citext',
                allowNull: false,
            },
            desc: {
                type: 'citext',
                allowNull: false,
            },
            image: {
                type: Sequelize.STRING,
                get(){
                    return this.getDataValue('image')
                        ? `http://${process.env.BASE_URL}:${process.env.PORT}/${this.getDataValue('image')}`
                        : null
                },

                set(value){
                    this.setDataValue('image', value
                        ? value.substr(value.indexOf('img/'))
                        : null);
                }
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
