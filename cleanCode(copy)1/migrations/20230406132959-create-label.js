'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Labels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      labelName: {
        type: Sequelize.STRING(2000)
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER(255),
        references:{model:"Users",key:"id"},
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      SyncedFolderId:{
        type: Sequelize.STRING(2000)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Labels');
  }
};