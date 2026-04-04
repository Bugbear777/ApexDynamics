const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favorites");

router.get("/", favoritesController.getAll);
router.get("/:id", favoritesController.getSingle);
router.get("/user/:userId", favoritesController.getByUser);
router.get("/vehicle/:vehicleId", favoritesController.getByVehicle);
router.post("/", favoritesController.addFavorite);
router.put("/:id", favoritesController.updateFavorite);
router.delete("/:id", favoritesController.removeFavorite);

module.exports = router;