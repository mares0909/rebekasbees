$(document).ready(function(){
	$("[role=content]>div").hide();
	updateBgr();

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
			$("html, body").animate({ scrollTop: "295px" });
			$("[role=hero_image]").animate({
				height: "150",
				backgroundPositionY: "-90"
			}, 650);

			if( ($("nav[role=mobile]").is(":visible")) && (cta == false)) {
				$("[role=mobile] #menu").slideToggle();
			}
		} else {
			if($("nav[role=mobile]").is(":visible")) {
				$("[role=mobile] #menu").slideToggle();
			}
			$("html, body").animate({ scrollTop: "295px" }); 
		}
	}

	$("[data-galery]").on('click', function(e){
		var slides = [];
		window.galery = true;

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
			updateLbx();
		});
	});

	$(".close").on('click', function(e){
		$("#lightbox").animate({
			opacity: 0
		}, 650, function(){
			$("#lightbox").css("display", "none");
			window.galery = false;
		});
	});

	$("#menu_cta").on('click', function(e){
		$("[role=mobile] #menu").slideToggle();
	});

	$(window).on('resize', updateLbx);

	function updateLbx(e){
		if(window.galery == true){
			height = $(window).height();
			$("#lightbox img").css("maxHeight", height*0.75 > 800 ? 800 : height*0.75);
			$(".arrow-left, .arrow-right").css("top", (height > 590 ? (590/2-30) : (height/2-30)));
		}
	}

	function updateBgr(){
		var width = $(window).width();
		$("[role=hero_image]").css("background-position-x", -((1920-width)/2) );
	}

	$('.arrow-left').on('click', function(e){
		e.preventDefault()
		window.mySwiper.swipePrev()
	});

	$('.arrow-right').on('click', function(e){
		e.preventDefault()
		window.mySwiper.swipeNext()
	});

	$('#recalculate').on('click', function(e){
		var reb_lat =51.638082;
	    var reb_lon =-0.178483;
	    var address = $("#address").val();
	    var message = "";
	    var request = "http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + reb_lat + "," + reb_lon + "&destinations=" + address + "&mode=driving&sensor=false";
	    
	    $.getJSON( request, function( data ) {
	    	console.log(data.rows[0].elements[0].status);
	    	if(data.rows[0].elements[0].status == "OK"){
		    	message = "<strong>" + address + "</strong> is <strong>" + data.rows[0].elements[0].distance.text + "</strong> away from Rebeka's setting.<br/>It would take you <strong>" + data.rows[0].elements[0].duration.text + "</strong> to drive there.";
		    } else {
		    	message = "You must have entered a wrong address! Try again please!";
		    }
		    $("#result").html(message);
	    });
	});

	$("header").on('click', function(e){
		$(".menu").removeClass("selected");
		$("[role=content]>div").slideUp(650);
		$("[role=hero_image]").animate({
			height: "360",
			backgroundPositionY: "0"
		}, 650);
		window.currentPage = "";
	});
});