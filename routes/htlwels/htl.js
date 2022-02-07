var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("/htlWels --- ein guter Tag");
});

module.exports = router;
 