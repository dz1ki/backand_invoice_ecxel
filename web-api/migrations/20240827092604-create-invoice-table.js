"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("invoice", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM("loading", "processing", "complite"),
        allowNull: false,
      },
      clientId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        field: "client_id",
        references: {
          model: "clients",
          key: "id",
          as: "client_id",
        },
      },
      document: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("invoice");
  },
};
