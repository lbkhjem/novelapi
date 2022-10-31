var createError = require('http-errors');
const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var lastesupdateRouter = require('./routes/lastesupdate');
var hotnovelRouter = require('./routes/hotnovels');
var completedRouter = require('./routes/complete');
var novelRouter = require('./routes/novel');
var chapterRouter = require('./routes/chapter');
var genresRouter = require('./routes/genres')

var app = express();
var corsOptions = function(req, res, next){ 
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 
  'Content-Type, Authorization, Content-Length, X-Requested-With');
   next();
}

app.use(corsOptions);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hotnovel', hotnovelRouter);
app.use('/update', lastesupdateRouter);
app.use('/completed', completedRouter);
app.use('/novel', novelRouter);
app.use('/chapter', chapterRouter);
app.use('/genres', genresRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
