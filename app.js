var createError = require('http-errors');
const compression = require('compression')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var newsRouter = require('./routes/news');
var app = express();
app.use(compression())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/news', newsRouter);

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



// app.use((req, res, next) => {
  //   res.setHeader(
  //     "Access-Control-Allow-Origin",
  //     "https://lostmypillow.github.io/jDMS-web"
  //   );
  //   res.setHeader(
  //     "Access-Control-Allow-Origin",
  //     "http://localhost:5173"
  //   );
  //   res.setHeader(
  //     "Access-Control-Allow-Methods",
  //     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  //   );
  //   res.setHeader(
  //     "Access-Control-Allow-Headers",
  //     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  //   );
  //   res.setHeader("Access-Control-Allow-Credentials", true);
  //   res.setHeader("Access-Control-Allow-Private-Network", true);
  //   //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  //   res.setHeader("Access-Control-Max-Age", 7200);
  
  //   next();
  // });

module.exports = app;
