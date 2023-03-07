const asyncHandler = require("express-async-handler");
const Employees = require("../models/employeesModel");

const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employees.find();
  res.status(200).json(employees);
});

const createEmployee = asyncHandler(async (req, res) => {
  const { firstName, lastName, gender, mobile, joinedDate, email } = req.body;
  if (!firstName || !lastName || !gender || !mobile || !joinedDate || !email) {
    res.status(400);
    throw new Error("All fields is required");
  }

  const employee = await Employees.create({
    firstName,
    lastName,
    gender,
    mobile,
    joinedDate,
    email,
  });

  res.status(201).json(employee);
});

const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employees.findById(req.params.id);

  if (!employee) {
    res.status(404).json(employee);
  }
  const updatedEmployee = await Employees.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedEmployee);
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employees.findById(req.params.id);

  if (employee) {
    Employees.deleteOne({ _id: req.params.id })
      .then(() => {
        console.log("Document deleted successfully");
      })
      .catch((error) => {
        console.log("Error deleting document:", error);
      });
    res.status(200).json(employee);
  } else {
    res.status(404).json(employee);
    throw new Error("Id not found");
  }
});

const getEmployeeSummery = asyncHandler(async (req, res) => {
  const employeeSummery = await Employees.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$joinedDate" },
        },
        total: { $sum: 1 },
      },
    },
  ]);

// { _id: { year: 2003 }, total: 1 }, to =>  [ { year: 2003, total: 1 } ]
  const sortSummery = employeeSummery.map((v) => {
    return { year: v._id.year, total: v.total };
  });

  res.status(200).json(sortSummery);
});



module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeSummery,
};
