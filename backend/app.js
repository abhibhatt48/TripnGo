var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactUsRouter = require('./routes/contact_us');
var paymentRouter = require('./routes/payment');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');

var app = express();

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

module.exports = app;
