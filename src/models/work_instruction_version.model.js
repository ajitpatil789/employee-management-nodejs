"use strict";

module.exports = (sequelize, DataTypes) => {
  const WorkInstructionVersion = sequelize.define(
    "WorkInstructionVersion",
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
      instruction_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      version_no: DataTypes.STRING,
      title: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("Draft", "Published"),
        defaultValue: "Draft",
      },
      product_uuid: DataTypes.UUID,
      route_uuid: DataTypes.UUID,
      operation_uuid: DataTypes.UUID,
      machine_uuid: DataTypes.UUID,
      created_from: DataTypes.UUID,
      client_id: DataTypes.UUID,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: DataTypes.UUID,
      updated_by: DataTypes.UUID,
    },
    {
      tableName: "work_instruction_versions",
      underscored: true,
    }
  );

  WorkInstructionVersion.associate = (models) => {
    WorkInstructionVersion.belongsTo(models.WorkInstruction, {
      foreignKey: "instruction_id",
      targetKey: "uuid",
    });

    WorkInstructionVersion.hasMany(models.WorkInstructionStep, {
      foreignKey: "instruction_version_id",
      sourceKey: "uuid",
    });

    WorkInstructionVersion.hasMany(models.WorkInstructionAttachment, {
      foreignKey: "instruction_version_id",
      sourceKey: "uuid",
    });
  };

  return WorkInstructionVersion;
};
