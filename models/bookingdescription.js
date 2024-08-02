'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingDescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookingDescription.init({
    description: DataTypes.TEXT,
    booking_type: DataTypes.STRING,
    image: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    created_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookingDescription',
  });
  return BookingDescription;
};