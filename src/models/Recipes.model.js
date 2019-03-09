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
        imageFullPath:{
            type: Sequelize.VIRTUAL,
            get: function() {
                return this.getDataValue('image')
                    ? `http://${process.env.BASE_URL}:${process.env.PORT}/${this.getDataValue('image')}`
                    : null
            }
        }
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
