(function() {
  window.View = (function() {
    function View() {} 
    
    // Changes the background image
    View.changeImage = function () {
      var image = "";
      var opacity = 0;


      if (Globals.mode == "sessions") {
          image = "/img/sessions.svg";
          opacity = 1;
      } else if (Globals.mode == "map") {
          image = "/img/mapLevels.svg";
          opacity = 1;
      }

      d3.select("body").select("svg").select("image").attr("xlink:href", image).attr("opacity", opacity);
    };

    // View.generateLegend = function () {
    //   var items = [];
    //   _.each(Globals.colors, function(item, key) {
    //           items.push(_.template($("#template_legend_item").html(), {color: item.color, name: key }));
    //    });  // close each()
    //    $(".types").html( items.join("") );
    // }


    View.generateSessionTitle = function (d) {
      console.log(" title append");
      $("body").append(_.template($("#template_session_title").html(), {title: d}));
    }


    View.calculateR = function (d) {
  
      if(Globals.mode === "events"){
        var n = force.nodes().length;
        if (n >100) {
          return 21;
        } else {
          var s = 0.2 * Math.sqrt((Globals.width*Globals.height)/n);
          return s;
        }
      } else if (Globals.mode === "map") {
        return d.radius;
      } else if (Globals.mode === "sessions") {
        return 25;
      } else {
        return 25;
      } 

    }


    View.update = function () {
      var l = force.nodes().length;
      View.changeImage();
      nodes = vis.selectAll("g").data(force.nodes(), function(d){ return d.id;} )
      var nodeEnterG = nodes.enter().append("g");
      nodeEnterG.attr("id", function(d, i){return "g" + d.id})
        .attr("class", "circle_class")
        .append("circle")
        .on("mousedown", ClickHandler.circleClicked )
        .style("fill", function (d, i) {
           
             if(d.sessions) {
                return View.sessionsColors(d.sessions[0]);
             } else {
               //return "#000"
                return View.sessionsColors(d);
             }
          
        })
        .style("stroke-width", function (d, i) {
          if (Globals.mode === "events") { 
              return 1;
          } else{
              return 0;
          }
        })
        .style("opacity", function(){
          if (Globals.mode === "events") { 
              return 1.0;
          } else {
               return 0.5;
          }
        })
        .style("stroke", "#ffffff")
        //.call(TUIOHandler.node_drag);
        if(Globals.mode != "events") {
          View.addPieMenuOptions(Globals.mode);
        
          $('#outer_container').PieMenu({
        		'starting_angel': 135,
        		'angel_difference' : 90,
        		'radius': 200,      
            'menu_button' : $('.circle_class'),
        	});
      
          // TODO: move menu when circle moves
          // TODO: add circle code
          // TODO: animate disappearance
        }
     
      console.log("force.nodes().length: " + force.nodes().length);

      console.log("mode update", Globals.mode);

      nodeEnterG.append("text")
        .attr("class", "talkName")
        .style("fill", "#ffffff")
        .style("font-size", function(d) { 

          if ((l < Globals.textThreshold) && (Globals.mode == "events")) {
            return 16;
          } else {
            return 12;
          }
      
        })
        .style("font-family", "Gill Sans")
        .style("text-anchor", "middle")
        .text(function(d) { 

          if ((l < Globals.textThreshold) && (Globals.mode == "events")) {
            if ((d.name != undefined) || (d.name !== "undefined")) {
              var results = d.name.match(/\S+\s*/g);
              return  results[0] + " " + results[1] + " " + results[2] + " " + results[3] + "...";
            } else {
              return "";
            }
          } else {
            if ((d.code != undefined) || (d.code !== "undefined")) {
              return  d.code;
            } else {
              return "";
            }
          }
      
        });
      $('.talkName').show();

      nodes.selectAll("circle").attr("r", View.calculateR).each(function(d) { d.radius = View.calculateR(d) } );

      nodes.exit().remove();
      force.start();
    }


    View.addPieMenuOptions = function(theMode) {
      $("#outer_container ul.menu_option").html("");
       if(theMode !== "sessions") {
        console.log("addPieMenuOptions sessions")
         $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {type: "sessions", image: "img/sessionsPM.png" }));
       }
       if(theMode !== "map") {
        console.log("addPieMenuOptions map")
         $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {type: "map", image: "img/mapPM.png" }));
       }
       if(theMode !== "comm") {
        console.log("addPieMenuOptions comm")
         $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {type: "comm", image: "img/commsPM.png" }));
       }
    }


    View.showDetails = function (circle) {
      $("#detail_image").html(circle.video);
      $("#detail_title").html(circle.name);
      $("#detail_time").html("");
      $("#detail_thirty_words").html(circle.cbStatement);
     // $("#detail_authors").html(circle.authors.map(function(a) { return a.givenName + " " + a.familyName }));
      if(circle.keywords !== undefined){
        $("#detail_keywords").html(circle.keywords.join(", "));
      }
        
      $("#detail_base").show();
    };


    View.hideDetails = function () {
      $("#detail_base").hide();
      $("#detail_image").html("");
      $("#detail_title").html("");
      $("#detail_time").html("");
      $("#detail_thirty_words").html("");
      $("#detail_authors").html("");
      $("#detail_keywords").html("");
    }


    View.showPieMenu = function (position, listOfEvents, menuId) {
      
      $("#outer_container").css("left", position.x + "px").css("top",  position.y + "px");
      $(".menu_option li").data("circle-id", menuId);
      htmlTmpl = "";
      if(listOfEvents && listOfEvents.length > 0) {   
        _.each(_.first(listOfEvents, 5), function(obj) {
          htmlTmpl += _.template($("#event_list_item").html(), {title: obj.name.length > 27 ? obj.name.substr(0,24)+".." : obj.name, id: obj.id})          
        });        
        htmlTmpl += _.template($("#event_last_list_item").html(), {amount: listOfEvents.length})
      }
      $("#event_list").html(htmlTmpl).show().css("left", (position.x + 150) + "px").css("top",  (position.y-150) + "px");

      $("#outer_container li .pie_menu_link").on("mousedown", ClickHandler.pieMenuHandler );

      $("#event_list li").on("mousedown", ClickHandler.eventListItemClick );      
      $("#outer_container").show();


      if($("#outer_container").hasClass('active')){
        
        //setPosition(0);
        $("#outer_container").removeClass('active');
        $("#outer_container").addClass('inactive');

       }else{
        var ele_angle = [];
        var x_pos = [];
        var y_pos = [];
        $("#outer_container li").each(function(i,ele){
          ele_angle[i] = 135 + 90/(($("#outer_container li").length-1)*(i))*Math.PI/180;
          x_pos[i] = (200 * Math.sin(ele_angle[i]));
          y_pos[i] = (200 * Math.cos(ele_angle[i]));
            $(ele).css({
              'left' : y_pos[i],
              'top' : x_pos[i],
            });
        });
        //setPosition(1);
        $("#outer_container").addClass('active');
        $("#outer_container").removeClass('inactive');
      } 
      //$(this).toggleClass("btn-rotate");
    }

     

    View.addFilterHistory = function (filterHistory) {
      var toppy = 30 + ($("#filter_list li").size()*60);

      var templateVariables = {
        id: "filter_" + (filterHistory.length-1), 
        name: filterHistory[filterHistory.length-1].name 
      };
      //$(_.template($("#template_filter_item").html(), templateVariables)).css("right", d3.event.clientX).css("top", d3.event.clientY).appendTo($("body")).animate({top: toppy+ "px", right: "30px"}, 1000, function () {
        $(_.template($("#template_filter_item").html(), templateVariables)).css("right", 0).css("top", 0).appendTo($("body")).animate({top: toppy+ "px", right: "30px"}, 1000, function () {
        $(this).appendTo($("#filter_list"));
        $(this).css("position", "static");
        $(this).css("float", "left");
        $(this).css("top", null);
        $(this).css("left", null);
      });

    $(".remove_filter").on("mousedown", ClickHandler.removeFilter );
    }

    /* Decides the color of the session depending on the room */
    View.sessionsColors = function (d) {
      if (d.room === "undefined") return "#ffffff";
        return _.find(Globals.colors, function(color) { return _.contains(color.rooms, d.room) }).color
      }
      return View;
    })();
}).call(this);
