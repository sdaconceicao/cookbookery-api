import {Model} from 'sequelize';

export default class Ingredients extends Model {
    static init(sequelize) {
        return super.init({
            desc: {
                type: 'citext',
                allowNull: false,
            }
        }, {sequelize})
    };
};