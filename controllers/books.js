var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');
var db = require('../models');

// GET /books/:id - show specific book, including notes and quotes
router.get('/:id', function(req, res) {
	db.book.findById(req.params.id).then(function(book) {
		book.getQuotes({
			where: {userId: req.user.id}
		}).then(function(quotes) {
			book.getNotes({
				where: {userId: req.user.id}
			}).then(function(notes) {
				res.render('lists/showBook', {
					book: book, 
					quotes: quotes, 
					notes: notes,
					user: req.user
				});
			});
		});
	});
});

// router.post('/', function(req, res) {
// 	db.book.findOrCreate({
// 		where: {description: req.body.description},
// 		defaults: {
// 			title: req.body.title,
// 			author: req.body.author,
// 			description: req.body.description[0],
// 			imgUrl: 'https://res.cloudinary.com/kcsommers/image/upload/v1528928999/i8spehj9uome2vcl0gff.jpg'
// 		}
// 	}).spread(function(book, created) {
// 		if(Array.isArray(req.body.selectList)) {
// 			let addList = function(listName, callback) {
// 				db.list.find({
// 					where: {
// 						name: listName,
// 						userId: req.user.id
// 					}
// 				}).then(function(list) {
// 					book.addList(list);
// 				});
// 			}

// 			async.each(req.body.selectList, addList);
// 			res.redirect('/user/profile');
// 		} 
// 		else {
// 			db.list.find({
// 				where: {
// 					name: req.body.selectList,
// 					userId: req.user.id
// 				}
// 			}).then(function(list) {
// 				book.addList(list).then(function(list) {
// 					res.redirect('user/profile');
// 				})
// 			})
// 		}
// 	});
// });

// POST /books - create new book in db with list association
router.post('/', function(req, res) {
	db.list.find({
		where: {
			name: req.body.selectList,
			userId: req.user.id
		}
	}).then(function(list) {
		db.book.findOrCreate({
			where: {description: req.body.description},
			defaults: {
				title: req.body.title,
				author: req.body.author,
				description: req.body.description,
				imgUrl: req.body.imgSrc
			}
		}).spread(function(book, created) {
			list.addBook(book).then(function(book) {
				res.redirect('user/profile');
			});
		});
	});
});

// DELETE /books/:id - remove book listsBooks association
// if it doesn't exist in any other lists, remove it from books table
router.delete('/:id', function(req, res) {
	db.listsBooks.destroy({
		where: {
			bookId: req.params.id,
			listId: req.body.listId
		}
	}).then(function(data) {
		db.quote.destroy({
			where: {
				bookId: req.params.id,
				userId: req.user.id
			}
		}).then(function(data) {
			db.note.destroy({
				where: {
					bookId: req.params.id,
					userId: req.user.id
				}
			}).then(function(data) {
				db.listsBooks.find({
					where: {bookId: req.params.id}
				}).then(function(book) {
					if(!book) {
						db.book.destroy({
							where: {id: req.params.id}
						}).then(function(data) {
							res.sendStatus(200);
						});
					}
					else {
						res.sendStatus(200);
					}
				});
			});
		});
	});
});

module.exports = router;