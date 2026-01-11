"use strict";

module.exports = (sequelize, DataTypes) => {
  const WorkInstructionStep = sequelize.define(
    "WorkInstructionStep",
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
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      sequence: DataTypes.INTEGER,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      client_id: DataTypes.UUID,
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      tableName: "work_instruction_steps",
      underscored: true,
    }
  );

  WorkInstructionStep.associate = (models) => {
    WorkInstructionStep.belongsTo(models.WorkInstructionVersion, {
      foreignKey: "instruction_version_id",
      targetKey: "uuid",
    });

    WorkInstructionStep.hasMany(models.WorkInstructionAttachment, {
      foreignKey: "step_id",
      sourceKey: "uuid",
    });
  };

  return WorkInstructionStep;
};
