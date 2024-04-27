'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FirstThirunakshatramBookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FirstThirunakshatramBookings.init({
    user_id: DataTypes.STRING,
    user_name: DataTypes.STRING,
    mail_id: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    address: DataTypes.STRING,
    date: DataTypes.STRING,
    price: DataTypes.STRING,
    booking_count: DataTypes.STRING,
    total_value: DataTypes.STRING,
    message: DataTypes.STRING,
    is_approved: DataTypes.BOOLEAN,
    is_paid: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'FirstThirunakshatramBookings',
  });
  return FirstThirunakshatramBookings;
};