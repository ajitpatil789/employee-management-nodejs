const {
  createDepartmentSchema,
} = require("../validations/department.validation");
const departmentService = require("../services/department.service");

const createDepartment = async (req, res, next) => {
  try {
    const { error, value } = createDepartmentSchema.validate(req.body);
    if (error) {
      error.statusCode = 400;
      throw error;
    }

    const department = await departmentService.createDepartment(value);

    res.status(201).json({
      success: true,
      data: department,
    });
  } catch (err) {
    next(err);
  }
};

const getDepartments = async (req, res, next) => {
  try {
    const departments = await departmentService.getAllDepartments();

    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createDepartment,
  getDepartments,
};
