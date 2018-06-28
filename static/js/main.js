$(document).ready(function() {
	console.log('DOC READY');
	// initialize materialize select form
	$('select').formSelect();

	// delete lists
	$('.delete-list-btn').click(function(e) {
		console.log('click')
		e.preventDefault();
		let url = $(this).attr('href');
		$.ajax({
			method: 'DELETE',
			url: url,
		}).done(function(data) {
			window.location = '/user/profile';
		})
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