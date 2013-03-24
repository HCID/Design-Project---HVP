//////////// PATRIK'S TUIO CORNER  ///////////////////
var client = new Tuio.Client({
    host: "http://localhost:5000"
}),

onAddTuioCursor = function(addCursor) {
  console.log(addCursor.xPos*$(window).width());
  console.log(addCursor.yPos*$(window).height()); 

  console.log($(document.elementFromPoint(addCursor.xPos*$(window).width(), addCursor.yPos*$(window).height())));
  $(document.elementFromPoint(addCursor.xPos*$(window).width(), addCursor.yPos*$(window).height())).trigger("bap");    $("#circle").css("left", addCursor.xPos*$(window).width()-30 + "px");
  $("#circle").css("top", addCursor.yPos*$(window).height()-10 + "px"); 
  $("#circle").fadeIn();
  console.log(addCursor);
},

onUpdateTuioCursor = function(updateCursor) {
  //console.log(updateCursor);
  $("#circle").css("left", updateCursor.xPos*$(window).width()-30 + "px");
  $("#circle").css("top", updateCursor.yPos*$(window).height()-10 + "px"); 
},

onRemoveTuioCursor = function(removeCursor) {
  //console.log(removeCursor);
  $("#circle").fadeOut()
},

onAddTuioObject = function(addObject) {
    //console.log(addObject);
},

onUpdateTuioObject = function(updateObject) {
    //console.log(updateObject);
},

onRemoveTuioObject = function(removeObject) {
    //console.log(removeObject);
},

onRefresh = function(time) {
  //console.log(time);
};

client.on("addTuioCursor", onAddTuioCursor);
client.on("updateTuioCursor", onUpdateTuioCursor);
client.on("removeTuioCursor", onRemoveTuioCursor);
client.on("addTuioObject", onAddTuioObject);
client.on("updateTuioObject", onUpdateTuioObject);
client.on("removeTuioObject", onRemoveTuioObject);
client.on("refresh", onRefresh);
client.connect();

$(document).ready(function() {
  $("*").on("click", function(e){
    e.stopPropagation();
  })
  
  $("div#box").on("bap", function(){
    
    if($(this).hasClass("blue")) {
      
     $(this).attr("class", "red");
      $(this).css("background-color", "red");
    } else {
      
      $(this).attr("class", "blue");
        $(this).css("background-color", "blue");
    }
    
  })
})



//////////// PATRIK'S TUIO CORNER ENDS HERE ///////////////////



var data = [],
    height = window.screen.availHeight,
	  width = window.screen.availWidth,
    grouping = 3;
    rScale = d3.scale.sqrt().range([0, 15]),
    fill = d3.scale.category20();

var force = d3.layout.force()
      .links([])
      .gravity(0)
      .size([width, height]);
  
// var forceData;
// var circleSelection;
// var force;
// var selectedData = [];
var foci = [{x: 150, y: 150}, {x: 350, y: 250}, {x: 700, y: 400}];

// var x = d3.scale.linear().domain([0, width]).range([0, width]),
//     y = d3.scale.linear().domain([0, height]).range([0, height]);

var vis = d3.select("body").append("svg:svg")
    .attr("width", width)
    .attr("height", height);


// Restarts the data
var restart = function() {

  // selectedData = [];
  // selectedData = data.slice(0);

  // var t = d3.select("body").select("svg");
  // $(t).fadeOut(400);
  
  // clean();

  // grouping = 3; // TODO: it should be 1 or data.length. I'm not sure yet
  twoFuntion();

};

var twoFuntion = function () {

  var vis = d3.select("body").append("svg:svg")
      .attr("width", width)
      .attr("height", height);

<<<<<<< HEAD
  }
  
  console.log("selectedData twoFuntion" + selectedData.length);
  //Time for spliting data or filtering
  split(selectedData, grouping);
  console.log("before Filter:" + selectedData.length);
  selectedData = filterJSON(selectedData, "room", "351");
  console.log("after Filter: " + selectedData.length);

=======
  // force = d3.layout.force()
  //     .nodes(data)
  //     .links([])
  //     .gravity(0)
  //     .size([width, height]);
>>>>>>> new way

  force.nodes(data);

  force.on("tick", function(e) {

    // Push nodes toward their designated focus.
    console.log("Tick function");
    var k = .1 * e.alpha;
    force.nodes().forEach(function(o, i) {
      o.y += (foci[o.id % 3].y - o.y) * k;
      o.x += (foci[o.id % 3].x - o.x) * k;
    });

    vis.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

  force.start();

  vis.selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("id", function(d, i){return d.id;})
      .attr("class", "circle_class")
      .on("click", function(d){ circleClicked(d) } )
      // .call(d3.behavior.zoom().x(x).y(y).scaleExtent([1,8]).on("zoom",zoom))
      .append("circle")
      .attr("r", function (d) {
        return 10})
      .style("fill", function (d, i) {
        return fill(i);})
      .style("stroke-width", 2)
      .style("stroke", function(d, i) { return d3.rgb(fill(i)).darker(2); })
      .call(force.drag);

};
    
      
  $(document).ready(function() {
    $(".size_button").on("click", function() {
      if (parseInt($(this).data("grouping")) === 16) {
        sixteenFuntion();
      } else if (parseInt($(this).data("grouping")) === 4) {
        fourFuntion();
      } else if (parseInt($(this).data("grouping")) === 2) {
        twoFuntion();
      } else if($(this).data("grouping") == "map"){
        map();
      } else if($(this).data("grouping") == "restart"){
        restart();
      }
    });
  });


var map = function () {
  num = 63;
  groupFill = function(d, i) { return fill(i & num); };
  groups = d3.nest().key(function(d) { return d & num }).entries(force.nodes());
  // Makes all the nodes move when clicking
  d3.select("body")//.on("click", function() {
    force.nodes().forEach(function(o, i) {
      o.x += (Math.random() - .5) * 80;
      o.y += (Math.random() - .5) * 80;
    });
  mapForce.resume();
};

$(document).ready(function() {
  $("svg").attr("height", height + "px");
  $("svg").attr("width", width + "px");
  $("#bgimg").attr("height", height);
  $("#bgimg").attr("width", width);
  d3.json('data/data.json', function (importedData) {
    data = importedData;
    // console.log("selectedData " + selectedData.length);
    minCollisionRadius = 5,
    maxDomainValue = d3.max(data, function(d) {
      return d.bookmarks;
    });
    rScale.domain([0, maxDomainValue]);
    restart();
  });
});
 



function filterJSON(json, key, value) {
  var result = [];
  
  json.forEach(function (row) {
    console.log(row);
    if (row[key] === value) {
      result.push(row);
    }
    else{
      console.log("removed one");
    }

  })
  console.log("result of filter function " + result.length);
  return result;
}