'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StateMasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state_id: {
        type: Sequelize.STRING
      },
      state_name: {
        type: Sequelize.STRING
      },
      country_id: {
        type: Sequelize.STRING
      },
      country_code: {
        type: Sequelize.STRING
      },
      country_name: {
        type: Sequelize.STRING
      },
      state_code: {
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
    await queryInterface.dropTable('StateMasters');
  }
};