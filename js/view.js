var differentTypes = ["altchi", "casestudy", "course", "panel", "paper", "SIG", "TOCHI"] ;
var circlesThreshold = 30;
var filterHistory = [];
/* Colors */
var colors = {
  bordeaux: {
    color: "#98343c", // 152 52 60
    rooms: ["bordeaux", "342a", "343", "361", "362/363"]
  },  
  havane: { 
    color: "#d3783c", // 211 120 60
    rooms: ["havane", "351", "352ab"] 
  }, 
  bleu: {
    color: "#1b5576", // 27 85 118
    rooms: ["blue", "241", "242ab", "242a", "242b", "243"]
  }, 
  green: {
    color: "#265e30", // 38 94 48
    rooms: ["251", "252a", "252b", "253"]
  },
  interact: { 
    color: "#61447a", // 97 68 122
    rooms: []
  },
  chi: {
    color: "#2a276d", // 42 39 109
    rooms: []
  },
  grand: {
    color: "#f1d32e", // 241 211 46
    rooms: ["grand"]
  }
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
  _.each(colors, function(item, key) {
          items.push(_.template($("#template_legend_item").html(), {color: item.color, name: key }));
   });  // close each()
   $(".types").html( items.join("") );
}


var generateSessionTitle = function (d) {
  console.log(" title append");
  $("body").append(_.template($("#template_session_title"), {title: d}));
}


var calculateR = function (d) {
  
  if(mode === "free"){
    var n = force.nodes().length;
    if (n >100) {
      return 21;
    } else {
      var s = 0.2 * Math.sqrt((width*height)/n);
      return s;
    }
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

      if (mode === "sessions" | mode === "map") { 
        console.dir(d);
        return "#123456"
        //return sessionsColors(d);
      } else if (mode === "free") {
        return sessionsColors(d.sessions[0]);
      } else {
        return "#123456";
      }
      // else if (mode !== "free") {
      //   return fill(d.types[0]);
      // } else {
      //   return fill(d["type"] );
      // }
      
    })
    .style("stroke-width", 1)
    .style("stroke", "#ffffff")
    .call(TUIOHandler.node_drag);

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
    $('.talkName').show();
  
  nodes.selectAll("circle").attr("r", calculateR).each(function(d) { d.radius = calculateR(d) } );


  nodes.exit().remove();
  force.start();
  
}


function addFilterHistory() {
  var toppy = 30 + ($("#filter_list li").size()*60);

  var templateVariables = {
    id: "filter_" + (filterHistory.length-1), 
    name: filterHistory[filterHistory.length-1].name 
  };
  $(_.template($("#template_filter_item").html(), templateVariables)).css("right", d3.event.clientX).css("top", d3.event.clientY).appendTo($("body")).animate({top: toppy+ "px", right: "30px"}, 1000, function () {
    $(this).appendTo($("#filter_list"));
    $(this).css("position", "static");
    $(this).css("float", "left");
    $(this).css("top", null);
    $(this).css("left", null);
  });

$(".remove_filter").on("mousedown", function () {
  var id = $(this).parent().attr("id").substring(7,$(this).parent().attr("id").length);
  $(this).parent().remove();
  if(filterHistory[id]) {
    _.forEach(filterHistory[id].data, function(d) {
      force.nodes().push(d);
    });
  }
  delete filterHistory[id];
  update();
});
}

/* Decides the color of the session depending on the room */
var sessionsColors = function (d) {
  if (d.room === "undefined") return "#ffffff";
  return _.find(colors, function(color) { return _.contains(color.rooms, d.room) }).color
}
