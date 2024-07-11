'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThirunakshatramTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ThirunakshatramTransactions.init({
    user_id: DataTypes.STRING,
    user_name: DataTypes.STRING,
    mail_id: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    address: DataTypes.STRING,
    price: DataTypes.STRING,
    name: DataTypes.STRING,
    payment_id: DataTypes.STRING,
    message: DataTypes.STRING,
    thirunakshatram_id: DataTypes.STRING,
    thirunakshatram_type: DataTypes.STRING,
    is_approved: DataTypes.STRING,
    is_paid: DataTypes.BOOLEAN,
    approved_by:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ThirunakshatramTransactions',
  });
  return ThirunakshatramTransactions;
};