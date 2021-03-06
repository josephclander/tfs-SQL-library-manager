var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const { sequelize } = require('./models/index');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

// (async () => {
//   try {
//     await sequelize.authenticate();
//     await sequelize.sync();
//     console.log('Connection to the database successful!');
//   } catch (error) {
//     console.log('Error connecting to the database: ', error);
//   }
// })();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(
    createError(404, "Sorry! We couldn't find the page you were looking for.")
  );
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // add generic server message if none present
  if (!err.message) {
    err.message = 'Sorry! There was an unexpected error on the server.';
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.status, err.message);
  if (err.status === 404) {
    res.render('page-not-found', { err });
  } else {
    res.render('error', { err });
  }
});

module.exports = app;
