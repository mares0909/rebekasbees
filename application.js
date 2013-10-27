$(document).ready(function(){
	$("[role=content]").hide();
	updateBgr();

	var initial = true;
	window.currentPage = "";

	$(window).resize(function(){
		updateBgr();
	});

	$(".menu").on('click', switchpage);

	function switchpage(e){
		var selected = $(this).data("menu");
		console.log(window.currentPage + "=?" + selected);
		if(window.currentPage != selected) {
			window.currentPage = selected;
			$(".menu").removeClass("selected");
			$("[data-menu=" + selected + "]").addClass("selected");
			$("[role=content]").slideUp(650, function(){
				$("[role=content]").load("pages/"+selected+".html", function(){
					$(".cta").on('click', switchpage);
				});
			});
			$("[role=hero_image]").animate({
				height: "150",
				backgroundPositionY: "-120"
			}, 650, function(){
				$("[role=content]").slideDown(650);
			});
			if($("nav[role=mobile]").is(":visible")) {
				$("[role=mobile] #menu").slideToggle();
			}
		}
	}

	$("#menu_cta").on('click', function(e){
		$("[role=mobile] #menu").slideToggle();
	});

	function updateBgr(){
		var width = $(window).width();
		$("[role=hero_image]").css("background-position-x", -((1920-width)/2) );
	}
});