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

/* Funtion triggered when one of the menu buttons is clicked */
var menuHandler = function () {
  d3.selectAll("circle").attr("opacity", 1)
    if ($(this).data("grouping") == "comm") {
      mode = "comm";
      d3.selectAll("circle").attr("opacity", 0)
      communities();
    } else if ($(this).data("grouping") == "schedule") {
      mode = "schedule";
      main();
    } else if($(this).data("grouping") == "map"){
      mode = "map";
      main();
    } else if($(this).data("grouping") == "restart"){
      restart();
    }
    changeImage();
};