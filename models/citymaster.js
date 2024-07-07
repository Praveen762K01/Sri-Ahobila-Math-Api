'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CityMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CityMaster.init({
    city_id: DataTypes.STRING,
    city_name: DataTypes.STRING,
    state_id: DataTypes.STRING,
    state_code: DataTypes.STRING,
    state_name: DataTypes.STRING,
    country_id: DataTypes.STRING,
    country_code: DataTypes.STRING,
    country_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CityMaster',
  });
  return CityMaster;
};