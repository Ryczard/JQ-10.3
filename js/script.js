var SLIDE_WIDTH = 500,
	ANIMATION_DURATION = 500;

$(function(){
	var carouselList = $('#carousel ul');

	var intervalId;
	function runInterval() {
		intervalId = setInterval(changeSlide, 3000);
	}
	function stopInterval() {
		clearInterval(intervalId);
	}
	runInterval();

	function changeSlide(){
				updateIndicators();
		carouselList.animate({'marginLeft':-SLIDE_WIDTH}, ANIMATION_DURATION, moveFirstSlide);

	};

	function changeSlideBackward(){
		moveFirstSlideBack();
		carouselList.animate({'marginLeft':0}, ANIMATION_DURATION);
		updateIndicators();
	};

	function moveFirstSlide(){
		var firstItem = carouselList.find('li:first');
		var lastItem = carouselList.find('li:last');
		lastItem.after(firstItem);
		carouselList.css({marginLeft:0});
		updateIndicators();
	};

	function moveFirstSlideBack(){
		var firstItem = carouselList.find('li:first');
		var lastItem = carouselList.find('li:last');
		firstItem.before(lastItem);
		carouselList.css({marginLeft:-SLIDE_WIDTH});
	};

	$('.right-scroll').click(function() {
		stopInterval();
		changeSlide();
		runInterval();
	});

	$('.left-scroll').click(function() {
		stopInterval();
		changeSlideBackward();
		runInterval();
	});

	$(".dot").click(function() {
		var clickedSlide = $(this).data("slide");
		var currentSlide = carouselList.find('li:first').data("slide");
		console.log("clickedSlide", clickedSlide, "currentSlide", currentSlide);
		$(".dot").removeClass("active");
		$(this).addClass("active");

		var slidesCount = clickedSlide - currentSlide;
		if (slidesCount > 0) {
			stopInterval();
			carouselList.animate({'marginLeft':-SLIDE_WIDTH * slidesCount}, ANIMATION_DURATION, function() {
				for (var i = 0; i < slidesCount; i++) {
					moveFirstSlide();
				}
			});
			runInterval();
		} else if (slidesCount < 0) {
			slidesCount = -slidesCount;
			stopInterval();
			for (var i = 0; i < slidesCount; i++) {
				moveFirstSlideBack();
			}
			carouselList.css({marginLeft:-SLIDE_WIDTH * slidesCount});
			carouselList.animate({'marginLeft':0}, ANIMATION_DURATION);
			runInterval();
		}
	});

	function updateIndicators() {
		var currentSlide = carouselList.find('li:first').data("slide");
		$(".dot").removeClass("active");
		$(".dot").each(function(dot) {
			var currentDot = $(this).data("slide");
			if (currentDot === currentSlide) {
				$(this).addClass("active");
			}
		});
	}

});		