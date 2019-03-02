import Sequelize, {Model} from 'sequelize';

export default class Ingredients extends Model {
    static init(sequelize) {
        return super.init({
            desc: {
                type: Sequelize.TEXT,
                allowNull: false,
            }
        }, {sequelize})
    };
};
