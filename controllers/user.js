var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require('../models');
var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer({dest: '../uploads/'});


// GET /user/profile - gets users profile page
router.get('/profile', isLoggedIn, function(req, res) {
	db.list.findAll({
		where: {userId: req.user.id},
		include: [db.book]
	}).then(function(lists) {
		db.user.findById(req.user.id).then(function(user){
			user.getGroups().then(function(groups) {
				res.render('user/profile', {
					user: user, 
					lists: lists, 
					groups: groups,
					cloudinary: cloudinary
				});
			});
		});
	});
});

// GET /user/:id/update - gets update user page
router.get('/:id/update', function(req, res) {
	res.render('user/updateUser', {user: req.user, cloudinary: cloudinary});
});

// POST /user/:id/update - update user
router.post('/:id/update', upload.single('userPic'), function(req, res) {
	let imgUrl;
	if(req.file) {
		cloudinary.uploader.upload(req.file.path, function(result) {
			imgUrl = result.public_id;
			db.user.update({
				name: req.body.name,
				location: req.body.location,
				imgUrl: imgUrl
			}, {
				where: {id: req.user.id}
			}).then(function(data) {
				res.redirect('/user/profile');
			});
		});
	}
	else {
		db.user.update({
			name: req.body.name,
			location: req.body.location
		}, {
			where: {id: req.user.id}
		}).then(function(data) {
			res.redirect('/user/profile');
		});
	}
});

// GET /user - gets the search for friends page
router.get('/search', function(req, res) {
	res.render('user/findUsers', {user: req.user, cloudinary: cloudinary});
});

// POST /user - finds users reading the searched book
router.post('/', function(req, res) {
	db.book.findAll({
		where: {title: req.body.searchTerm},
		include: [db.user]
	}).then(function(books) {
		res.render('user/showUsers', {
			user: req.user, 
			books: books,
			searchTerm: req.body.searchTerm,
			cloudinary: cloudinary
		});
	})
});

// GET /:id/user - gets specific user profile
router.get('/:id', function(req, res) {
	db.list.findAll({
		where: {userId: req.params.id},
		include: [db.book]
	}).then(function(lists) {
		db.user.findById(req.params.id).then(function(user){
			user.getGroups().then(function(groups) {
				res.render('user/friendProfile', {
					user: user, 
					lists: lists, 
					groups: groups,
					cloudinary: cloudinary
				});
			});
		});
	});
});



module.exports = router;