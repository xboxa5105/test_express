const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport')
const session = require("express-session")
const flash = require('connect-flash');
const app = express();
const helmet = require(`helmet`)
const fs = require(`fs`)
const Router = require(`./routes/router`);
const ApiRouter = require(`./routes/api_router`);
const log = require(`./app/middleware/log`)

// Helmet
app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

//log file
const log_file = fs.createWriteStream(path.join(__dirname, 'log/api.log'), { flags: 'a' })
logger.token('req', log.req)
logger.token('mcdn_log', log.developmentFormatLine)
app.use(logger('mcdn_log', { stream: log_file }));
app.use(logger());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/api', ApiRouter);
app.use('/', Router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error("Message : ", res.locals.message);
  console.error("Error : ", res.locals.error);
  
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
