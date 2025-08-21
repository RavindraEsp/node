const { body, param, validationResult } = require("express-validator");

// Signup validation rules
exports.signupValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("work")
    .isIn(["chef", "manager", "waiter"])
    .withMessage("Work must be chef, manager, or waiter"),
];

// Login validation rules
exports.loginValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Update profile validation rules
exports.updateProfileValidation = [
  body("username")
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),
  body("work")
    .optional()
    .isIn(["chef", "manager", "waiter"])
    .withMessage("Work must be chef, manager, or waiter"),
];

// ID validation for delete
exports.deleteValidation = [
  param("id").isMongoId().withMessage("Invalid ID format"),
];

// Handle validation results


exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send only the first error message or all depending on your need
    return res.status(400).json({
      success: false,
      msg: errors.array()[0].msg, // first error message
      body: {}
    });
  }
  next();
};

