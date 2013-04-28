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
        Globals.mode = "events";
        d3.selectAll("circle").style("display", "block");
        force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
        main();
        $("#outer_container, #event_list").hide();
        $("#event_list li").off("mousedown");
      }
    };

    ClickHandler.firstRoomOnPage = true;

    ClickHandler.selectRoomRange = function(e) {
      if (ClickHandler.firstRoomOnPage) {
        CircleHandler.filters.room = [];
        CircleHandler.filters.sessionRoom = [];
        ClickHandler.firstRoomOnPage = false;
      }
      e.stopPropagation();
      var room = $(e.currentTarget).data("room") + "";
      if (!_.find(force.nodes(), function(oldEvents) {
        if (oldEvents.room == room && !oldEvents.selected) {
          return true;
        }
      })) {



        $("[data-room='" + room + "']").attr("fill", "black");
        $(e.currentTarget).attr("fill", "black");

        _.each(force.nodes(), function(node) {
          if (node.room == room) {
            node.selected = false;
            View.updateCircleColor(node)
          }
          if (room === "242ab" && (node.room == "242a" || node.room == "242b")) {
            node.selected = false;
            View.updateCircleColor(node)
          }
        });

        CircleHandler.filters.sessionRoom = _.reject(CircleHandler.filters.sessionRoom, function(d) {
          return (d === room) || (room == "242ab" && (d == "242a" || d == "242b"))
        });
      } else {
        $("[data-room='" + room + "']").attr("fill", "red");
        $(e.currentTarget).attr("fill", "red");
        CircleHandler.filters.sessionRoom.push(room);
        if (room === "242ab") {
          CircleHandler.filters.sessionRoom.push("242a");
          CircleHandler.filters.sessionRoom.push("242b");
        }

        _.each(force.nodes(), function(node) {
          if (node.room == room) {
            node.selected = true;
            View.updateCircleColor(node)
          }
          if (room === "242ab" && (node.room == "242a" || node.room == "242b")) {
            node.selected = true;
            View.updateCircleColor(node)
          }
        });
      }

      ClickHandler.updateFilters();
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
      ClickHandler.updateFilters();

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

      ClickHandler.updateFilters();
    };


    /* Funtion triggered when one of the bubbles is clicked */

    ClickHandler.circleClicked = function(circle) {

      if (!ClickHandler.selected) {
        ClickHandler.listOfEvents = [];
        ClickHandler.selected = true;
      }
      if (Globals.mode !== "comm") {
        if (circle.selected) {
          circle.selected = false;
        } else {
          circle.selected = true;
        }
        View.updateCircleColor(circle, Globals.mode);
      }



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

        }



        if (Globals.mode == "map") {
          if (ClickHandler.firstRoomOnPage) {
            CircleHandler.filters.room = [];
            CircleHandler.filters.sessionRoom = [];
            ClickHandler.firstRoomOnPage = false;
          }
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



          var exludeList = _.difference(_.map($('svg g.arc'), function(el) {
            return el.id
          }), list);

          $pathList = _.map(list, function(b) {
            var radius = $("#" + b).get(0).getBBox().height / 2;
            var cX = parseFloat($("#" + b).attr("transform").split(",")[0].split("(")[1]);
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
          var superList2 = [];
          var xList = [];
          var yList = [];
          for (var y = 0; y < Globals.height; y++) {
            superList[y] = [];
            for (var x = 0; x < Globals.width; x++) {
              superList[y][x] = false;


              if ($pathList.length > 0) {
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
                  superList2.push({
                    x: x,
                    y: y
                  });
                }
              }

            }
          }
          var megaList = [];
          _.each(superList2, function(pos, y) {

            if ((superList[pos.y - 1] && superList[pos.y - 1][pos.x] === false) || (superList[pos.y + 1] && superList[pos.y + 1][pos.x] === false) || (superList[pos.y] && superList[pos.y][pos.x - 1] === false) || (superList[pos.y] && superList[pos.y][pos.x + 1] === false)) {
              megaList.push([pos.x, pos.y]);
            }
          });

          var d = ""
          var first = true;
          var patrikvar = "";
          _.each(megaList, function(coord) {
            if (first) {
              d = "M" + coord[0] + " " + coord[1];
              first = false;
            } else {
              d += "L" + coord[0] + " " + coord[1];
            }
          });



          d3.select("#mainSvg").append("path").attr("class", "comm_overlay").attr("d", d).attr("id", "overlay_" + list.join("_")).attr("fill", "transparent").attr("stroke", "black").style("stroke-opacity", 0.2).attr("stroke-witdh", "1").on("mousedown", ClickHandler.commOverLayHandler);
          $("#overlay_" + list.join("_")).data("filter", list);

          var filterFor = "";

          var filterFor;
          _.each(list, function(item) {
            filterFor += item + ", ";
          })



          CircleHandler.filters.communities.push(list)
          CircleHandler.filters.communities = _.unique(_.flatten(CircleHandler.filters.communities));



        }

        ClickHandler.updateFilters();

      }

    };



    ClickHandler.commOverLayHandler = function(d) {
      var other = _.map($(".comm_overlay"), function(a) {
        if ($(a).attr("id") !== $(d3.event.target).attr("id")) {
          return $(a).data("filter");
        }

      });
      var remove = _.difference($(d3.event.target).data("filter"), _.compact(_.flatten(other)));
      CircleHandler.filters.communities = _.reject(CircleHandler.filters.communities, function(com) {
        if (_.contains(remove, com)) {
          return true;
        }
      })

      d3.event.target.remove();
      ClickHandler.updateFilters();
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
      }
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
        force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
        Communities.communities();

      } else if ($(this).find("button").data("grouping") == "events") {
        $(".eventsButton").fadeTo('fast', 0.3, function() {
          $(this).css('background-image', 'url(/img/tab2gray.png)');
        }).fadeTo('fast', 1);
        force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
        Globals.mode = "events";
        main();
      } else if ($(this).find("button").data("grouping") == "map") {
        $(".mapButton").fadeTo('fast', 0.3, function() {
          $(this).css('background-image', 'url(/img/tab3gray.png)');
        }).fadeTo('fast', 1);
        force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
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
        force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
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

    ClickHandler.removeFilterHandler = function(e) {
      e.stopPropagation();
      switch ($(e.currentTarget).data("rm-type")) {
        case 'sessions':
          if (Globals.mode === "sessions") {
            _.each(force.nodes(), function(node) {
              if (_.contains(CircleHandler.filters.sessions, node.id)) {
                node.selected = false;
                View.updateCircleColor(node)
              }
            })
          }
          CircleHandler.filters.sessions = [];
          break;
        case 'room':
          if (Globals.mode === "room") {
            _.each(force.nodes(), function(node) {
              if (_.contains(CircleHandler.filters.room, node.room)) {
                node.selected = false;
                View.updateCircleColor(node)
              }
            })
          }
          CircleHandler.filters.room = [];
          CircleHandler.filters.sessionRoom = [];
          break;
        case 'day':
          if (Globals.mode === "sessions") {
            _.each(force.nodes(), function(node) {
              if (_.contains(CircleHandler.filters.day, node.day)) {
                node.selected = false;
                View.updateCircleColor(node)
              }
            })
          }
          CircleHandler.filters.day = [];
          break;
        case 'time':
          if (Globals.mode === "sessions") {
            _.each(force.nodes(), function(node) {
              _.each(CircleHandler.filters.day, function(f) {
                if (_.contains(_.pluck(node.sessions, "day"), f.day) && _.contains(_.pluck(node.sessions, "starTime"), f.starTime)) {
                  node.selected = false;
                  View.updateCircleColor(node)
                }
              })
            })
          }
          CircleHandler.filters.time = [];
          break;
        case 'communities':
          $(".comm_overlay").remove();
          CircleHandler.filters.communities = [];
          break;
      }
      force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
      ClickHandler.updateFilters();

      if (Globals.mode === "comm") {
        Communities.communities();
      } else {

        if (Globals.mode === "events") {
          d3.selectAll("path.award").remove();
          d3.selectAll("text.talkName").remove();
        }

        main();
      }
    }

    ClickHandler.updateFilters = function() {
      var failedDays = [];
      _.each(CircleHandler.filters.day, function(day) {
        _.each(force.nodes(), function(node) {
          if (node.day === day && !node.selected) {
            failedDays.push(day)
          }
        });
      });
      failedDays = _.unique(failedDays);
      _.each(failedDays, function(day) {
        CircleHandler.filters.day = _.reject(CircleHandler.filters.day, function(d) {
          return d === day
        });
        $(".schedule_day[data-day='" + day + "']").attr("fill", "black");
        CircleHandler.filters.time.push({
          day: day,
          starTime: "9:00"
        }, {
          day: day,
          starTime: "11:00"
        }, {
          day: day,
          starTime: "14:00"
        }, {
          day: day,
          starTime: "16:00"
        });
      });

      var failedRooms = [];
      _.each(CircleHandler.filters.sessionRoom, function(room) {
        _.each(force.nodes(), function(node) {
          if (node.room === room && !node.selected) {
            failedRooms.push(room)
          }
        });
      });
      failedRooms = _.unique(failedRooms);
      _.each(failedRooms, function(room) {
        CircleHandler.filters.sessionRoom = _.reject(CircleHandler.filters.sessionRoom, function(d) {
          console.log(room, d, d === room)
          return d === room
        });
        $("[data-room='" + room + "']").attr("fill", "black");
        _.each(force.nodes(), function(node) {
          if (node.room == room && node.selected) {
            CircleHandler.filters.sessions.push(node.id);
          }
        });

      });

      var failedTime = [];
      var stillSelected = [];

      _.each(CircleHandler.filters.time, function(time) {
        stillSelected[time.day + "-" + time.starTime] = [];
        _.each(force.nodes(), function(node) {
          if (node.day === time.day && node.starTime === time.starTime && !node.selected) {
            failedTime.push({
              day: time.day,
              starTime: time.starTime
            });
          } else if (node.day === time.day && node.starTime === time.starTime && node.selected) {
            stillSelected[time.day + "-" + time.starTime].push(node);
          }
        });
      });
      failedTime = _.unique(failedTime);

      _.each(failedTime, function(time) {
        CircleHandler.filters.time = _.reject(CircleHandler.filters.time, function(d) {
          return d.day === time.day && d.starTime === time.starTime;
        });
        $("[data-day='" + time.day + "'][data-start='" + time.starTime + "']").attr("fill", "black");
        _.each(stillSelected[time.day + "-" + time.starTime], function(sel) {
          CircleHandler.filters.sessions.push(sel.id);
        });

      });
      CircleHandler.filters.sessions = _.unique(CircleHandler.filters.sessions);


      _.each(_.difference(["Monday", "Tuesday", "Wednesday", "Thursday"], CircleHandler.filters.day), function(day) {
        _.each(_.difference(["9:00", "11:00", "14:00", "16:00"], _.pluck(_.where(CircleHandler.filters.time, {
          day: day
        }), "starTime")), function(time) {
          var theNodes = [];
          var failedTime = false;
          _.each(force.nodes(), function(node) {
            if (node.starTime == time && node.day == day) {
              theNodes.push(node.id);
              if (!node.selected) {
                failedTime = true;
              }
            }
          })
          if (theNodes.length > 0 && !failedTime) {
            CircleHandler.filters.sessions = _.difference(CircleHandler.filters.sessions, theNodes);
            CircleHandler.filters.time.push({
              day: day,
              starTime: time
            });
            $("[data-day='" + day + "'][data-start='" + time + "']").attr("fill", "red");
          }
        });
        var theTimes = [];
        _.each(CircleHandler.filters.time, function(time) {
          if (time.day == day) {
            theTimes.push(time);
          }
        });
        if (theTimes.length === 4) {
          CircleHandler.filters.time = _.reject(CircleHandler.filters.time, function(t) {
            return t.day === day
          });
          CircleHandler.filters.day.push(day);
          $("[data-day='" + day + "']").attr("fill", "red");
        }
      });
      _.each(_.difference($(".scedule_room").map(function() {
        return $(this).data("room") + ""
      }).toArray(), CircleHandler.filters.sessionRoom), function(room) {
        var theNodes = [];
        var failedRoom = false;
        _.each(force.nodes(), function(node) {
          if (node.room == room) {
            theNodes.push(node.id);
            if (!node.selected) {
              failedRoom = true;
            }
          }
        })
        if (theNodes.length > 0 && !failedRoom) {
          CircleHandler.filters.sessions = _.difference(CircleHandler.filters.sessions, theNodes);
          CircleHandler.filters.sessionRoom.push(room);
          $("[data-start='" + room + "']").attr("fill", "red");
        }
      });



      View.updateFilterHistory();
      View.updateEventList(CircleHandler.filterData(data, CircleHandler.filters));
    }

    ClickHandler.selectFilters = function(e) {
      e.stopPropagation();
      if (Globals.mode === "sessions") {
        switch ($(e.currentTarget).data("select-type")) {
          case 'sessions':
            _.each(force.nodes(), function(node) {
              if (_.contains(CircleHandler.filters.sessions, node.id)) {
                node.selected = true;
                View.updateCircleColor(node)
              }
            })
            break;
          case 'room':
            _.each(force.nodes(), function(node) {
              if (_.contains(CircleHandler.filters.sessionRoom, node.room)) {
                node.selected = true;
                View.updateCircleColor(node)
                $("[data-room='" + node.room + "']").attr("fill", "red");
              }
            })
            break;
          case 'day':
            _.each(force.nodes(), function(node) {
              if (_.contains(CircleHandler.filters.day, node.day)) {
                node.selected = true;
                View.updateCircleColor(node)
                $("[data-day='" + node.day + "']").attr("fill", "red");
              }
            })
            break;
          case 'time':
            _.each(force.nodes(), function(node) {
              var pass = false;
              _.each(CircleHandler.filters.time, function(time) {
                if (time.day == node.day && time.starTime == node.starTime) {
                  pass = true;
                }
              });
              if (pass) {
                node.selected = true;
                View.updateCircleColor(node)
                $("[data-day='" + node.day + "'][data-start='" + node.starTime + "']").attr("fill", "red");
              }
            })
            break;
        }
      }
    }

    ClickHandler.restart = function() {    
      CircleHandler.filters.sessions = [];
      CircleHandler.filters.day = [];
      CircleHandler.filters.time = [];
      CircleHandler.filters.room = [];
      CircleHandler.filters.sessionRoom = [];
      CircleHandler.filters.communities = [];
      force.nodes(CircleHandler.filterData(data, CircleHandler.filters));
      if (Globals.mode === "comm") {
        Communities.communities();
      } else {
        main()
      }
    }

 
    return ClickHandler;
  })();
}).call(this);