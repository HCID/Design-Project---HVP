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
      .on("tick", CircleHandler.tick);
var filterHistory = [];
var main = function (fociUsed) {

  vis = d3.select("body").select("svg");

  if (Globals.mode === "map") {
    var array = CircleHandler.groupMap();
    parallelData = force.nodes().slice(0);
    force.nodes(array);
  } else if (Globals.mode === "sessions") {
    var array = CircleHandler.groupSession();
    parallelData = force.nodes().slice(0);
    force.nodes(array);
  } else if (Globals.mode === "events") {
    parallelData = force.nodes().slice(0);
  }
  
  View.update();
  // View.generateLegend();
};
      
// Restarts the data 
var restart = function() {
  $("#filter_list li").remove();
  Globals.mode = "sessions";
  parallelData = [];
  force.nodes(data);
  main();
};

$(document).ready(function() {
  $(".size_button").on("mousedown", ClickHandler.menuHandler);
  $("svg").attr("height", Globals.height + "px");
  $("svg").attr("width", Globals.width + "px");
  $("#bgimg").attr("height", Globals.height);
  $("#bgimg").attr("width", Globals.width);
  $(".flipper").on("mousedown", function () { if($("html").css("-webkit-transform") === "none") { $("html").css("-webkit-transform", "rotate(180deg)") } else { $("html").css("-webkit-transform", "none") } })
  $('#detail_image').simpleVideo();

  $("#detail_background").css({ 
    left: ($(window).width() - $('#detail_background').outerWidth())/2,
    top: ($(window).height() - $('#detail_background').outerHeight())/2
  });

 

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
