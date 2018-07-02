var express = require('express');
var router = express.Router();
var request = require('request');
var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer({dest: './uploads/'});
var moment = require('moment');
var db = require('../models');

// GET /groups - show all groups
router.get('/', function(req, res) {
	// if there is a search term
	if(req.query.searchTerm) {
		db.group.findAll({
			where: {topic: req.query.searchTerm},
			include: [db.book]
		}).then(function(groups) {
			res.render('groups/groupsIndex', {
				groups: groups, 
				user: req.user,
				searchTerm: req.query.searchTerm
			});
		})
	}
	else {
		db.group.findAll().then(function(groups) {
			res.render('groups/groupsIndex', {
				groups: groups, 
				user: req.user,
				searchTerm: req.query.searchTerm
			});
		});
	}
});

// GET /groups/search - gets search groups page
router.get('/search', function(req, res) {
	res.render('groups/findGroups', {user: req.user});
});

// GET /groups/:id - view specific group
router.get('/:id', function(req, res) {
	db.group.findById(req.params.id).then(function(group) {
		group.getPosts({include: [db.user]}).then(function(posts) {
			group.getUsers().then(function(users) {
				res.render('groups/showGroup', {
					group: group, 
					users: users, 
					currUser: req.user,
					posts: posts,
					user: req.user,
					cloudinary: cloudinary,
					moment: moment,
					msg: null
				});
			});
		});
	});
});

// POST /groups/join - join a group
router.post('/join', function(req, res) {
	db.groupsUsers.findOrCreate({
		where: {
			groupId: req.body.group,
			userId: req.body.user
		}
	}).spread(function(gU, created) {
		db.group.findById(req.body.group).then(function(group) {
			group.getPosts({include: [db.user]}).then(function(posts) {
				group.getUsers().then(function(users) {
					res.render('groups/showGroup', {
						group: group, 
						users: users,
						currUser: req.user,
						user: req.user,
						posts: posts,
						cloudinary: cloudinary,
						moment: moment,
						msg: (created) ? 'You have joined this group!' : 'You have already joined this group!'
					});
				});
			});
		});
	});
});

// **********FIXX THISS (req.query)
// GET /groups/:bookId/new - create a group for specific book
router.get('/:bookId/new', function(req, res) {
	let userName;
	db.user.findById(req.user.id).then(function(user) {
		userName = user.name
	});

	db.book.findById(req.params.bookId).then(function(book) {
		res.render('groups/newGroup', {book: book, user: userName});
	});
});

//POST /groups - create a new group (with book and association)	
router.post('/', function(req, res) {
	db.book.findById(req.body.bookId).then(function(book) {
		db.user.findById(req.user.id).then(function(user) {
			db.group.create({
				name: req.body.name,
				description: req.body.description,
				admin: req.body.admin,
				topic: req.body.topic,
				imgUrl: 'lflbvvr8kjmgae9suzov',
				bookImg: book.imgUrl
			}).then(function(group) {
				book.addGroup(group);
				user.addGroup(group).then(function(data) {
					res.redirect('groups/' + group.id);
				});
			});
		});
	});
});	

// POST /groups/:id/update - edit group
router.post('/:id/update', upload.single('groupPic'), function(req, res) {
	let imgUrl;
	if(req.file) {
		cloudinary.uploader.upload(req.file.path, function(result) {
			imgUrl = result.public_id;
			db.group.update({
				name: req.body.name,
				description: req.body.description,
				imgUrl: imgUrl
			}, {
				where: {id: req.params.id}
			}).then(function(data) {
				res.redirect('/groups/' + req.params.id);
			});
		});
	}
	else {
		db.group.update({
			name: req.body.name,
			description: req.body.description
		}, {
			where: {id: req.user.id}
		}).then(function(data) {
			res.redirect('/groups/' + req.params.id);
		});
	}
});	

module.exports = router;