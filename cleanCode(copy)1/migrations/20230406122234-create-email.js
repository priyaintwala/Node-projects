'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Emails', {
      messageId: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(255)
      },
      subject: {
        allowNull: true,
        type: Sequelize.STRING(200)
      },
      snippet: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER(255),
        references:{model:"Users",key:"id"},
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      threadId:{
        allowNull: false,
        type: Sequelize.INTEGER(255)
      },
      htmlBody:{
        allowNull: true,
        type: Sequelize.STRING(5000)
      },
      textBody:{
        allowNull: true,
        type: Sequelize.STRING(5000)
      },
      inReplyBody:{
        allowNull: true,
        type: Sequelize.STRING(200)
      },
      isRead:{
        allowNull: true,
        type: Sequelize.STRING(200)
      },
      Reference:{
        allowNull: true,
        type: Sequelize.STRING(200)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Emails');
  }
};