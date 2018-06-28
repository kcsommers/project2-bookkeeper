var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// GET /groups - show all groups
router.get('/', function(req, res) {
	// if there is a search term
	if(req.query.searchTerm) {
		db.group.findAll({
			where: {topic: req.query.searchTerm}
		}).then(function(groups) {
			res.render('groups/groupsIndex', {groups: groups, user: req.user});
		})
	}
	else {
		db.group.findAll().then(function(groups) {
			res.render('groups/groupsIndex', {groups: groups});
		});
	}
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
				topic: req.body.topic
			}).then(function(group) {
				book.addGroup(group);
				user.addGroup(group).then(function(data) {
					res.redirect('user/profile');
				});
			});
		});
	});
});		

module.exports = router;