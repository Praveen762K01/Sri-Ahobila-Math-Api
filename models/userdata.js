'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserData.init({
    mobile_number: DataTypes.STRING,
    mail_id: DataTypes.STRING,
    otp: DataTypes.STRING,
    name: DataTypes.STRING,
    dob: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    state: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    user_id: DataTypes.STRING,
    category: DataTypes.STRING,
    country: DataTypes.STRING,
    whatsapp_number: DataTypes.STRING,
    tamil_star: DataTypes.STRING,
    gothram: DataTypes.STRING,
    password: DataTypes.STRING,
    is_registered: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserData',
  });
  return UserData;
};