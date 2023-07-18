var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactUsRouter = require('./routes/contact_us');
var paymentRouter = require('./routes/payment');
var dashboardRouter = require('./routes/dashboard');
var notificationsRouter = require('./routes/notifications');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-us', contactUsRouter);
app.use('/payment', paymentRouter);
app.use('/dashboard', dashboardRouter);
app.use('/notifications', notificationsRouter);

module.exports = app;
