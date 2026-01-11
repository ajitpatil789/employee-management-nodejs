const {
  createEmployeeSchema,
  updateEmployeeSchema,
} = require("../validations/employee.validation");
const employeeService = require("../services/employee.service");

const createEmployee = async (req, res, next) => {
  try {
    const { error, value } = createEmployeeSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    const employee = await employeeService.createEmployee(value);

    res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (err) {
    next(err);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await employeeService.getEmployees(page, limit);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { error, value } = updateEmployeeSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }
    const employee = await employeeService.updateEmployee(req.params.id, value);
    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    await employeeService.deleteEmployee(req.params.id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
