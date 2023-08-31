const express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const authMiddleware = require("../middlewares/auth.middleware");
const userModel = require("../models/user.model");
const userController = express.Router();

userController.post("/", [authMiddleware.verifyToken], async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && password && lastName && email)) {
      return res.status(400).json({ message: "All data required" });
    }

    const member = await userModel.findOne({ email });

    if (member) {
      return res
        .status(400)
        .json({ message: "User is exist, please sign in." });
    }

    // Encrypted user password
    const passwordEncrypted = await bcrypt.hash(password, 10);

    // Create user in our database
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: passwordEncrypted,
    });

    // Create JWT Token
    const token = jwt.sign(
      {
        email,
        userId: newUser._id,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "140h" }
    );

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong!" });
  }
});

userController.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send({ message: "All input is required." });
    }

    // Validate if user exist in our database
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create JWT Token
      const token = jwt.sign(
        {
          email,
          userId: user._id,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "140h" }
      );

      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: "Invalid credentials." });
  } catch (error) {
    return res.status(400).json({ message: "Something when wrong!" });
  }
});

module.exports = userController;
