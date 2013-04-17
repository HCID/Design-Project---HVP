var vis;
var data = [],
    rScale = d3.scale.sqrt().range([0, 15]),
    fill = d3.scale.category20(),
    fill2 = d3.scale.category10();
    Globals.mode = "sessions"; // {sessions, events, comm, map}
var force = d3.layout.force()
      .links([])
      .gravity(0)
      .size([Globals.width, Globals.height])
      .charge(0)
      .on("tick", tick);

var main = function (fociUsed) {

  vis = d3.select("body").select("svg");
  if (Globals.mode === "schedule") {
    var array = groupSchedule();
    parallelData = force.nodes().slice(0);
    force.nodes(array);
  } else if (Globals.mode === "map") {
    var array = groupMap();
    parallelData = force.nodes().slice(0);
    force.nodes(array);
  } else if (Globals.mode === "sessions") {
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
  Globals.mode = "sessions";
  parallelData = [];
  force.nodes(data);
  main();
  // TODO:
  // communities();
};

$(document).ready(function() {
  $(".size_button").on("mousedown", ClickHandler.menuHandler);
  $("#detail_close_button").on("mousedown", ClickHandler.detailCloseHandler)
  $("svg").attr("height", Globals.height + "px");
  $("svg").attr("width", Globals.width + "px");
  $("#bgimg").attr("height", Globals.height);
  $("#bgimg").attr("width", Globals.width);
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
