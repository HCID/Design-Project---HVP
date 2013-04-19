(function( $ ) {

  $.fn.PieMenu = function(options) {
	var angle,
		delay_time,
		ele_angle=[],
		x_pos=[],
		y_pos=[];
	
    var settings = $.extend( {
      'starting_angel'   : '0',
      'angel_difference' : '90',
	  'radius':'200',
	  'menu_element' : this.children('.menu_option').children(),
	  'menu_button' : this.children('.menu_button'),
    }, options);
	
	
	angle = parseInt(settings.angel_difference)/(settings.menu_element.length-1);
	delay_time = 1/(settings.menu_element.length-1);

	function setPosition(val){
		$(settings.menu_element).each(function(i,ele){
			$(ele).css({
			'left' : (val==0)?0:y_pos[i],
			'top' : (val==0)?0:-x_pos[i],
			});
		});
	}
	

	var currentD3Ev = null;
	//$(settings.menu_button).unbind('mousedown', clickHandler);	//remove event if exist
	
	
		
    $("*").on("mousedown", function (e) {
	    if($(e.currentTarget).hasClass("pie_menu_link")) {
        console.log("mmmmmmod", $(this).data("mode"))
        ClickHandler.circleClicked(d3.select("#g" + $(e.currentTarget).parent("li").data("circle-id")).data()[0], $(this).data("mode"), currentD3Ev);
        $("#outer_container").hide();
        $("#event_list").hide();
      } else if ($(e.currentTarget).hasClass("event_item") || $(e.currentTarget).attr("id") === "detail_close_button") {    
      } else {
        $("#outer_container").hide();
        $("#event_list").hide();
      }         
   	});

//		$(settings.menu_button).on('mousedown', clickHandler);
		//$("#outer_container").on('communitiesClick', clickHandler);
		return settings.menu_element.each(function(i,ele){
		ele_angle[i] = (parseInt(settings.starting_angel) + angle*(i))*Math.PI/180;
		x_pos[i] = (settings.radius * Math.sin(ele_angle[i]));
        y_pos[i] = (settings.radius * Math.cos(ele_angle[i]));
		 
		$(ele).css({
			'-webkit-transform': 'rotate('+(90-ele_angle[i]*180/Math.PI)+'deg)',
			   '-moz-transform': 'rotate('+(90-ele_angle[i]*180/Math.PI)+'deg)',
			    '-ms-transform': 'rotate('+(90-ele_angle[i]*180/Math.PI)+'deg)',
			     '-o-transform': 'rotate('+(90-ele_angle[i]*180/Math.PI)+'deg)',
			    	'transform': 'rotate('+(90-ele_angle[i]*180/Math.PI)+'deg)',
		});
    	})
	  
  	};
})( jQuery );