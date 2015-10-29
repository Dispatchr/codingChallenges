//use noconflict mode for JQuery
$.noConflict();


jQuery(function(){
	//show login modal
	$('#loginModal').modal('show');

	//clear all the input when modal is closed
	$('.modal').on('hidden.bs.modal', function(){
	    $(this).find('form')[0].reset();
	});

	//order manage & inventory manage toggle
	$('#invBtn').click(function(){
		$('#invBtn').attr("class", "btn btn-info btn-lg");
		$('#ordBtn').attr("class", "btn btn-default btn-lg");
	});
	$('#ordBtn').click(function(){
		$('#ordBtn').attr("class", "btn btn-info btn-lg");
		$('#invBtn').attr("class", "btn btn-default btn-lg");
	});
});