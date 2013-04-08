var gCom = {
  'coms': [],
  'amount': 0,
  'id': 0
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

  drawVennEuler(vennData, groups);
};

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
      .attr("fill", function(d, i) { return fill(i); })
      .attr("opacity", 0.5)
      .attr("id", function(d, i) { return gr[i]; })
      .on("mousedown", vennClick)
      .attr("d", circle);
  circles.append("text")
      .attr("text-anchor", "middle")
      .text(function(d, i) { return gr[i]; })
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



var containsElement = function (array, b) {

  var i = 0;
  var found = false;

  while ((i < array.length) && !found) {
    found = (array[i].toLowerCase() === b.toLowerCase());
    i++;
  }
  return found;
}

var vennClick = function (e, d, f, g) {

  var array = [];

  $list = $('svg g').filter(function() {

    var bbox = $(this).get(0).getBBox();
    if (pointInCirclePath($(this), d3.event)) {
      array.push($(this).get(0).id);
    }
  });

  //TODO: return array to successive steps
  console.log(array);
}

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
