'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(255)
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      emailId: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      accessToken:{
        allowNull: true,
        type: Sequelize.STRING(1000)
      },
      refreshToken:{
        allowNull: true,
        type: Sequelize.STRING(1000)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};