var differentTypes = ["altchi", "casestudy", "course", "panel", "paper", "SIG", "TOCHI"] ;
var filterHistory = [];
/* Colors */

var bordeaux = "#98343c";// 152 52 60
var havane = "#d3783c";// 211 120 60
var bleu = "#1b5576";// 27 85 118
var green = "#265e30";// 38 94 48
var interact = "#61447a";// 97 68 122
var chi = "#2a276d";// 42 39 109
var grand = "#f1d32e";// 241 211 46



// Changes the background image
function changeImage() {
  if (mode == "schedule") {
      d3.select("body").select("svg").select("image")
        .attr("xlink:href", "/img/schedule.svg")
        .attr("opacity", 1);
      // document.getElementById("image").src="img/schedule.svg";
  } else if (mode == "map") {
      d3.select("body").select("svg").select("image")
        // .attr("xlink:href", "/img/map_bg.svg")
        .attr("xlink:href", "/img/mapLevels.png")
        .attr("opacity", 1);
      // document.getElementById("image").src="img/schedule.svg";
  } else if (mode == "sessions") {
      d3.select("body").select("svg").select("image")
        .attr("xlink:href", "/img/sessions.png")
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
  } else if (mode === "sessions") {
    return 25;
  } else {
    return 25;
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

      if (mode === "sessions") { 
        return sessionsColors(d);
      } else if (mode !== "free") {
        return fill(d.types[0]);
      } else {
        return fill(d["type"] );
      }
      
    })
    .style("stroke-width", 1)
    .style("stroke", "#ffffff")
    .call(node_drag);

    console.log("force.nodes().length: " + force.nodes().length);
    // if(force.nodes().length < 11){
    //   nodeEnterG.append("text")
    //     .attr("class", "talkName")
    //     .text(function(d) { 
    //       if(d.name!=undefined){
    //         console.log(d.namex    //         var words = d.name.split(" ");
    //         var displayName =  words[0] + " " + words[1] + " " + words[2] + " " + words[3] + "...";
            
    //         console.log(displayName);
    //         return  displayName;
    //       }
          
    //     });
    // }

    nodeEnterG.append("text")
      .attr("class", "talkName")
      .style("fill", "#ffffff")
      .style("font-family", "Gill Sans")
      .style("text-anchor", "middle")
      .text(function(d) { 
        if((d.code != undefined) || (d.code !== "undefined")){
          return  d.code;
        } else {
          return "K";
        }
        
    });

  
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

/* Decides the color of the session depending on the room */
var sessionsColors = function (d) {

  if (d.room === "undefined") return "#ffffff";
  else if ((d.room === "blue") || (d.room === "241") || (d.room === "242ab") || (d.room === "242a") || (d.room === "242b") || (d.room === "243")) return bleu;
  else if ((d.room === "251") || (d.room === "252a") || (d.room === "252b") || (d.room === "253")) return green;
  else if ((d.room === "bordeaux") || (d.room === "342a") || (d.room === "343") || (d.room === "361") || (d.room === "362/363")) return bordeaux;
  else if ((d.room === "havane") || (d.room === "351") || (d.room === "352ab")) return havane;
  else if (d.room === "grand") return grand;

}
