//////////// PATRIK'S TUIO CORNER  ///////////////////
var windowHeight = $(window).height();
var windowWidth = $(window).width();
var showMenu = false;


console.log(window);

var fingers = [];

var once = true;
var client = new Tuio.Client({
    host: "http://localhost:5000"
}),







onAddTuioCursor = function(addCursor) {





var element = $(document.elementFromPoint(addCursor.xPos*windowWidth, addCursor.yPos*windowHeight)); 
var el = null;
if(element.get(0).tagName == "circle" && !showMenu) {
  console.log(element.parents("g").attr("id"));

  el = d3.select("#" + element.parents("g").attr("id") + " circle");

console.log(el);
var event = document.createEvent("MouseEvent");
event.initMouseEvent("mousedown",true,true, window, 1, addCursor.xPos*windowWidth, addCursor.yPos*windowHeight,addCursor.xPos*windowWidth, addCursor.yPos*windowHeight);
el[0][0].dispatchEvent(event);

  
} else {
var event = document.createEvent("MouseEvent");
event.initMouseEvent("mousedown",true,true, window, 1, addCursor.xPos*windowWidth, addCursor.yPos*windowHeight,addCursor.xPos*windowWidth, addCursor.yPos*windowHeight);
element.get(0).dispatchEvent(event);
  
}
  fingers[addCursor.sessionId] = {
    cursor: addCursor,
    el: el,
    fingerCircle: $("<div id='circle_" + addCursor.sessionId + "' style='background-color: yellow; opacity: 0.4; width: 44px; position: absolute; height: 44px; left: " + addCursor.xPos*windowWidth + "px; top: " + addCursor.yPos*windowHeight + "px; border-radius: 40px; '></div>").appendTo($("body"))
  };



// gabriel.scherer@gmail.com



/*

  console.log($(document.elementFromPoint(addCursor.xPos*$(window).width(), addCursor.yPos*$(window).height())));
     
   $("#circle").css("left", addCursor.xPos*$(window).width()-30 + "px");
  $("#circle").css("top", addCursor.yPos*$(window).height()-10 + "px"); 
  $("#circle").fadeIn();
  console.log("cursor", addCursor);
  */
},

onUpdateTuioCursor = function(updateCursor) {
  
//console.log("x: " + updateCursor.xPos*windowWidth + ", y: " + updateCursor.yPos*windowHeight)

  if(fingers[updateCursor.sessionId]) {
    fingers[updateCursor.sessionId].cursor = updateCursor;
    fingers[updateCursor.sessionId].fingerCircle.css("left", (updateCursor.xPos*windowWidth)-20 + "px");
    fingers[updateCursor.sessionId].fingerCircle.css("top", (updateCursor.yPos*windowHeight)-25 + "px");
    if (fingers[updateCursor.sessionId].el) {
      var event = document.createEvent("MouseEvent");
      event.initMouseEvent("mousemove",true,true, window, 1, updateCursor.xPos*windowWidth, updateCursor.yPos*windowHeight,updateCursor.xPos*windowWidth, updateCursor.yPos*windowHeight);
      fingers[updateCursor.sessionId].el[0][0].dispatchEvent(event);
     // fingers[updateCursor.sessionId].el.on("drag")();
/*  
console.log(fingers[updateCursor.sessionId].el);
  var d = fingers[updateCursor.sessionId].el;



if(d.px == NaN) {
  d.px = 0;
}

if(d.py == NaN) {
  d.py = 0;
}

if(d.x == NaN) {
  d.x = 0;
}

if(d.y == NaN) {
  d.y = 0;
}


  var dx = parseFloat(updateCursor.xPos*$(window).width()) - parseFloat(d.x);
  var dy = parseFloat(updateCursor.yPos*$(window).height()) - parseFloat(d.y);
    
console.log(d.x);

  d.px += dx;
    d.py += dy;
    d.x  += dx;
    d.y  += dy; 
    tick(); 

*/
    }
  }
},

onRemoveTuioCursor = function(removeCursor) {
  //console.log(removeCursor);
    if(fingers[removeCursor.sessionId]) {
      if (fingers[removeCursor.sessionId].el) {
      var event = document.createEvent("MouseEvent");
      event.initMouseEvent("mouseup",true,true, window, 1, removeCursor.xPos*windowWidth, removeCursor.yPos*windowHeight,removeCursor.xPos*windowWidth, removeCursor.yPos*windowHeight);
      fingers[removeCursor.sessionId].el[0][0].dispatchEvent(event);
     
    }
      fingers[removeCursor.sessionId].fingerCircle.remove();
      fingers[removeCursor.sessionId] = null;      
    }
      
    
    
  
},

onAddTuioObject = function(addObject) {
    console.log(addObject);
},

onUpdateTuioObject = function(updateObject) {
    //console.log(updateObject);
},

onRemoveTuioObject = function(removeObject) {
    //console.log(removeObject);
},

onAddTuioHand = function(addHand) {





},

onUpdateTuioHand = function(updateHand) {
if(updateHand.fingers.indexOf(-1) === -1 ) {
if(!showMenu) {
console.log(updateHand)

  $("#mainMenu").css("top", (updateHand.yPos*windowHeight)-300 + "px").css("left", (updateHand.xPos*windowWidth)-300 + "px").show()
showMenu = true
}
  
}

},

onRemoveTuioHand = function(removeHand) {
    //console.log(removeHand);
$("#mainMenu").hide()
showMenu = false
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
client.on("addTuioHand", onAddTuioHand);
client.on("updateTuioHand", onUpdateTuioHand);
client.on("removeTuioHand", onRemoveTuioHand);
client.on("refresh", onRefresh);
client.connect();


console.log(d3.behavior.drag());

var node_drag = d3.behavior.drag()
        .on("dragstart", function(d){ /* d.fixed = true; */})
        .on("drag", function(d, i){ 

         // d.x = d3.event.x // +=
          //  d.y = d3.event.y // +=
           /* d3.select(this).attr("transform", function(d,i){
                return "translate(" + [ d.x,d.y ] + ")"
            })*/

        d.px += d3.event.dx;
    d.py += d3.event.dy;
    d.x += d3.event.dx;
    d.y += d3.event.dy; 
  //  tick(); 


           

        })
        .on("dragend", function(d){ /* d.fixed = false; */ force.resume() });




//////////// PATRIK'S TUIO CORNER ENDS HERE ///////////////////



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
     /* .charge(function (d) {

        var n = force.nodes().length;
        var s = 25 + (1 - (n/data.length))*100;
        console.log("s: " + s);
        return -s;


 }); */
  
// var forceData;
// var circleSelection;
// var force;
// var selectedData = [];
var foci = [{x: 200, y: 200}, {x: 350, y: 250}, {x: 700, y: 400}];
var fociFree = [{x: width/2, y: height/2}];
var xSchedule = 730;
var ySchedule = 200;
var xSpace = 280;
var ySpace = 220;
var differentTypes = ["altchi", "casestudy", "course", "panel", "paper", "SIG", "TOCHI"] ;
var fociSchedule = 
[{x: xSchedule, y: ySchedule},          {x: xSchedule + xSpace, y: ySchedule},           {x: xSchedule + xSpace*2, y: ySchedule},           {x: xSchedule + xSpace*3, y: ySchedule},
{x: xSchedule, y: ySchedule + ySpace},   {x: xSchedule + xSpace, y: ySchedule + ySpace},   {x: xSchedule + xSpace*2, y: ySchedule + ySpace},   {x: xSchedule + xSpace*3, y: ySchedule + ySpace},
{x: xSchedule, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace*2, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace*3, y: ySchedule + ySpace*2},
{x: xSchedule, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace*2, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace*3, y: ySchedule + ySpace*3},
{x: xSchedule + xSpace*4, y: ySchedule + ySpace*2}];

var fociMap = { "353": {x: 200, y: 200}, "352": {x: 200, y: 400}, "351":{x: 200, y: 600},
"havane": {x:300, y:600}, "bordeaux":{x:300, y:700},
"362": {x: 400, y: 200}, "361": {x: 400, y: 350}, "343":{x: 400, y: 500}, "342a":{x: 400, y: 600},
// level 2
"253": {x: 800, y: 200}, "252b": {x: 800, y: 400}, "252a":{x: 800, y: 600},
"blue": {x:950, y:200},
"243":{x: 1000, y: 200}, "242": {x: 1000, y: 400}, "241":{x: 1000, y: 600},
"undefined":{x: 1200, y: 200},};

// var x = d3.scale.linear().domain([0, width]).range([0, width]),
//     y = d3.scale.linear().domain([0, height]).range([0, height]);

var vis;

var gCom = {
  'coms': [],
  'amount': 0,
  'id': 0
};

// Restarts the data
var restart = function() {
  mode = "free";
  force.nodes(data);
  main();
  // TODO:
  // communities();
};


var tick = function(e) {
 nodes.each(function(d) {

        if(d.y <= 0) {
          d.y += 1;
        }

        if(d.y >= height) {
          d.y -= 1;
        }

        if(d.x <= 0) {
          d.x += 1;
        }

        if(d.x >= width) {
          d.x -= 1;
        }

      })


  if(e !== undefined) {
        // Push nodes toward their designated focus.
    var k = .1 * e.alpha;
    if (mode == "schedule") {
      force.nodes().forEach(function(d) { 
        d.r = 40;

      });
      vis.selectAll("circle").attr("r", 40);
      getSchedulePosition(k);
    } else if (mode == "free") {

      force.nodes().forEach(function(o, i) {
        o.y += (fociFree[0].y - o.y) * k;
        o.x += (fociFree[0].x - o.x) * k;        
      });

      force.nodes().forEach(collide(0.2));
      
    } else if (mode == "map") {
      force.nodes().forEach(function(d) { 
        d.r = 20;

      });
      vis.selectAll("circle").attr("r", 20);
      getMapPosition(k);
    }
    //changeImage();
  }

    // var bordeau = filterJSON(data,"room", "Bordeaux");
    // console.log("talks in Bordeaux: " + countDifferentValuesForKey(bordeau,"name"));
    /*force.nodes().forEach(function(o, i) {

      o.y += (fociUsed[o.id % fociUsed.length].y - o.y) * k;
      o.x += (fociUsed[o.id % fociUsed.length].x - o.x) * k;
    });*/
  /*
    vis.selectAll("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

  */


    vis.selectAll("circle").attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

};
var nodes;


var calculateR = function (d) {
  var n = force.nodes().length;
  var s = 10 + (1 - (n/data.length))*20;
  return s;
}



var update = function () {
  nodes = vis.selectAll("g")
    .data(force.nodes(), function(d){ return d.id;} )
    
    nodes.enter().append("g")
      .attr("id", function(d, i){return "g"+d.id;})
      .attr("class", "circle_class")
      
      // .call(d3.behavior.zoom().x(x).y(y).scaleExtent([1,8]).on("zoom",zoom))
      .append("circle").on("mousedown", function(d){ circleClicked(d) } )
     
      .style("fill", function (d, i) {
        
        return fill(d["type"]  );

      })
      .style("stroke-width", 1)
      .style("stroke", "#ffffff")
      .call(node_drag);
  

nodes.selectAll("circle").attr("r", calculateR).each(function(d) { d.radius = calculateR(d) } );

  nodes.exit().remove();
  force.start();
  
}



var main = function (fociUsed) {

  vis = d3.select("body").select("svg");
    // .attr("width", width)
    // .attr("height", height);

  console.log("width ", width);
  console.log("height ", height);
  console.log ("mode on force: " + mode);
  force.on("tick", tick);
  
  //selectedData = data;
  //console.log("selectedData length" + selectedData.length);
  //Time for spliting data or filtering

  //groupJSON(selectedData, "room", "351");

  //console.log("before Filter:" + selectedData.length);
  //selectedData = filterJSON(selectedData, "room", "351");
  //console.log("after Filter: " + selectedData.length);
  //toggleVisibility();

  update();

  force.start();
      var items = [];

     $.each(getDifferentValuesForKey(data,"type"), function(i, item) {
            console.log(item);

            items.push('<li class="typesClass" style="background-color:' + fill(item) + '">' + item + '</li>');

     });  // close each()

     $(".types").html( items.join('') );

  
};
    
      
  $(document).ready(function() {
    console.log("document_ready");
    $(".size_button").on("mousedown", function() {
      if (parseInt($(this).data("grouping")) === 16) {
        console.log("communities function");
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
//      console.log("equals value " + value);
      result.push(row);
    }
    else{
//      console.log("removed one");
    }

  })
  // console.log("result of filter function: ");
  // console.dir(result);
  return result;
}

var toggleVisibility = function(force, key, value){
    force.selectAll("g").attr("visibility", function(d) {
      // console.log(d[key] === value);
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

var getDifferentValuesForKey = function(json, key) {
  var differentValues = [];
  
  json.forEach(function (row) {
    //console.log(row);
    if (differentValues.indexOf(row[key]) == -1) {
      differentValues.push(row[key]);
    }
  })
  console.log(differentValues.length + " different values for key:" + key);
  return differentValues;
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
      // undefined talks will end up in the 16th 
      var index = 16;
      if(o["day"] === "Monday"){
        if(o["starTime"] ==="9:00"){
            index = 0;
        } else if(o["starTime"] ==="11:00"){
            index = 4;
        } else if(o["starTime"] ==="14:00"){
            index = 8;
        } else{
            index = 12;
        }
      } else if(o["day"] === "Tuesday"){
        if(o["starTime"] ==="9:00"){
            index = 1;
        } else if(o["starTime"] ==="11:00"){
            index = 5;
        } else if(o["starTime"] ==="14:00"){
            index = 9;
        } else{
            index = 13;
        }
      } else if(o["day"] === "Wednesday"){
        if(o["starTime"] ==="9:00"){
            index = 2;
        } else if(o["starTime"] ==="11:00"){
            index = 6;
        } else if(o["starTime"] ==="14:00"){
            index = 10;
        } else{
            index = 14;
        }
      } else if(o["day"] === "Thursday"){
        if(o["starTime"] ==="9:00"){
            index = 3;
        } else if(o["starTime"] ==="11:00"){
            index = 7;
        } else if(o["starTime"] ==="14:00"){
            index = 11;
        } else{
            index = 15;
        }
      }
        
      o.y += (fociSchedule[index].y - o.y) * k;
      o.x += (fociSchedule[index].x - o.x) * k;
      
    });
}

var getMapPosition = function (k) { 
  force.nodes().forEach(function(o, i) {

    if(fociMap[o["room"]]!== undefined){
      o.y += (fociMap[o["room"]].y - o.y) * k;
      o.x += (fociMap[o["room"]].x - o.x) * k;
    } else{
      o.y += (fociMap["undefined"].y - o.y) * k;
      o.x += (fociMap["undefined"].x - o.x) * k;
    }
  });
}

// Changes the background image
function changeImage() {
  if (mode == "schedule") {
      d3.select("body").select("svg").select("image")
        .attr("xlink:href", "/img/schedule.svg")
        .attr("opacity", 1);
      // document.getElementById("image").src="img/schedule.svg";
  } else if (mode == "map") {
      d3.select("body").select("svg").select("image")
        .attr("xlink:href", "/img/map_bg.svg")
        .attr("opacity", 1);
      // document.getElementById("image").src="img/schedule.svg";
  } else {
      d3.select("body").select("svg").select("image")
        .attr("xlink:href", "") 
        .attr("opacity", 0);

  }
};

var communities = function() {

  var gComs = [];
  var id = 0;
  data.forEach(function(d) {

    if (gComs.length == 0) {
      var gCom = new Object();
      gCom.coms = d.communities ? d.communities : [];
      gCom.amount = 1
      gCom.id = id;
      id++;
      gComs.push(gCom);
    } else {

      var i = 0;
      var found = false;
      var length = gComs.length;

      while (i<length && !found) { 

        var auxArray = d.communities ? d.communities : [];

        if (compareArrays(gComs[i].coms, auxArray)) {
          gComs[i].amount ++;
          found = true;
        } 
        i++;
      }

      if (!found) {
        var gCom = new Object();
        gCom.coms = d.communities ? d.communities : [];
        gCom.amount = 1;
        gCom.id = id;
        id++;
        gComs.push(gCom);
      }

    }

  })

  var commNodes = createCommNodesArray(gComs);
  // var commLinks = linking(commNodes);

  // console.log("commLinks.length ", commLinks.length);
  // console.log("commLinks ", commLinks);

  // gComs.forEach( function (d) {

  //   console.log ("coms ", d.coms);
  //   console.log ("amount ", d.amount);
  // })

}

var compareArrays = function (a,b) {

  var aLength = a.length;
  var bLength = b.length;
  var result = false;
  
  if (aLength == bLength) {

    var i = 0; 
    var follow = true;

    while ((i < aLength) && follow) {
      follow = containsElement(b,a[i]);
      i++;
    }
    
    result = follow;
  }
  return result;
}

var linking = function (nodes){
  var link = [];

  nodes.forEach( function (e){
    if(e.id >10){
      for (var i=0;i<=10;i++) { 
        if (e.coms.indexOf(nodes[i].coms[0])!= -1){
          var newLink = {"source":e.id,"target": nodes[i].id,"value":1};
          link.push(newLink);
            // add a link to link array from e to nodes[i]
        }
      }
    }
  });

  return link;
}  

var circleClicked = function (circle) {
  // console.log("clicked on: " + circle);
  // console.dir(circle);
  // console.log("mode : " + mode);
  if (mode == "schedule") {
    // console.log("day: " + circle["day"]);
    // console.log("starTime: " + circle["starTime"]);
    // console.log(vis.selectAll("g").data());
    var newData = filterJSON(vis.selectAll("g").data(), "day", circle["day"]);
    var newData = filterJSON(newData, "starTime", circle["starTime"]);
    // console.log(newData);
    //d3.selectAll... remove filtered data
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

}

var containsElement = function (array, b) {

  var i = 0;
  var found = false;

  while ((i < array.length) && !found) {
    found = (array[i].toLowerCase() === b.toLowerCase());
    i++;
  }
  
  return found;
}

var createCommNodesArray = function (a) {

  a.forEach (function (d) {

    if (d.coms.length > 0) {
      var i = d.coms.indexOf("ux");
      if (i >= 0) d.coms.splice(i, 1);
      i = d.coms.indexOf("design");
      if (i >= 0) d.coms.splice(i, 1);
      i = d.coms.indexOf("engineering");
      if (i >= 0) d.coms.splice(i, 1);
    }

  });

  var array = [];

  // var gCom0 = {"coms":[], "amount":0, "id":0};
  // var gCom1 = {"coms":["sustainability"], "amount":0, "id":1};
  // var gCom2 = {"coms":["hci4d"], "amount":0, "id":2};
  // var gCom3 = {"coms":["games"], "amount":0, "id":3};
  // var gCom4 = {"coms":["cci"], "amount":0, "id":4};
  // var gCom5 = {"coms":["arts"], "amount":0, "id":5};
  // var gCom6 = {"coms":["health"], "amount":0, "id":6};
  // var gCom7 = {"coms":["management"], "amount":0, "id":7};
    var gCom0 = new Object();
      gCom0.coms = [];
      gCom0.amount = 0;
      gCom0.id = 0;

  var gCom1 = new Object();
      gCom1.coms = ["sustainability"];
      gCom1.amount = 0;
      gCom1.id = 1;

  var gCom2 = new Object();
      gCom2.coms = ["hci4d"];
      gCom2.amount = 0;
      gCom2.id = 2;

  var gCom3 = new Object();
      gCom3.coms = ["games"];
      gCom3.amount = 0;
      gCom3.id = 3;

  var gCom4 = new Object();
      gCom4.coms = ["cci"];
      gCom4.amount = 0;
      gCom4.id = 4;

  var gCom5 = new Object();
      gCom5.coms = ["arts"];
      gCom5.amount = 0;
      gCom5.id = 5;

  var gCom6 = new Object();
      gCom6.coms = ["health"];
      gCom6.amount = 0;
      gCom6.id = 6;

  var gCom7 = new Object();
      gCom7.coms = ["management"];
      gCom7.amount = 0;
      gCom7.id = 7;

  array.push(gCom0, gCom1, gCom2, gCom3, gCom4, gCom5, gCom6, gCom7);    

  console.log("array top ", array);
  console.log("array top length ", array.length);

  var id = 8;

  a.forEach(function (d) {

    var i = 0;
    var found = false;
    var length = array.length;

    while (i<length && !found) {
      found = compareArrays(d.coms, array[i].coms);
      if (found) {array[i].amount += d.amount};
      i++;
    }

    if (!found) {
      var c = {"coms":d.coms, "amount":d.amount, "id":id};
      id++;
      array.push(c);
    }
  });

  // Info to fill and use later
  var groups = ["general", "sustainability", "hci4d", "games", "cci", "arts", "health", "management"];
  var vennData = [];
  for (var i=0; i<Math.pow(2, 8); i++) {
    vennData[i] = 0;
  }
  
  t = 1;

  array.forEach(function (d) {
    // console.log("array id " + d.id + " coms " + d.coms + " amount " + d.amount);

    var i1 = 0;
    var i2 = 0;
    var i3 = 0;
    var i4 = 0;
    
    // console.log("d ", d);
      console.log("d ", d.id);
    if (d.coms.length == 0) { //general
      // console.log("undefined");
      i1 = t << 0; 
      vennData[i1] = 8;//0;//d.amount;
      // console.log("d ", d.id);
      console.log("i1 ", i1);
      // console.log("vennData[i1] ", vennData[i1]);
    } else if (d.coms.length == 1) {
      // console.log("1");
      i1 = t << groups.indexOf(d.coms[0]);
      vennData[i1] = 8;//d.amount/2;
      // console.log("groups.indexOf(d.coms[0]) ", groups.indexOf(d.coms[0]));
      // console.log("d ", d.id);
      console.log("i1 ", i1);
      // console.log("vennData[i1] ", vennData[i1]);
    } else if (d.coms.length == 2) {
      // console.log("2");
      i1 = t << groups.indexOf(d.coms[0]);
      i2 = t << groups.indexOf(d.coms[1]);
      vennData[i1|i2] = 6;//d.amount/2;
      // console.log("groups.indexOf(d.coms[0]) ", groups.indexOf(d.coms[0]));
      // console.log("groups.indexOf(d.coms[1]) ", groups.indexOf(d.coms[1]));
      // console.log("d ", d.id);
      console.log("i1|i2 ", i1|i2);
      // console.log("vennData[i1|i2] ", vennData[i1|i2]);
    } else if (d.coms.length == 3) {
      // console.log("3");
      i1 = t << groups.indexOf(d.coms[0]);
      i2 = t << groups.indexOf(d.coms[1]);
      i3 = t << groups.indexOf(d.coms[2]);
      vennData[i1|i2|i3] = 4;//d.amount/2;
      // console.log("groups.indexOf(d.coms[0]) ", groups.indexOf(d.coms[0]));
      // console.log("groups.indexOf(d.coms[1]) ", groups.indexOf(d.coms[1]));
      // console.log("groups.indexOf(d.coms[2]) ", groups.indexOf(d.coms[2]));
      // console.log("d ", d.id);
      console.log("i1|i2|i3 ", i1|i2|i3);
      // console.log("vennData[i1|i2|i3] ", vennData[i1|i2|i3]);
    } else if (d.coms.length == 4) {
      // console.log("4");
      i1 = t << groups.indexOf(d.coms[0]);
      i2 = t << groups.indexOf(d.coms[1]);
      i3 = t << groups.indexOf(d.coms[2]);
      i4 = t << groups.indexOf(d.coms[3]);
      vennData[i1|i2|i3|i4] = 4;//d.amount/2;
      // console.log("groups.indexOf(d.coms[0]) ", groups.indexOf(d.coms[0]));
      // console.log("groups.indexOf(d.coms[1]) ", groups.indexOf(d.coms[1]));
      // console.log("groups.indexOf(d.coms[2]) ", groups.indexOf(d.coms[2]));
      // console.log("groups.indexOf(d.coms[3]) ", groups.indexOf(d.coms[3]));
      // console.log("d ", d.id);
      console.log("i1|i2|i3|i4 ", i1|i2|i3|i4);
      // console.log("vennData[i1|i2|i3|i4] ", vennData[i1|i2|i3|i4]);
    }

  });

  // console.log("vennData array ", vennData.length);
  //   console.log("vennData array ", vennData);

  // vennData.forEach(function(d) {
  //   console.log("data ", d);
  // });

  // console.log("HERE " + array[0].coms);
  // array.forEach(function (d) {


  // });

  // vennData.forEach(function (d) {
  //    console.log("elto " + d);
  // });
  var venn = d3.layout.venn().size([window.screen.availWidth, window.screen.availHeight]);
  var circle = d3.svg.arc().innerRadius(0).startAngle(0).endAngle(2*Math.PI);
  
  vis = d3.select("body").select("svg")
    .data([vennData])
      .attr("width", width).attr("height", height);

  var vennSpace = 100;

  var circles = vis.selectAll("g.arc")
      .data(venn)              
    .enter().append("g")
      .attr("class", "arc")
      .attr("transform", function(d, i){ return "translate(" + (d.x) + "," + (vennSpace + d.y) + ")"; });
  circles.append("path")
      .attr("fill", function(d, i) { return fill(i); })
      .attr("opacity", 0.5)
      .attr("d", circle);
  circles.append("text")
      .attr("text-anchor", "middle")
      .text(function(d, i) { return groups[i]; })
      .attr("fill", function(d, i) { return fill(i); })
      .attr("x", function(d, i) { return d.labelX; })
      .attr("y", function(d, i) { return d.labelY; });
      

  // D3 animation
  vis.selectAll("path")
      .data(venn).transition().duration(2000).delay(1000)
      .attr("d", circle);
  vis.selectAll("g.arc")
      .data(venn).transition().duration(2000).delay(1000)
      .attr("transform", function(d, i){ return "translate(" + (d.x) + "," + (vennSpace + d.y) + ")"; }); 
  vis.selectAll("text")
      .data(venn).transition().duration(2000).delay(1000)
      .attr("x", function(d, i) { return d.labelX; })
      .attr("y", function(d, i) { return d.labelY; });

  // return array;
};


/*
var updateToCommunitiesView = function (n, l) {
  var force = d3.layout.force()
    .charge(-500)
    .linkDistance(50)
    .size([width, height])
    .nodes(n)
    .links(l)
    .start();
  
  var svg = d3.select("body").select("svg");

  var link = svg.selectAll(".link")
      .data(l)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return 100; })
      .style("fill", "#f2345f");

  var node = svg.selectAll(".node")
      .data(n)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d) { 
        console.log("node " + d.id + " amount " + d.amount + " coms " + d.coms); 
        return (d.amount < 10) ? d.amount*10 : 10; 
      })
      .style("fill", function(d) {
        return (d.id < 11) ? fill(d.id) : "#22225f"; })
      .style("stroke-width", 1)
      .style("stroke", "#ffffff")
      .call(force.drag)
      .on("mousedown", function(d) {alert("Ball " + d.coms + ", Amount " + d.amount);});

  node.append("title")
      .text(function(d) { return "Ball " + d.coms + ", Amount " + d.amount; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });


}
*/

var collisionPadding = 5;

function collide(jitter) {
  return function(d) {
    return data.forEach(function(d2) {
      var distance, minDistance, moveX, moveY, x, y;
      if (d !== d2) {
        x = d.x - d2.x;
        y = d.y - d2.y;
        distance = Math.sqrt(x * x + y * y);
        minDistance = d.radius + d2.radius + collisionPadding;
        if (distance < minDistance) {
          distance = (distance - minDistance) / distance * jitter;
          moveX = x * distance;
          moveY = y * distance;
          d.x -= moveX;
          d.y -= moveY;
          d2.x += moveX;
          return d2.y += moveY;
        }
      }
    });
  };
};
