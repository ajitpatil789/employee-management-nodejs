const Joi = require("joi");

const createDepartmentSchema = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports = {
  createDepartmentSchema,
};
