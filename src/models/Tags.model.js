import Sequelize, {Model} from 'sequelize';

export default class Tags extends Model {
    static init(sequelize) {
        return super.init({
            desc: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        }, {sequelize})
    };
};
