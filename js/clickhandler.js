(function() {
  window.ClickHandler = (function() {
    var circlesThreshold = 30;

    function ClickHandler() {}


    ClickHandler.listOfEvents = [];
    ClickHandler.listOfOldEvents = [];


    ClickHandler.eventListItemClick = function(e) {
      e.stopPropagation();
      if ($(e.currentTarget).hasClass("event_item")) {
        View.showDetails(_.find(ClickHandler.listOfEvents, function(node) {
          return node.id == $(e.currentTarget).data("event-id")
        }));
      } else if ($(e.currentTarget).hasClass("show_all_events")) {
        prepareAndAddFilter(Globals.mode, ClickHandler.listOfOldEvents);
        Globals.mode = "events";
        d3.selectAll("circle").style("display", "block");
        force.nodes(ClickHandler.listOfEvents);
        main();
        $("#outer_container, #event_list").hide();
        $("#event_list li").off("mousedown");
      }

    }



    ClickHandler.selectDayRange = function (e) {
      e.stopPropagation()
      var day = $(e.currentTarget).data("day");
      
      $(".schedule_time, .schedule_day").attr("fill", "#000");
      $("[data-day=" + day +"]" ).attr("fill", "red");
      $(e.currentTarget).attr("fill", "red");
      console.log(".schedule_time.schedule_" + day.toLowerCase())

       ClickHandler.listOfOldEvents = {
         title: day,
        data: _.reject(parallelData, function(node) {          
          return _.contains(_.pluck(node.sessions, "day"), day);
        })
       };
      ClickHandler.listOfEvents = _.filter(parallelData, function(node) {
        return _.contains(_.pluck(node.sessions, "day"), day);
      });
      d3.selectAll("circle").style("fill", function(d, i) {

        if (d.sessions) {
          return View.sessionsColors(d.sessions[0]);
        } else {
          return View.sessionsColors(d);
        }

      })
 
      _.each(force.nodes(), function (node) {
        
        if(node.day == day) {
          console.log(node.id)
          $("#g" + node.id + " circle").css("fill", "white");
          $("#g" + node.id + " text").css("fill", "black");
        }        
      });

      View.showPieMenu({x: e.pageX, y: e.pageY}, _.sortBy(ClickHandler.listOfEvents, function(event) {
          return event.award ? 1 : -1;
        }));

    };    


    ClickHandler.selectTimeRange = function (e) {
      e.stopPropagation()
      var day = $(e.currentTarget).data("day");
      var start = $(e.currentTarget).data("start");
      var wholeDay = $(e.currentTarget).text();

      
      $(".schedule_time, .schedule_day").attr("fill", "#000");
      $(e.currentTarget).attr("fill", "red");
       //View.generateSessionTitle(circle.name);

       ClickHandler.listOfOldEvents = {
         title: day + " " + wholeDay ,
        data: _.reject(parallelData, function(node) {          
          return _.contains(_.pluck(node.sessions, "day"), day) && _.contains(_.pluck(node.sessions, "starTime"), start);
        })
       };
      ClickHandler.listOfEvents = _.filter(parallelData, function(node) {
        return _.contains(_.pluck(node.sessions, "day"), day) && _.contains(_.pluck(node.sessions, "starTime"), start);
      });
      d3.selectAll("circle").style("fill", function(d, i) {

        if (d.sessions) {
          return View.sessionsColors(d.sessions[0]);
        } else {
          return View.sessionsColors(d);
        }

      })
 
      _.each(force.nodes(), function (node) {
        
        if(node.day == day && node.starTime == start) {
          console.log(node.id)
          $("#g" + node.id + " circle").css("fill", "white");
          $("#g" + node.id + " text").css("fill", "black");
        }        
      });
      View.showPieMenu({x: e.pageX, y: e.pageY}, _.sortBy(ClickHandler.listOfEvents, function(event) {
          return event.award ? 1 : -1;
        }));

    };


    /* Funtion triggered when one of the bubbles is clicked */

    ClickHandler.circleClicked = function(circle) {


      d3.event.stopPropagation()
      console.log(d3.event)

      if (Globals.mode === "events") {
        View.showDetails(circle);
      } else {
        var menuId = "";
        if (Globals.mode === "comm") {
          var position = {
            x: d3.event.offsetX-20,
            y: d3.event.offsetY+40+ Globals.topMargin
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
          //var copyPD = parallelData.slice(0);
          //var sessions = CircleHandler.groupSession(copyPD);
          //ClickHandler.loadParallelData();

          ClickHandler.listOfOldEvents = {
            title: circle["room"],
            data: _.reject(parallelData, function(node) {
              return node.sessions[0]["room"] == circle["room"]
            })
          };
          ClickHandler.listOfEvents.push(_.filter(parallelData, function(node) {
            return node.sessions[0]["room"] == circle["room"]
          }));

        } else if (Globals.mode == "sessions") {
          View.generateSessionTitle(circle.name);

          ClickHandler.listOfOldEvents = {
            title: circle["code"],
            data: _.reject(parallelData, function(node) {
              return _.contains(_.pluck(node.sessions, "id"), circle["id"])
            })
          };
          ClickHandler.listOfEvents.push(_.filter(parallelData, function(node) {
            return _.contains(_.pluck(node.sessions, "id"), circle["id"])
          }));

        } else if (Globals.mode == "comm") {

          var list = _.map($('svg g.arc').filter(function(b, a) {
            if (pointInCirclePath($(a), d3.event)) {
              return true;
            }
          }), function(el) {
            return el.id
          });

          var filterFor = "";

          var filterFor;
          _.each(list, function(item) {
            filterFor += item + ", ";
          })
          console.log("list", list);

          if (list[0] == "general") {
            ClickHandler.listOfOldEvents = {
              title: filterFor,
              data: _.reject(force.nodes(), function(node) {
                return node.communities.length === 0 || _.every(node.communities, function(n) {
                  return _.indexOf(["ux", "design", "engineering"], n) !== -1
                })
              })
            };
            ClickHandler.listOfEvents.push(_.filter(force.nodes(), function(node) {
              return node.communities.length === 0 || _.every(node.communities, function(n) {
                return _.indexOf(["ux", "design", "engineering"], n) !== -1
              })
            }));
          } else {
            ClickHandler.listOfOldEvents = {
              title: filterFor,
              data: _.reject(force.nodes(), function(node) {
                return ClickHandler.filterCommunitieClick(list, node.communities);
              })
            };            
            ClickHandler.listOfEvents.push(_.filter(force.nodes(), function(node) {              
              return ClickHandler.filterCommunitieClick(list, node.communities);
            }));
          }

          //.attr("opacity", 1);   
        }


        View.highlightCircle(circle.id);
        /* 
          position is an array containg [x, y] 
          list of events if a list of max 5 events
        */
        // View.showPieMenu(position, _.sortBy(ClickHandler.listOfEvents, function(event) {
        //   return event.award
        // }), menuId);
        
  

        //        CircleHandler.filterData(circle, newMode, d3event);  
      }

    };



    ClickHandler.filterCommunitieClick = function(list, communities) {
      return (communities.length > 0 && _.difference(communities, list).length == 0 && _.difference(list, communities).length == 0) || (list.length == 1 && list[0] === "N/A" && communities.length === 0)
    }


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
      d3.selectAll("circle").style("display", "block");
      d3.selectAll("path.award").style("display", "block");;
      $('.talkName').show();
      $('.legend').show();

      switch(Globals.mode)
      {
      case "comm":
        $(".comButton").fadeTo('fast', 0, function(){
            $(this).css('background-image', 'url(/img/tab1blue.png)');
        }).fadeTo('fast', 0.5);
        break;
      case "events":
        $(".eventsButton").fadeTo('fast', 0, function(){
            $(this).css('background-image', 'url(/img/tab2blue.png)');
        }).fadeTo('fast', 0.5);
        break;
      case "map":
        $(".mapButton").fadeTo('fast', 0, function(){
            $(this).css('background-image', 'url(/img/tab3blue.png)');
        }).fadeTo('fast', 0.5);
        break;
      case "sessions":
        $(".sessionButton").fadeTo('fast', 0, function(){
            $(this).css('background-image', 'url(/img/tab4blue.png)');
        }).fadeTo('fast', 0.5);
      }


      d3.selectAll("g.arc").remove();

      if ($(this).find("button").data("grouping") == "comm") {
        $(".comButton").fadeTo('fast', 0.3, function(){
            $(this).css('background-image', 'url(/img/tab1gray.png)');
        }).fadeTo('fast', 0.5);
        Globals.mode = "comm";
        d3.selectAll("circle").style("display", "none");
        d3.selectAll("path.award").style("display", "none");;
        $('.talkName').hide();
        $('.legend').hide();
        force.nodes(ClickHandler.listOfEvents)
        ClickHandler.loadParallelData();
        Communities.communities();

      } else if ($(this).find("button").data("grouping") == "events") {
        $(".eventsButton").fadeTo('fast', 0.3, function(){
            $(this).css('background-image', 'url(/img/tab2gray.png)');
        }).fadeTo('fast', 0.5);
        ClickHandler.loadParallelData();
        Globals.mode = "events";
        main(ClickHandler.listOfEvents);
      } else if ($(this).find("button").data("grouping") == "map") {
        $(".mapButton").fadeTo('fast', 0.3, function(){
            $(this).css('background-image', 'url(/img/tab3gray.png)');
        }).fadeTo('fast', 0.5);
        ClickHandler.loadParallelData();
        Globals.mode = "map";
        main(ClickHandler.listOfEvents);
      } else if ($(this).find("button").data("grouping") == "restart") {
        filterHistory = [];
        restart();
      } else if ($(this).find("button").data("grouping") == "sessions") {

        $(".sessionButton").fadeTo('fast', 0.3, function(){
            $(this).css('background-image', 'url(/img/tab4gray.png)');
        }).fadeTo('fast', 0.5);
        $('.legend').hide();
        ClickHandler.loadParallelData();
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
    var pointInCirclePath = function(b, ev) {


      var cX = parseFloat(b.attr("transform").split(",")[0].split("(")[1]);
      var cY = parseFloat(b.attr("transform").split(",")[1].split(")")[0])+Globals.topMargin;
      var radius = b.get(0).getBBox().height / 2;
      //distance between two points

      var xs = Math.pow(cX - ev.pageX, 2);

      var ys = Math.pow(cY - ev.pageY, 2);
      console.log(cY - ev.pageY)
      var distance = Math.sqrt(xs + ys);

      return (distance <= radius);
    }

    ClickHandler.removeFilter = function() {
      var id = $(this).parent().attr("id").substring(7, $(this).parent().attr("id").length);
      $(this).parent().remove();
      console.log("bef",force.nodes()[0].code)
      if (filterHistory[id]) {
        ClickHandler.loadParallelData();
        console.log("par", force.nodes().length)
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