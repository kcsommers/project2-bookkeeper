require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bp = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var upload = multer({dest: './uploads/'});
var cloudinary = require('cloudinary');
var passport = require('./config/passportConfig');
var flash = require('connect-flash');
var port = process.env.PORT || 2000;

var app = express();
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bp.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);
// this needs to come before you app.use passport
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));

// setup flash messages
app.use(flash());

// this must come after the session setup
app.use(passport.initialize());
app.use(passport.session());

// Attach the current user to the response for all routes
// Also attach the flash messages
app.use(function(req, res, next) {
	res.locals.alerts = req.flash();
	res.locals.currentUser = req.user;
	next();
});

app.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

app.use('/auth', require('./controllers/auth'));
app.use('/api', require('./controllers/api'));
app.use('/user', require('./controllers/user'));
app.use('/lists', require('./controllers/lists'));
app.use('/books', require('./controllers/books'));
app.use('/quotes', require('./controllers/quotes'));
app.use('/notes', require('./controllers/notes'));
app.use('/groups', require('./controllers/groups'));
app.use('/posts', require('./controllers/posts'));

var server = app.listen(port, function() {
	console.log('running on port: ' + port);
});

module.exports = server;
