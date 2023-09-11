const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const employeeModel = require("../models/employee.model");
const employeeController = express.Router();

employeeController.post("/", authMiddleware.verifyToken, async (req, res) => {
  try {
    const employee = await employeeModel.create(req.body);
    return res.status(201).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something when wrong, please try again!",
    });
  }
});

employeeController.get("/", authMiddleware.verifyToken, async (req, res) => {
  try {
    const employees = await employeeModel.find({ ...req.query });
    return res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something when wrong, please try again!",
    });
  }
});

employeeController.get("/:id", authMiddleware.verifyToken, async (req, res) => {
  try {
    const employee = await employeeModel.findOne({ _id: req.params.id });
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something when wrong, please try again!",
    });
  }
});

employeeController.put("/:id", authMiddleware.verifyToken, async (req, res) => {
  try {
    const employee = await employeeModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something when wrong, please try again!",
    });
  }
});

employeeController.delete(
  "/:id",
  authMiddleware.verifyToken,
  async (req, res) => {
    try {
      await employeeModel.findOneAndDelete({ _id: req.params.id });
      return res.status(204).json(null);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "Something when wrong, please try again!",
      });
    }
  }
);

module.exports = employeeController;
