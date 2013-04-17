var vis;
var data = [],
    rScale = d3.scale.sqrt().range([0, 15]),
    fill = d3.scale.category20(),
    fill2 = d3.scale.category10(),
    mode = "sessions"; // {sessions, events, comm, map}
var force = d3.layout.force()
      .links([])
      .gravity(0)
      .size([width, height])
      .charge(0)
      .on("tick", tick);

var main = function (fociUsed) {

  vis = d3.select("body").select("svg");
  if (mode === "schedule") {
    var array = groupSchedule();
    parallelData = force.nodes().slice(0);
    force.nodes(array);
  } else if (mode === "map") {
    var array = groupMap();
    parallelData = force.nodes().slice(0);
    force.nodes(array);
  } else if (mode === "sessions") {
    var array = groupSession();
    parallelData = force.nodes().slice(0);
    force.nodes(array);
  }
  
  View.update();
  View.generateLegend();
};
      
// Restarts the data 
var restart = function() {
  $("#filter_list li").remove();
  mode = "sessions";
  parallelData = [];
  force.nodes(data);
  main();
  // TODO:
  // communities();
};

$(document).ready(function() {
  $(".size_button").on("mousedown", ClickHandler.menuHandler);
  $("#detail_close_button").on("mousedown", ClickHandler.detailCloseHandler)
  $("svg").attr("height", height + "px");
  $("svg").attr("width", width + "px");
  $("#bgimg").attr("height", height);
  $("#bgimg").attr("width", width);
  d3.json('data/data.json', function (importedData) {
    data = importedData;
    minCollisionRadius = 5,
    maxDomainValue = d3.max(data, function(d) {
      return d.bookmarks;
    });
    rScale.domain([0, maxDomainValue]);
    restart();
  });
  
});
