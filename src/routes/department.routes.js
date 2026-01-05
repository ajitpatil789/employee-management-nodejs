const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");

router.post("/", departmentController.createDepartment);
router.get("/", departmentController.getDepartments);

module.exports = router;
