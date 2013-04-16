(function() {
  window.ClickHandler = (function() {
    var circlesThreshold = 30;
    var filterHistory = [];
    function ClickHandler() {}
    /* Funtion triggered when one of the bubbles is clicked */
    ClickHandler.circleClicked = function (circle) {
      if(mode == "free") {
        if(force.nodes().length < circlesThreshold) {
          $("#detail_base").show();
          $("#detail_image").html(circle.video);
          $("#detail_title").html(circle.name);
          $("#detail_time").html("");
          $("#detail_thirty_words").html(circle.cbStatement);
         // $("#detail_authors").html(circle.authors.map(function(a) { return a.givenName + " " + a.familyName }));
          $("#detail_keywords").html(circle.keywords.join(", "));
        }
      } else {
        var oldData = [], newData = [];
        loadParallelData();
        if (mode == "schedule") {
          oldData = _.reject(force.nodes(), function (node) {return node["day"] == circle["day"]})
          newData = _.where( _.where(force.nodes(), { day: circle["day"] } ), { starTime: circle["starTime"] } );
          mode = "free";
        } else if (mode == "map") { 
          var copyPD = parallelData.slice(0);
          var sessions = groupSession(copyPD);
          oldData = _.reject(sessions, function (node) { return node["room"] == circle["room"]});
          newData = _.filter(sessions, function (node) { return node["room"] == circle["room"]});
          console.dir(newData);
        } else if (mode == "sessions") {
          View.generateSessionTitle(circle.name);
          oldData = _.reject(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), circle["id"]) })
          newData = _.filter(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), circle["id"]) })  
        } else if (mode == "comm") {
          var list = _.map($('svg g.arc').filter(function() {
            if (pointInCirclePath($(this), d3.event)) {
              return true;
            }
          }), function (el) { return el.id });
          if (list.length > 0) {
            if(_.contains(list, "general")) {
              list = _.reject(list.concat(["ux", "design", "engineering"]), function (li) { return li === "general"} );
            } 
            oldData = _.reject(force.nodes(), function (node) { return _.intersection(node.communities, list).length === list.length } );
            newData = _.filter(force.nodes(), function (node) { return _.intersection(node.communities, list).length === list.length } );
            d3.selectAll("circle").attr("opacity", 1);   
          }         
        }
        if (oldData.length > 0) {
          filterHistory.push({name: mode, data: oldData});  
          View.addFilterHistory(filterHistory);  
        }  
        mode = "free";
        force.nodes(newData);  
        View.update();        
      } 
    }


    /* closes the detail view */ 
    ClickHandler.detailCloseHandler = function () {
      $("#detail_base").hide();
      $("#detail_image").html("");
      $("#detail_title").html("");
      $("#detail_time").html("");
      $("#detail_thirty_words").html("");
      $("#detail_authors").html("");
      $("#detail_keywords").html("");
    }


    /* Funtion triggered when one of the menu buttons is clicked */
    ClickHandler.menuHandler = function () {
      d3.selectAll("circle").attr("opacity", 1);
      $('.talkName').show();
      $('.legend').show();
      
      if ($(this).data("grouping") == "comm") {
        mode = "comm";
        d3.selectAll("circle").attr("opacity", 0);
        $('.talkName').hide();
        $('.legend').hide();
        loadParallelData();
        communities();
      } else if ($(this).data("grouping") == "schedule") {
        loadParallelData();
        mode = "schedule";
        main();
      } else if($(this).data("grouping") == "map"){
        loadParallelData();
        mode = "map";
        main();
      } else if($(this).data("grouping") == "restart"){
        filterHistory = [];
        restart();
      } else if($(this).data("grouping") == "sessions"){
        $('.legend').hide();
        loadParallelData();
        mode = "sessions";
        main();
      }
    };

    /* Load */
    var loadParallelData = function () {
      if (parallelData.length > 0) {
        force.nodes(parallelData);
        parallelData = [];
      }
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