const router = require("express").Router();

router.use("/vehicles", require("./vehicles"));
router.use("/manufacturers", require("./manufacturers"));
router.use("/favorites", require("./favorites"));
router.use("/review", require("./review"));
router.use("/auth", require("./auth"));

router.get("/", (req, res) => {
  res.redirect("./index.html");
});

module.exports = router;