var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

// GET /lists/new - show form to create new list
router.get('/new', function(req, res) {
	res.render('lists/newList', {user: req.user});
});

// GET /lists/:id - show specific list
router.get('/:id', function(req, res) {
	db.list.find({
		where: {id: req.params.id},
		include: [db.book]
	}).then(function(list) {
		res.render('lists/showList', {list: list, user: req.user});
	});
});

// POST /lists - create new list in db
router.post('/', function(req, res) {
	db.list.findOrCreate({
		where: {
			name: req.body.name,
			userId: req.user.id
		}
	}).spread(function(list, created) {
		res.redirect('user/profile')
	});
});


// DELETE /lists/:id - delete list and associated notes, quotes, and listsBooks
router.delete('/:id', function(req, res) {

	db.list.destroy({
		where: {id: req.params.id}
	});

	let booksArr = [];
	db.listsBooks.findAll({
		where: {listId: req.params.id}
	}).then(function(listsBooks) {
		// push bookIds into books array
		listsBooks.forEach(function(ass) {
			booksArr.push(ass.bookId)
		});
		// destroy listBook association
		db.listsBooks.destroy({where: {listId: req.params.id}});
		// if they exist, loop through book Ids to delete the book and its notes and quotes	
		if(booksArr.length) {
			booksArr.forEach(function(bookId) {

				db.book.destroy({
					where: {id: bookId}
				});

				db.quote.destroy({
					where: {
						bookId: bookId,
						userId: req.user.id
					}
				});
				
				db.note.destroy({
					where: {
						bookId: bookId,
						userId: req.user.id
					}
				}).then(function(data) {
					res.sendStatus(200);
				});

			});
		}
		else {
			res.sendStatus(200);
		}
	});
});

module.exports = router;