/* Funtion triggered when one of the bubbles is clicked */
var circleClicked = function (circle) {
  if (mode == "schedule") {
    force.nodes(parallelData);
    parallelData = [];
    filterHistory.push({name: mode, data: filterJSON(force.nodes(), "day", circle["day"], true)});   
    mode = "free";   
    var newData = filterJSON(force.nodes(), "day", circle["day"]);
    var newData = filterJSON(newData, "starTime", circle["starTime"]);
    force.nodes(newData);
    update();    
    changeImage();
    addFilterHistory();
  } else if (mode == "map") {
    force.nodes(parallelData);
    parallelData = [];
    filterHistory.push({name: mode, data: filterJSON(force.nodes(), "room", circle["room"], true)});
    mode = "free";    
    var newData = filterJSON(force.nodes(), "room", circle["room"]);
    force.nodes(newData);   
    update();    
    changeImage();
    addFilterHistory();
  } else {

  }
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
    console.log("nodes in intersection", newData);
    console.log("nodes in intersection parallelData", parallelData);    
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