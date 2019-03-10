import Sequelize, {Model} from 'sequelize';

export default class Tags extends Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: 'citext',
                allowNull: false,
            }
        }, {sequelize})
    };
    static associate(models) {
        this.belongsToMany(models.Recipes, {
            through: 'RecipeTags'
        });
    }
};
