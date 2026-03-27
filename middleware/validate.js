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
  checkValidation
};