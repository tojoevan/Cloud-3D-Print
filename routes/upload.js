var express = require('express');
var router = express.Router();

//GET upload
router.get('/', function(req, res, next) {
  res.render('upload', {complete: false});
});

//run upload post
router.post('/', function (req, res, next){
  res.render('upload', {complete: true});
  
  //TODO
  //add file checking and adding an entery to the database
} );

module.exports = router;