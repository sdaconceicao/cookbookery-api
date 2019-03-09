import Sequelize from 'sequelize';

export default (sequelize) => {
    const Recipes = sequelize.define('Recipes', {
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        desc: {
            type: Sequelize.TEXT,
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
                console.log("BARBARA", value);
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
        },
    });

    Recipes.setAssociations = (models)=> {
        Recipes.hasMany(models.Ingredients, {
            onDelete: "CASCADE",
            as: 'ingredients',
            foreignKey: {
                allowNull: false
            }
        });
        Recipes.hasMany(models.Steps, {
            onDelete: "CASCADE",
            as: 'steps',
            foreignKey: {
                allowNull: false
            }
        });
        Recipes.belongsToMany(models.Tags, {
            through: 'RecipeTags',
            as: 'tags'
        });
    };

    return Recipes;
};
