'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mobile_number: {
        type: Sequelize.STRING
      },
      mail_id: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      postal_code: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      whatsapp_number: {
        type: Sequelize.STRING
      },
      tamil_star: {
        type: Sequelize.STRING
      },
      gothram: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      is_registered: {
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
    await queryInterface.dropTable('UserData');
  }
};