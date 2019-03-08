import Sequelize from 'sequelize';

export default (sequelize) => {
    const Steps = sequelize.define('Steps', {
        desc: {
            type: Sequelize.TEXT,
            allowNull: false,
        }
    });
    return Steps;
};



