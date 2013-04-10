/* Global variables */
var height = $(window).height();
var width = $(window).width();
var xSchedule = 730;
var ySchedule = 200;
var xSpace = 280;
var ySpace = 220;
var parallelData;


/* Positions array */

var fociFree = [{x: width/2, y: height/2}];

var fociSchedule = 
[{x: xSchedule, y: ySchedule},          {x: xSchedule + xSpace, y: ySchedule},           {x: xSchedule + xSpace*2, y: ySchedule},           {x: xSchedule + xSpace*3, y: ySchedule},
{x: xSchedule, y: ySchedule + ySpace},   {x: xSchedule + xSpace, y: ySchedule + ySpace},   {x: xSchedule + xSpace*2, y: ySchedule + ySpace},   {x: xSchedule + xSpace*3, y: ySchedule + ySpace},
{x: xSchedule, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace*2, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace*3, y: ySchedule + ySpace*2},
{x: xSchedule, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace*2, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace*3, y: ySchedule + ySpace*3},
{x: xSchedule + xSpace*4, y: ySchedule + ySpace*2}];

var fociMap = { 
  "352": {x: 200, y: 200}, 
  "351": {x: 200, y: 400}, 
  "havane":{x: 200, y: 600},
  "bordeaux": {x:300, y:600}, 
  "342a":{x:300, y:700},
  "343": {x: 400, y: 200},
  "361": {x: 400, y: 350},
  "362":{x: 400, y: 500},
// level 2
  "253":{x: 400, y: 600},
  "252b": {x: 800, y: 200}, 
  "252a": {x: 800, y: 400}, 
  "251":{x: 800, y: 600},
  "maillot": {x:950, y:200},
  "241":{x: 1000, y: 200}, 
  "242a": {x: 1000, y: 400}, 
  "242b":{x: 1000, y: 600},
  "243":{x: 1000, y: 600},
  "blue":{x: 1000, y: 600},
  "undefined":{x: 1200, y: 200}};

/* Schedule element object */
function Sch (day, time, id) {
    this.day = day;
    this.starTime = time;
    this.amount = 1;
    this.types = [];
    this.id = "s" + id;
    this.radius = 20;
}

/* Map element object */
function MapElt (room, id) {
    this.room = room;
    this.amount = 1;
    this.types = [];
    this.id = "m" + id;
    this.radius = 20;
}

/* Sets the tick behaviour for each mode*/
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
      // vis.selectAll("circle").attr("r", d.radius);
      vis.selectAll("circle").attr("r", calculateR).each(function(d) { d.radius = calculateR(d) } );

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
      // vis.selectAll("circle").attr("r", d.radius);
      vis.selectAll("circle").attr("r", calculateR).each(function(d) { d.radius = calculateR(d) } );
      getMapPosition(k);
    }
  }
    //d3.selectAll("g").attr("x", function(d) { return d.x; })
      //  .attr("y", function(d) { return d.y; });
    d3.selectAll("g").attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";});

};
var nodes;

var toggleVisibility = function(force, key, value){
    force.selectAll("g").attr("visibility", function(d) {
      return d[key] === value ? "visible" : "hidden";
  });
}

/* Sets the position of each element in the schedule view*/
var getSchedulePosition = function (k) { 
  //calculate index
    force.nodes().forEach(function(o, i) {
      // undefined talks will end up in the 16th 
      var index = schIndex(o);

      o.y += (fociSchedule[index].y - o.y) * k;
      o.x += (fociSchedule[index].x - o.x) * k;
      
    });
}

/* Sets the position of each element in the map view*/
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

var collisionPadding = 5;

/* Determines how elements should collide
 */
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
}

//Gruops by schedule, day-time, to create later concentric circles in the schedule view
var groupSchedule = function () {

  var auxArray = [];
  var auxArray2 = [];

  var id = 0;
  var id2 = 0;

  force.nodes().forEach (function(o, i) {

    var create = true;
    if (auxArray.length > 0) {
      var index = indexInSchArray(auxArray, o);
      create = (index < 0);
    }

    if (create) {
      var sch = new Sch(o.day, o.starTime, id);
      id++;
      auxArray.push(sch);
    } else {
      auxArray[index].amount += 1;
      var indexType = auxArray[index].types.indexOf(o.type);
      if (indexType < 0) auxArray[index].types.push(o.type);
    }
  });
  
  // Creates all the entries in the array to have concentric circles
  auxArray.forEach(function(o, i) {
    var radius = 20;

    o.types.forEach(function(u,j) {
      var sch = new Sch(o.day, o.starTime, id2);
      sch.types.push(o.types[j]);
      sch.radius = radius;
      radius += 10;
      id2++;
      auxArray2.push(sch);
    });

  });

  return auxArray2.reverse();
}

// Returns the index position of a data element in the schedule view
var schIndex = function (o) {

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

  return index;

}

/* Given an array "a" and an object "o"
    Returns the position of "o" in "a"
    -1 otherwise 
  */
var indexInSchArray = function (a, o) {
  var i = 0;
  var found = false;
  var l = a.length;

  while (i < l && !found) {
    found = ((a[i].day === o.day) && (a[i].starTime === o.starTime));
    i++;
  }

  return found ? i-1 : -1 ;

}

// Gruops by room to create later concentric circles in the map view
var groupMap = function () {

  var auxArray = [];
  var auxArray2 = [];

  var id = 0;
  var id2 = 0;

  force.nodes().forEach (function(o, i) {

    var index = indexInMapArray(auxArray, o);
    var create = index < 0;
    if (create) {
      var mapElt = new MapElt(o.room, id);
      id++;
      auxArray.push(mapElt);
    } else {
      auxArray[index].amount += 1;
      var indexType = auxArray[index].types.indexOf(o.type);
      if (indexType < 0) auxArray[index].types.push(o.type);
    }

  });

  console.log(auxArray);

  // Creates all the entries in the array to have concentric circles
  auxArray.forEach(function(o, i) {
    var radius = 20;

    o.types.forEach(function(u,j) {
      var mapElt = new MapElt(o.room, id2);
      mapElt.types.push(o.types[j]);
      mapElt.radius = radius;
      radius += 10;
      id2++;
      auxArray2.push(mapElt);
    });

  });

  return auxArray2.reverse();
}

/* Given an array "a" and an object "o"
    Returns the position of "o" in "a"
    -1 otherwise 
  */
var indexInMapArray = function (a, o) {
  var i = 0;
  var found = false;
  var l = a.length;

  while (i < l && !found) {
    found = (a[i].room === o.room);
    i++;
  }

  return found ? i-1 : -1;

}