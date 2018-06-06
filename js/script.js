$(function(){
	var carouselList = $('#carousel ul');

	setInterval(changeSlide, 3000);

	function changeSlide(){
		carouselList.animate({'marginLeft':-1350}, 500, moveFirstSlide);
	};

	function changeSlideBackward(){
		carouselList.animate({'marginLeft':0}, 500, moveFirstSlideBack);
	};

	function moveFirstSlide(){
		var firstItem = carouselList.find('li:first');
		var lastItem = carouselList.find('li:last');
		lastItem.after(firstItem);
		carouselList.css({marginLeft:0});
	};

	function moveFirstSlideBack(){
		var firstItem = carouselList.find('li:first');
		var lastItem = carouselList.find('li:last');
		firstItem.before(lastItem);
		carouselList.css({marginLeft:-1350});
	};

	$('#right-scroll').click(function() {
		changeSlide();
	});

	$('#left-scroll').click(function() {
		changeSlideBackward();
	});
});		