'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AzvarMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AzvarMaster.init({
    azvar: DataTypes.STRING,
    dob_tamil_month: DataTypes.STRING,
    dob_tamil_star: DataTypes.STRING,
    dob_english_date: DataTypes.STRING,
    thirunakshatram: DataTypes.BOOLEAN,
    kainkaryam: DataTypes.BOOLEAN,
    dod_tamil_month: DataTypes.STRING,
    dod_english_date: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AzvarMaster',
  });
  return AzvarMaster;
};