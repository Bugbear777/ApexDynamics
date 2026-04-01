const router = require("express").Router();
const favoritesController = require("../controllers/favorites");
const validation = require("../middleware/validate");
const auth = require("../middleware/authMiddleware");

router.get("/", favoritesController.getAll);
router.get("/:id", favoritesController.getSingle);
router.get("/user/:userId", favoritesController.getByUser);
router.get("/vehicle/:vehicleId", favoritesController.getByVehicle);

router.post(
  "/",
  auth.isAuthenticated,
  validation.favoriteRules(),
  validation.checkValidation,
  favoritesController.addFavorite
);

router.put(
  "/:id",
  auth.isAuthenticated,
  validation.favoriteRules(),
  validation.checkValidation,
  favoritesController.updateFavorite
);

router.delete("/:id", auth.isAuthenticated, favoritesController.removeFavorite);

module.exports = router;