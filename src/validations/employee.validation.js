const Joi = require("joi");

const createEmployeeSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  salary: Joi.number().positive().required(),
  department_id: Joi.string().uuid().required(),
});

const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(), // ✅ ADD THIS
  salary: Joi.number().positive().optional(),
  department_id: Joi.string().uuid().optional(),
}).min(1); // ✅ at least one field required

module.exports = {
  createEmployeeSchema,
  updateEmployeeSchema,
};
