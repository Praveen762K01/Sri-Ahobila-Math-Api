'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AzagiyasingarMaster extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AzagiyasingarMaster.init({
    pattam_no: DataTypes.STRING,
    name: DataTypes.STRING,
    dob_tamil_month: DataTypes.STRING,
    dob_tamil_star: DataTypes.STRING,
    dob_english_date: DataTypes.STRING,
    pattam_alive: DataTypes.BOOLEAN,
    thirunakshatram: DataTypes.BOOLEAN,
    kainkaryam: DataTypes.BOOLEAN,
    dod_tamil_month: DataTypes.STRING,
    dod_english_date: DataTypes.STRING,
    dod_paksham: DataTypes.STRING,
    dod_thidhi: DataTypes.STRING,
    brindavan_location: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'AzagiyasingarMaster',
  });
  return AzagiyasingarMaster;
};