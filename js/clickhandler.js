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
  } else {

  }
}