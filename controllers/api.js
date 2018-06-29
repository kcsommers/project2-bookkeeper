var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// POST /api - send request to api
router.post	('/', function(req, res) {
	let url = 'https://www.googleapis.com/books/v1/volumes?q=' + req.body.searchTerm + '&maxResults=10';
	request(url, function(error, response, body) {
		let results = JSON.parse(body);

		if(req.user) {
			db.list.findAll({
				where: {userId: req.user.id}
			}).then(function(lists) {
				res.render('searchResults', {
					results: results.items, 
					user: req.user, 
					lists: lists,
					searchTerm: req.body.searchTerm
				});
			});
		}
		else {
			res.render('searchResults', {
				results: results.items, 
				user: null,
				searchTerm: req.body.searchTerm
			});
		}
	});
});

module.exports = router;