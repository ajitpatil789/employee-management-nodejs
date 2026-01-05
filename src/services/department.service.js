const { Department } = require("../models");

const createDepartment = async (payload) => {
  const existing = await Department.findOne({
    where: { name: payload.name },
  });

  if (existing) {
    const error = new Error("Department already exists");
    error.statusCode = 400;
    throw error;
  }

  return await Department.create(payload);
};

const getAllDepartments = async () => {
  return await Department.findAll({
    where: { is_active: true },
    order: [["created_at", "DESC"]],
  });
};

module.exports = {
  createDepartment,
  getAllDepartments,
};
