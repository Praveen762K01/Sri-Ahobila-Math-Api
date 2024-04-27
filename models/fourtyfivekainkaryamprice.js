'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FourtyFiveKainkaryamPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FourtyFiveKainkaryamPrice.init({
    date: DataTypes.STRING,
    price: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'FourtyFiveKainkaryamPrice',
  });
  return FourtyFiveKainkaryamPrice;
};