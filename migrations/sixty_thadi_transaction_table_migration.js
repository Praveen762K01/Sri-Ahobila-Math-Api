'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SixtyThadi_Transaction_Tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.STRING
      },
      user_name: {
        type: Sequelize.STRING
      },
      mail_id: {
        type: Sequelize.STRING
      },
      mobile_number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      booking_count: {
        type: Sequelize.STRING
      },
      total_value: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      price_id:{
        type: Sequelize.STRING
      },
      payment_id:{
        type: Sequelize.STRING
      },
      is_approved: {
        type: Sequelize.STRING
      },
      is_paid: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      approved_by:{
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SixtyThadi_Transaction_Tables');
  }
};