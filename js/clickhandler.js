var circleClicked = function (circle) {
  
  if (mode == "schedule") {
    filterHistory.push({name: mode, data: filterJSON(vis.selectAll("g").data(), "day", circle["day"], true)});   
    mode = "free";   
    var newData = filterJSON(vis.selectAll("g").data(), "day", circle["day"]);
    var newData = filterJSON(newData, "starTime", circle["starTime"]);
    force.nodes(newData);
    update();    
    changeImage();
    addFilterHistory();
  } else if (mode == "map") {
    filterHistory.push({name: mode, data: filterJSON(vis.selectAll("g").data(), "room", circle["room"], true)});
    mode = "free";    
    var newData = filterJSON(vis.selectAll("g").data(), "room", circle["room"]);
    force.nodes(newData);   
    update();    
    changeImage();
    addFilterHistory();
  } else if (mode == "comm") {
    mode = "comm";
    communities();
  } else {

  }
}


var menuHandler = function () {

    if ($(this).data("grouping") == "comm") {
      mode = "comm";
      communities();
    } else if (parseInt($(this).data("grouping")) === 4) {
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