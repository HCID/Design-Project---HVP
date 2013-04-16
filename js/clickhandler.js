(function() {
  window.ClickHandler = (function() {
    function ClickHandler() {}
    /* Funtion triggered when one of the bubbles is clicked */
    ClickHandler.circleClicked = function (circle) {
      if(mode == "free" && force.nodes().length < circlesThreshold) {
        $("#detail_base").show();
        $("#detail_image").html(circle.video);
        $("#detail_title").html(circle.name);
        $("#detail_time").html("");
        $("#detail_thirty_words").html(circle.cbStatement);
       // $("#detail_authors").html(circle.authors.map(function(a) { return a.givenName + " " + a.familyName }));
        $("#detail_keywords").html(circle.keywords.join(", "));
      } else if(mode == "schedule" || mode == "map" || mode == "sessions") {
        loadParallelData();
        if (mode == "schedule") {
          var oldData = _.reject(force.nodes(), function (node) {return node["day"] == circle["day"]})
          var newData = _.where( _.where(force.nodes(), { day: circle["day"] } ), { starTime: circle["starTime"] } );
          mode = "free";
        } else if (mode == "map") { 

          console.log("FILTERING NOW");
          var copyPD = parallelData.slice(0);
          var sessions = groupSession(copyPD);
          var oldData = _.reject(sessions, function (node) { return node["room"] == circle["room"]});
          var newData = _.filter(sessions, function (node) { return node["room"] == circle["room"]});
          console.dir(newData);
        } else if (mode == "sessions") {
          generateSessionTitle(circle.name);
          var oldData = _.reject(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), circle["id"]) })
          var newData = _.filter(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), circle["id"]) })  
        } 
        if (oldData.length > 0) {
          filterHistory.push({name: mode, data: oldData});  
          addFilterHistory();  
        }  
        mode = "free";
        force.nodes(newData);  
        update();    
        changeImage();
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



    /* Returns the circle intersection classes */
    ClickHandler.vennClick = function (e, d, f, g) {

      var array = [];
      //TODO: FI
      var $list = $('svg g.arc').filter(function() {

        var bbox = $(this).get(0).getBBox();
        if (pointInCirclePath($(this), d3.event)) {
          array.push($(this).get(0).id);
        }
      });

      if (array.length > 0) {
        if(filterJSON(force.nodes(), "communities", array, true).length > 0) {      
          filterHistory.push({name: "comm", data: filterJSON(force.nodes(), "communities", array, true)});
          addFilterHistory();
        }
        var newData = filterJSON(force.nodes(), "communities", array);
        mode = "free"; 
        force.nodes(newData);
        d3.selectAll("circle").attr("opacity", 1); 
        update();    
        changeImage();
      }
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
        restart();
      } else if($(this).data("grouping") == "sessions"){
        $('.legend').hide();
        loadParallelData();
        mode = "sessions";
        main();
      }
      changeImage();
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
      update();
    };
  return ClickHandler;
  })();
}).call(this);