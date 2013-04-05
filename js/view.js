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