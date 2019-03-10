import Sequelize, {Model} from 'sequelize';

export default class RecipeTags extends Model {
    static init(sequelize) {
        return super.init({}, {sequelize})
    };
};
