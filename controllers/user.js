var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require('../models');
var cloudinary = require('cloudinary');


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
			})
		});
	});
});

// GET /user/:id/update - update user info
router.get('/:id/update', function(req, res) {
	res.render('user/updateUser', {user: req.user});
});

module.exports = router;