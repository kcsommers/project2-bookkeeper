var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// GET /quotes/:id/new - new quote page
router.get('/:id/new', function(req, res) {
	db.book.find({
		where: {id: req.params.id}
	}).then(function(book) {
		res.render('lists/newNotes', {book: book, user: req.user});
	})
});

// POST /quotes - create new quote
router.post('/', function(req, res) {
	db.quote.create({
		content: req.body.content,
		page: req.body.page,
		userId: req.user.id,
		bookId: req.body.bookId
	}).then(function(note) {
		res.redirect('books/' + req.body.bookId);
	});
});

module.exports = router;
