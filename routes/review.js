const router = require("express").Router();
const reviewController = require("../controllers/review");
const validation = require("../middleware/validate");
const auth = require("../middleware/authMiddleware");

router.get("/", reviewController.getAll);
router.get("/user/:userId", reviewController.getByUser);
router.get("/vehicle/:vehicleId", reviewController.getByVehicle);
router.get("/:id", reviewController.getSingle);

router.post(
  "/",
  auth.isAuthenticated,
  validation.reviewRules(),
  validation.checkValidation,
  reviewController.addReview
);

router.put(
  "/:id",
  auth.isAuthenticated,
  validation.reviewRules(),
  validation.checkValidation,
  reviewController.updateReview
);

router.delete("/:id", auth.isAuthenticated, reviewController.removeReview);

module.exports = router;