'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AzagiyasingarMasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pattam_no: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      dob_tamil_month: {
        type: Sequelize.STRING
      },
      dob_tamil_star: {
        type: Sequelize.STRING
      },
      dob_english_date: {
        type: Sequelize.STRING
      },
      pattam_alive: {
        type: Sequelize.BOOLEAN
      },
      thirunakshatram: {
        type: Sequelize.BOOLEAN
      },
      kainkaryam: {
        type: Sequelize.BOOLEAN
      },
      dod_tamil_month: {
        type: Sequelize.STRING
      },
      dod_english_date: {
        type: Sequelize.STRING
      },
      dod_paksham: {
        type: Sequelize.STRING
      },
      dod_thidhi: {
        type: Sequelize.STRING
      },
      brindavan_location: {
        type: Sequelize.STRING
      },
      is_active: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('AzagiyasingarMasters');
  }
};