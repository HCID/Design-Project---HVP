var circleClicked = function (circle) {

  if (mode == "schedule") {
    mode = "free";
    var newData = filterJSON(vis.selectAll("g").data(), "day", circle["day"]);
    var newData = filterJSON(newData, "starTime", circle["starTime"]);
    force.nodes(newData);
    update();
    
    changeImage();
  } else if (mode == "map") {
    mode = "free";
    var newData = filterJSON(vis.selectAll("g").data(), "room", circle["room"]);
    force.nodes(newData);   
    update();
    changeImage();
  } else {

  }

}