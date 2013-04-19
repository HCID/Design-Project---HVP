(function() {
  window.ClickHandler = (function() {
    var circlesThreshold = 30;
    function ClickHandler() {}
    

    ClickHandler.listOfEvents = [];
    ClickHandler.listOfOldEvents = [];


    ClickHandler.eventListItemClick = function (e) {
      if($(e.currentTarget).hasClass("event_item")) {                              
        View.showDetails(d3.select((Globals.mode == "sessions" ? "#gs" : "#g") + $(e.currentTarget).data("event-id")).data()[0]); 
      } else if($(e.currentTarget).hasClass("show_all_events")) {
        Globals.mode = "events";
        d3.selectAll("circle").style("display", "block");
        force.nodes(ClickHandler.listOfEvents); 
        main(); 
        $("#outer_container, #event_list").hide();
        $("#event_list li").off("mousedown");
      }
      
    }


    /* Funtion triggered when one of the bubbles is clicked */    
    ClickHandler.circleClicked = function (circle, newMode, d3event) {
      if(Globals.mode === "events") {
        View.showDetails(circle);
      } else {
      var menuId = "";
      if (Globals.mode === "comm") {
        currentD3Ev = f;
        var position = {x: Globals.vennEvent.clientX, y: Globals.vennEvent.clientY }; 
      } else {  
        menuId = circle.id;        
        var position = {x: circle.x-circle.radius+8, y: circle.y+circle.radius+8};
        //$(".menu_button").css("background-color", $(this).find("circle").css("fill")).css("width", (data.radius*2)+"px").css("height", (data.radius*2)+"px").text(data.code );       
      }

    
    ClickHandler.loadParallelData();


    if (Globals.mode == "map") { 
      var copyPD = parallelData.slice(0);
      var sessions = CircleHandler.groupSession(copyPD);
      ClickHandler.listOfOldEvents = _.reject(sessions, function (node) { return node["room"] == circle["room"]});
      ClickHandler.listOfEvents = _.filter(sessions, function (node) { return node["room"] == circle["room"]});
    
    } else if (Globals.mode == "sessions") {
      View.generateSessionTitle(circle.name);
      ClickHandler.listOfOldEvents = _.reject(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), circle["id"]) })
      ClickHandler.listOfEvents = _.filter(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), circle["id"]) })          
    
    } else if (Globals.mode == "comm") {
      var list = _.map($('svg g.arc').filter(function() {
        if (pointInCirclePath($(this), Globals.vennEvent)) {
          return true;
        }
        }), function (el) { return el.id });
        if (list.length > 0) {
          if(list[0] == "general") {
            ClickHandler.listOfOldEvents = _.reject(force.nodes(), function (node) { return node.communities.length === 0 || _.every(node.communities, function (n) {  return _.indexOf(["ux", "design", "engineering"], n) !== -1 }) } );
            ClickHandler.listOfEvents = _.filter(force.nodes(), function (node) { return node.communities.length === 0 || _.every(node.communities, function (n) {  return _.indexOf(["ux", "design", "engineering"], n) !== -1 }) } );
          } else {
            ClickHandler.listOfOldEvents = _.reject(force.nodes(), function (node) { return node.communities.length > 0 && _.difference(node.communities, list).length == 0 } );
            ClickHandler.listOfEvents = _.filter(force.nodes(), function (node) { return node.communities.length > 0 && _.difference(node.communities, list).length == 0 } );
          }            

          //.attr("opacity", 1);   
        }         
      }
      
      
        /* 
          position is an array containg [x, y] 
          list of events if a list of max 5 events
        */
        console.log($(this))

        View.showPieMenu(position, ClickHandler.listOfEvents, menuId);
//        CircleHandler.filterData(circle, newMode, d3event);  
      }
      
    };


    /* closes the detail view */ 
    ClickHandler.detailCloseHandler = function (e) {
      View.hideDetails();
      e.stopPropagation();
    }


  	ClickHandler.pieMenuHandler = function(e, f) {

      var newMode = $(e.currentTarget).data("mode");
      console.log("asd", ClickHandler.listOfEvents);



      if (ClickHandler.listOfOldEvents.length > 0) {
        filterHistory.push({name: Globals.mode, data: ClickHandler.listOfOldEvents});  
        View.addFilterHistory(filterHistory);  
      }  
      Globals.mode = newMode;      
      force.nodes(ClickHandler.listOfEvents);  
      if(Globals.mode === "comm") {
        d3.selectAll("circle").style("display", "none");
          console.log("making them invisible");
        $('.talkName').hide();
        $('.legend').hide();
        ClickHandler.loadParallelData();
        Communities.communities();
      } else {
        d3.selectAll("circle").style("display", "block");
        force.nodes(ClickHandler.listOfEvents); 
        main(); 
        // View.update();  
      }
       $("#outer_container, #event_list").hide();

          e.stopPropagation();
      
        // $("#outer_container").css("left", x + "px").css("top",  y + "px");
        // var htmlTmpl = "";
        // ClickHandler.loadParallelData();
        // if(Globals.mode == "sessions") {
        //   var filterData = _.filter(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), data["id"]) });
        // } else if (Globals.mode == "map"){
        //   var filterData = _.filter(force.nodes(), function (node) { return node.sessions[0]["room"] == data["room"]});        
        // }
        // // if(filterData) {
        // //   if(filterData.length > 0) {
        //     _.each(_.first(filterData, 5), function(obj) {
        //       htmlTmpl += _.template($("#event_list_item").html(), {title: obj.name.length > 27 ? obj.name.substr(0,24)+".." : obj.name, id: obj.id})
        //     });
        //   }
      
        //   if (filterData.length > 0) {
        //       htmlTmpl += _.template($("#event_last_list_item").html(), {amount: filterData.length})
        //   }
        // }
      
      
      
        // $("#event_list").html(htmlTmpl).show().css("left", (x + 150) + "px").css("top",  (y-150) + "px");
      
      
       //  $("#event_list li").on("mousedown", function (e) {
       //    if($(this).hasClass("show_all_events")) {
       //      ClickHandler.circleClicked(data, "events");
       //      $("#event_list").hide();
       //      $("#outer_container").hide();
       //      $("#vent_list li").off("mousedown");
       //    } else if($(this).hasClass("event_item")) {
       //      var dataId = $(this).data("event-id");
       //      console.log("sas", dataId)
       //      ClickHandler.circleClicked(_.find(force.nodes(), function(a) { return a.id == dataId} ), "details");
       //    }
        
       //    e.stopPropagation();
        
       //  });
      
      
      	// e.stopPropagation();

      	// $("#outer_container").show();
      
            
  	 //    if($(this).parent().hasClass('active')){
  		// 		setPosition(0);
  		// 		$(this).parent().removeClass('active');
  		// 		$(this).parent().addClass('inactive');

  		// 	}else{
  		// 		setPosition(1);
  		// 		$(this).parent().addClass('active');
  		// 		$(this).parent().removeClass('inactive');
  		// 	}	
  		// 	$(this).toggleClass("btn-rotate");
  		// };
    };


    /* Funtion triggered when one of the menu buttons is clicked */
    ClickHandler.menuHandler = function () {
      d3.selectAll("circle").style("display", "block");
      $('.talkName').show();
      $('.legend').show();
      
      if ($(this).data("grouping") == "comm") {
        Globals.mode = "comm";
        d3.selectAll("circle").style("display", "none");;
        $('.talkName').hide();
        $('.legend').hide();
        ClickHandler.loadParallelData();
        Communities.communities();
      } else if ($(this).data("grouping") == "events") {
        ClickHandler.loadParallelData();
        Globals.mode = "events";
        main();
      } else if($(this).data("grouping") == "map"){
        ClickHandler.loadParallelData();
        Globals.mode = "map";
        main();
      } else if($(this).data("grouping") == "restart"){
        filterHistory = [];
        restart();
      } else if($(this).data("grouping") == "sessions"){
        $('.legend').hide();
        ClickHandler.loadParallelData();
        Globals.mode = "sessions";
        main();
      }
    };

    /* Load */
    ClickHandler.loadParallelData = function () {
      if (parallelData.length > 0) {
        force.nodes(parallelData);
        parallelData = [];
      }
    }
    
    /* Tells if a point is inside a circle path or not */
    var pointInCirclePath = function (b, p) {

      var cX  = parseFloat(b.attr("transform").split(",")[0].split("(")[1]);
      var cY  = parseFloat(b.attr("transform").split(",")[1].split(")")[0]);
      var radius = b.get(0).getBBox().height / 2;
      //distance between two points
      var xs = 0;
      var ys = 0;
 
      xs = cX - p.pageX;
      xs = xs * xs;
 
      ys = cY - p.pageY;
      ys = ys * ys;

      var distance = Math.sqrt( xs + ys );
  
      return (distance <= radius);
    }

    ClickHandler.removeFilter = function () {
      var id = $(this).parent().attr("id").substring(7,$(this).parent().attr("id").length);
      $(this).parent().remove();
      if(filterHistory[id]) {
        _.forEach(filterHistory[id].data, function(d) {
          force.nodes().push(d);
        });
      }
      delete filterHistory[id];
      View.update();          
    };
  return ClickHandler;
  })();
}).call(this);