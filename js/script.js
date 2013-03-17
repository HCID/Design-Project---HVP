var data = [],
    height = window.screen.availHeight,
	  width = window.screen.availWidth,
    grouping = 2;
    rScale = d3.scale.sqrt().range([0, 15]),
    fill = d3.scale.category20();
  

var tick = function (e) {
  var k = 10 * e.alpha;
   d3.selectAll("g.circle_class")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })   		    
};
    
var twoFuntion = function () {
  grouping = 2;
  var force = [];

  for (var i=0;i<grouping;i++) { 
  
    force[i] = d3
    .layout
    .force()
    .gravity(0.3)
    .distance(500)
    .charge(function (d) { return d.forceR ? d.forceR*-4 : -35; } )
    .on("tick", tick)

  }
  
  // Array of forces 
  var forceData = []; 

  // Creating the number force arrays inside the forceData
  for (var i=0;i<grouping;i++) { 
    forceData.push([]);
  }

  // Setting the data in each array
  data.forEach(function(o, i) {
    if( i % 2) {
      forceData[0].push(o);
    } else {
      forceData[1].push(o);
    }
  });

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
    circleSelection[i] = d3.select("body").select("svg").append("g").attr("id", function(d) { return "our_id" + i;}).selectAll("g").data(force[i].nodes(), function (d) {return d.id; } );
  }

  // Creating the g > circle inside the big groups
  for (var j=0;j<grouping;j++) { 
    circleSelection[j].enter().append("g")
      .attr("id", function(d, i){return d.id;})
      .attr("class", "circle_class")
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

  d3.select("#our_id0").attr("transform", "translate(-380, -100)");
  d3.select("#our_id1").attr("transform", "translate(300, -100)");          
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
 
function yay () {
  d3.json('data/data.json', function (importedData) {
    data = importedData;
    minCollisionRadius = 5,
    maxDomainValue = d3.max(data, function(d) {
      return d.bookmarks;
    });
    rScale.domain([0, maxDomainValue]);
    twoFuntion();
  });
}

		
