'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BookingCategory.init({
    cat_id: DataTypes.STRING,
    cat_name: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    cat_description: DataTypes.STRING,
    date_availability: DataTypes.BOOLEAN,
    date_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookingCategory',
  });
  return BookingCategory;
};