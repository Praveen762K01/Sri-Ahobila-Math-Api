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
      name: {
        type: Sequelize.STRING
      },
      email_address: {
        type: Sequelize.STRING
      },
      mobile_number: {
        type: Sequelize.STRING
      },
      whatsapp_number: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      country_id: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      state_id: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city_id: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      dob: {
        type: Sequelize.STRING
      },
      tamil_star_id: {
        type: Sequelize.STRING
      },
      tamil_star: {
        type: Sequelize.STRING
      },
      gothram: {
        type: Sequelize.STRING
      },
      samashrayanam: {
        type: Sequelize.BOOLEAN
      },
      samashrayanam_pattam: {
        type: Sequelize.STRING
      },
      bharanyasam: {
        type: Sequelize.BOOLEAN
      },
      bharanyasam_pattam: {
        type: Sequelize.STRING
      },
      profile_image: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      user_approved: {
        type: Sequelize.BOOLEAN
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      user_status_id: {
        type: Sequelize.STRING
      },
      is_registered: {
        type: Sequelize.BOOLEAN
      },
      user_status: {
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
    await queryInterface.dropTable('UserData');
  }
};