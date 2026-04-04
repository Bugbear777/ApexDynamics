const { body, validationResult } = require("express-validator");

const vehicleRules = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("type").trim().notEmpty().withMessage("Type is required."),
    body("price").isNumeric().withMessage("Price must be a number."),
    body("blockCount").isInt({ min: 1 }).withMessage("Block count must be a positive integer."),
    body("topSpeed").isNumeric().withMessage("Top speed must be a number."),
    body("crewSize").isInt({ min: 1 }).withMessage("Crew size must be at least 1."),
    body("mainWeapon").trim().notEmpty().withMessage("Main weapon is required."),
    body("weight").isNumeric().withMessage("Weight must be a number.")
  ];
};

const reviewRules = () => {
  return [
    body("userId").trim().notEmpty().withMessage("User ID is required."),
    body("vehicleId").trim().notEmpty().withMessage("Vehicle ID is required."),
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be an integer between 1 and 5."),
    body("comment").trim().notEmpty().withMessage("Comment is required."),
    body("title").optional().trim()
  ];
};

const favoriteRules = () => {
  return [
    body("userId").trim().notEmpty().withMessage("User ID is required."),
    body("vehicleId").trim().notEmpty().withMessage("Vehicle ID is required.")
  ];
};

const registerRules = () => {
  return [
    body("email").isEmail().withMessage("Valid email is required."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("firstName").trim().notEmpty().withMessage("First name is required."),
    body("lastName").trim().notEmpty().withMessage("Last name is required.")
  ];
};

const loginRules = () => {
  return [
    body("email").isEmail().withMessage("Valid email is required."),
    body("password").notEmpty().withMessage("Password is required.")
  ];
};

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  vehicleRules,
  reviewRules,
  favoriteRules,
  checkValidation,
  registerRules,
  loginRules
};