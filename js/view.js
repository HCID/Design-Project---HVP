(function() {
  window.View = (function() {
    function View() {}

    // Changes the background image
    View.changeImage = function() {


      // if (Globals.mode == "sessions") {

      //   $("#bgimg").hide();
      //   $("#bgimgMap").hide();
      //   $("#bgimgSessions").show();

      // } else if (Globals.mode == "map") {
      //   $("#bgimgSessions").hide();
      //   $("#bgimg").hide();
      //   $("#bgimgMap").show();
      //   // image = "/img/mapLevels.svg";
      //   // opacity = 1;
      // } else {
      //   $("#bgimgMap").hide();
      //   $("#bgimg").show();
      //   var opacity = 0;
      //   var image = "";
      //   d3.select("body").select("svg").select("image").attr("xlink:href", image).attr("opacity", opacity);
      // }

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

    // View.generateLegend = function () {
    //   var items = [];
    //   _.each(Globals.colors, function(item, key) {
    //           items.push(_.template($("#template_legend_item").html(), {color: item.color, name: key }));
    //    });  // close each()
    //    $(".types").html( items.join("") );
    // }


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
          var s = 0.2 * Math.sqrt((Globals.width * Globals.height) / n);
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



    View.updateCircleColor = function(circle, mode) {
      if (circle.selected) {
        var color = "#ffffff";
        if(mode === "map") {
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

        if ((l < Globals.textThreshold) && (Globals.mode == "events")) {
          return 16;
        } else if (Globals.mode == "sessions") {
          return 18;
        } else {
          return 12;
        }

      })
        .style("font-family", "GillSans-Light")
        .style("text-anchor", "middle")
        .on("mousedown", ClickHandler.circleClicked)
        .text(function(d) {

        if ((l < Globals.textThreshold) && (Globals.mode == "events")) {
          if ((d.name != undefined) || (d.name !== "undefined")) {
            return d.name.length > 27 ? d.name.substr(0, 24) + "..." : d.name;
          } else {
            return "";
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


      $("#detail_date").html(circle.sessions[0].day + ", " + circle.sessions[0].starTime + " to " + circle.sessions[0].endTime +", Room: " + circle.sessions[0].room);


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

      if (Globals.clcScreen) {
        $("#detail_image").attr("src", "/videos/" + circle.video);
      } else {
        $("#detail_image").attr("src", "/videos/chi0981-file5.mp4");
      }

      // $("#detail_authors").html(circle.authors.map(function(a) { return a.givenName + " " + a.familyName }));
      if (circle.keywords.length > 0) {
        $("#detail_keywords").html("Keywords: " + circle.keywords.join(", "));
      }

      if (circle.communities.length > 0) {
        $("#detail_comms").html("Communities: " + circle.communities.join(", "));
      }

      $("#detail_background").show();
      $("#detail_close_button").on("mousedown", ClickHandler.detailCloseHandler)
      $("#detail_background").on("mousedownoutside", ClickHandler.detailCloseHandler); // ClickHandler.detailCloseHandler
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


    View.showPieMenu = function(position, listOfEvents, menuId) {
      if (listOfEvents.length > 0) {
        //$("#outer_container, #event_list").show();

        var DIS = 70;

        //$("#outer_container").css("left", position.x + "px").css("top", position.y + "px");

        // console.log("Globals.width - (position.x + 280)", Globals.width - (position.x + 280));
        // if (Globals.width - (position.x + 280) > 100) {
        //   $("#event_list").css("left", position.x + DIS + 50 + "px")
        // } else {
        //   var newX = position.x - 280;
        //   $("#event_list").css("left", newX - (DIS) + "px")
        // }

        // var numEvents = listOfEvents.length < 5 ? listOfEvents.length : 5;

        // if ((Globals.height - ((position.y) + (49 * (numEvents + 1)))) > 10) {
        //   console.log("fits");
        //   $("#event_list").css("top", position.y - 100 + "px");

        // } else {
        //   console.log("doesn't fit");
        //   $("#event_list").css("top", (position.y + (Globals.height - (position.y + (49 * (numEvents + 2)))) + "px"));
        // }
        // if (menuId != undefined) {
        //   $(".menu_option li").data("circle-id", menuId);
        // }

        htmlTmpl = "";
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


        // $("#event_list li, #outer_container li *").off("mousedown");
        // $("#outer_container li .pie_menu_link").on("mousedown", ClickHandler.pieMenuHandler);


        $("#right_side_events li").on("mousedown", ClickHandler.eventListItemClick);


        // $("#outer_container li").each(function(i, ele) {

        //   var newY = i == 0 ? -120 : 30;

        //   $(ele).show();
        //   $(ele).css({
        //     'left': -25 + "px",
        //     'top': newY + "px",
        //   });
        // });
        // //setPosition(1);
        // $("#outer_container").addClass('active');
        // $("#outer_container").removeClass('inactive');

      } else {
        // $("#outer_container").hide();
        // $("#event_list").show();
        htmlTmpl = _.template($("#event_no_list_item").html(), {});
        $("#right_side_events").html(htmlTmpl).show().css("left", (position.x + 150) + "px").css("top", (position.y - 150) + "px");
      }
      //$(this).toggleClass("btn-rotate");
      // $("#outer_container li .pie_menu_link, #event_list li, #detail_background, .schedule_time, .schedule_day").on("mousedownoutside", function() {
      //   $("#outer_container li").each(function(i, ele) {
      //     $(ele).css({
      //       'left': 0,
      //       'top': 0,
      //     });
      //     $(ele).hide();
      //     force.start();
      //     $("#outer_container").removeClass('active');
      //     $("#outer_container").addClass('inactive');
      //   });
      //   $("#outer_container, #event_list").hide();
      //   $("#event_list li, #outer_container li *").off("mousedown");
      //   $("#outer_container li .pie_menu_link, #event_list li").off("mousedownoutside");
      //})
    }


    View.addFilterHistory = function(filterHistory) {
      var toppy = 30 + ($("#filter_list li").size() * 60);

      var templateVariables = {
        id: "filter_" + (filterHistory.length - 1),
        name: filterHistory[filterHistory.length - 1].name
      };
      //$(_.template($("#template_filter_item").html(), templateVariables)).css("right", d3.event.clientX).css("top", d3.event.clientY).appendTo($("body")).animate({top: toppy+ "px", right: "30px"}, 1000, function () {

      var newItem = $(_.template($("#template_filter_item").html(), templateVariables)).css("right", 0).css("top", 0).appendTo($("body"));
      newItem.animate({
        top: toppy + "px",
        right: "30px"
      }, 1000, function() {
        $(this).appendTo($("#filter_list"));
        $(this).css("position", "static");
        $(this).css("float", "left");
        $(this).css("top", null);
        $(this).css("left", null);

      });

      $(".remove_filter").on("mousedown", ClickHandler.removeFilter);
    }

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