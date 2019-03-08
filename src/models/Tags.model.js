import Sequelize from 'sequelize';

export default (sequelize) => {
    const Tags = sequelize.define('Tags', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    Tags.setAssociations = (models)=> {
        Tags.belongsToMany(models.Recipes, {
            through: 'RecipeTags'
        });
    }
    return Tags;
};


