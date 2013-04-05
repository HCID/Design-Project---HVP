var vis;
var data = [],
    height = $(window).height(),
    width = $(window).width(),
    rScale = d3.scale.sqrt().range([0, 15]),
    fill = d3.scale.category20(),
    mode = "free";
var force = d3.layout.force()
      .links([])
      .gravity(0)
      .size([width, height])
      .charge(0)

var main = function (fociUsed) {
  vis = d3.select("body").select("svg");
  force.on("tick", tick);
  update();
  force.start();
  generateLegend();
};
      
// Restarts the data 
var restart = function() {
  mode = "free";
  force.nodes(data);
  main();
  filterHistory = [];
  $("#filter_list").html();
  // TODO:
  // communities();
};

$(document).ready(function() {
  $(".size_button").on("mousedown", function() {
    if (parseInt($(this).data("grouping")) === 16) {
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
  });
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
