var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
const passport = require('passport')

/* Routing */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var htlRouter = require('./routes/htlwels/htl')
var session = require('express-session')

require('dotenv').config()
require('./config/passport')

const initDB = require('./config/initializeDB')


var app = express();

/* Mongo Setup */
const MONGO_URL=process.env.MONGO_URL

const options = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 5, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useNewUrlParser: true
};

mongoose.connect(MONGO_URL, options).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ 
    console.log("Succeeded in connecting MongoDB")
    //initDB.defaultUsers()
    mongoose.connection.on("disconnected",()=>{
      console.log("MongoDB has been disconnected")
    })
    mongoose.connection.on("reconnect",()=>{
      console.log("MongoDB has been reconnected")
    })
  },
  err => { /** handle initial connection error */
    console.log("Cannot connect to MongoDB due to error: " + err)
    throw err
  }
);

/* Session Management */

let sessionStore = new MongoStore({
  mongoUrl:process.env.MONGO_URL,
  dbName:'authorization',
  collectionName:'sessions',
  mongoOptions: { useUnifiedTopology: true },
  autoRemove:'native',
  ttl: 60*60*2,
})

app.use(session({
  secret: 'Today Is A Good Day, because the sun is shining',
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  name: 'htlWels.5bhit',
  cookie: { secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());

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
app.use('/htlWels',htlRouter)

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
