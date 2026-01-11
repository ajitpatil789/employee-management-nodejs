"use strict";

module.exports = (sequelize, DataTypes) => {
  const WorkInstruction = sequelize.define(
    "WorkInstruction",
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
      client_id: DataTypes.UUID,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      tableName: "work_instructions",
      underscored: true,
    }
  );

  WorkInstruction.associate = (models) => {
    WorkInstruction.hasMany(models.WorkInstructionVersion, {
      foreignKey: "instruction_id",
      sourceKey: "uuid",
    });
  };

  return WorkInstruction;
};
