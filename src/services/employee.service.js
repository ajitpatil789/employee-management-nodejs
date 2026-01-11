const { where } = require("sequelize");
const { Employee, Department, sequelize } = require("../models");

const createEmployee = async (payload) => {
  return await sequelize.transaction(async (t) => {
    const department = await Department.findByPk(payload.department_id);
    if (!department) {
      const err = new Error("Department not found");
      err.statusCode = 404;
      throw err;
    }

    const existing = await Employee.findOne({
      where: { email: payload.email },
    });
    if (existing) {
      const err = new Error("Email already exists");
      err.statusCode = 400;
      throw err;
    }

    return await Employee.create(payload, { transaction: t });
  });
};

const getEmployees = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Employee.findAndCountAll({
    where: { status: "ACTIVE" },
    include: [{ model: Department, attributes: ["id", "name"] }],
    limit,
    offset,
    order: [["created_at", "DESC"]],
  });

  return {
    total: count,
    page,
    limit,
    data: rows,
  };
};

const getEmployeeById = async (id) => {
  const employee = await Employee.findByPk(id, {
    include: [{ model: Department, attributes: ["id", "name"] }],
  });

  if (!employee) {
    const err = new Error("Employee not found");
    err.statusCode = 404;
    throw err;
  }
  return employee;
};

const updateEmployee = async (id, payload) => {
  const employee = await Employee.findByPk(id);
  if (!employee) {
    const err = new Error("Employee not found");
    err.statusCode = 404;
    throw err;
  }
  await employee.update(payload);
  return employee;
};

const deleteEmployee = async (id) => {
  const employee = await Employee.findByPk(id);
  if (!employee) {
    const err = new Error("Employee not found");
    err.statusCode = 404;
    throw err;
  }

  await employee.update({ status: "INACTIVE" });
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
