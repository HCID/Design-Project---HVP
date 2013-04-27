(function() {
  window.ClickHandler = (function() {
    var circlesThreshold = 30;

    function ClickHandler() {}

    ClickHandler.selected = false;
    ClickHandler.listOfEvents = [];
    ClickHandler.listOfOldEvents = [];


    ClickHandler.eventListItemClick = function(e) {
      e.stopPropagation();
      if ($(e.currentTarget).hasClass("event_item")) {       
        View.showDetails(_.find(data, function(node) {
          return node.id == $(e.currentTarget).data("event-id")
        }));
      } else if ($(e.currentTarget).hasClass("show_all_events")) {
        //prepareAndAddFilter(Globals.mode, ClickHandler.listOfOldEvents);
        Globals.mode = "events";
        d3.selectAll("circle").style("display", "block");
        force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
        main();
        $("#outer_container, #event_list").hide();
        $("#event_list li").off("mousedown");
      }
    }


    ClickHandler.selectDayRange = function(e) {
      if (!ClickHandler.selected) {
        ClickHandler.listOfEvents = [];
        ClickHandler.selected = true;
      }

      e.stopPropagation()
      var day = $(e.currentTarget).data("day");

      if (!_.find(force.nodes(), function(oldEvents) {
        if (oldEvents.day == day && !oldEvents.selected) {
          return true;
        }
      })) {
        $("[data-day=" + day + "]").attr("fill", "black");
        $(e.currentTarget).attr("fill", "black");

        _.each(force.nodes(), function(node) {
          if (node.day == day) {
            node.selected = false;
            View.updateCircleColor(node)
          }
        });

        CircleHandler.filters.day = _.reject(CircleHandler.filters.day, function(d) {
          return d === day
        });
      } else {

        $("[data-day=" + day + "]").attr("fill", "red");
        $(e.currentTarget).attr("fill", "red");
        CircleHandler.filters.day.push(day);
        _.each(force.nodes(), function(node) {
          if (node.day == day) {
            node.selected = true;
            View.updateCircleColor(node)
          }
        });
      }
      View.updateFilterHistory();
      View.updateEventList(CircleHandler.filterData(data, CircleHandler.filters));

    };

    ClickHandler.selectTimeRange = function(e) {
      if (!ClickHandler.selected) {
        ClickHandler.listOfEvents = [];
        ClickHandler.selected = true;
      }

      e.stopPropagation()
      var day = $(e.currentTarget).data("day");
      var start = $(e.currentTarget).data("start");
      var wholeDay = $(e.currentTarget).text();


      if (!_.find(force.nodes(), function(oldEvents) {
        
        if (oldEvents.day == day && oldEvents.starTime == start && !oldEvents.selected) {          
          return true;
        }
      })) {


        $(e.currentTarget).attr("fill", "black");

        _.each(force.nodes(), function(node) {
          if (node.day == day && node.starTime == start) {
            node.selected = false;
            View.updateCircleColor(node)
          }
        });


        CircleHandler.filters.time = _.reject(CircleHandler.filters.time, function(d) {
          return d.day === day && d.starTime == start
        });


      } else {
        $(e.currentTarget).attr("fill", "red");
        CircleHandler.filters.time.push({
          day: day,
          starTime: start
        });
        _.each(force.nodes(), function(node) {
          
          if (node.day == day && node.starTime == start) {
            node.selected = true;
            View.updateCircleColor(node)
          }
        });
      }

      View.updateEventList(CircleHandler.filterData(data, CircleHandler.filters));
      View.updateFilterHistory();
    };


    /* Funtion triggered when one of the bubbles is clicked */

    ClickHandler.circleClicked = function(circle) {

      if (!ClickHandler.selected) {
        ClickHandler.listOfEvents = [];
        ClickHandler.selected = true;
      }

      if (circle.selected) {
        circle.selected = false;
      } else {
        circle.selected = true;
      }
      View.updateCircleColor(circle, Globals.mode);


      d3.event.stopPropagation()
      

      if (Globals.mode === "events") {
        View.showDetails(circle);
      } else {
        var menuId = "";
        if (Globals.mode === "comm") {
          var position = {
            x: d3.event.offsetX - 20,
            y: d3.event.offsetY + 40 + Globals.topMargin
          };
        } else {
          menuId = circle.id;
          var position = {
            x: circle.x - circle.radius + 8,
            y: circle.y + circle.radius + 8 + Globals.topMargin
          };
          //$(".menu_button").css("background-color", $(this).find("circle").css("fill")).css("width", (data.radius*2)+"px").css("height", (data.radius*2)+"px").text(data.code );       

        }


        //ClickHandler.loadParallelData();


        if (Globals.mode == "map") {
          if (circle.selected) {
            CircleHandler.filters.room.push(circle.room);
          } else {
            CircleHandler.filters.room = _.reject(CircleHandler.filters.room, function(f) {
              return f === circle.room
            });
          }
        } else if (Globals.mode == "sessions") {
          if (circle.selected) {
            CircleHandler.filters.sessions.push(circle.id);
          } else {
            CircleHandler.filters.sessions = _.reject(CircleHandler.filters.sessions, function(f) {
              return f === circle.id
            });
          }
        } else if (Globals.mode == "comm") {
          
         

          var list = _.map($('svg g.arc').filter(function(b, a) {
            var radius = $(a).get(0).getBBox().height / 2;
            var cX = parseFloat($(a).attr("transform").split(",")[0].split("(")[1]);
            var cY = parseFloat($(a).attr("transform").split(",")[1].split(")")[0]);
            var pX = d3.event.offsetX
            var pY = d3.event.offsetY;
            
            //d3.select("#mainSvg").append("line").attr("x1", 0).attr("y1", 0).attr("x1", cX).attr("y1", cY).attr("stroke", "blue").attr("stroke-with", "2").style("z-index", 9999);
            //d3.select("#mainSvg").append("line").attr("x1", 0).attr("y1", 0).attr("x1", pX).attr("y1", pY).attr("stroke", "green").attr("stroke-with", "2").style("z-index", 9999);
            


            if (pointInCirclePath(cX, cY, radius, pX, pY)) {
              return true;
            }
          }), function(el) {
            return el.id
          });






          var exludeList = _.difference(_.map($('svg g.arc'), function(el) { return el.id }), list);
          
          console.log("include: ", list)
          console.log("exclude: ", exludeList)
          $pathList = _.map(list, function(b) {
            var radius = $("#" + b).get(0).getBBox().height / 2;
            var cX = parseFloat($("#" + b).attr("transform").split(",")[0].split("(")[1]) ;
            var cY = parseFloat($("#" + b).attr("transform").split(",")[1].split(")")[0]);

            return [cX, cY, radius];
          });


          var corExludeList = _.map(exludeList, function(b) {
            var radius = $("#" + b).get(0).getBBox().height / 2;
            var cX = parseFloat($("#" + b).attr("transform").split(",")[0].split("(")[1]);
            var cY = parseFloat($("#" + b).attr("transform").split(",")[1].split(")")[0]);

            return [cX, cY, radius];
          });


          var superList = [];
          var xList = [];
          var yList = [];
          for (var y = 0; y < Globals.height; y++) {
            superList[y] = [];
            for (var x = 0; x < Globals.width; x++) {
              superList[y][x] = false;

              
              if($pathList.length > 0) {
                var checker = true;
                 _.each($pathList, function(c) {
                  if (!pointInCirclePath(c[0], c[1], c[2], x, y)) {
                    checker = false;
                  }
                });

                _.each(corExludeList, function(c) {
                  if (pointInCirclePath(c[0], c[1], c[2], x, y)) {
                    checker = false;
                  }
                });

                 
              if (checker) {
                superList[y][x] = true;
              }
              }
             
            }
          }

          var megaList = [];

          _.each(superList, function(yRow, y) {
            _.each(yRow, function(xRow, x) {
              if (xRow && ((!yRow[x - 1] || !yRow[x + 1]) || (!xRow[y-1] || !xRow[y+1])) ) {
                megaList.push([x, y]);
              }
            })
          });



          //         $("svg").append('<g class="arc" transform="translate(0,0)" id="management" idPx="465.0813620239828"><path fill="#7f7f7f" opacity="0.5" id="management" d="M0,114.12486891177014A114.12486891177014,114.12486891177014 0 1,1 0,-114.12486891177014A114.12486891177014,114.12486891177014 0 1,1 0,114.12486891177014Z"></path><text text-anchor="middle" style="font-size: 40px; font-family: GillSans-Light;" stroke-size="1" fill="#7f7f7f" stroke="#7f7f7f" x="-34.89285815434488" y="-8.475033418850842">management</text></g>')
          // d="M0,114.12486891177014A114.12486891177014,114.12486891177014 0 1,1 0,-114.12486891177014A114.12486891177014,114.12486891177014 0 1,1 0,114.12486891177014Z"
          var d = ""
          var first = true;
          var patrikvar = "";
          _.each(megaList, function(coord) {
            //patrikvar += " (" + coord[0] + "," + coord[1] + ")";
            if (first) {
              d = "M" + coord[0] + " " + coord[1];
              first = false;
            } else {
              d += "L" + coord[0] + " " + coord[1];
            }
          });
          

          // <path d="M530 245L529 246L531 246Z" stroke="red" stroke-width="2" fill="none"></path>


          d3.select("#mainSvg").append("path").attr("class", "comm_overlay").attr("d", d).attr("fill", "transparent").attr("stroke", "red").attr("stroke-with", "1");
          

          var filterFor = "";

          var filterFor;
          _.each(list, function(item) {
            filterFor += item + ", ";
          })
          

          if (list[0] == "general") {
            ClickHandler.listOfOldEvents.push({
              title: filterFor,
              data: _.reject(force.nodes(), function(node) {
                return node.communities.length === 0 || _.every(node.communities, function(n) {
                  return _.indexOf(["ux", "design", "engineering"], n) !== -1
                })
              })
            });
            ClickHandler.listOfEvents.push(_.filter(force.nodes(), function(node) {
              return node.communities.length === 0 || _.every(node.communities, function(n) {
                return _.indexOf(["ux", "design", "engineering"], n) !== -1
              })
            }));
          } else {
            // ClickHandler.listOfOldEvents.push({
            //   title: filterFor,
            //   data: _.reject(force.nodes(), function(node) {
            //     return ClickHandler.filterCommunitieClick(list, node.communities);
            //   })
            // });
            // ClickHandler.listOfEvents.push(_.filter(force.nodes(), function(node) {
            //   return ClickHandler.filterCommunitieClick(list, node.communities);
            // }));

              CircleHandler.filters.communities.push(list)
              CircleHandler.filters.communities = _.unique(_.flatten(CircleHandler.filters.communities));
            
    


            
          }

          //.attr("opacity", 1);   
        }

        View.updateEventList(CircleHandler.filterData(data, CircleHandler.filters));
        View.updateFilterHistory();

      }

    };



 


    /* closes the detail view */
    ClickHandler.detailCloseHandler = function(e) {
      View.hideDetails();
      e.stopPropagation();
    }



    var prepareAndAddFilter = function(mode, oldEvents) {
      if (oldEvents.data.length > 0) {
        filterHistory.push({
          mode: mode,
          name: Globals.humanReadableMode[mode] + " = " + oldEvents.title,
          data: oldEvents.data
        });
        View.addFilterHistory(filterHistory);
      }
    };



    ClickHandler.pieMenuHandler = function(e, f) {
      var newMode = $(e.currentTarget).data("mode");

      prepareAndAddFilter(Globals.mode, ClickHandler.listOfOldEvents);
      Globals.mode = newMode;
      force.nodes(ClickHandler.listOfEvents);

      if (Globals.mode === "comm") {
        d3.selectAll("circle").style("display", "none");
        d3.selectAll("path.award").style("display", "none");
        $('.talkName').hide();
        $('.legend').hide();
        //ClickHandler.loadParallelData();
        force.nodes(ClickHandler.listOfEvents)
        Communities.communities();
      } else {
        d3.selectAll("circle").style("display", "block");
        d3.selectAll("path.award").style("display", "block");
        force.nodes(ClickHandler.listOfEvents);
        main();
        // View.update();  
      }
      $("#outer_container, #event_list").hide();

      e.stopPropagation();
    };


    /* Funtion triggered when one of the menu buttons is clicked */
    ClickHandler.menuHandler = function() {
      ClickHandler.selected = false;
      d3.selectAll("circle").style("display", "block");
      d3.selectAll("path.award").style("display", "block");;
      $('.talkName').show();
      $('.legend').show();

      switch (Globals.mode) {
        case "comm":
          $(".comButton").fadeTo('fast', 0, function() {
            $(this).css('background-image', 'url(/img/tab1blue.png)');
          }).fadeTo('fast', 1);
          break;
        case "events":
          $(".eventsButton").fadeTo('fast', 0, function() {
            $(this).css('background-image', 'url(/img/tab2blue.png)');
          }).fadeTo('fast', 1);
          break;
        case "map":
          $(".mapButton").fadeTo('fast', 0, function() {
            $(this).css('background-image', 'url(/img/tab3blue.png)');
          }).fadeTo('fast', 1);
          break;
        case "sessions":
          $(".sessionButton").fadeTo('fast', 0, function() {
            $(this).css('background-image', 'url(/img/tab4blue.png)');
          }).fadeTo('fast', 1);
      }


      d3.selectAll("g.arc").remove();

      if ($(this).find("button").data("grouping") == "comm") {
        $(".comButton").fadeTo('fast', 0.3, function() {
          $(this).css('background-image', 'url(/img/tab1gray.png)');
        }).fadeTo('fast', 1);
        Globals.mode = "comm";
        d3.selectAll("circle").style("display", "none");
        d3.selectAll("path.award").style("display", "none");;
        $('.talkName').hide();
        $('.legend').hide();
        //force.nodes(_.flatten(ClickHandler.listOfEvents, true))
        force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
        //ClickHandler.loadParallelData();
        Communities.communities();

      } else if ($(this).find("button").data("grouping") == "events") {
        $(".eventsButton").fadeTo('fast', 0.3, function() {
          $(this).css('background-image', 'url(/img/tab2gray.png)');
        }).fadeTo('fast', 1);
        //force.nodes(_.flatten(ClickHandler.listOfEvents, true))
        force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
        
        // console.log(ClickHandler.listOfEvents)
        // console.log(force.nodes());
        //force.nodes(ClickHandler.listOfEvents)
        //console.log(force.nodes())
        //ClickHandler.loadParallelData();
        Globals.mode = "events";
        main();
      } else if ($(this).find("button").data("grouping") == "map") {
        $(".mapButton").fadeTo('fast', 0.3, function() {
          $(this).css('background-image', 'url(/img/tab3gray.png)');
        }).fadeTo('fast', 1);
        //ClickHandler.loadParallelData();
        force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
        //force.nodes(_.flatten(ClickHandler.listOfEvents, true))
        Globals.mode = "map";
        main();
      } else if ($(this).find("button").data("grouping") == "restart") {
        filterHistory = [];
        restart();
      } else if ($(this).find("button").data("grouping") == "sessions") {

        $(".sessionButton").fadeTo('fast', 0.3, function() {
          $(this).css('background-image', 'url(/img/tab4gray.png)');
        }).fadeTo('fast', 1);
        $('.legend').hide();
        //force.nodes(_.flatten(ClickHandler.listOfEvents, true))
        force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
        
        //ClickHandler.loadParallelData();
        Globals.mode = "sessions";
        main(ClickHandler.listOfEvents);
      }
    };

    /* Load */
    ClickHandler.loadParallelData = function() {
      if (parallelData.length > 0) {
        force.nodes(parallelData);
        parallelData = [];
      }
    }

    /* Tells if a point is inside a circle path or not */
    var pointInCirclePath = function(cX, cY, r, x, y) {


      //distance between two points

      var xs = Math.pow(cX - x, 2);

      var ys = Math.pow(cY - y, 2);

      var distance = Math.sqrt(xs + ys);

      return (distance <= r);
    }

    ClickHandler.removeFilter = function() {
      var id = $(this).parent().attr("id").substring(7, $(this).parent().attr("id").length);
      $(this).parent().remove();
      
      if (filterHistory[id]) {
        ClickHandler.loadParallelData();
        
        _.forEach(filterHistory[id].data, function(d) {
          force.nodes().push(d);
        });
      }
      if (Globals.mode === "map") {
        var array = CircleHandler.groupMap();
        parallelData = force.nodes().slice(0);
        force.nodes(array);
      } else if (Globals.mode === "sessions") {
        var array = CircleHandler.groupSession();
        parallelData = force.nodes().slice(0);
        force.nodes(array);
      }
      delete filterHistory[id];
      d3.selectAll("path.award").remove();
      if (Globals.mode === "comm") {
        Communities.communities();
      } else {
        View.update();
      }

    };
    return ClickHandler;
  })();
}).call(this);