'use strict';

const {Sequelize} = require("sequelize");

module.exports = {
  async up({context:queryInterface}) {
    await queryInterface.createTable('variants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(255),
      },
      productId: {
        type: Sequelize.INTEGER(255),
        allowNull: true,
      },
      SKU: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      VariantId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      FulFillmentPartnerCode: {
        type: Sequelize.STRING,
      },
      ManuFacturerPartNumber: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      LeadTime: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      ManuFacturer: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      created: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('variants');
  }
};