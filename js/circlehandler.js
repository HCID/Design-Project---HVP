(function() {
	window.CircleHandler = (function() {


		function CircleHandler() {}

		CircleHandler.filters = {
      sessions: [],
      day: [],
      time: [],
      room: [],
      communities: [],
      countFilters: function () {
        return this.sessions.length + this.day.length + this.time.length + this.room.length + this.communities.length;
      }
    };

		/* Schedule element object */

		function Sch(day, time, id) {
			this.day = day;
			this.startTime = time;
			this.amount = 1;
			this.types = [];
			this.id = "s" + id;
			this.radius = 20;
		}

		/* Map element object */

		function MapElt(room, id) {
			this.room = room;
			this.amount = 1;
			this.id = "m" + id;
			this.radius = 20;
		}

		/* Session element object */

		function SessElt(obj) {
			this.id = obj.id;
			this.name = obj.name;
			this.code = obj.code;
			this.day = obj.day;
			this.starTime = obj.starTime;
			this.endTime = obj.endTime;
			this.room = obj.room;
			this.amount = 1;
			this.award = 0;
			this.type = "";
		}

		/* Sets the tick behaviour for each mode*/
		CircleHandler.tick = function(e) {
			if (Globals.mode === "events") {
				_.each(force.nodes(), function(d) {



					if (d.y <= 90) {
						d.y += 40;
					}
					if (d.y >= Globals.height) {
						d.y -= 30;
					}
					if (d.x <= 0) {
						d.x += 1;
					}
					if (d.x >= Globals.width) {
						d.x -= 1;
					}
				})
			}

			if (e !== undefined) {
				// Push nodes toward their designated focus.
				var k = .1 * e.alpha;

				if (Globals.mode == "events") {
					force.nodes().forEach(function(d) {
						d.r = 100;

					});
					// vis.selectAll("circle").attr("r", d.radius);
					vis.selectAll("circle").attr("r", View.calculateR).each(function(d) {
						d.radius = View.calculateR(d)
					});

					force.nodes().forEach(function(o, i) {
						o.y += (Globals.fociFree[0].y - o.y) * k;
						o.x += (Globals.fociFree[0].x - o.x) * k;
					});

					force.nodes().forEach(collide(0.2));

				} else if (Globals.mode == "map") {
					force.nodes().forEach(function(d) {
						d.r = 20;

					});
					// vis.selectAll("circle").attr("r", d.radius);
					vis.selectAll("circle").attr("r", View.calculateR).each(function(d) {
						d.radius = View.calculateR(d)
					});
					getMapPosition(k);
				} else if (Globals.mode === "sessions") {
					force.nodes().forEach(function(d) {
						d.r = 20;

					});
					// vis.selectAll("circle").attr("r", d.radius);
					vis.selectAll("circle").attr("r", View.calculateR).each(function(d) {
						d.radius = View.calculateR(d)
					});
					getSessionPosition(k);
				}
			}

			d3.selectAll("g.circle_class").attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});
		};


		var toggleVisibility = function(force, key, value) {
			force.selectAll("g.circle_class").attr("visibility", function(d) {
				return d[key] === value ? "visible" : "hidden";
			});
		}

		/* Sets the position of each element in the map view*/
		var getMapPosition = function(k) {
			force.nodes().forEach(function(o, i) {
				if (Globals.fociMap[o["room"]] !== undefined) {
					o.y += (Globals.fociMap[o["room"]].y - o.y) * k;
					o.x += (Globals.fociMap[o["room"]].x - o.x) * k;
				} else {
					o.y += (Globals.fociMap["undefined"].y - o.y) * k;
					o.x += (Globals.fociMap["undefined"].x - o.x) * k;
				}
			});
		}

		/* Sets the position of each element in the map view*/
		var getSessionPosition = function(k) {

			force.nodes().forEach(function(o, i) {

				if (o["room"] === undefined) {
					o.y += (Globals.fociSession["undefined"].y - o.y) * k;
					o.x += (Globals.fociSession["undefined"].x - o.x) * k;
				} else {
					var str = o["day"].toLowerCase() + " " + o["starTime"] + " " + o["room"];

					if (Globals.fociSession[str] !== undefined) {
						o.y += (Globals.fociSession[str].y - o.y) * k;
						o.x += (Globals.fociSession[str].x - o.x) * k;
					} else {
						o.y += (Globals.fociSession["undefined"].y - o.y) * k;
						o.x += (Globals.fociSession["undefined"].x - o.x) * k;
					}
				}
			});
		}

		var collisionPadding = 5;

		/* Determines how elements should collide
		 */

		function collide(jitter) {
			return function(d) {
				return _.each(force.nodes(), function(d2) {
					var distance, minDistance, moveX, moveY, x, y;
					if (d !== d2) {
						x = d.x - d2.x;
						y = d.y - d2.y;
						distance = Math.sqrt(x * x + y * y) * 0.6;
						minDistance = d.radius + d2.radius;
						if (distance < minDistance) {
							distance = (distance - minDistance) / distance * jitter;
							moveX = x * distance;
							moveY = y * distance;
							d.x -= moveX;
							d.y -= moveY;
							d2.x += moveX;
							d2.y += moveY;
						}
					}
				});
			};
		}

		// Returns the index position of a data element in the schedule view
		var schIndex = function(o) {

			var index = 16;
			if (o["day"] === "Monday") {
				if (o["starTime"] === "9:00") {
					index = 0;
				} else if (o["starTime"] === "11:00") {
					index = 4;
				} else if (o["starTime"] === "14:00") {
					index = 8;
				} else {
					index = 12;
				}
			} else if (o["day"] === "Tuesday") {
				if (o["starTime"] === "9:00") {
					index = 1;
				} else if (o["starTime"] === "11:00") {
					index = 5;
				} else if (o["starTime"] === "14:00") {
					index = 9;
				} else {
					index = 13;
				}
			} else if (o["day"] === "Wednesday") {
				if (o["starTime"] === "9:00") {
					index = 2;
				} else if (o["starTime"] === "11:00") {
					index = 6;
				} else if (o["starTime"] === "14:00") {
					index = 10;
				} else {
					index = 14;
				}
			} else if (o["day"] === "Thursday") {
				if (o["starTime"] === "9:00") {
					index = 3;
				} else if (o["starTime"] === "11:00") {
					index = 7;
				} else if (o["starTime"] === "14:00") {
					index = 11;
				} else {
					index = 15;
				}
			}

			return index;

		}

		/* Given an array "a" and an object "o"
	    Returns the position of "o" in "a"
	    -1 otherwise 
	  */
		var indexInSchArray = function(a, o) {
			var i = 0;
			var found = false;
			var l = a.length;

			while (i < l && !found) {
				found = ((a[i].day === o.day) && (a[i].starTime === o.starTime));
				i++;
			}

			return found ? i - 1 : -1;

		}

		// Gruops by room to create later concentric circles in the map view
		CircleHandler.groupMap = function(nodes) {
			var auxArray = [];
			var sessions = CircleHandler.groupSession(nodes);

			var id = 0;

			sessions.forEach(function(o, i) {

				var index = indexInMapArray(auxArray, o);
				var create = index < 0;
				if (create) {
					var mapElt = new MapElt(o.room, id);
					id++;
					auxArray.push(mapElt);
				} else {
					auxArray[index].amount += 1;
				}
			});
			return auxArray;
		}


		/* Given an array "a" and an object "o"
	    Returns the position of "o" in "a"
	    -1 otherwise 
	  */
		var indexInMapArray = function(a, o) {
			var i = 0;
			var found = false;
			var l = a.length;

			while (i < l && !found) {
				found = (a[i].room === o.room);
				i++;
			}

			return found ? i - 1 : -1;

		}


		CircleHandler.filterData = function(data, filters) {
			if (filters.countFilters() === 0) {
        return data;
			} else {
				return _.filter(data, function(d) {
					var matchedSessions = false,
          matchedDay = false,
          matchTime = false,
          matchRoom = false,
          matchComm = false;

					if(filters.sessions.length > 0) {
            _.each(d.sessions, function(s) {
              if(_.contains(filters.sessions, s.id)) {
                matchedSessions = true;
              }
            });
          } else if(filters.time.length === 0 && filters.day.length === 0) {
            matchedSessions = true;
          }
          if(filters.day.length > 0) {
            _.each(filters.day, function (f) {
              if(_.contains(_.pluck(d.sessions, "day"), f)) {
                matchedDay = true;
              }
            });            
          } else if(filters.time.length === 0 && filters.sessions.length === 0) {
            matchedDay = true;
          }
          if(filters.time.length > 0) {
            _.each(filters.time, function (f) {
              if(_.contains(_.pluck(d.sessions, "day"), f.day) && _.contains(_.pluck(d.sessions, "starTime"), f.starTime)) {
                matchTime = true;
              }
            });            
          } else if(filters.day.length === 0 && filters.sessions.length === 0) {
            matchTime = true;
          }

          if(filters.communities.length > 0) {
            if(CircleHandler.filterCommunitieClick(filters.communities, d.communities)) {
                matchComm = true;
            }                   
          } else {
            matchComm = true;
          }

          if(filters.room.length > 0) {
            var smallPass = false;
            _.each(filters.room, function (f) {
              if(_.contains(_.pluck(d.sessions, "room"), f)) {
                smallPass = true;
              }
            });   
            if(smallPass) {
              matchRoom = true;
            }         
          } else {
            matchRoom = true;
          }
					return matchRoom && matchComm && (matchedSessions || matchTime || matchedDay);
				})
			}
		}



    CircleHandler.filterCommunitieClick = function(list, communities) {
      return (communities.length > 0 && _.difference(communities, list).length == 0 && _.difference(list, communities).length == 0) || (list.length == 1 && list[0] === "N/A" && communities.length === 0)
    }


    var filterSessions = function(session, filters) {
      var pass = false;
      if(_.contains(filters.sessions, session.id)) {
        pass = true;
      
      }
      if(_.contains(filters.day, session.day)) {
         pass = true;
      } 

         var smallPass = false;
         _.each(filters.time, function(t) {
          

          if(t.day == session.day && t.starTime == session.starTime) {
            
            smallPass = true;
          }
         })
         if(smallPass) {
          pass = true;
         }
      if(filters.sessions.length === 0 && filters.day.length === 0 && filters.time.length === 0) {
        pass = true;
      }

      return pass;
    }


		// Gruops by Session to create later concentric circles in the map view
		CircleHandler.groupSession = function(nodes) {

			var auxArray = [];
			
			nodes.forEach(function(o, i) {
				o.sessions.forEach(function(u, j) {
          if(CircleHandler.filters.countFilters() === 0 || filterSessions(u, CircleHandler.filters)) {


					var session = _.find(auxArray, function(a) {
						return a.id === u.id
					});


					if (!session) {
						var sessElt = new SessElt(u);
						if (o.award != undefined) {
							if (o.award !== "") {
								sessElt.award++;
							};
						}
						sessElt.type = o.type;
						auxArray.push(sessElt);

					} else {
						session.amount++;
						if (o.award != undefined) {
							if (o.award !== "") {
								session.award++;
							};
						}
					}}
				});

			});
			
			return auxArray;
		}


		return CircleHandler;
	})();
}).call(this);