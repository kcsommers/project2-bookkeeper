var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// POST /posts - create a new post
router.post('/', function(req, res) {
	db.post.create({
		content: req.body.content,
		groupId: req.body.group,
		userId: req.body.user
	}).then(function(post) {
		res.redirect('groups/' + req.body.group);
	});
});

module.exports = router;