"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("work_instruction_attachments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      instruction_version_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      step_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      file_name: Sequelize.STRING,
      file_type: Sequelize.STRING,
      s3_path: Sequelize.STRING,
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      client_id: Sequelize.UUID,
      created_by: Sequelize.UUID,
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("work_instruction_attachments");
  },
};
