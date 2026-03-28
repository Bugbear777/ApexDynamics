const router = require("express").Router();

router.use("/vehicles", require("./vehicles"));
router.use("/manufacturers", require("./manufacturers"));
router.use("/auth", require("./auth"));

router.get("/", (req, res) => {
  res.send("Project 2 API");
});

module.exports = router;