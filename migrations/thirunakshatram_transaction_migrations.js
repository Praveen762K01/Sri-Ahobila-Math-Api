'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ThirunakshatramTransactions', {
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
      price: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      payment_id: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      thirunakshatram_id: {
        type: Sequelize.STRING
      },
      thirunakshatram_type: {
        type: Sequelize.STRING
      },
      is_approved: {
        type: Sequelize.STRING
      },
      is_paid: {
        type: Sequelize.BOOLEAN
      },
      approved_by:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ThirunakshatramTransactions');
  }
};