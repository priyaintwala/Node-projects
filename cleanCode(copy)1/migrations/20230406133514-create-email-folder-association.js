'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmailFolderAssociations', {
      messageId: {
        allowNull: false,
        type: Sequelize.INTEGER(255),
        references:{model:"Emails",key:"messageId"},
        onDelete:"cascade",
        onUpdate:"cascade"
      },
      labelId: {
        allowNull: false,
        type: Sequelize.INTEGER(255),
        references:{model:"Labels",key:"id"},
        onDelete:"cascade",
        onUpdate:"cascade"
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EmailFolderAssociations');
  }
};