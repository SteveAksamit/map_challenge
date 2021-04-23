var express = require("express");
var router = express.Router();
const stateData = require("../data/stateData.json");

/* GET users listing. */
router.get("/", function (req, res, next) {
  //res.send('respond with a resource');
  res.json(stateData);
});

module.exports = router;
