//////////// PATRIK'S TUIO CORNER  ///////////////////
// var client = new Tuio.Client({
//     host: "http://localhost:5000"
// }),

// onAddTuioCursor = function(addCursor) {
//   console.log(addCursor.xPos*$(window).width());
//   console.log(addCursor.yPos*$(window).height()); 

//   console.log($(document.elementFromPoint(addCursor.xPos*$(window).width(), addCursor.yPos*$(window).height())));
//   $(document.elementFromPoint(addCursor.xPos*$(window).width(), addCursor.yPos*$(window).height())).trigger("bap");    $("#circle").css("left", addCursor.xPos*$(window).width()-30 + "px");
//   $("#circle").css("top", addCursor.yPos*$(window).height()-10 + "px"); 
//   $("#circle").fadeIn();
//   console.log(addCursor);
// },

// onUpdateTuioCursor = function(updateCursor) {
//   //console.log(updateCursor);
//   $("#circle").css("left", updateCursor.xPos*$(window).width()-30 + "px");
//   $("#circle").css("top", updateCursor.yPos*$(window).height()-10 + "px"); 
// },

// onRemoveTuioCursor = function(removeCursor) {
//   //console.log(removeCursor);
//   $("#circle").fadeOut()
// },

// onAddTuioObject = function(addObject) {
//     //console.log(addObject);
// },

// onUpdateTuioObject = function(updateObject) {
//     //console.log(updateObject);
// },

// onRemoveTuioObject = function(removeObject) {
//     //console.log(removeObject);
// },

// onRefresh = function(time) {
//   //console.log(time);
// };

// client.on("addTuioCursor", onAddTuioCursor);
// client.on("updateTuioCursor", onUpdateTuioCursor);
// client.on("removeTuioCursor", onRemoveTuioCursor);
// client.on("addTuioObject", onAddTuioObject);
// client.on("updateTuioObject", onUpdateTuioObject);
// client.on("removeTuioObject", onRemoveTuioObject);
// client.on("refresh", onRefresh);
// client.connect();

// $(document).ready(function() {
//   $("*").on("click", function(e){
//     e.stopPropagation();
//   })
  
//   $("div#box").on("bap", function(){
    
//     if($(this).hasClass("blue")) {
      
//      $(this).attr("class", "red");
//       $(this).css("background-color", "red");
//     } else {
      
//       $(this).attr("class", "blue");
//         $(this).css("background-color", "blue");
//     }
    
//   })
// })



//////////// PATRIK'S TUIO CORNER ENDS HERE ///////////////////



var data = [],
    height = $(window).height(),
	  width = $(window).width(),
    rScale = d3.scale.sqrt().range([0, 15]),
    fill = d3.scale.category20(),
    mode = "free";

var force = d3.layout.force()
      .links([])
      .gravity(0.03)
      .size([width, height])
      .charge(-25);
  
// var forceData;
// var circleSelection;
// var force;
// var selectedData = [];
var foci = [{x: 200, y: 200}, {x: 350, y: 250}, {x: 700, y: 400}];
var fociFree = [{x: width/2, y: height/2}];
var xSchedule = 600;
var ySchedule = 400;
var xSpace = 150;
var ySpace = 100;

var fociSchedule = 
[{x: xSchedule, y: ySchedule},          {x: xSchedule + xSpace, y: ySchedule},           {x: xSchedule + xSpace*2, y: ySchedule},           {x: xSchedule + xSpace*3, y: ySchedule},
{x: xSchedule, y: ySchedule + ySpace},   {x: xSchedule + xSpace, y: ySchedule + ySpace},   {x: xSchedule + xSpace*2, y: ySchedule + ySpace},   {x: xSchedule + xSpace*3, y: ySchedule + ySpace},
{x: xSchedule, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace*2, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace*3, y: ySchedule + ySpace*2},
{x: xSchedule, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace*2, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace*3, y: ySchedule + ySpace*3}];

var fociMap = { "353": {x: 200, y: 200}, "352": {x: 200, y: 400}, "351":{x: 200, y: 600},
"Havane": {x:300, y:600}, "Bordeaux":{x:300, y:700},
"362": {x: 400, y: 200}, "361": {x: 400, y: 350}, "343":{x: 400, y: 500}, "342A":{x: 400, y: 600},
// level 2
"253": {x: 800, y: 200}, "252B": {x: 800, y: 400}, "252A":{x: 800, y: 600},
"Blue": {x:950, y:200},
"243":{x: 1000, y: 200}, "242": {x: 1000, y: 400}, "241":{x: 1000, y: 600},
"undefined":{x: 1200, y: 200},};

// var x = d3.scale.linear().domain([0, width]).range([0, width]),
//     y = d3.scale.linear().domain([0, height]).range([0, height]);

var vis;


// Restarts the data
var restart = function() {

  // selectedData = [];
  // selectedData = data.slice(0);

  // var t = d3.select("body").select("svg");
  // $(t).fadeOut(400);
  
  // clean();

  // grouping = 3; // TODO: it should be 1 or data.length. I'm not sure yet
  mode = "free";
  main();

};

var main = function (fociUsed) {

  vis = d3.select("body").select("svg");
    // .attr("width", width)
    // .attr("height", height);

  console.log("width ", width);
  console.log("height ", height);

  force.nodes(data);
  
  console.log ("mode on force: " + mode);

  force.on("tick", function(e) {

    // Push nodes toward their designated focus.
    var k = .1 * e.alpha;
    if (mode == "schedule") {
      getSchedulePosition(k);
    } else if (mode == "free") {
      force.nodes().forEach(function(o, i) {
        o.y += (fociFree[0].y - o.y) * k;
        o.x += (fociFree[0].x - o.x) * k;
      });
    } else if (mode == "map") {
      getMapPosition(k);
    }

    changeImage();
    // var bordeau = filterJSON(data,"room", "Bordeaux");
    // console.log("talks in Bordeaux: " + countDifferentValuesForKey(bordeau,"name"));
    /*force.nodes().forEach(function(o, i) {

      o.y += (fociUsed[o.id % fociUsed.length].y - o.y) * k;
      o.x += (fociUsed[o.id % fociUsed.length].x - o.x) * k;
    });*/
  
    vis.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

  
  //selectedData = data;
  //console.log("selectedData length" + selectedData.length);
  //Time for spliting data or filtering

  //groupJSON(selectedData, "room", "351");

  //console.log("before Filter:" + selectedData.length);
  //selectedData = filterJSON(selectedData, "room", "351");
  //console.log("after Filter: " + selectedData.length);
  //toggleVisibility();

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
    });
  });


// var map = function () {
//   num = 63;
//   groupFill = function(d, i) { return fill(i & num); };
//   groups = d3.nest().key(function(d) { return d & num }).entries(force.nodes());
//   // Makes all the nodes move when clicking
//   d3.select("body")//.on("click", function() {
//     force.nodes().forEach(function(o, i) {
//       o.x += (Math.random() - .5) * 80;
//       o.y += (Math.random() - .5) * 80;
//     });
//   mapForce.resume();
// };

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
 


var filterJSON = function(json, key, value) {
  var result = [];
  
  json.forEach(function (row) {
    //console.log(row);
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

var toggleVisibility = function(force, key, value){
    force.selectAll("g").attr("visibility", function(d) {
      console.log(d[key] === value);
      return d[key] === value ? "visible" : "hidden";
  });
}

var countDifferentValuesForKey = function(json, key) {
  var differentValues = [];
  
  json.forEach(function (row) {
    //console.log(row);
    if (differentValues.indexOf(row[key]) == -1) {
      differentValues.push(row[key]);
    }
  })
  console.log(differentValues.length + " different values for key:" + key);
  return differentValues.length;
}

var groupJSON = function (json, key) { 

  var differentValues = [];
  
  json.forEach(function (row) {
    //console.log(row);
    if (differentValues.indexOf(row[key]) == -1) {
      differentValues.push(row[key]);
    }
  })
  console.log(differentValues.length + " different values for key:" + key);
  number =  differentValues.length;

  // Creating the number force arrays inside the forceData
  forceData = [];

  for (var i=0;i<number;i++) { 
    forceData.push([]);
    json.forEach(function (row) {
      //console.log(row);
      if (differentValues.indexOf(row[key]) == i) {
        forceData[i].push(row);
      }
    })
  }
  return forceData;
}


var getSchedulePosition = function (k) { 


  //calculate index
    force.nodes().forEach(function(o, i) {
      //console.log("day: " + o["day"]);
      //console.log("time: " + o["starTime"]);
      var index = 0;
      if(o["day"] === "Monday"){
        if(o["starTime"] ==="09:00"){
            index = 0;
        }
        else if(o["starTime"] ==="11:00"){
            index = 4;
        }
        else if(o["starTime"] ==="14:00"){
            index = 8;
        }
        else{
            index = 12;
        }
      }

      else if(o["day"] === "Tuesday"){
        if(o["starTime"] ==="09:00"){
            index = 1;
        }
        else if(o["starTime"] ==="11:00"){
            index = 5;
        }
        else if(o["starTime"] ==="14:00"){
            index = 9;
        }
        else{
            index = 13;
        }
      }

      else if(o["day"] === "Wednesday"){
        if(o["starTime"] ==="09:00"){
            index = 2;
        }
        else if(o["starTime"] ==="11:00"){
            index = 6;
        }
        else if(o["starTime"] ==="14:00"){
            index = 10;
        }
        else{
            index = 14;
        }
      }

      else if(o["day"] === "Thursday"){
        if(o["starTime"] ==="09:00"){
            index = 3;
        }
        else if(o["starTime"] ==="11:00"){
            index = 7;
        }
        else if(o["starTime"] ==="14:00"){
            index = 11;
        }
        else{
            index = 15;
        }
      }

      o.y += (fociSchedule[index].y - o.y) * k;
      o.x += (fociSchedule[index].x - o.x) * k;
    });
}

var getMapPosition = function (k) { 
  force.nodes().forEach(function(o, i) {
    // console.log(o["room"]);
    // console.log(fociMap[o["room"]]);
    if(fociMap[o["room"]]!== undefined){
      o.y += (fociMap[o["room"]].y - o.y) * k;
      o.x += (fociMap[o["room"]].x - o.x) * k;
    }
    else{
      // console.log(o);
       o.y += (fociMap["undefined"].y - o.y) * k;
       o.x += (fociMap["undefined"].x - o.x) * k;
    }
  });
}

// Changes the background image
function changeImage() {
  if (mode == "schedule") {
      d3.select("body").select("svg").select("image")
        .attr("xlink:href", "img/schedule.svg");
      // document.getElementById("image").src="img/schedule.svg";
  } else {
      d3.select("body").select("svg").select("image")
        .attr("xlink:href", "");  
  }
};



