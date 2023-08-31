const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const salaryModel = require("../models/salary.model");
const salaryService = require("../services/salary.service");
const salaryController = express.Router();

salaryController.post("/", authMiddleware.verifyToken, async (req, res) => {
  let isPay = await salaryService.salaryIsPay(req.body.employeeId);
  if (isPay) {
    return res.status(400).json({ message: "Salary payout." });
  }

  let salaryCalculation = await salaryService.calculateAndGetTotalSalary(
    req.body.employeeId,
    req.body.othersAllowance,
    req.body.othersDeduction
  );

  req.body.totalDeduction = salaryCalculation.totalDeduction;
  req.body.totalAllowance = salaryCalculation.totalAllowance;
  req.body.totalSalary = salaryCalculation.totalSalary;
  req.body.payrollDate = new Date();
  req.body.payrollMonth = req.body.payrollDate.getMonth();
  req.body.payrollYear = req.body.payrollDate.getFullYear();

  const salary = await salaryModel.create(req.body);
  return res.status(201).json(salary);
});

salaryController.get("/", authMiddleware.verifyToken, async (req, res) => {
  const salaries = await salaryModel.find();
  return res.status(200).json(salaries);
});

salaryController.get("/:id", authMiddleware.verifyToken, async (req, res) => {
  const salary = await salaryModel.findOne({ _id: req.params.id });
  return res.status(200).json(salary);
});

module.exports = salaryController;
