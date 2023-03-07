const express = require("express");
const { validateToken } = require("../middleware/validateTokenHandler");
const router = express.Router();
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeSummery
} = require("./../controllers/employeeController");

router.use(validateToken);

router.route("/all").get(getEmployees);
router.route("/create").post(createEmployee);
router.route("/:id").put(updateEmployee).delete(deleteEmployee);
router.route("/summery").get(getEmployeeSummery);


module.exports = router;
