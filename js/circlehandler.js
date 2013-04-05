var height = $(window).height();
var width = $(window).width();
var xSchedule = 730;
var ySchedule = 200;
var xSpace = 280;
var ySpace = 220;

var foci = [{x: 200, y: 200}, {x: 350, y: 250}, {x: 700, y: 400}];
var fociFree = [{x: width/2, y: height/2}];

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
  }
    vis.selectAll("circle").attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

};
var nodes;

var toggleVisibility = function(force, key, value){
    force.selectAll("g").attr("visibility", function(d) {
      return d[key] === value ? "visible" : "hidden";
  });
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
}
