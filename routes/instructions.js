var express = require('express');
var router = express.Router();

//GET instructions
router.get('/', function(req, res, next) {
  res.render('instructions', {});
});

module.exports = router;