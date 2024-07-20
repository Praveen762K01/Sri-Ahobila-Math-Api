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
    name: DataTypes.STRING,
    email_address: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    whatsapp_number:DataTypes.STRING,
    address: DataTypes.TEXT,
    country_id: DataTypes.STRING,
    country: DataTypes.STRING,
    state_id: DataTypes.STRING,
    state: DataTypes.STRING,
    city_id: DataTypes.STRING,
    city: DataTypes.STRING,
    area: DataTypes.STRING,
    pincode: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    dob: DataTypes.STRING,
    tamil_star_id: DataTypes.STRING,
    tamil_star: DataTypes.STRING,
    gothram: DataTypes.STRING,
    samashrayanam: DataTypes.BOOLEAN,
    samashrayanam_pattam: DataTypes.STRING,
    bharanyasam: DataTypes.BOOLEAN,
    bharanyasam_pattam: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    password: DataTypes.STRING,
    otp: DataTypes.STRING,
    user_id:DataTypes.STRING,
    user_approved:DataTypes.BOOLEAN,
    is_active:DataTypes.BOOLEAN,
    user_status_id:DataTypes.STRING,
    user_status:DataTypes.STRING,
    group_id:DataTypes.STRING,
    is_registered:DataTypes.BOOLEAN,
    is_rejected:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserData',
  });
  return UserData;
};