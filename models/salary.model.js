const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "employee" },
  payrollDate: { type: Date, required: true },
  payrollMonth: { type: Number, required: true },
  payrollYear: { type: Number, required: true },
  totalAllowance: { type: Number, required: true },
  totalDeduction: { type: Number, required: true },
  othersAllowance: [
    {
      _id: false,
      name: { type: String, required: true },
      total: { type: Number, default: 0, required: true },
    },
  ],
  othersDeduction: [
    {
      _id: false,
      name: { type: String, required: true },
      total: { type: Number, default: 0, required: true },
    },
  ],
  totalSalary: { type: Number, required: true },
});

module.exports = mongoose.model("salary", salarySchema);
