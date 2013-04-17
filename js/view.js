(function() {
  window.View = (function() {
    function View() {} 
    var differentTypes = ["altchi", "casestudy", "course", "panel", "paper", "SIG", "TOCHI"] ;
    /* Colors */
    var colors = {
      bordeaux: {
        color: "#98343c", // 152 52 60
        rooms: ["bordeaux", "342a", "343", "361", "362/363"]
      },  
      havane: { 
        color: "#d3783c", // 211 120 60
        rooms: ["havane", "351", "352ab"] 
      }, 
      bleu: {
        color: "#1b5576", // 27 85 118
        rooms: ["blue", "241", "242ab", "242a", "242b", "243"]
      }, 
      green: {
        color: "#265e30", // 38 94 48
        rooms: ["251", "252a", "252b", "253"]
      },
      interact: { 
        color: "#61447a", // 97 68 122
        rooms: []
      },
      chi: {
        color: "#2a276d", // 42 39 109
        rooms: []
      },
      grand: {
        color: "#f1d32e", // 241 211 46
        rooms: ["grand"]
      }
    }




    // Changes the background image
    View.changeImage = function () {
      var image = "";
      var opacity = 0;
      if (mode == "schedule") {
            image = "/img/schedule.svg";
            opacity = 1;
      } else if (mode == "map") {
            image = "/img/mapLevels.png";
            opacity = 1;
      } else if (mode == "sessions") {
          image = "/img/sessions.png";
          opacity = 1;
      } 
      d3.select("body").select("svg").select("image").attr("xlink:href", image).attr("opacity", opacity);
    };

    View.generateLegend = function () {
      var items = [];
      _.each(colors, function(item, key) {
              items.push(_.template($("#template_legend_item").html(), {color: item.color, name: key }));
       });  // close each()
       $(".types").html( items.join("") );
    }


    View.generateSessionTitle = function (d) {
      console.log(" title append");
      $("body").append(_.template($("#template_session_title").html(), {title: d}));
    }


    View.calculateR = function (d) {
  
      if(mode === "free"){
        var n = force.nodes().length;
        if (n >100) {
          return 21;
        } else {
          var s = 0.2 * Math.sqrt((width*height)/n);
          return s;
        }
      } else if ((mode === "schedule") || (mode === "map")) {
        return d.radius;
      } else if (mode === "sessions") {
        return 25;
      } else {
        return 25;
      } 

    }
    
    


    View.update = function () {
      View.changeImage();
      nodes = vis.selectAll("g").data(force.nodes(), function(d){ return d.id;} )
      var nodeEnterG = nodes.enter().append("g");
      nodeEnterG.attr("id", function(d, i){return "g" + d.id})
        .attr("class", "circle_class")
        .append("circle")
       // .on("mousedown", ClickHandler.circleClicked )
        .style("fill", function (d, i) {
           if (mode === "events") { 
             if(d.sessions) {
                 return View.sessionsColors(d.sessions[0]);
             } else {
               return View.sessionsColors(d);
             }
           } else{
               return View.sessionsColors(d);
             }
        })
        .style("stroke-width", function (d, i) {
          if (mode === "events") { 
              return 1;
          } else{
              return 0;
          }
        })
        .style("opacity", function(){
          if (mode === "events") { 
              return 1.0;
          } else{
              return 0.5;
          }
        })
        .style("stroke", "#ffffff")
        //.call(TUIOHandler.node_drag);
       $("#outer_container ul.menu_option").html("");
       if(mode != "sessions") {
         $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {type: "sessions", name: "Sessions" }));
       }
       if(mode != "events") {
         $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {type: "events", name: "Events" }));
       } else {
         $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {type: "details", name: "Details" }));
       }
       if(mode != "map") {
         $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {type: "map", name: "Map" }));
       }
       if(mode != "comm") {
         $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {type: "comm", name: "Communities" }));
       }
        
      $('#outer_container').PieMenu({
    		'starting_angel': 0,
    		'angel_difference' : 180,
    		'radius': 60,      
        'menu_button' : $('.circle_class'),
    	});
      
      // TODO: move menu when circle moves
      // TODO: add circle code
      // TODO: add icons
      // TODO: animate disappearance
      
      $("*").on("mousedown", function (e) {
        if($(e.currentTarget).hasClass("pie_menu_link")) {
          ClickHandler.circleClicked(d3.select("#g" + $(e.currentTarget).parent("li").data("circle-id")).data(), $(this).data("mode"));
          $("#outer_container").hide();
        } else {
          
        }
       
      })


        console.log("force.nodes().length: " + force.nodes().length);

        nodeEnterG.append("text")
          .attr("class", "talkName")
          .style("fill", "#ffffff")
          .style("font-family", "Gill Sans")
          .style("text-anchor", "middle")
          .text(function(d) { 
            if((d.code != undefined) || (d.code !== "undefined")){
              return  d.code;
            } else {
              return "K";
            }
      
        });
        $('.talkName').show();

      nodes.selectAll("circle").attr("r", View.calculateR).each(function(d) { d.radius = View.calculateR(d) } );


      nodes.exit().remove();
      force.start();
      

    }
    View.showDetails = function (circle) {
      $("#detail_image").html(circle.video);
      $("#detail_title").html(circle.name);
      $("#detail_time").html("");
      $("#detail_thirty_words").html(circle.cbStatement);
     // $("#detail_authors").html(circle.authors.map(function(a) { return a.givenName + " " + a.familyName }));
      $("#detail_keywords").html(circle.keywords.join(", "));
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
      return _.find(colors, function(color) { return _.contains(color.rooms, d.room) }).color
    }
    return View;
  })();
}).call(this);
