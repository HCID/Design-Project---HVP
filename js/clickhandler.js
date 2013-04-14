/* Funtion triggered when one of the bubbles is clicked */
var circleClicked = function (circle) {
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
    } else if (mode == "map") { 
      var oldData = _.reject(force.nodes(), function (node) {return node["room"] == circle["room"]});
      var newData = _.where(force.nodes(), {room: circle["room"]} );
    } else if (mode == "sessions") {
      generateSessionTitle(circle.name);
      var oldData = _.reject(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), circle["id"]) })
      var newData = _.filter(force.nodes(), function (node) { return _.contains(_.pluck(node.sessions, "id"), circle["id"]) })  
    }
      filterHistory.push({name: mode, data: oldData});   
      mode = "free";
      force.nodes(newData);  
      update();    
      changeImage();
      addFilterHistory();    
  } 
}


/* closes the detail view */ 
var detailCloseHandler = function () {
  $("#detail_base").hide();
  $("#detail_image").html("");
  $("#detail_title").html("");
  $("#detail_time").html("");
  $("#detail_thirty_words").html("");
  $("#detail_authors").html("");
  $("#detail_keywords").html("");
}



/* Returns the circle intersection classes */
var vennClick = function (e, d, f, g) {

  var array = [];
  //TODO: FI
  $list = $('svg g.arc').filter(function() {

    var bbox = $(this).get(0).getBBox();
    if (pointInCirclePath($(this), d3.event)) {
      array.push($(this).get(0).id);
    }
  });

  if (array.length > 0) {
    filterHistory.push({name: "comm", data: filterJSON(force.nodes(), "communities", array, true)});
    var newData = filterJSON(force.nodes(), "communities", array);
    mode = "free"; 
    force.nodes(newData);
    d3.selectAll("circle").attr("opacity", 1); 
    update();    
    changeImage();
    addFilterHistory();
  }
}

/* Funtion triggered when one of the menu buttons is clicked */
var menuHandler = function () {
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
