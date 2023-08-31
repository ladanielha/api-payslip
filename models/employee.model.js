const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  allowances: [
    {
      _id: false,
      name: { type: String, required: true },
      total: { type: Number, default: 0, required: true },
    },
  ],
  deductions: [
    {
      _id: false,
      name: { type: String, required: true },
      total: { type: Number, default: 0, required: true },
    },
  ],
});

module.exports = mongoose.model("employee", employeeSchema);
