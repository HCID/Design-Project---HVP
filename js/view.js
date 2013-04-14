var differentTypes = ["altchi", "casestudy", "course", "panel", "paper", "SIG", "TOCHI"] ;
var filterHistory = [];

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
  
  if(mode === "free"){
    var n = force.nodes().length;
    var s = 0.2 * Math.sqrt((width*height)/n);
    return s;
  } else if ((mode === "schedule") || (mode === "map")) {
    return d.radius;
  } else {
    return 5;
  } 

}


var update = function () {

  nodes = vis.selectAll("g")
    .data(force.nodes(), function(d){ return d.id;} )
    
  var nodeEnterG = nodes.enter().append("g");

  nodeEnterG.attr("id", function(d, i){return "g" + d.id})
    .attr("class", "circle_class")
    
    // .call(d3.behavior.zoom().x(x).y(y).scaleExtent([1,8]).on("zoom",zoom))
    .append("circle")
    .on("mousedown", function(d){ circleClicked(d) } )
    .style("fill", function (d, i) {

      if (mode !== "free") {
        return fill(d.types[0]);
      } else {
        return fill(d["type"] );
      }
      
    })
    .style("stroke-width", 1)
    .style("stroke", "#ffffff")
    .call(node_drag);

  // nodeEnterG.append("text")
  //   .text(function(d) { 
  //     var displayName = d.name != undefined && d.name.length > 27 ? d.name.substring(0, 27) + "..." : d.name;
  //     console.log(displayName);
  //     return  displayName;
  //   });
  
  nodes.selectAll("circle").attr("r", calculateR).each(function(d) { d.radius = calculateR(d) } );


  nodes.exit().remove();
  force.start();
  
}


function addFilterHistory() {
  var toppy = 30 + ($("#filter_list li").size()*60);


  $("<li class='new_filter' id='filter_"+(filterHistory.length-1)+"' style='width: 200px; margin-top: 10px; list-style: none; height: 50px; background-color: red;  position: absolute; z-index: 100; border-radius: 10px; right: "+d3.event.clientX+"px; top: "+d3.event.clientY+"px;'><div class='remove_filter' style='float: left; height: 100%; width: 40px; padding-top: 0; font-size: 50px; font-family: arial; line-height: 0.8; color: #fff; margin-left: 12px;'>x</div><div style='font-family: arial; color: #fff; font-size: 20px; margin-top: 11px; display: block; float: left; width: 138px; height: 100%; padding-left: 10px'><span>"+filterHistory[filterHistory.length-1].name+"</span></div></li>").appendTo($("body")).animate({top: toppy+ "px", right: "30px"}, 1000, function () {
    $(this).appendTo($("#filter_list"));
    $(this).css("position", "static");
    $(this).css("float", "left");
    $(this).css("top", null);
    $(this).css("left", null);
  });

$(".remove_filter").on("mousedown", function () {
  var id = $(this).parent().attr("id").substring(7,$(this).parent().attr("id").length);
  $(this).parent().remove();
  _.forEach(filterHistory[id].data, function(d) {
    force.nodes().push(d);
  });
  delete filterHistory[id];
  update();
});
}
