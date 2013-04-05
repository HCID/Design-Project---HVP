
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
  }
    vis.selectAll("circle").attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

};
var nodes;


var calculateR = function (d) {
  if(mode == "free"){
    var n = force.nodes().length;
    var s = 0.3 * Math.sqrt((width*height)/n);
    return s;
  } else {
    return 5;
  } 
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
  force.on("tick", tick);
  update();
  force.start();
      var items = [];
     $.each(getDifferentValuesForKey(data,"type"), function(i, item) {
            items.push('<li class="typesClass" style="background-color:' + fill(item) + '">' + item + '</li>');
     });  // close each()
     $(".types").html( items.join('') );
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


var filterJSON = function(json, key, value) {
  var result = [];
  json.forEach(function (row) {
    if (row[key] === value) {
      result.push(row);
    }
  })
  return result;
}

var toggleVisibility = function(force, key, value){
    force.selectAll("g").attr("visibility", function(d) {
      return d[key] === value ? "visible" : "hidden";
  });
}

var countDifferentValuesForKey = function(json, key) {
  var differentValues = [];
  
  json.forEach(function (row) {
    if (differentValues.indexOf(row[key]) == -1) {
      differentValues.push(row[key]);
    }
  })
  return differentValues.length;
}

var getDifferentValuesForKey = function(json, key) {
  var differentValues = [];
  json.forEach(function (row) {
    if (differentValues.indexOf(row[key]) == -1) {
      differentValues.push(row[key]);
    }
  })
  return differentValues;
}

var groupJSON = function (json, key) { 

  var differentValues = [];
  
  json.forEach(function (row) {
    if (differentValues.indexOf(row[key]) == -1) {
      differentValues.push(row[key]);
    }
  })
  number =  differentValues.length;

  // Creating the number force arrays inside the forceData
  forceData = [];

  for (var i=0;i<number;i++) { 
    forceData.push([]);
    json.forEach(function (row) {
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

/*var communities = function() {

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

}*/

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

    var i1 = 0;
    var i2 = 0;
    var i3 = 0;
    var i4 = 0;
  
    if (d.coms.length == 0) { //general
      i1 = t << 0; 
      vennData[i1] = 8;//0;//d.amount;
    } else if (d.coms.length == 1) {
      i1 = t << groups.indexOf(d.coms[0]);
      vennData[i1] = 8;//d.amount/2;
    } else if (d.coms.length == 2) {
      i1 = t << groups.indexOf(d.coms[0]);
      i2 = t << groups.indexOf(d.coms[1]);
      vennData[i1|i2] = 6;//d.amount/2;
    } else if (d.coms.length == 3) {
      i1 = t << groups.indexOf(d.coms[0]);
      i2 = t << groups.indexOf(d.coms[1]);
      i3 = t << groups.indexOf(d.coms[2]);
      vennData[i1|i2|i3] = 4;//d.amount/2;  
    } else if (d.coms.length == 4) {
      i1 = t << groups.indexOf(d.coms[0]);
      i2 = t << groups.indexOf(d.coms[1]);
      i3 = t << groups.indexOf(d.coms[2]);
      i4 = t << groups.indexOf(d.coms[3]);
      vennData[i1|i2|i3|i4] = 4;//d.amount/2;
    }

  });


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
