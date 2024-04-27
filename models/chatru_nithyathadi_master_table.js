'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chatru_NithyaThadi_Master_Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chatru_NithyaThadi_Master_Table.init({
    from_date: DataTypes.STRING,
    to_date: DataTypes.STRING,
    month_name: DataTypes.STRING,
    price: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Chatru_NithyaThadi_Master_Table',
  });
  return Chatru_NithyaThadi_Master_Table;
};