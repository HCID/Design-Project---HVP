/* Funtion triggered when one of the bubbles is clicked */
var circleClicked = function (circle) {
  if (mode == "schedule") {
    loadParallelData();
    filterHistory.push({name: mode, data: filterJSON(force.nodes(), "day", circle["day"], true)});   
    mode = "free";   
    var newData = filterJSON(force.nodes(), "day", circle["day"]);
    var newData = filterJSON(newData, "starTime", circle["starTime"]);
    force.nodes(newData);
    update();    
    changeImage();
    addFilterHistory();
  } else if (mode == "map") {
    loadParallelData();
    filterHistory.push({name: mode, data: filterJSON(force.nodes(), "room", circle["room"], true)});
    mode = "free";    
    var newData = filterJSON(force.nodes(), "room", circle["room"]);
    force.nodes(newData);   
    console.log(circle)
    //if(circle)
    $("#detail_base").show();
    update();    
    changeImage();
    addFilterHistory();
  } else if (mode == "sessions") {
    loadParallelData();
    filterHistory.push({name: mode, data: filterJSON(force.nodes(), "room", circle["room"], true)});
    mode = "free";    
    var newData = filterJSON(force.nodes(), "room", circle["session"].id);
    force.nodes(newData);   
    update();    
    changeImage();
    addFilterHistory();
  } else {
    if(force.nodes().length > 11) {
      $("#detail_base").show();
      $("#detail_image").html(circle.video);
      $("#detail_title").html(circle.name);
      $("#detail_time").html("");
      $("#detail_thirty_words").html(circle.cbStatement);
     // $("#detail_authors").html(circle.authors.map(function(a) { return a.givenName + " " + a.familyName }));
      $("#detail_keywords").html(circle.keywords.join(", "));
    } 
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
    mode = "free"; 
    var newData = filterJSON(force.nodes(), "communities", array);
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
