'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('email_attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(255)
      },
      filePath: {
        type: Sequelize.STRING(5000)
      },
      fileName: {
        type: Sequelize.STRING(2000)
      },
      fileSize: {
        type: Sequelize.INTEGER(200)
      },
      fileType:{
        type: Sequelize.STRING(200)
      },
      messageId: {
        allowNull: false,
        type: Sequelize.INTEGER(255),
        references:{model:"Emails",key:"messageId"},
        onDelete:"cascade",
        onUpdate:"cascade"
      },
   
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('email_attachments');
  }
};