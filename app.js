require("dotenv").config();
require("./config/database")();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/users", require("./controllers/user.controller"));
app.use("/employee", require("./controllers/employee.controller"));
app.use("/salary", require("./controllers/salary.controller"));

module.exports = app;
