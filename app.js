//tools yoused
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer')

//importing the default routes.
var routes = require('./routes/index');
var instruction = require('./routes/instructions');
var upload = require('./routes/upload');
var schedule = require('./routes/schedule');
var view = require('./routes/view');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

//setting up mutter
//todo
//implemetn security
app.use(multer({
  dest: __dirname+'/data/',
  rename: function (fieldname, filename) {
        return filename.toLowerCase()+"_"+Date.now();
  },
   
  onFileUploadStart: function (file){
    console.log(file.orginalname + ' is uploading...');
  },
  
  onFileUploadComplete: function (file) {
     console.log(file.fieldname + ' uploaded to: ' + file.pathn);
  } 
}));


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

//implementing the routing code
app.use('/', routes);
app.use('/index', routes);
app.use('/instructions', instruction);
app.use('/upload', upload);
app.use('/schedule', schedule);
app.use('/view', view);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


module.exports = app;
