var gCom = {
  'coms': [],
  'amount': 0,
  'id': 0
};

/* GCom element object */
function GCom (coms, id) {
    this.coms = coms;
    this.amount = 0;
    this.id = id;
}

var communities = function() {

  var gComs = [];
  var id = 0;
  force.nodes().forEach(function(d) {

    if (gComs.length == 0) {
      var comms = d.communities ? d.communities : [];
      var gCom = new GCom(comms, id);
      gCom.amount = 1
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
        var comms = d.communities ? d.communities : [];
        var gCom = new GCom(comms, id);
        gCom.amount = 1
        id++;
        gComs.push(gCom);
      }

    }

  })

  var commNodes = createCommNodesArray(gComs);

}


/* Compare to communities arrays */
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

/*  Creates the array of nodes for the visualization.
    The nodes in this case are intersections
  */
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
  var id = 0;
  var groups = [];
  var preGroups = ["general", "sustainability", "hci4d", "games", "cci", "arts", "health", "management"];

  // Decides which pregroups should be listed
  for (var i=0; i < preGroups.length; i++) {
    var str = preGroups[i];
    var found = false;

    if (str === "general") {
      found = commExists("", a);
    } else {
      found = commExists(str, a);
    }

    if (found) {
      var gCom = new GCom([], id);
      id++;
      array.push(gCom);
      groups.push(str);
    }
  }


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
      var c = new GCom(d.coms, id);
      c.amount = d.amount;
      id++;
      array.push(c);
    }
  });

  // Info to fill and use later
  var vennData = [];
  for (var i=0; i<Math.pow(2, groups.length); i++) {
    vennData[i] = 0;
  }

  t = 1;

  // Creates the array of intersections
  array.forEach(function (d) {

    var i1 = 0;
    var i2 = 0;
    var i3 = 0;
    var i4 = 0;
    
    if (d.coms.length == 0) {
      i1 = t << 0; 
      vennData[i1] = 8;
    } else if (d.coms.length == 1) {
      i1 = t << groups.indexOf(d.coms[0]);
      vennData[i1] = 8;
    } else if (d.coms.length == 2) {
      i1 = t << groups.indexOf(d.coms[0]);
      i2 = t << groups.indexOf(d.coms[1]);
      vennData[i1|i2] = 6;
    } else if (d.coms.length == 3) {
      i1 = t << groups.indexOf(d.coms[0]);
      i2 = t << groups.indexOf(d.coms[1]);
      i3 = t << groups.indexOf(d.coms[2]);
      vennData[i1|i2|i3] = 4;
    } else if (d.coms.length == 4) {
      i1 = t << groups.indexOf(d.coms[0]);
      i2 = t << groups.indexOf(d.coms[1]);
      i3 = t << groups.indexOf(d.coms[2]);
      i4 = t << groups.indexOf(d.coms[3]);
      vennData[i1|i2|i3|i4] = 4;
    }

  });

  //Draws the VennEuler diagram
  drawVennEuler(vennData, groups);
};

/* Given a data and the posible groups, draws the diagram 
   vn: array of intersections
   gr: array of groups
  */
var drawVennEuler = function (vn, gr) {
  var venn = d3.layout.venn().size([window.screen.availWidth, window.screen.availHeight]);
  var circle = d3.svg.arc().innerRadius(0).startAngle(0).endAngle(2*Math.PI);
  
  vis = d3.select("body").select("svg")
    .data([vn])
      .attr("width", width).attr("height", height);

  var vennSpace = 100;

  var circles = vis.selectAll("g.arc")
      .data(venn)              
    .enter().append("g")
      .attr("class", "arc")
      .attr("transform", function(d, i){ return "translate(" + (d.x) + "," + (vennSpace + d.y) + ")"; })
      .attr("id", function(d, i) { return gr[i]; })
      .attr("idPx", function(d) { return d.x; });
  circles.append("path")
      .attr("fill", function(d, i) { return fill2(i); })
      .attr("opacity", 0.5)
      .attr("id", function(d, i) { return gr[i]; })
      .on("mousedown", vennClick)
      .attr("d", circle);
  circles.append("text")
      .attr("text-anchor", "middle")
      .text(function(d, i) { return gr[i]; })
      .style("font-size", 35)
      .attr("fill", function(d, i) { return "#ffffff";})
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


/* Decides if the element b is inside the array */
var containsElement = function (array, b) {

  var i = 0;
  var found = false;

  while ((i < array.length) && !found) {
    found = (array[i].toLowerCase() === b.toLowerCase());
    i++;
  }
  return found;
}

/* Tells if a point is inside a circle path or not */
var pointInCirclePath = function (b, p) {

  var cX  = parseFloat(b.attr("transform").split(",")[0].split("(")[1]);
  var cY  = parseFloat(b.attr("transform").split(",")[1].split(")")[0]);
  var radius = b.get(0).getBBox().height / 2;
  //distance between two points
  var xs = 0;
  var ys = 0;
 
  xs = cX - p.pageX;
  xs = xs * xs;
 
  ys = cY - p.pageY;
  ys = ys * ys;

  var distance = Math.sqrt( xs + ys );
  
  return (distance <= radius);
}

/* Decides if a community exists or not in a coleccion of talks
   c = "community"
   a = array
*/
var commExists = function(c, a) {

  var found = false;
  var i = 0;
  var l = a.length;
  
  if (c !== "") {
    while (i < l && !found) {
      found = (a[i].coms.indexOf(c) >= 0);
      i++;
    }
  } else {
    while (i < l && !found) {
      found = (a[i].coms.length == 0);
      i++;
    }
  }
  return found;
}
