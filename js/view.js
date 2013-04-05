var xSchedule = 730;
var ySchedule = 200;
var xSpace = 280;
var ySpace = 220;
var differentTypes = ["altchi", "casestudy", "course", "panel", "paper", "SIG", "TOCHI"] ;

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

var generateLegend = function () {
    var items = [];
   $.each(getDifferentValuesForKey(data,"type"), function(i, item) {
          items.push('<li class="typesClass" style="background-color:' + fill(item) + '">' + item + '</li>');
   });  // close each()
   $(".types").html( items.join('') );
}


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
