const express = require("express");
const router = express.Router();
const controller = require("../controllers/work_instruction.controller");

router.post("/", controller.createWorkInstruction);

module.exports = router;
