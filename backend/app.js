var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactUsRouter = require('./routes/contact_us');
var paymentRouter = require('./routes/payment');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var dashboardRouter = require('./routes/dashboard');
var notificationsRouter = require('./routes/notifications');
var { listenForNotifications } = require('./conn');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-us', contactUsRouter);
app.use('/payment', paymentRouter);
app.use('/signup', signupRouter);
app.use('/login',loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/notifications', notificationsRouter);

listenForNotifications();

module.exports = app;
