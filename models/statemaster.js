'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StateMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StateMaster.init({
    state_id: DataTypes.STRING,
    state_name: DataTypes.STRING,
    country_id: DataTypes.STRING,
    country_code: DataTypes.STRING,
    country_name: DataTypes.STRING,
    state_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StateMaster',
  });
  return StateMaster;
};