var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// GET /notes/:id/new - create new note page
router.get('/:id/new', function(req, res) {
	db.book.find({
		where: {id: req.params.id}
	}).then(function(book) {
		res.render('lists/newNotes', {book: book, user: req.user});
	})
});

// POST /notes - 
router.post('/', function(req, res) {
	db.note.create({
		content: req.body.content,
		userId: req.user.id,
		bookId: req.body.bookId
	}).then(function(quote) {
		res.redirect('books/' + req.body.bookId);
	});
});

// DELETE /notes/:id
router.delete('/:id', function(req, res) {
	db.note.destroy({
		where: {id: req.params.id}
	}).then(function(data) {
		res.sendStatus(200);
	});
});

module.exports = router;