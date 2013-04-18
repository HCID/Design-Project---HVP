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
	$(settings.menu_button).unbind('mousedown', clickHandler);	//remove event if exist
	
	var clickHandler = function(e, f) {
		
		$("#outer_container").css("position", "absolute")

		if (Globals.mode === "comm") {
			currentD3Ev = f;
			
      var x = Globals.vennEvent.clientX;
      var y = Globals.vennEvent.clientY;
				

		} else {
      		var data = d3.select("#" + $(this).attr("id")).data()[0];
  			$(".menu_option li").data("circle-id", data.id);
			  var x = data.x-data.radius+8;
        var y = data.y+data.radius+8;
      	$(".menu_button").css("background-color", $(this).find("circle").css("fill")).css("width", (data.radius*2)+"px").css("height", (data.radius*2)+"px").text(data.code );
          
		}
      
      $("#outer_container").css("left", x + "px").css("top",  y + "px");
      var htmlTmpl = "";
      ClickHandler.loadParallelData();
      if(Globals.mode == "sessions") {
        var filterData = _.filter(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), data["id"]) });
      } else if (Globals.mode == "map"){
        console.log(data)
        var filterData = _.filter(force.nodes(), function (node) { return node.sessions[0]["room"] == data["room"]});
        
      }
      if(filterData) {
        if(filterData.length > 0) {
          _.each(_.first(filterData, 5), function(obj) {
            htmlTmpl += _.template($("#event_list_item").html(), {title: obj.name.length > 27 ? obj.name.substr(0,24)+".." : obj.name, id: obj.id})
          });
        }
      
        if (filterData.length > 0) {
            htmlTmpl += _.template($("#event_last_list_item").html(), {amount: filterData.length})
        }
      }
      
      
      
      $("#event_list").html(htmlTmpl).show().css("left", (x + 150) + "px").css("top",  (y-150) + "px");
      
      
      $("#event_list li").on("mousedown", function (e) {
        if($(this).hasClass("show_all_events")) {
          ClickHandler.circleClicked(data, "events");
          $("#event_list").hide();
          $("#outer_container").hide();
          $("#vent_list li").off("mousedown");
        } else if($(this).hasClass("event_item")) {
          var dataId = $(this).data("event-id");
          console.log("sas", dataId)
          ClickHandler.circleClicked(_.find(force.nodes(), function(a) { return a.id == dataId} ), "details");
        }
        
        e.stopPropagation();
        
      });
      
      
    	e.stopPropagation();

    	$("#outer_container").show();
      
            
	    if($(this).parent().hasClass('active')){
				setPosition(0);
				$(this).parent().removeClass('active');
				$(this).parent().addClass('inactive');

			}else{
				setPosition(1);
				$(this).parent().addClass('active');
				$(this).parent().removeClass('inactive');
			}	
			$(this).toggleClass("btn-rotate");
		};
		$("*").on("mousedown", function (e) {
      console.log($(e.currentTarget).attr("class"))
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
     	})

		$(settings.menu_button).on('mousedown', clickHandler);
		$("#outer_container").on('communitiesClick', clickHandler);
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