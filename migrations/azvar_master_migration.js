'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AzvarMasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      azvar: {
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
      is_active: {
        type: Sequelize.BOOLEAN
      },
      thirunakshatram_price:{
        type:Sequelize.STRING
      },
      kainkaryam_price:{
        type:Sequelize.STRING
      },
      azvar_image:{
        type:Sequelize.STRING
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
    await queryInterface.dropTable('AzvarMasters');
  }
};