$(document).ready(function() {
	console.log('DOC READY');
	// initialize materialize select form and modals
	$('select').formSelect();
	$('.modal').modal();

	// list div click 
	$('.profile-list-card').click(function(e) {
		let url = $(this).attr('data-url');
		window.location = url;
	});

	// group click
	$('.profile-group-card').click(function(e) {
		let url = $(this).attr('data-url');
		window.location = url;
	});

	// delete lists
	$('.delete-list-btn').click(function(e) {
		console.log('click')
		e.preventDefault();
		let url = $(this).attr('href');
		$.ajax({
			method: 'DELETE',
			url: url
		}).done(function(data) {
			window.location = '/user/profile';
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
		console.log('submit')
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
});