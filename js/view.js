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
        .style("opacity", function(d){
          if (Globals.mode === "events") { 
            if (d.award != undefined) {
              return 0.0;
            } else {
              return 1.0;              
            }
          } else {
            return 0.5;
          }
        })
        .style("stroke", function(d) {
          // console.log ("mode " + Globals.mode + ", " + d.award);
          // if (Globals.mode === "events") {
          //   if (d.award != undefined) {
          //     console.log ("#FF00FF");
          //     return "#FF00FF";
          //   }
          // }
          return "#ffffff";
        })
        

        nodeEnterG.append("path")
          .attr("d", function(d) {
          if (Globals.mode === "events") { 
            if (d.award != undefined) {
              // console.log("radius", d);
              // console.log("radius", d.radius);
              // var str = View.generateStar(d);
              // console.log("star ", str);
              var str = renderStar(d);
              return str;//"M 0 60 L 50 110 L 90 70 L 140 100";
              // console.log("radius", d);
              // console.log("radius", d.radius);
              // var str = View.generateStar(d.radius);
              // console.log("star ", str);
              // return str;
            }
          }
          return "";

        })
        .style("fill", function (d, i) {
           
             if(d.sessions) {
                return View.sessionsColors(d.sessions[0]);
             } else {
               //return "#000"
                return View.sessionsColors(d);
             }
        })
        // .attr("scr", function(d) {
        //   if (Globals.mode === "events") {
        //     if (d.award != undefined) {
        //       console.log ("#FF00FF");
        //       return "images/commsPM.png";
        //     }
        //   }
        //   return "";
        // })

        // .$(".logo img").attr("src", "images/logo.png");
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


      console.log(menuId)
      $("#outer_container, #event_list").show();
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


      // $(":not(#event_list li), :not(#outer_container *)").on("mousedown", function (e) {         
      //   $("#event_list li, #outer_container *").off("mousedown");
      //   $("#outer_container, #event_list").hide();
      // } );      





      if($("#outer_container").hasClass('active')){
        $("#outer_container li").each(function(i,ele){          
            $(ele).css({
              'left' : 0,
              'top' : 0,
            });
        });
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

    /*
   Render a regular star.

   To aid with debugging, I have made this function somewhat more
   stand-alone than the one for the polygons - there is no external
   generation of the points set, and pointOnCircle is not invoked, 
   but calculated inline.
  */
  function renderStar(d)
  {
    var sizedata=getSVGSize(); 
    var svgsize=sizedata[0];
    var centrepoint=0;//sizedata[1];

    console.log("sizedata", sizedata);
    console.log("svgsize", svgsize);
    console.log("centrepoint", centrepoint);

    var rrr = View.calculateR(d);
    console.log("radiussss", rrr);
    // console.log("radiussss", d.radius);

    var radiuso=rrr;
    var radiusi=rrr-5;
    var npoints=16;
    var startx=0;
    var starty=0;
    // var cssclass=document.getElementById('f-class').value;
    /*
    var skew=document.getElementById('f-skew').value;
    */
    var skew = 0;

    /*
       If any of the required fields are blank,
       set them to default values.
    */
    if (!radiuso)
    {
      radiuso=40;
      // document.getElementById('f-radiuso').value=radiuso;
    }

    if (!radiusi)
    {
      radiusi=35;
      // document.getElementById('f-radiusi').value=radiusi;
    }

    if (!npoints)
    {
      npoints=16;
      // document.getElementById('f-npoints').value=npoints;
    }

    if (!startx)
    {
      startx=centrepoint;
      // document.getElementById('f-startx').value=startx;
    }

    if (!starty)
    {
      starty=centrepoint;
      // document.getElementById('f-starty').value=starty;
    }

    var result="";
    var svgdata='M ' + centrepoint + ' ' + centrepoint + '\n';
    
    // if (cssclass.length>0)
    // {
    //   result+=' class="' + cssclass + '"';
    // }


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
    for (i = 0; i <= Math.PI * 2; i += baseAngle)
    {
      if (oddeven === 0)
      {
        /* Start on inner radius. */
        r = radiusi;
        oddeven = 1;
        yangle = i;
      }
      else
      {
        /* Even points on outer radius. */
        r = radiuso;
        oddeven = 0;
        yangle = i + (baseAngle * skew);
      }

      if (counter == 0)
      {
        cmd = 'M';
      }
      else
      {
        cmd = 'L';
      }

      xsvg = number_format( (r * Math.sin(i)) + centrepoint, 3, '.', '');
      ysvg = number_format( (r * Math.cos(yangle)) + centrepoint, 3, '.', '');

      xresult = number_format( (r * Math.sin(i)) + parseFloat(startx), 3, '.', '');
      yresult = number_format( (r * Math.cos(yangle)) + parseFloat(starty), 3, '.', '');

      result += cmd + ' ' + xresult + ' ' + yresult + ' ';
      svgdata += cmd + ' ' + xsvg + ' ' + ysvg + '\n';

      counter++;
    }

    /*
       Even numbers of points don't auto-close,
       so do a return-to-origin.
    */
    if (npoints % 2 === 0)
    {
      result += 'z\n';
      console.log ("zzzzz", result);
      return result;
      svgdata += 'z\n';
    }    

    result += '"/>\n';
   
    /* Display source. */
    document.getElementById('results').innerHTML=result;

    /* Remove any old preview, and placeholder texts. */
    deleteElementById('mysvg');
    deleteElementById('killme1');
    deleteElementById('killme2');

    var svgns='http://www.w3.org/2000/svg';
    
    /* Render SVG. */
    var wrapper=document.getElementById('svgpreview');
    var svg=document.createElementNS(svgns,'svg');
    svg.setAttribute('version','1.1');
    svg.setAttribute('width',svgsize);
    svg.setAttribute('height',svgsize);
    svg.setAttribute('id','mysvg');

    var svgtitle=document.createElementNS(svgns,'title');
    var titletext=document.createTextNode('SVG Preview Star - ' + npoints + ' Points');
    svgtitle.appendChild(titletext);

    var border=document.createElementNS(svgns,'path');
    var borderd='M 0 0 l ' + svgsize + ' 0 l 0 ' + svgsize + ' l -' + svgsize + ' 0 z';
    border.setAttribute('d',borderd);
    border.setAttribute('stroke','#FF0000');
    border.setAttribute('stroke-width','1');
    border.setAttribute('fill','none');

    /*
    var c1=document.createElementNS(svgns,'circle');
    c1.setAttribute('cx',centrepoint);
    c1.setAttribute('cy',centrepoint);
    c1.setAttribute('r',radiuso);
    c1.setAttribute('stroke','#FF0000');
    c1.setAttribute('stroke-width','1');
    c1.setAttribute('fill','none');

    var c2=document.createElementNS(svgns,'circle');
    c2.setAttribute('cx',centrepoint);
    c2.setAttribute('cy',centrepoint);
    c2.setAttribute('r',radiusi);
    c2.setAttribute('stroke','#0000FF');
    c2.setAttribute('stroke-width','1');
    c2.setAttribute('fill','none');
    */

    var path=document.createElementNS(svgns,'path');
    path.setAttribute('d',svgdata);
    path.setAttribute('stroke','#000000');
    path.setAttribute('stroke-width','1');
    path.setAttribute('fill','none');

    svg.appendChild(svgtitle);
    svg.appendChild(border);
    //svg.appendChild(c1);
    //svg.appendChild(c2);
    svg.appendChild(path);
    wrapper.appendChild(svg);
  }

  /* Figure out window size. */
  function getSVGSize()
  {
    var ary = new Array(2);
    var svgsize=300;
    if (window.innerWidth)
    {
      svgsize=Math.floor(window.innerWidth / 4);
    }
    ary[0]=svgsize;
    ary[1]=Math.floor(svgsize / 2);
    return(ary);
  }

  /*
     Read form data, generate regular-sided polygon.
  */
  function renderPolygon()
  {
    var sizedata=getSVGSize(); 
    var svgsize=1;//sizedata[0];
    var centrepoint=10;//sizedata[1];

    var radius=document.getElementById('f-radius').value;
    var npoints=document.getElementById('f-npoints').value;
    var startx=document.getElementById('f-startx').value;
    var starty=document.getElementById('f-starty').value;
    // var cssclass=document.getElementById('f-class').value;

    /*
       If any of the required fields are blank,
       set them to default values.
    */
    if (!radius)
    {
      radius=20;
      document.getElementById('f-radius').value=radius;
    }

    if (!npoints)
    {
      npoints=4;
      document.getElementById('f-npoints').value=npoints;
    }

    if (!startx)
    {
      startx=centrepoint;
      document.getElementById('f-startx').value=startx;
    }

    if (!starty)
    {
      starty=centrepoint;
      document.getElementById('f-starty').value=starty;
    }

    var points=getCirclePointSet(radius, npoints);

    var result='<pre>\n  &lt;path';
    var svgdata='M ' + centrepoint + ' ' + centrepoint + '\n';
    
    // if (cssclass.length>0)
    // {
    //   result+=' class="' + cssclass + '"';
    // }

    result+='  d="\n    M ' + startx + ' ' + starty + '\n';

    for (i=0; i<npoints; i++)
    {
      result+='    l ' + points[i][0] + ' ' + points[i][1] + '\n';
      svgdata+='    l ' + points[i][0] + ' ' + points[i][1] + '\n';
    }

    result+='    "/&gt;</pre>\n';

    /* Display source. */
    document.getElementById('results').innerHTML=result;

    /* Remove any old preview, and placeholder texts. */
    deleteElementById('mysvg');
    deleteElementById('killme1');
    deleteElementById('killme2');

    var svgns='http://www.w3.org/2000/svg';
    
    /* Render SVG. */
    var wrapper=document.getElementById('svgpreview');
    var svg=document.createElementNS(svgns,'svg');
    svg.setAttribute('version','1.1');
    svg.setAttribute('width',svgsize);
    svg.setAttribute('height',svgsize);
    svg.setAttribute('id','mysvg');

    var svgtitle=document.createElementNS(svgns,'title');
    var titletext=document.createTextNode('SVG Preview Image - ' + npoints + ' Sides');
    svgtitle.appendChild(titletext);

    var border=document.createElementNS(svgns,'path');
    var borderd='M 0 0 l ' + svgsize + ' 0 l 0 ' + svgsize + ' l -' + svgsize + ' 0 z';
    border.setAttribute('d',borderd);
    border.setAttribute('stroke','#FF0000');
    border.setAttribute('stroke-width','1');
    border.setAttribute('fill','none');

    var path=document.createElementNS(svgns,'path');
    path.setAttribute('d',svgdata);
    path.setAttribute('stroke','#000000');
    path.setAttribute('stroke-width','1');
    path.setAttribute('fill','none');

    svg.appendChild(svgtitle);
    svg.appendChild(border);
    svg.appendChild(path);
    wrapper.appendChild(svg);
  }


  /*
     Delete an element.
  */
  function deleteElementById(fid)
  {
    var theelement=document.getElementById(fid);
    if (theelement)
    {
      theelement.parentNode.removeChild(theelement);
    }
  }


  function number_format (number, decimals, dec_point, thousands_sep) {
      // http://kevin.vanzonneveld.net
      // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +     bugfix by: Michael White (http://getsprink.com)
      // +     bugfix by: Benjamin Lupton
      // +     bugfix by: Allan Jensen (http://www.winternet.no)
      // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
      // +     bugfix by: Howard Yeend
      // +    revised by: Luke Smith (http://lucassmith.name)
      // +     bugfix by: Diogo Resende
      // +     bugfix by: Rival
      // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
      // +   improved by: davook
      // +   improved by: Brett Zamir (http://brett-zamir.me)
      // +      input by: Jay Klehr
      // +   improved by: Brett Zamir (http://brett-zamir.me)
      // +      input by: Amir Habibi (http://www.residence-mixte.com/)
      // +     bugfix by: Brett Zamir (http://brett-zamir.me)
      // +   improved by: Theriault
      // +      input by: Amirouche
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // *     example 1: number_format(1234.56);
      // *     returns 1: '1,235'
      // *     example 2: number_format(1234.56, 2, ',', ' ');
      // *     returns 2: '1 234,56'
      // *     example 3: number_format(1234.5678, 2, '.', '');
      // *     returns 3: '1234.57'
      // *     example 4: number_format(67, 2, ',', '.');
      // *     returns 4: '67,00'
      // *     example 5: number_format(1000);
      // *     returns 5: '1,000'
      // *     example 6: number_format(67.311, 2);
      // *     returns 6: '67.31'
      // *     example 7: number_format(1000.55, 1);
      // *     returns 7: '1,000.6'
      // *     example 8: number_format(67000, 5, ',', '.');
      // *     returns 8: '67.000,00000'
      // *     example 9: number_format(0.9, 0);
      // *     returns 9: '1'
      // *    example 10: number_format('1.20', 2);
      // *    returns 10: '1.20'
      // *    example 11: number_format('1.20', 4);
      // *    returns 11: '1.2000'
      // *    example 12: number_format('1.2000', 3);
      // *    returns 12: '1.200'
      // *    example 13: number_format('1 000,50', 2, '.', ' ');
      // *    returns 13: '100 050.00'
      // Strip all characters but numerical ones.
      number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
      var n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
          dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
          s = '',
          toFixedFix = function (n, prec) {
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
