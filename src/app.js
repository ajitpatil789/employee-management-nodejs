const express = require("express");
const departmentRoutes = require("./routes/department.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const employeeRoutes = require("./routes/employee.routes");
const workInstructionRoutes = require("./routes/work_instruction.routes");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
  });
});

app.use("/api/departments", departmentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/work_instructions", workInstructionRoutes);

// ❗ must be last
app.use(errorMiddleware);

module.exports = app;
