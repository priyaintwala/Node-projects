"use strict";

const { Sequelize } = require("sequelize");

async function up({ context: queryInterface }) {
  return queryInterface.createTable("products", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(255),
    },
    productId: {
      type: Sequelize.INTEGER(255),
      allowNull: true,
      unique: true,
    },
    SKU: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    ProductName: {
      type: Sequelize.STRING,
      allowNull: false,
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
    error: {
      type: Sequelize.STRING(255),
      allowNull: true,
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
}

async function down({ context: queryInterface }) {
  return queryInterface.dropTable("products");
}

module.exports = { up, down };



