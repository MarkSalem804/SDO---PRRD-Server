const express = require("express");
const userRouter = express.Router();
const userService = require("./user-service");

userRouter.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Call register service
    const result = await userService.register({
      email,
      password,
      role,
    });

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    // Return error response
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Call login service
    const result = await userService.login(email, password);

    // emitEvent("user-just-logged-in", {
    //   email: result.user.email,
    // });

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    // Return error response
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = userRouter;
