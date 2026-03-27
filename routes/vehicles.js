const router = require("express").Router();
const vehiclesController = require("../controllers/vehicles");
const validation = require("../middleware/validate");

router.get("/", vehiclesController.getAll);
router.get("/:id", vehiclesController.getSingle);
router.post("/", validation.vehicleRules(), validation.checkValidation, vehiclesController.createVehicle);
router.put("/:id", validation.vehicleRules(), validation.checkValidation, vehiclesController.updateVehicle);
router.delete("/:id", vehiclesController.deleteVehicle);

module.exports = router;