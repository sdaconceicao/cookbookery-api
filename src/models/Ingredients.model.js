import Sequelize from 'sequelize';

export default (sequelize) => {
    const Ingredients = sequelize.define('Ingredients', {
        desc: {
            type: Sequelize.TEXT,
            allowNull: false,
        }
    });
    return Ingredients;
};



