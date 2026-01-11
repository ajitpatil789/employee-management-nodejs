"use strict";

module.exports = (sequelize, DataTypes) => {
  const WorkInstructionAttachment = sequelize.define(
    "WorkInstructionAttachment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
      },
      instruction_version_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      step_id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      file_name: DataTypes.STRING,
      file_type: DataTypes.STRING,
      s3_path: DataTypes.STRING,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      client_id: DataTypes.UUID,
      created_by: DataTypes.UUID,
    },
    {
      tableName: "work_instruction_attachments",
      underscored: true,
    }
  );

  WorkInstructionAttachment.associate = (models) => {
    WorkInstructionAttachment.belongsTo(models.WorkInstructionVersion, {
      foreignKey: "instruction_version_id",
      targetKey: "uuid",
    });

    WorkInstructionAttachment.belongsTo(models.WorkInstructionStep, {
      foreignKey: "step_id",
      targetKey: "uuid",
    });
  };

  return WorkInstructionAttachment;
};
