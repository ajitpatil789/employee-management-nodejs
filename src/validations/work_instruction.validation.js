const Joi = require("joi");

const createWorkInstructionSchema = Joi.object({
  title: Joi.string().min(3).required(),
  status: Joi.string().valid("Draft", "Published").required(),
  product_uuid: Joi.string().uuid().required(),
  route_uuid: Joi.string().uuid().required(),
  operation_uuid: Joi.string().uuid().required(),
  machine_uuid: Joi.string().uuid().required(),
});

module.exports = {
  createWorkInstructionSchema,
};
