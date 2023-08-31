const employeeModel = require("../models/employee.model");
const salaryModel = require("../models/salary.model");

const salaryService = {};

salaryService.calculateAndGetTotalSalary = async (
  employeeId,
  othersAllowance,
  othersDeduction
) => {
  let employee = await employeeModel.findOne({ _id: employeeId });
  let totalOthersDeduction = 0;
  let totalOthersAllowance = 0;
  if (othersDeduction && othersDeduction.length > 0) {
    totalOthersDeduction = othersDeduction.reduce(
      (total, item) => total + item.total,
      0
    );
  }

  if (othersAllowance && othersAllowance.length > 0) {
    totalOthersAllowance = othersAllowance.reduce(
      (total, item) => total + item.total,
      0
    );
  }

  let totalAllowanceByEmployee = employee.allowances.reduce(
    (total, item) => total + item.total,
    0
  );

  let totalDeductionByEmployee = employee.deductions.reduce(
    (total, item) => total + item.total,
    0
  );

  let totalAllowance = totalAllowanceByEmployee + totalOthersAllowance;
  let totalDeduction = totalDeductionByEmployee + totalOthersDeduction;
  let totalSalary = employee.basicSalary + (totalAllowance - totalDeduction);

  return {
    totalAllowance,
    totalDeduction,
    totalSalary,
  };
};

salaryService.salaryIsPay = async (employeeId) => {
  let currentDate = new Date();
  let [year, month] = [currentDate.getFullYear(), currentDate.getMonth()];

  let salary = await salaryModel.findOne({
    employeeId,
    payrollMonth: month,
    payrollYear: year,
  });

  return salary ? true : false;
};

module.exports = salaryService;
