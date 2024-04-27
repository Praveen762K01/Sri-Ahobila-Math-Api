'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HomeDolai_Master_Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HomeDolai_Master_Table.init({
    from_date: DataTypes.STRING,
    to_date: DataTypes.STRING,
    month_name: DataTypes.STRING,
    price: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'HomeDolai_Master_Table',
  });
  return HomeDolai_Master_Table;
};