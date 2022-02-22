var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
const cors = require('cors')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var designRouter = require('./routes/design');
var usersRouter = require('./routes/users');
var orderRouter = require('./routes/orders')
var customizeRouter = require('./routes/customize')
var customizeAdminRouter = require('./routes/customizeAdmin')
var wishlistRouter = require('./routes/wishlist')
var cartRouter = require('./routes/cart')
var AddressesRouter = require('./routes/Addresses')
var feedbackRouter = require('./routes/Feedbacks')
var uploadRouter = require('./routes/upload');
var displayRouter = require('./routes/display')
var bulkRouter = require('./routes/bulk')
var savedTshirtsRouter = require('./routes/savedTshirts')
var adminDesignsRouter = require('./routes/adminDesigns')

var app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit:"50mb",extended:true,parameterLimit:50000}))
var mongoose = require('mongoose')
const url = "mongodb+srv://manideep:1234@cluster0.md8pw.mongodb.net/tshirtdesign?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const con = mongoose.connection

con.on('open', () => {
  console.log("DB connected")
})


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/design', designRouter);
app.use('/accounts/myprofile', usersRouter);
app.use('/wishlist', wishlistRouter);
app.use('/cart', cartRouter);
app.use('/accounts/addresses', AddressesRouter);
app.use('/feedbackdetails', feedbackRouter);
app.use('/accounts/orders', orderRouter);
app.use('/customize', customizeRouter);
app.use('/customizeAdmin',customizeAdminRouter);
app.use('/upload', uploadRouter);
app.use('/display', displayRouter);
app.use('/bulk',bulkRouter);
app.use('/savedtshirts',savedTshirtsRouter);
app.use('/adminDesigns',adminDesignsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
