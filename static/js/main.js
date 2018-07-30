$(document).ready(function() {
	console.log('DOC READY');
	// initialize materialize select form, modals and dropdown
	$('select').formSelect();
	$('.modal').modal();
	$('.dropdown-trigger').dropdown();
	$('.sidenav').sidenav();

	// list div click 
	$('.profile-list').click(function(e) {
		let url = $(this).attr('data-url');
		window.location = url;
	});

	// group click
	$('.profile-groups .card').click(function(e) {
		let url = $(this).attr('data-url');
		window.location = url;
	});

	// Find clubs trigger submit
	$('.find-clubs-trigger').click(function(e) {
		e.preventDefault();
		let formId = $(this).attr('href');
		$('#find-clubs-form-' + formId).trigger('submit');
	});

	// Find clubs trigger submit
	$('#find-clubs-trigger').click(function(e) {
		e.preventDefault();
		$('#find-clubs-form').trigger('submit');
	});

	// Find friends trigger submit
	$('.find-friends-trigger').click(function(e) {
		e.preventDefault();
		let formId = $(this).attr('href');
		$('#find-friends-form-' + formId).trigger('submit');
	});

	// Find friends trigger submit
	$('#find-friends-trigger').click(function(e) {
		e.preventDefault();
		$('#find-friends-form').trigger('submit');
	});

	// delete lists
	$('.delete-list-btn').click(function(e) {
		console.log('HIJACK')
		e.preventDefault();
		let url = $(this).attr('href');
		let user = $(this).attr('data-userId')
		$.ajax({
			method: 'DELETE',
			url: url
		}).done(function(data) {
			window.location = '/user/' + user; ;
		})
	});
	$('.delete-modal-trigger').on('click', function(e) {
		e.stopPropagation();
		let listIndex = $(this).attr('id');
		var instance = M.Modal.getInstance($('#delete-list-modal-' + listIndex));
		instance.open();
	});

	//update book description
	$('#edit-description-form').submit(function(e) {
		e.preventDefault();
		let url = $(this).attr('action');
		let newData = $(this).serialize();
		let bookId = $(this).serializeArray();
		$.ajax({
			method: 'PUT',
			url: url,
			data: newData
		}).done(function(data) {
			window.location = '/books/' + bookId[1].value; 
		});
	});

	// delete book
	$('.delete-book-btn').click(function(e) {
		e.preventDefault();
		let url = $(this).attr('href');
		let listId = $(this).attr('data-id');
		$.ajax({
			method: 'DELETE',
			url: url,
			data: {listId: listId}
		}).done(function(data) {
			window.location = '/lists/' + listId;
		});
	});

	// delete quote
	$('.delete-quote-btn').click(function(e) {
		e.preventDefault();
		let url = $(this).attr('href');
		let bookId = $(this).attr('data-id');
		$.ajax({
			method: 'DELETE',
			url: url
		}).done(function(data) {
			window.location = '/books/' + bookId;
		});
	});

	// delete note
	$('.delete-note-btn').click(function(e) {
		e.preventDefault();
		let url = $(this).attr('href');
		let bookId = $(this).attr('data-id');
		$.ajax({
			method: 'DELETE',
			url: url
		}).done(function(data) {
			window.location = '/books/' + bookId;
		});
	});
});