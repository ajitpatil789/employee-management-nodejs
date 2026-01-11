"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("work_instruction_versions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
      },
      instruction_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      version_no: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Draft", "Published"),
        defaultValue: "Draft",
      },
      product_uuid: Sequelize.UUID,
      route_uuid: Sequelize.UUID,
      operation_uuid: Sequelize.UUID,
      machine_uuid: Sequelize.UUID,

      created_from: {
        type: Sequelize.UUID,
        allowNull: true,
      },

      client_id: Sequelize.UUID,
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_by: Sequelize.UUID,
      updated_by: Sequelize.UUID,

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("work_instruction_versions");
  },
};
