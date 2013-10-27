$(document).ready(function(){
	$("[role=content]>div").hide();
	updateBgr();

	var initial = true;
	window.currentPage = "";

	$(window).resize(function(){
		updateBgr();
	});

	$(".menu").on('click', switchpage);

	function switchpage(e){
		var selected = $(this).data("menu");
		var cta = $(this).attr("class") == "cta menu" ? true : false ;
		if(window.currentPage != selected) {
			window.currentPage = selected;
			$(".menu").removeClass("selected");
			$("[data-menu=" + selected + "]").addClass("selected");
			$("[role=content]>div").slideUp(650);
			$("#" + selected).slideDown(650);
			$("[role=hero_image]").animate({
				height: "150",
				backgroundPositionY: "-120"
			}, 650);

			if( ($("nav[role=mobile]").is(":visible")) && (cta == false)) {
				$("[role=mobile] #menu").slideToggle();
			}
		} else {
			if($("nav[role=mobile]").is(":visible")) {
				$("[role=mobile] #menu").slideToggle();
			}
		}
	}

	$("[data-galery]").on('click', function(e){
		var slides = [];

		$("#lightbox")
			.css("display", "block")
			.animate({
				opacity: 1
			},
		650);
		$(".swiper-wrapper").html("");
		$.getJSON( "galery.json", function( data ) {
			$.each( data.images, function( key, val ) {
				$(".swiper-wrapper").append("<div class=\"swiper-slide\"><img src=\"galery/" + val.url + "\"><p class=\"title\">" + val.title + "</p><p>" + val.description + "</p></div>");
			});
			window.mySwiper = new Swiper('.swiper-container',{
				loop:true,
				grabCursor: true
			})
		});
	});

	$(".close").on('click', function(e){
		$("#lightbox").animate({
			opacity: 0
		}, 650, function(){
			$("#lightbox").css("display", "none");
		});
	});

	$("#menu_cta").on('click', function(e){
		$("[role=mobile] #menu").slideToggle();
	});

	function updateBgr(){
		var width = $(window).width();
		$("[role=hero_image]").css("background-position-x", -((1920-width)/2) );
	}

	$('.arrow-left').on('click', function(e){
		e.preventDefault()
		window.mySwiper.swipePrev()
	})
	$('.arrow-right').on('click', function(e){
		e.preventDefault()
		window.mySwiper.swipeNext()
	})
});