var data = [],
    height = window.screen.availHeight,
	  width = window.screen.availWidth,
    grouping = 3;
    rScale = d3.scale.sqrt().range([0, 15]),
    fill = d3.scale.category20();
  
// Array of forces 
var forceData = [];
var circleSelection = [];
var force = [];
var selectedData = [];

var x = d3.scale.linear().domain([0, width]).range([0, width]),
    y = d3.scale.linear().domain([0, height]).range([0, height]);

var tick = function (e) {
  var k = 10 * e.alpha;
   d3.selectAll("g.circle_class")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })   		    
};

  
var split = function (dt, number) { 

  // Creating the number force arrays inside the forceData
  forceData = [];
  for (var i=0;i<number;i++) { 
    forceData.push([]);
  }

  if (number == 1) {
    forceData[0] = dt.slice(0);
  } else if (number == 2) {
    
    dt.forEach(function(o, i) {
      if( (i % number)==0) {
        forceData[0].push(o);
      } else {
        forceData[1].push(o);
      }
    });

  } else if (number == 3) {
    
    dt.forEach(function(o, i) {
      if( (i % number)==0) {
        forceData[0].push(o);
      } else if( (i % number)==1) {
        forceData[1].push(o);
      } else {
        forceData[2].push(o);
      }
    });

  }
  // Setting the data in each array
  
};

// // zoom in / out
// function zoom(d) {

//   console.log("zooming");
//   //vis.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
//   console.log(circleSelection[0].selectAll("g").selectAll("circle"));
//   var nodes = circleSelection[0].selectAll("g").selectAll("circle");
//   nodes.attr("transform", transform);

//   // Update the links...
//   // var link = vis.selectAll("path.link");
//   // link.attr("d", translate);

//   // Enter any new links at hte parent's previous position
//   //link.attr("d", function(d) {
//   //      var o = {x: d.x0, y: d.y0};
//   //      return diagonal({source: o, target: o});
//   //    });
// } 

// function transform(d) {
//   console.log("transform");
//   return "translate(" + x(d.y) + "," + y(d.x) + ")";
// }

// function translate(d) {
//     console.log("translate");

//   var sourceX = x(d.target.parent.y);
//   var sourceY = y(d.target.parent.x);
//   var targetX = x(d.target.y);
//   var targetY = (sourceX + targetX)/2;
//   var linkTargetY = y(d.target.x0);
//   var result = "M"+sourceX+","+sourceY+" C"+targetX+","+sourceY+" "+targetY+","+y(d.target.x0)+" "+targetX+","+linkTargetY+"";
//         //console.log(result);

//   return result;
// }

// Restarts the data
var restart = function() {

  selectedData = [];
  selectedData = data.slice(0);

  var t = d3.select("body").select("svg");
  // $(t).fadeOut(400);
  
  clean();

  grouping = 3; // TODO: it should be 1 or data.length. I'm not sure yet
  twoFuntion();

};

var clean = function () {

  var t = d3.select("body").select("svg");
  // $(t).fadeOut(400);

  for (var i=0;i<grouping;i++) { 
    t.selectAll("#our_id"+i).transition().duration(2000).style("opacity", 0);
  }

  // setTimeout(function(){
  for (var i=0;i<grouping;i++) { 
    // circleSelection[i].remove();
    t.selectAll("#our_id"+i).remove();
  }
  // }, 500);

}

var circleClicked = function(dt){

  console.log("circleClicked #" + dt.id);
  console.log(dt);
  console.log(circleSelection);

  //guessing in which array the element is placed 
  var n = dt.id % grouping;
  console.log("n " + n);
  
  // kind of works
  console.log(circleSelection[n].selectAll("g").selectAll("#"+dt.id));
  circleSelection[n].selectAll("g").selectAll("#"+dt.id).attr("transform", "translate(-10,-20)");
  circleSelection[n].selectAll("g").selectAll("#"+dt.id).select("circle").attr("transform", "scale(4)");

  selectedData = [];
  selectedData = forceData[n].slice(0);
  console.log("selectedData " + selectedData.length);
  // d3.select("body").remove();
  
  clean();
  
  // t.transition().duration(500).style("opacity", 1);

  grouping = 1;
  twoFuntion();

};

var twoFuntion = function () {
  console.log("twoFuntion");

  force = [];
  for (var i=0;i<grouping;i++) { 
    
    force[i] = [];
    force[i] = d3
    .layout
    .force()
    .gravity(0.15)
    .distance(500)
    .charge(function (d) { return d.forceR ? d.forceR*-4 : -35; } )
    .on("tick", tick);

  }
  
  console.log("selectedData twoFuntion" + selectedData.length);
  //Time for spliting data or filtering
  split(selectedData, grouping);

  console.log("forceData " + selectedData.length);

  // Configuring forces
  for (var i=0;i<grouping;i++) {   
    force[i].nodes(forceData[i]);
    force[i].size([width,height]);
  }
      
  force.forEach(function(o) {
    o.nodes().forEach(function(d, i) {
      d.forceR = Math.max(5, 20);
    });
  });
         
  circleSelection = [];
  
  // Starting forces
  for (var i=0;i<grouping;i++) { 
    force[i].start();
  }
  
  // Creating the big groups
  for (var i=0;i<grouping;i++) { 
    circleSelection[i] = d3
    .select("body")
    .select("svg")
      .append("g")
      .attr("id", function(d) { return "our_id" + i;})
      // "idea" -> create "path" instead of "g"
      // .attr("d","M150 0 L75 200 L225 200 Z") //fix the shape
        .selectAll("g")
        .data(force[i].nodes(), function (d) {return d.id; } );
  }

  // Creating the g > circle inside the big groups
  for (var j=0;j<grouping;j++) { 
    circleSelection[j].enter().append("g")
      .attr("id", function(d, i){return d.id;})
      .attr("class", "circle_class")
      .on("click", function(d){ circleClicked(d) } )
      // .call(d3.behavior.zoom().x(x).y(y).scaleExtent([1,8]).on("zoom",zoom))
      .append("circle")
      .attr("r", function (d) {
        return d.forceR;})
      .style("fill", function (d, i) {
        return fill(i);})
      .style("stroke-width", 2)
      .style("stroke", function(d, i) { return d3.rgb(fill(i)).darker(2); })
      .call(force[j].drag); 

    circleSelection[j].exit().remove();
  }         
  
  // Custom positioning
  // Don't put into a loop
  if (grouping == 1) {
    d3.select("#our_id0").attr("transform", "translate(-380, -100)");
  } else if (grouping == 2) {
    d3.select("#our_id0").attr("transform", "translate(-380, -100)");
    d3.select("#our_id1").attr("transform", "translate(300, -100)"); 
  
  } else if (grouping == 3) {
    d3.select("#our_id0").attr("transform", "translate(-380, -100)");
    d3.select("#our_id1").attr("transform", "translate(300, -100)");
    d3.select("#our_id2").attr("transform", "translate(100, -200)"); 
  }
           
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
});
 
$(documenmt).ready(function() {
  d3.json('data/data.json', function (importedData) {
    data = importedData;
    console.log("selectedData " + selectedData.length);
    minCollisionRadius = 5,
    maxDomainValue = d3.max(data, function(d) {
      return d.bookmarks;
    });
    rScale.domain([0, maxDomainValue]);
    restart();
  });
})



function filterJSON(json, key, value) {
  var result = {};
  for (var index in json) {
    if (json[index][key] === value) {
      result[index] = json[index];
    }
  }
  return result;
}