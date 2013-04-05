
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


var toggleVisibility = function(force, key, value){
    force.selectAll("g").attr("visibility", function(d) {
      return d[key] === value ? "visible" : "hidden";
  });
}
