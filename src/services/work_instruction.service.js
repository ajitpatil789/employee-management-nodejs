const {
  WorkInstruction,
  WorkInstructionVersion,
  sequelize,
} = require("../models");

const { v4: uuidv4 } = require("uuid");

const createWorkInstruction = async (payload, user) => {
  return await sequelize.transaction(async (t) => {
    // 1️⃣ Create instruction master
    const instruction = await WorkInstruction.create(
      {
        uuid: uuidv4(),
        client_id: user.client_id,
        created_by: user.user_id,
      },
      { transaction: t }
    );

    // 2️⃣ Create initial version (version_no = 0)
    const version = await WorkInstructionVersion.create(
      {
        instruction_id: instruction.uuid,
        version_no: "0",
        title: payload.title,
        status: payload.status,
        product_uuid: payload.product_uuid,
        route_uuid: payload.route_uuid,
        operation_uuid: payload.operation_uuid,
        machine_uuid: payload.machine_uuid,
        created_from: null,
        client_id: user.client_id,
        created_by: user.user_id,
      },
      { transaction: t }
    );

    return { instruction, version };
  });
};

module.exports = {
  createWorkInstruction,
};
