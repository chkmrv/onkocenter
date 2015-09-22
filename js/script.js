$(function() {
	$('.bxslider').bxSlider({
		'pager' : false,
		'nextText' : '',
		'prevText' : ''
	});

	inputWidth();
})

function inputWidth() {
	$('.search-field__img input').css({'width':'0px'});
	$('.search-field__img').on('click', function() {
		$(this).find('input').animate({
			'opacity' :'1',
			'width' : $(this).width()-34 +' px'
		},'400').focus();
	});

	$('.search-field__img input').focusout(function() {
		$(this).animate({
			'width' : '0px',
			'opacity' :'0'
		}), 400;
	});
}