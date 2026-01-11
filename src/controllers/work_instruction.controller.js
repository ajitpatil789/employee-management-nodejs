const {
  createWorkInstructionSchema,
} = require("../validations/work_instruction.validation");

const workInstructionService = require("../services/work_instruction.service");

const createWorkInstruction = async (req, res, next) => {
  try {
    const { error, value } = createWorkInstructionSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    // 🔐 normally from auth middleware
    const user = {
      user_id: req.user?.uuid || "365b9ba7-3c86-4d02-b05b-76695dc4917f",
      client_id: req.user?.client_id || "a338cb26-180f-4338-aadf-3442596d32e7",
    };

    const result = await workInstructionService.createWorkInstruction(
      value,
      user
    );

    res.status(201).json({
      message: "Work Instruction created successfully",
      data: {
        instruction: result.instruction,
        version: result.version,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createWorkInstruction,
};
