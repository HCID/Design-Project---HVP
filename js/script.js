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
var main = function () {

    $(".tab_menu_class > div").removeClass("active");
    $("[data-grouping="+Globals.mode+"]").parent().addClass("active");

  vis = d3.select("body").select("svg");
  ClickHandler.firstRoomOnPage = true;

  d3.selectAll(".comm_overlay").remove();
  if (Globals.mode === "map") {
    var array = CircleHandler.groupMap(force.nodes());
    parallelData = force.nodes().slice(0);
    force.nodes(array);
    clearCircleSelections();
  } else if (Globals.mode === "sessions") {
    var array = CircleHandler.groupSession(force.nodes());
    parallelData = force.nodes().slice(0);
    force.nodes(array);
    _.each(force.nodes(), function(node) {
      node.selected = false;
    })
    clearCircleSelections();
  } else if (Globals.mode === "events") {
    parallelData = force.nodes().slice(0);
  }
  
  View.update();
  // View.generateLegend();
  View.updateFilterHistory();
  View.updateEventList(CircleHandler.filterData(data, CircleHandler.filters))
};

var clearCircleSelections = function () {
  _.each(force.nodes(), function(node) {
    node.selected = false;
    View.updateCircleColor(node, Globals.mode);
  });
}
  
      
// Restarts the data 
var restart = function() {
  $("#filter_list li").remove();
  Globals.mode = "sessions";
  parallelData = [];
  force.nodes(data);
  main(data);
};

$(document).ready(function() {
  $(".size_button").parent().on("mousedown", ClickHandler.menuHandler);
  $("svg").attr("height", Globals.height + "px");
  $("svg").attr("width", Globals.width + "px");
  $("#bgimg").attr("height", Globals.height);
  $("#bgimg").attr("width", Globals.width);
  $(".side_remove_filter").on("mousedown", ClickHandler.removeFilterHandler);
  $(".applied_filters").on("mousedown", ClickHandler.selectFilters);
  $(".restart_now").on("mousedown", ClickHandler.restart);
  //$(".flipper").on("mousedown", function () { if($("html").css("-webkit-transform") === "none") { $("html").css("-webkit-transform", "rotate(180deg)") } else { $("html").css("-webkit-transform", "none") } })
  //$("#tab_menu").on("mousedown", function () {  if($("html").css("-webkit-transform") === "none") { $("html").css("-webkit-transform", "rotate(180deg)") } else { $("html").css("-webkit-transform", "none") }  })
  
   $('#detail_image').simpleVideo();





  $(".schedule_time").on("mousedown", ClickHandler.selectTimeRange );
  $(".schedule_day").on("mousedown", ClickHandler.selectDayRange );
  $(".scedule_room").on("mousedown", ClickHandler.selectRoomRange );
  

  $("#right_side").height((Globals.height-209)+"px");


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
    ClickHandler.listOfEvents = data;
    rScale.domain([0, maxDomainValue]);
    restart();
  });
  
});
