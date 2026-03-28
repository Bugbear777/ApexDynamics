const router = require("express").Router();
const manufacturersController = require("../controllers/manufacturers");
const auth = require("../middleware/authMiddleware");

router.get("/", manufacturersController.getAll);
router.get("/:id", manufacturersController.getSingle);
router.post("/", auth.isAuthenticated, manufacturersController.createManufacturer);
router.put("/:id", auth.isAuthenticated, manufacturersController.updateManufacturer);
router.delete("/:id", auth.isAuthenticated, manufacturersController.deleteManufacturer);

module.exports = router;