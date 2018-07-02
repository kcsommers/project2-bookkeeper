var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');
var cloudinary = require('cloudinary');
var multer = require('multer');
var upload = multer({dest: '../uploads/'});
var moment = require('moment');
var db = require('../models');

// GET /books/:id - show specific book, including notes and quotes
router.get('/:id', function(req, res) {
	db.book.findById(req.params.id).then(function(book) {
		book.getLists().then(function(list) {
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
						user: req.user,
						list: list,
						cloudinary: cloudinary,
						moment: moment
					});
				});
			});
		});
	});
});

// POST /books - create new book in db with list association
router.post('/', function(req, res) {
	db.list.find({
		where: {
			name: req.body.selectList,
			userId: req.user.id
		}
	}).then(function(list) {
		db.book.create({
			title: req.body.title,
			author: req.body.author,
			description: req.body.description,
			imgUrl: req.body.imgSrc,
			userId: req.user.id,
			banner: 'group-background2'
		}).then(function(book) {
			list.addBook(book).then(function(book) {
				res.redirect('user/' + req.user.id);
			});
		});
	});
});

// POST /books/:id/update - update book cover image
router.post('/:id/update', upload.single('groupPic'), function(req, res) {
	let imgUrl;
	if(req.file) {
		cloudinary.uploader.upload(req.file.path, function(result) {
			imgUrl = result.public_id;
			db.book.update({
				banner: imgUrl
			}, {
				where: {id: req.params.id}
			}).then(function(data) {
				res.redirect('/books/' + req.params.id);
			});
		});
	}
	else {
		res.redirect('/books/' + req.params.id);
	}
});

// PUT /books/update - update book description
router.put('/update', function(req, res) {
	db.book.update({
		description: req.body.content
	}, {
		where: {
			id: req.body.bookId
		}
	}).then(function(book) {
		res.sendStatus(200);
	})
});


// DELETE /books/:id - remove book listsBooks association
// if it doesn't exist in any other lists, remove it from books table
router.delete('/:id', function(req, res) {
	db.listsBooks.destroy({
		where: {
			bookId: req.params.id,
			listId: req.body.listId
		}
	});
	db.quote.destroy({
		where: {
			bookId: req.params.id,
			userId: req.user.id
		}
	});
	db.note.destroy({
		where: {
			bookId: req.params.id,
			userId: req.user.id
		}
	});
	db.book.destroy({
		where: {id: req.params.id}
	}).then(function(data) {
		res.sendStatus(200);
	});
});

module.exports = router;