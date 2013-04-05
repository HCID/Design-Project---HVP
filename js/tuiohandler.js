//////////// PATRIK'S TUIO CORNER  ///////////////////
var windowHeight = $(window).height();
var windowWidth = $(window).width();
var showMenu = false;


console.log(window);

var fingers = [];

var once = true;
var client = new Tuio.Client({
    host: "http://localhost:5000"
}),







onAddTuioCursor = function(addCursor) {





var element = $(document.elementFromPoint(addCursor.xPos*windowWidth, addCursor.yPos*windowHeight)); 
var el = null;
if(element.get(0).tagName == "circle" && !showMenu) {
  console.log(element.parents("g").attr("id"));

  el = d3.select("#" + element.parents("g").attr("id") + " circle");

console.log(el);
var event = document.createEvent("MouseEvent");
event.initMouseEvent("mousedown",true,true, window, 1, addCursor.xPos * windowWidth, addCursor.yPos * windowHeight,addCursor.xPos * windowWidth, addCursor.yPos * windowHeight);
el[0][0].dispatchEvent(event);

  
} else {
var event = document.createEvent("MouseEvent");
event.initMouseEvent("mousedown",true,true, window, 1, addCursor.xPos * windowWidth, addCursor.yPos * windowHeight,addCursor.xPos * windowWidth, addCursor.yPos * windowHeight);
element.get(0).dispatchEvent(event);
  
}
  fingers[addCursor.sessionId] = {
    cursor: addCursor,
    el: el,
    fingerCircle: $("<div id='circle_" + addCursor.sessionId + "' style='background-color: yellow; opacity: 0.4; width: 44px; position: absolute; height: 44px; left: " + addCursor.xPos*windowWidth + "px; top: " + addCursor.yPos*windowHeight + "px; border-radius: 40px; '></div>").appendTo($("body"))
  };



// gabriel.scherer@gmail.com

},

onUpdateTuioCursor = function(updateCursor) {
  
//console.log("x: " + updateCursor.xPos*windowWidth + ", y: " + updateCursor.yPos*windowHeight)

  if(fingers[updateCursor.sessionId]) {
    fingers[updateCursor.sessionId].cursor = updateCursor;
    fingers[updateCursor.sessionId].fingerCircle.css("left", (updateCursor.xPos*windowWidth)-20 + "px");
    fingers[updateCursor.sessionId].fingerCircle.css("top", (updateCursor.yPos*windowHeight)-25 + "px");
    if (fingers[updateCursor.sessionId].el) {
      var event = document.createEvent("MouseEvent");
      event.initMouseEvent("mousemove",true,true, window, 1, updateCursor.xPos*windowWidth, updateCursor.yPos*windowHeight,updateCursor.xPos*windowWidth, updateCursor.yPos*windowHeight);
      fingers[updateCursor.sessionId].el[0][0].dispatchEvent(event);
     // fingers[updateCursor.sessionId].el.on("drag")();
/*  
console.log(fingers[updateCursor.sessionId].el);
  var d = fingers[updateCursor.sessionId].el;



if(d.px == NaN) {
  d.px = 0;
}

if(d.py == NaN) {
  d.py = 0;
}

if(d.x == NaN) {
  d.x = 0;
}

if(d.y == NaN) {
  d.y = 0;
}


  var dx = parseFloat(updateCursor.xPos*$(window).width()) - parseFloat(d.x);
  var dy = parseFloat(updateCursor.yPos*$(window).height()) - parseFloat(d.y);
    
console.log(d.x);

  d.px += dx;
    d.py += dy;
    d.x  += dx;
    d.y  += dy; 
    tick(); 

*/
    }
  }
},

onRemoveTuioCursor = function(removeCursor) {
  //console.log(removeCursor);
    if(fingers[removeCursor.sessionId]) {
      if (fingers[removeCursor.sessionId].el) {
      var event = document.createEvent("MouseEvent");
      event.initMouseEvent("mouseup",true,true, window, 1, removeCursor.xPos*windowWidth, removeCursor.yPos*windowHeight,removeCursor.xPos*windowWidth, removeCursor.yPos*windowHeight);
      fingers[removeCursor.sessionId].el[0][0].dispatchEvent(event);
     
    }
      fingers[removeCursor.sessionId].fingerCircle.remove();
      fingers[removeCursor.sessionId] = null;      
    }
      
    
    
  
},

onAddTuioObject = function(addObject) {
    console.log(addObject);
},

onUpdateTuioObject = function(updateObject) {
    //console.log(updateObject);
},

onRemoveTuioObject = function(removeObject) {
    //console.log(removeObject);
},

onAddTuioHand = function(addHand) {





},

onUpdateTuioHand = function(updateHand) {
if(updateHand.fingers.indexOf(-1) === -1 ) {
if(!showMenu) {
console.log(updateHand)

  $("#mainMenu").css("top", (updateHand.yPos*windowHeight)-300 + "px").css("left", (updateHand.xPos*windowWidth)-300 + "px").show()
showMenu = true
}
  
}

},

onRemoveTuioHand = function(removeHand) {
    //console.log(removeHand);
$("#mainMenu").hide()
showMenu = false
},

onRefresh = function(time) {
  //console.log(time);
};

client.on("addTuioCursor", onAddTuioCursor);
client.on("updateTuioCursor", onUpdateTuioCursor);
client.on("removeTuioCursor", onRemoveTuioCursor);
client.on("addTuioObject", onAddTuioObject);
client.on("updateTuioObject", onUpdateTuioObject);
client.on("removeTuioObject", onRemoveTuioObject);
client.on("addTuioHand", onAddTuioHand);
client.on("updateTuioHand", onUpdateTuioHand);
client.on("removeTuioHand", onRemoveTuioHand);
client.on("refresh", onRefresh);
client.connect();


console.log(d3.behavior.drag());

var node_drag = d3.behavior.drag()
        .on("dragstart", function(d){ /* d.fixed = true; */})
        .on("drag", function(d, i){ 

         // d.x = d3.event.x // +=
          //  d.y = d3.event.y // +=
           /* d3.select(this).attr("transform", function(d,i){
                return "translate(" + [ d.x,d.y ] + ")"
            })*/

        d.px += d3.event.dx;
    d.py += d3.event.dy;
    d.x += d3.event.dx;
    d.y += d3.event.dy; 
  //  tick(); 


           

        })
        .on("dragend", function(d){ /* d.fixed = false; */ force.resume() });




//////////// PATRIK'S TUIO CORNER ENDS HERE ///////////////////
