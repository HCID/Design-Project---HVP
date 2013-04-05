var filterHistory = [];
var circleClicked = function (circle) {
  filterHistory.push({name: mode, data: filterJSON(vis.selectAll("g").data(), "day", circle["day"], true)});
  if (mode == "schedule") {
    var newData = filterJSON(vis.selectAll("g").data(), "day", circle["day"]);
    var newData = filterJSON(newData, "starTime", circle["starTime"]);
    force.nodes(newData);
    update();
    mode = "free";
    changeImage();
  } else if (mode == "map") {
    var newData = filterJSON(vis.selectAll("g").data(), "room", circle["room"]);
    force.nodes(newData);   
    update();
    mode = "free";
    changeImage();
  } else {

  }

  var toppy = 30 + ($("#filter_list li").size()*60);


  $("<li class='new_filter' id='filter_"+(filterHistory.length-1)+"' style='width: 200px; margin-top: 10px; list-style: none; height: 50px; background-color: red;  position: absolute; z-index: 100; border-radius: 10px; right: "+d3.event.clientX+"px; top: "+d3.event.clientY+"px;'><div class='remove_filter'>x</div>"+filterHistory[filterHistory.length-1].name+"</li>").appendTo($("body")).animate({top: toppy+ "px", right: "30px"}, 1000, function () {
    $(this).appendTo($("#filter_list"));
    $(this).css("position", "static");
    $(this).css("float", "left");
    $(this).css("top", null);
    $(this).css("left", null);
  });

$(".remove_filter").on("mousedown", function () {
  var id = $(this).parent().attr("id").substring(7,$(this).parent().attr("id").length);
  console.log(filterHistory[id].data);
  $(this).parent().remove();
  _.forEach(filterHistory[id].data, function(d) {
    force.nodes().push(d);
  });
  
  update();
});

}