class window.TUIOHandler
  windowHeight = $(window).height()
  windowWidth = $(window).width()
  showMenu = false
  fingers = []
  once = true
  currentHands = [];
  client = new Tuio.Client(host: "http://localhost:5000")
  onAddTuioCursor = (addCursor) ->
    element = $(document.elementFromPoint(addCursor.xPos * windowWidth, addCursor.yPos * windowHeight))
    el = null
    if element.get(0).tagName is "circle" and not showMenu    
      el = d3.select("#" + element.parents("g").attr("id") + " circle")
      event = document.createEvent("MouseEvent")
      event.initMouseEvent "mousedown", true, true, window, 1, addCursor.xPos * windowWidth, addCursor.yPos * windowHeight, addCursor.xPos * windowWidth, addCursor.yPos * windowHeight
      el[0][0].dispatchEvent event
    else
      event = document.createEvent("MouseEvent")
      event.initMouseEvent "mousedown", true, true, window, 1, addCursor.xPos * windowWidth, addCursor.yPos * windowHeight, addCursor.xPos * windowWidth, addCursor.yPos * windowHeight
      element.get(0).dispatchEvent event
    fingers[addCursor.sessionId] =
      cursor: addCursor
      el: el
      fingerCircle: $("<div id='circle_" + addCursor.sessionId + "' style='background-color: yellow; opacity: 0.4; width: 44px; position: absolute; height: 44px; left: " + addCursor.xPos * windowWidth + "px; top: " + addCursor.yPos * windowHeight + "px; border-radius: 40px; z-index:9999999; '></div>").appendTo($("body"))


  onUpdateTuioCursor = (updateCursor) ->
    if fingers[updateCursor.sessionId]
      fingers[updateCursor.sessionId].cursor = updateCursor
      fingers[updateCursor.sessionId].fingerCircle.css "left", (updateCursor.xPos * windowWidth) - 20 + "px"
      fingers[updateCursor.sessionId].fingerCircle.css "top", (updateCursor.yPos * windowHeight) - 25 + "px"
      if fingers[updateCursor.sessionId].el
        event = document.createEvent("MouseEvent")
        event.initMouseEvent "mousemove", true, true, window, 1, updateCursor.xPos * windowWidth, updateCursor.yPos * windowHeight, updateCursor.xPos * windowWidth, updateCursor.yPos * windowHeight
        fingers[updateCursor.sessionId].el[0][0].dispatchEvent event


  onRemoveTuioCursor = (removeCursor) ->
    if fingers[removeCursor.sessionId]
      if fingers[removeCursor.sessionId].el
        event = document.createEvent("MouseEvent")
        event.initMouseEvent "mouseup", true, true, window, 1, removeCursor.xPos * windowWidth, removeCursor.yPos * windowHeight, removeCursor.xPos * windowWidth, removeCursor.yPos * windowHeight
        fingers[removeCursor.sessionId].el[0][0].dispatchEvent event
      fingers[removeCursor.sessionId].fingerCircle.remove()
      fingers[removeCursor.sessionId] = null


  onUpdateTuioHand = (updateHand) ->
    if updateHand.fingers.indexOf(-1) is -1
      h = new Hand(updateHand)
      console.log(h)
      #currentHands.push(h)
      unless showMenu        
        $("#mainMenu").css("top", (updateHand.yPos * windowHeight) - 300 + "px").css("left", (updateHand.xPos * windowWidth) - 300 + "px").show()
        showMenu = true

  onRemoveTuioHand = (removeHand) ->
  
    $("#mainMenu").hide()
    showMenu = false



  client.on "addTuioCursor", onAddTuioCursor
  client.on "updateTuioCursor", onUpdateTuioCursor
  client.on "removeTuioCursor", onRemoveTuioCursor
  client.on "updateTuioHand", onUpdateTuioHand
  client.on "removeTuioHand", onRemoveTuioHand
  client.connect()

  @node_drag = d3.behavior.drag().on("dragstart", (d) -> # d.fixed = false;
  ).on("drag", (d, i) ->
    d.px += d3.event.dx
    d.py += d3.event.dy
    d.x += d3.event.dx
    d.y += d3.event.dy
  ).on("dragend", (d) ->
    force.resume()
  )
