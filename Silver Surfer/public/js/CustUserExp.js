//use noconflict mode for JQuery
$.noConflict();


jQuery(function(){
	//show login modal
	$('#custloginModal').modal('show');

	//clear all the input when modal is closed
	$('.modal').on('hidden.bs.modal', function(){
	    $(this).find('form')[0].reset();
	});

	//hide the sign up part first
	$('#custsignup').hide();
	$('#signupBtnPart').hide();

	//toggle sign up form and login form
	$('#custsignupBtn').click(function(){
		$('#custsignup').fadeIn();
		$('#signupBtnPart').fadeIn();
		$('#loginBtnPart').hide();
		$('#custlogin').hide();
		$('#custloginBtn').attr('class', 'btn btn-default');
		$('#custsignupBtn').attr('class', 'btn btn-success');
	});
	$('#custloginBtn').click(function(){
		$('#custsignup').hide();
		$('#signupBtnPart').hide();
		$('#loginBtnPart').fadeIn();
		$('#custlogin').fadeIn();
		$('#custsignupBtn').attr('class', 'btn btn-default');
		$('#custloginBtn').attr('class', 'btn btn-success');
	});
});