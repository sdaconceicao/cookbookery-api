import Sequelize, {Model} from 'sequelize';

export default class Steps extends Model {
    static init(sequelize) {
        return super.init({
            desc: {
                type: 'citext',
                allowNull: false,
            }
        }, {sequelize})
    };
};


