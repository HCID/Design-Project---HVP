// Generated by CoffeeScript 1.3.3
(function() {

  window.TUIOHandler = (function() {
    var client, currentHands, fingers, onAddTuioCursor, onRemoveTuioCursor, onRemoveTuioHand, onUpdateTuioCursor, onUpdateTuioHand, once, showMenu, windowHeight, windowWidth;

    function TUIOHandler() {}

    windowHeight = $(window).height();

    windowWidth = $(window).width();

    showMenu = false;

    fingers = [];

    once = true;

    currentHands = [];

    client = new Tuio.Client({
      host: "http://localhost:5000"
    });

    onAddTuioCursor = function(addCursor) {
      var el, element, event;
      element = $(document.elementFromPoint(addCursor.xPos * windowWidth, addCursor.yPos * windowHeight));
      el = null;
      if (element.get(0).tagName === "circle" && !showMenu) {
        el = d3.select("#" + element.parents("g").attr("id") + " circle");
        event = document.createEvent("MouseEvent");
        event.initMouseEvent("mousedown", true, true, window, 1, addCursor.xPos * windowWidth, addCursor.yPos * windowHeight, addCursor.xPos * windowWidth, addCursor.yPos * windowHeight);
        el[0][0].dispatchEvent(event);
      } else {
        event = document.createEvent("MouseEvent");
        event.initMouseEvent("mousedown", true, true, window, 1, addCursor.xPos * windowWidth, addCursor.yPos * windowHeight, addCursor.xPos * windowWidth, addCursor.yPos * windowHeight);
        element.get(0).dispatchEvent(event);
      }
      return fingers[addCursor.sessionId] = {
        cursor: addCursor,
        el: el,
        fingerCircle: $("<div id='circle_" + addCursor.sessionId + "' style='background-color: yellow; opacity: 0.4; width: 44px; position: absolute; height: 44px; left: " + addCursor.xPos * windowWidth + "px; top: " + addCursor.yPos * windowHeight + "px; border-radius: 40px; '></div>").appendTo($("body"))
      };
    };

    onUpdateTuioCursor = function(updateCursor) {
      var event;
      if (fingers[updateCursor.sessionId]) {
        fingers[updateCursor.sessionId].cursor = updateCursor;
        fingers[updateCursor.sessionId].fingerCircle.css("left", (updateCursor.xPos * windowWidth) - 20 + "px");
        fingers[updateCursor.sessionId].fingerCircle.css("top", (updateCursor.yPos * windowHeight) - 25 + "px");
        if (fingers[updateCursor.sessionId].el) {
          event = document.createEvent("MouseEvent");
          event.initMouseEvent("mousemove", true, true, window, 1, updateCursor.xPos * windowWidth, updateCursor.yPos * windowHeight, updateCursor.xPos * windowWidth, updateCursor.yPos * windowHeight);
          return fingers[updateCursor.sessionId].el[0][0].dispatchEvent(event);
        }
      }
    };

    onRemoveTuioCursor = function(removeCursor) {
      var event;
      if (fingers[removeCursor.sessionId]) {
        if (fingers[removeCursor.sessionId].el) {
          event = document.createEvent("MouseEvent");
          event.initMouseEvent("mouseup", true, true, window, 1, removeCursor.xPos * windowWidth, removeCursor.yPos * windowHeight, removeCursor.xPos * windowWidth, removeCursor.yPos * windowHeight);
          fingers[removeCursor.sessionId].el[0][0].dispatchEvent(event);
        }
        fingers[removeCursor.sessionId].fingerCircle.remove();
        return fingers[removeCursor.sessionId] = null;
      }
    };

    onUpdateTuioHand = function(updateHand) {
      console.log(updateHand);
      if (updateHand.fingers.indexOf(-1) === -1) {
        if (!showMenu) {
          console.log(updateHand);
          $("#mainMenu").css("top", (updateHand.yPos * windowHeight) - 300 + "px").css("left", (updateHand.xPos * windowWidth) - 300 + "px").show();
          return showMenu = true;
        }
      }
    };

    onRemoveTuioHand = function(removeHand) {
      $("#mainMenu").hide();
      return showMenu = false;
    };

    client.on("addTuioCursor", onAddTuioCursor);

    client.on("updateTuioCursor", onUpdateTuioCursor);

    client.on("removeTuioCursor", onRemoveTuioCursor);

    client.on("updateTuioHand", onUpdateTuioHand);

    client.on("removeTuioHand", onRemoveTuioHand);

    client.connect();

    TUIOHandler.node_drag = d3.behavior.drag().on("dragstart", function(d) {}).on("drag", function(d, i) {
      d.px += d3.event.dx;
      d.py += d3.event.dy;
      d.x += d3.event.dx;
      return d.y += d3.event.dy;
    }).on("dragend", function(d) {
      return force.resume();
    });

    return TUIOHandler;

  })();

}).call(this);
