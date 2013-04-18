(function() {
  window.ClickHandler = (function() {
    var circlesThreshold = 30;
    var filterHistory = [];
    function ClickHandler() {}
    /* Funtion triggered when one of the bubbles is clicked */

    ClickHandler.circleClicked = function (circle, newMode, d3event) {

      console.log("circleClicked: switch from " + Globals.mode + "  to " + newMode);

      if(newMode == "details" || Globals.mode == "events") {
        View.showDetails(circle);
      } else {
      var oldData = [], newData = [];
      ClickHandler.loadParallelData();

      if (Globals.mode == "map") { 
        var copyPD = parallelData.slice(0);
        var sessions = CircleHandler.groupSession(copyPD);
        oldData = _.reject(sessions, function (node) { return node["room"] == circle["room"]});
        newData = _.filter(sessions, function (node) { return node["room"] == circle["room"]});
      
      } else if (Globals.mode == "sessions") {
        console.log("wowo", circle);
        View.generateSessionTitle(circle.name);
        oldData = _.reject(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), circle["id"]) })
        newData = _.filter(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), circle["id"]) })          
      
      } else if (Globals.mode == "comm") {
        var list = _.map($('svg g.arc').filter(function() {
          if (pointInCirclePath($(this), Globals.vennEvent)) {
            return true;
          }
          }), function (el) { return el.id });
          if (list.length > 0) {
            if(list[0] == "general") {
              oldData = _.reject(force.nodes(), function (node) { return node.communities.length === 0 || _.every(node.communities, function (n) {  return _.indexOf(["ux", "design", "engineering"], n) !== -1 }) } );
              newData = _.filter(force.nodes(), function (node) { return node.communities.length === 0 || _.every(node.communities, function (n) {  return _.indexOf(["ux", "design", "engineering"], n) !== -1 }) } );
            } else {
              oldData = _.reject(force.nodes(), function (node) { return node.communities.length > 0 && _.difference(node.communities, list).length == 0 } );
              newData = _.filter(force.nodes(), function (node) { return node.communities.length > 0 && _.difference(node.communities, list).length == 0 } );
            }            

            //.attr("opacity", 1);   
          }         
        }
        
        if (oldData.length > 0) {
          filterHistory.push({name: Globals.mode, data: oldData});  
          View.addFilterHistory(filterHistory);  
        }  
        Globals.mode = newMode;      
        force.nodes(newData);  
        if(Globals.mode === "comm") {
          d3.selectAll("circle").style("display", "none");
            console.log("making them invisible");
          $('.talkName').hide();
          $('.legend').hide();
          ClickHandler.loadParallelData();
          Communities.communities();
        } else {
          d3.selectAll("circle").style("display", "block");
          force.nodes(newData); 
          main(); 
          // View.update();  
        }
        
        
      } 
    };


    /* closes the detail view */ 
    ClickHandler.detailCloseHandler = function (e) {
      View.hideDetails();
      e.stopPropagation();
    }


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