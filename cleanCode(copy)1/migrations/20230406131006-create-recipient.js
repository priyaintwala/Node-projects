'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      messageId: {
        allowNull: false,
        type: Sequelize.INTEGER(255),
        references:{model:"Emails",key:"messageId"},
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      EmailAddress: {
        type: Sequelize.STRING
      },
      recipientType: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipients');
  }
};