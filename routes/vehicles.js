const router = require("express").Router();
const vehiclesController = require("../controllers/vehicles");
const validation = require("../middleware/validate");
const auth = require("../middleware/authMiddleware");

router.get("/", vehiclesController.getAll);
router.get("/:id", vehiclesController.getSingle);

router.post(
  "/",
  auth.isAuthenticated,
  validation.vehicleRules(),
  validation.checkValidation,
  vehiclesController.createVehicle
);

router.put(
  "/:id",
  auth.isAuthenticated,
  validation.vehicleRules(),
  validation.checkValidation,
  vehiclesController.updateVehicle
);

router.delete("/:id", auth.isAuthenticated, vehiclesController.deleteVehicle);

module.exports = router;