(function() {
  window.View = (function() {
    function View() {}

    // Changes the background image
    View.changeImage = function() {
      if (Globals.mode == "sessions") {
        $(".schedule_time, .schedule_day").attr("fill", "#000");
        $("#bgimg").hide();
        $("#bgimgSessions").show();
      } else {
        $("#bgimg").show();
        $("#bgimgSessions").hide();
        var opacity = 0;
        if (Globals.mode == "map") {
          image = "/img/mapLevels.svg";
          opacity = 1;
        } else {
          var image = "";
        }
        d3.select("body").select("svg").select("image").attr("xlink:href", image).attr("opacity", opacity);
      }
    };

    View.generateSessionTitle = function(d) {
      $("body").append(_.template($("#template_session_title").html(), {
        title: d
      }));
    }


    View.calculateR = function(d) {

      if (Globals.mode === "events") {
        var n = force.nodes().length;
        if (n > 100) {
          return 21;
        } else {
          var s = 0.3 * Math.sqrt((Globals.width * Globals.height) / n);
          return s;
        }
      } else if (Globals.mode === "map") {
        return 20;
      } else if (Globals.mode === "sessions") {
        return 25;
      } else {
        return 25;
      }

    }

    var countExtraFilters = function(length) {
      return length > 4 ? ' (+' + length + ')' : ''
    }

    View.updateFilterHistory = function() {
      $(".applied_filters, .no_filters").hide();
      var noFilters = true;
      if (CircleHandler.filters.sessions.length > 0) {
        var filters = _.first(_.map(CircleHandler.filters.sessions, function(ses) { return _.first(_.where(_.unique(_.flatten(_.pluck(data, "sessions"), true)), { id: ses })).code }), 4).join(", ");
        $("#right_side_filter_history #session_filters").html(filters + countExtraFilters(CircleHandler.filters.sessions.length)).parents(".applied_filters").show();
        noFilters = false;
      }

      if (CircleHandler.filters.day.length > 0) {
        $("#right_side_filter_history #day_filters").html(_.first(CircleHandler.filters.day, 4).join(", ") + countExtraFilters(CircleHandler.filters.day.length)).parents(".applied_filters").show();
        noFilters = false;
      }

      if (CircleHandler.filters.room.length > 0 || CircleHandler.filters.sessionRoom.length > 0) {


        $("#right_side_filter_history #room_filters").html(_.first(_.union(CircleHandler.filters.room, CircleHandler.filters.sessionRoom), 4).join(", ") + countExtraFilters(CircleHandler.filters.room.length + CircleHandler.filters.sessionRoom.length)).parents(".applied_filters").show();
        noFilters = false;
      }

      if (CircleHandler.filters.communities.length > 0) {
        $("#right_side_filter_history #community_filters").html(_.first(_.map(CircleHandler.filters.communities, function(c) { if (c.length > 1) { return c.join(" & ")} else { return c; }; }), 4).join(", ") + countExtraFilters(CircleHandler.filters.communities.length)).parents(".applied_filters").show();
        noFilters = false;
      }

      if (CircleHandler.filters.time.length > 0) {
        $("#right_side_filter_history #time_filters").html(_.first(_.map(CircleHandler.filters.time, function(t) {
          return t.day + " - " + t.starTime;
        }), 4).join(", ") + countExtraFilters(CircleHandler.filters.time.length)).parents(".applied_filters").show();
        noFilters = false;
      }
      if (noFilters) {
        $(".no_filters").show();
      }
      View.updateTabFilters();
      // if (Globals.mode == "sessions") {        
      //   var sel = _.pluck(force.nodes(), "selected");
      //   _.each(force.nodes(), function(node) {
      //     console.log(node.selected)
      //     if (!_.contains(sel, true) || node.selected || CircleHandler.filters.countFilters() === 0) {
      //       $("#g" + node.id + " circle").css("opacity", 1).parent().find("path").css("opacity", 1);
      //     } else {
      //       $("#g" + node.id + " circle").css("opacity", 0.3).parent().find("path").css("opacity", 0.3);
      //     }
      //   })
      // }
    }

    View.updateTabFilters = function() {
      var filteredData = CircleHandler.filterData(data, CircleHandler.filters);
      var comList = [];
      _.each(filteredData, function(node) {
        if (node.communities.length === 0) {
          node.communities = ["N/A"];
        }
        comList.push(node.communities)
      });


      $("[data-grouping=comm] div").html(_.unique(_.flatten(comList)).length + " communities");
      $("[data-grouping=events] div").html(filteredData.length + " events");
      $("[data-grouping=map] div").html(CircleHandler.groupMap(filteredData).length + " rooms");
      $("[data-grouping=sessions] div").html(CircleHandler.groupSession(filteredData).length + " sessions");
      
    }



    View.updateCircleColor = function(circle, mode) {
      // if(Globals.mode != "sessions") {
        if (circle.selected && Globals.mode != "events") {
        var color = "#ffffff";
        if (mode === "map") {
          color = "purple";
        }
        $("#g" + circle.id + " circle").css("fill", color);
        $("#g" + circle.id + " text").css("fill", "black");
      } else {
        d3.select("#g" + circle.id + " circle").style("fill", function(d, i) {
          if (d.sessions) {
            return View.sessionsColors(d.sessions[0]);
          } else {
            return View.sessionsColors(d);
          }
        })
        $("#g" + circle.id + " text").css("fill", "white");
      }

      // }
      
    };


    View.update = function() {
      var l = force.nodes().length;
      View.changeImage();
      nodes = vis.selectAll("g.circle_class").data(force.nodes(), function(d) {
        return d.id;
      })
      var nodeEnterG = nodes.enter().append("g");
      nodeEnterG.attr("id", function(d, i) {
        return "g" + d.id
      })
        .attr("class", "circle_class")

      nodeEnterG.append("path")
        .attr("class", "award")
        .attr("r", View.calculateR).each(function(d) {
        d.radius = View.calculateR(d)
      })
        .attr("d", function(d) {
        if (Globals.mode === "events") {
          if (d.award && d.award !== "") {
            console.log("rendering star");
            var str = renderStar(d);
            return str;
          }
        } else if (Globals.mode === "sessions") {
          if (d.award > 0) {
            var str = renderStar(d);
            return str;
          }
        }
        return "M 0 0 Z"; // Non-visible Path

      })
        .style("fill", function(d, i) {
        if (Globals.mode === "events") {
          if (d.award && d.award !== "") {
            return "#ffdd03";
          }
        } else if (Globals.mode === "sessions") {
          if (d.award > 0) {
            return "#ffdd03";
          }
        }
        return "#ffffff";
      })

      nodeEnterG.append("circle")
        .on("mousedown", ClickHandler.circleClicked)
        .style("fill", function(d, i) {

        if (d.sessions) {
          return View.sessionsColors(d.sessions[0]);
        } else {
          return View.sessionsColors(d);
        }

      })
        .style("stroke-width", function(d, i) {
        if (Globals.mode === "events") {
          return 2;
        } else if (Globals.mode === "sessions") {
          return 2;
        } else {
          return 0;
        }
      })
        .style("opacity", function(d) {
        if (Globals.mode === "map") {
          return 0.6;
        }
        // else if (Globals.mode === "sessions") {
        //   if (d.award > 0) {
        //     return 1.0;
        //   }
        // }
        // return 0.5;
        return 1.0;
      })
        .style("stroke", function(d) {
        if (Globals.mode === "events") {
          if (d.award && d.award !== "") {
            return "#ffdd03";
          } else if (d.type === "panel") {
            return "#000000";
          }

        } else if (Globals.mode === "sessions") {
          if (d.award > 0) {
            return "#ffdd03";
          } else if (d.type === "panel") {
            return "#000000";
          } else {
            return View.sessionsColors(d);
          }
        }
        return "#ffffff";
      })

      // .$(".logo img").attr("src", "images/logo.png");
      //.call(TUIOHandler.node_drag);
      if (Globals.mode != "events") {
        View.addPieMenuOptions(Globals.mode);

        $('#outer_container').PieMenu({
          'starting_angel': 135,
          'angel_difference': 90,
          'radius': 200,
          'menu_button': $('.circle_class'),
        });

        // TODO: move menu when circle moves
        // TODO: add circle code
        // TODO: animate disappearance
      }


      nodeEnterG.append("text")
        .attr("class", "talkName")
        .style("fill", "#ffffff")
        .style("font-size", function(d) {

        if ((l < 12) && (Globals.mode == "events")) {
          return 24;
        } else if ((l < Globals.textThreshold) && (Globals.mode == "events")) {
          return 18;
        } else  if (Globals.mode == "sessions") {
          return 18;
        } else {
          return 12;
        }

      })
        .style("font-family", "GillSans-Light")
        .style("text-anchor", "middle")
        .on("mousedown", ClickHandler.circleClicked)
        .text(function(d) {
        console.log("d.radius in text", d.radius);
        if ((d.radius > 70) && (Globals.mode == "events")) {
          if ((d.name != undefined) || (d.name !== "undefined")) {
            return d.name.length > 27 ? d.name.substr(0, 24) + "..." : d.name;
          } else {
            return d.code;
          }
        } else {
          if ((d.code != undefined) || (d.code !== "undefined")) {
            return d.code;
          } else {
            return "";
          }
        }

      });
      $('.talkName').show();

      nodes.selectAll("circle").attr("r", View.calculateR).each(function(d) {
        d.radius = View.calculateR(d)
      });

      nodes.exit().remove();
      force.start();
    }


    View.addPieMenuOptions = function(theMode) {
      $("#outer_container ul.menu_option").html("");
      if (theMode !== "sessions") {
        $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {
          type: "sessions",
          image: "img/sessionsIcon.png"
        }));
      }
      if (theMode !== "map") {
        $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {
          type: "map",
          image: "img/mapIcon.png"
        }));
      }
      if (theMode !== "comm") {
        $("#outer_container ul.menu_option").append(_.template($("#template_pie_menu_item").html(), {
          type: "comm",
          image: "img/commsIcon.png"
        }));
      }
    }

    // View.cleanDetails = function {

    // }

    View.showDetails = function(circle) {

      View.hideDetails();
      $("#detail_image").html(circle.video);
      $("#detail_title").html(circle.name);
      $("#detail_time").html("");
      $("#detail_thirty_words").html(circle.cbStatement);

      if (circle.award) {
        $("#detail_award_image").show();
        var str = circle.award;
        if (str === "Honorable Mention") {
          //$("#detail_award_image").attr("src", "img/ribbon.png");
          $("#detail_award_image").attr("src", "img/medal.png");
        } else if (str === "Best") {
          $("#detail_award_image").attr("src", "img/trophy.png");
        } else if (str === "Honorable") {
          $("#detail_award_image").attr("src", "img/medal.png");
        } else {
          $("#detail_award_image").attr("src", "");
        }
        $("#detail_award").html(str);
      } else {
        $("#detail_award_image").attr("src", "");
        $("#detail_award").html("");
      }


      $("#detail_date").html(circle.sessions[0].day + ", " + circle.sessions[0].starTime + " to " + circle.sessions[0].endTime + ", Room: " + circle.sessions[0].room);


      if (circle.authors && (circle.authors.length > 0)) {
        var str = "";
        for (var i = 0; i < circle.authors.length; i++) {
          if (i == (circle.authors.length - 1)) {
            str = str + " " + circle.authors[i].givenName + " " + circle.authors[i].familyName;
          } else {
            str = str + " " + circle.authors[i].givenName + " " + circle.authors[i].familyName + ",";
          }
        }

        $("#detail_authors").html(str);
      }

      if (circle.speaker) {
        var str = "Speaker: " + circle.speaker.name + "<br><br>" + "Type: " + circle.speaker.type;

        if (circle.speaker.title) {
          str = str + "<br><br>" + "Title: " + circle.speaker.title;
        }

        $("#detail_speaker").html(str);
      }

      // if (Globals.clcScreen) {
      if (circle.video) {
        console.log(circle.video);
        $("#detail_image_text").hide();
        $("#detail_image").show();
        $("#detail_image").attr("src", "/videos/" + circle.video);
      } else {
        console.log("hidding");
        $("#detail_image_text").show();
        $("#detail_image").hide();
      }
      // } else {
      //   $("#detail_image").attr("src", "/videos/chi0981-file5.mp4");
      // }

      // $("#detail_authors").html(circle.authors.map(function(a) { return a.givenName + " " + a.familyName }));
      if (circle.keywords.length > 0) {
        $("#detail_keywords").html("Keywords: " + circle.keywords.join(", "));
      }

      if (circle.communities.length > 0) {
        $("#detail_comms").html("Communities: " + circle.communities.join(", "));
      }

      $("#detail_background").show();
      $("#detail_close_button").on("mousedown", ClickHandler.detailCloseHandler)
      //$("#detail_background").on("mousedownoutside", ClickHandler.detailCloseHandler); // ClickHandler.detailCloseHandler
    };


    View.hideDetails = function() {
      $("#detail_background").hide();
      $("#detail_image").html("");
      $("#detail_title").html("");
      $("#detail_time").html("");
      $("#detail_thirty_words").html("");
      $("#detail_award").html("");
      $("#detail_award_image").hide();
      $("#detail_session").html("");
      $("#detail_day").html("");
      $("#detail_type").html("");
      $("#detail_location").html("");
      $("#detail_comms").html("");
      $("#detail_authors").html("");
      $("#detail_speaker").html("");
      $("#detail_keywords").html("");
      $("#detail_close_button").off("mousedown")
      $("#detail_background").off("mousedownoutside"); // ClickHandler.detailCloseHandler
    }


    View.updateEventList = function(listOfEvents) {
      if (CircleHandler.filters.countFilters() == 0) {
        $("#right_side_events").hide();
      } else {
        $("#right_side_events").show();
        if (listOfEvents.length > 0) { //  && =
        htmlTmpl = '<li style="text-align: center; font-size: 26px; background-color: #61BBDE;border-top-left-radius: 5px; color: #fff;">Selected events</li>';
        if (listOfEvents && listOfEvents.length > 0) {
          _.each(_.first(listOfEvents, 5), function(obj) {
            htmlTmpl += _.template($("#event_list_item").html(), {
              pict: (obj.award) ? ((obj.award === "Honorable") ? "img/medal.png" : (obj.award === "Best") ? "img/trophy.png" : "img/blank.png") : "img/blank.png",
              title: obj.name.length > 27 ? obj.name.substr(0, 24) + "..." : obj.name,
              id: obj.id
            })
          });
          htmlTmpl += _.template($("#event_last_list_item").html(), {
            amount: listOfEvents.length
          })
        }
        $("#right_side_events").html(htmlTmpl).show();
        $("#right_side_events li").on("mousedown", ClickHandler.eventListItemClick);
      } else {
        htmlTmpl = _.template($("#event_no_list_item").html(), {});
        $("#right_side_events").html(htmlTmpl); //.show().css("left", (position.x + 150) + "px").css("top", (position.y - 150) + "px");
      }
      }
      
    };



    /* Decides the color of the session depending on the room */
    View.sessionsColors = function(d) {
      if (d.room === "undefined") return "#ffffff";
      return _.find(Globals.colors, function(color) {
        return _.contains(color.rooms, d.room)
      }).color
    }
    return View;
  })();

  /*
   Render a regular star.
  */
  function renderStar(d) {
    var sizedata = getSVGSize();
    var svgsize = sizedata[0];
    var centrepoint = 0;
    var rrr;

    d.r = View.calculateR(d);
    rrr = d.r;

    var radiuso = rrr + 5;
    var radiusi = rrr;

    var npoints = 16;
    if ((force.nodes().length < Globals.textThreshold) && (Globals.mode === "events")) {
      npoints = 80;
      radiuso += 10;
    }

    var startx = 0;
    var starty = 0;
    var skew = 0;

    var result = "";
    var svgdata = 'M ' + centrepoint + ' ' + centrepoint + '\n';

    var baseAngle = Math.PI / npoints;
    var counter = 0;
    var oddeven = 0;
    var r = 0;
    var cmd = '';
    var x = 0;
    var y = 0;
    var yangle = 0;

    /*
       Calculate points. Skew code is buggy, so 
       skew value forced to zero.
    */
    for (i = 0; i <= Math.PI * 2; i += baseAngle) {
      if (oddeven === 0) {
        /* Start on inner radius. */
        r = radiusi;
        oddeven = 1;
        yangle = i;
      } else {
        /* Even points on outer radius. */
        r = radiuso;
        oddeven = 0;
        yangle = i + (baseAngle * skew);
      }

      if (counter == 0) {
        cmd = 'M';
      } else {
        cmd = 'L';
      }

      xresult = number_format((r * Math.sin(i)) + parseFloat(startx), 3, '.', '');
      yresult = number_format((r * Math.cos(yangle)) + parseFloat(starty), 3, '.', '');

      result += cmd + ' ' + xresult + ' ' + yresult + ' ';
      counter++;
    }

    result += "Z";
    return result;
  }

  /* Figure out window size. */

  function getSVGSize() {
    var ary = new Array(2);
    var svgsize = 300;
    if (window.innerWidth) {
      svgsize = Math.floor(window.innerWidth / 4);
    }
    ary[0] = svgsize;
    ary[1] = Math.floor(svgsize / 2);
    return (ary);
  }

  /*
     Delete an element.
  */
  function deleteElementById(fid) {
    var theelement = document.getElementById(fid);
    if (theelement) {
      theelement.parentNode.removeChild(theelement);
    }
  }


  function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }


}).call(this);