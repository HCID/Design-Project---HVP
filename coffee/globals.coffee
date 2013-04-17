class window.Globals
	# Colors 
	@colors =
	  bordeaux:
	    color: "#98343c" # 152 52 60
	    rooms: ["bordeaux", "342a", "343", "361", "362/363"]

	  havane:
	    color: "#d3783c" # 211 120 60
	    rooms: ["havane", "351", "352ab"]

	  bleu:
	    color: "#1b5576" # 27 85 118
	    rooms: ["blue", "241", "242ab", "242a", "242b", "243"]

	  green:
	    color: "#265e30" # 38 94 48
	    rooms: ["251", "252a", "252b", "253"]

	  interact:
	    color: "#61447a" # 97 68 122
	    rooms: []

	  chi:
	    color: "#2a276d" # 42 39 109
	    rooms: []

	  grand:
	    color: "#f1d32e" # 241 211 46
	    rooms: ["grand"]
		
	# Global variables 
	@height = $(window).height()
	@width = $(window).width()
	xSchedule = 730
	ySchedule = 200
	xSpace = 280
	ySpace = 220
	parallelData = undefined
	mapXSpace = 700
	sessionIntSpace = 60
	sessionXSpace = 405
	sessionYSpace = 270
	whiteSpace = 20

	# Positions array 
	@fociFree = [
	  x: Globals.width / 2
	  y: Globals.height / 2
	]
	@fociSchedule = [
	  x: xSchedule
	  y: ySchedule
	,
	  x: xSchedule + xSpace
	  y: ySchedule
	,
	  x: xSchedule + xSpace * 2
	  y: ySchedule
	,
	  x: xSchedule + xSpace * 3
	  y: ySchedule
	,
	  x: xSchedule
	  y: ySchedule + ySpace
	,
	  x: xSchedule + xSpace
	  y: ySchedule + ySpace
	,
	  x: xSchedule + xSpace * 2
	  y: ySchedule + ySpace
	,
	  x: xSchedule + xSpace * 3
	  y: ySchedule + ySpace
	,
	  x: xSchedule
	  y: ySchedule + ySpace * 2
	,
	  x: xSchedule + xSpace
	  y: ySchedule + ySpace * 2
	,
	  x: xSchedule + xSpace * 2
	  y: ySchedule + ySpace * 2
	,
	  x: xSchedule + xSpace * 3
	  y: ySchedule + ySpace * 2
	,
	  x: xSchedule
	  y: ySchedule + ySpace * 3
	,
	  x: xSchedule + xSpace
	  y: ySchedule + ySpace * 3
	,
	  x: xSchedule + xSpace * 2
	  y: ySchedule + ySpace * 3
	,
	  x: xSchedule + xSpace * 3
	  y: ySchedule + ySpace * 3
	,
	  x: xSchedule + xSpace * 4
	  y: ySchedule + ySpace * 2
	]
	@fociMap =
  
	  #level 3
	  #Yellow
	  "352ab":
	    x: mapXSpace + 325
	    y: 90

	  351:
	    x: mapXSpace + 125
	    y: 130

	  havane:
	    x: mapXSpace + 35
	    y: 270

  
	  #red
	  "362/363":
	    x: mapXSpace + 610
	    y: 160

	  361:
	    x: mapXSpace + 570
	    y: 225

	  343:
	    x: mapXSpace + 500
	    y: 275

	  "342a":
	    x: mapXSpace + 400
	    y: 340

	  bordeaux:
	    x: mapXSpace + 235
	    y: 375

  
	  # level 2
	  #green
	  253:
	    x: mapXSpace + 405
	    y: 535

	  "252b":
	    x: mapXSpace + 290
	    y: 550

	  "252a":
	    x: mapXSpace + 180
	    y: 575

	  251:
	    x: mapXSpace + 70
	    y: 605

  
	  #blue
	  blue:
	    x: mapXSpace + 580
	    y: 560

	  243:
	    x: mapXSpace + 600
	    y: 640

	  "242b":
	    x: mapXSpace + 555
	    y: 695

	  "242ab":
	    x: mapXSpace + 510
	    y: 710

	  "242a":
	    x: mapXSpace + 480
	    y: 750

	  241:
	    x: mapXSpace + 405
	    y: 800

  
	  # level 0
	  grand:
	    x: mapXSpace + 88
	    y: 1087

	  undefined:
	    x: 2 * mapXSpace + 1000
	    y: 600

	@fociSession =
  
	  #blue
	  "monday 9:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 blue":
	    x: sessionXSpace + sessionIntSpace * 0
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #241
	  "monday 9:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 241":
	    x: 5 + sessionXSpace + sessionIntSpace * 1
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #242ab
	  "monday 9:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 242ab":
	    x: 70 + sessionXSpace + sessionIntSpace * 2
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #242b
	  "thursday 9:00 242b":
	    x: 50 + sessionXSpace + sessionIntSpace * 1.75
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 242b":
	    x: 50 + sessionXSpace + sessionIntSpace * 1.75
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 242b":
	    x: 50 + sessionXSpace + sessionIntSpace * 1.75
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 242b":
	    x: 50 + sessionXSpace + sessionIntSpace * 1.75
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #242a
	  "thursday 9:00 242a":
	    x: 90 + sessionXSpace + sessionIntSpace * 2.25
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 242a":
	    x: 90 + sessionXSpace + sessionIntSpace * 2.25
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 242a":
	    x: 90 + sessionXSpace + sessionIntSpace * 2.25
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 242a":
	    x: 90 + sessionXSpace + sessionIntSpace * 2.25
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #243
	  "monday 9:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 243":
	    x: 120 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #GREEN
	  #251
	  "monday 9:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 251":
	    x: 245 + sessionXSpace + sessionIntSpace * 3
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #252a
	  "monday 9:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 252a":
	    x: 270 + sessionXSpace + sessionIntSpace * 4
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #252b
	  "monday 9:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 252b":
	    x: 310 + sessionXSpace + sessionIntSpace * 5
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #253
	  "monday 9:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 253":
	    x: 330 + sessionXSpace + sessionIntSpace * 6
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #RED
	  #bordeaux
	  "monday 9:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 bordeaux":
	    x: 470 + sessionXSpace + sessionIntSpace * 7
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #342a
	  "monday 9:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 342a":
	    x: 520 + sessionXSpace + sessionIntSpace * 8
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #343
	  "monday 9:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 343":
	    x: 550 + sessionXSpace + sessionIntSpace * 9
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #361
	  "monday 9:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 361":
	    x: 555 + sessionXSpace + sessionIntSpace * 10
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #362/363
	  "monday 9:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 362/363":
	    x: 570 + sessionXSpace + sessionIntSpace * 11
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #havane
	  "monday 9:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 havane":
	    x: 660 + sessionXSpace + sessionIntSpace * 12
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #351
	  "monday 9:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 351":
	    x: 690 + sessionXSpace + sessionIntSpace * 13
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #352ab
	  "monday 9:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 352ab":
	    x: 710 + sessionXSpace + sessionIntSpace * 14
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #grand
	  "monday 9:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: sessionYSpace + sessionIntSpace * 0

	  "monday 11:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: sessionYSpace + sessionIntSpace * 1

	  "monday 14:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: sessionYSpace + sessionIntSpace * 2

	  "monday 16:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: sessionYSpace + sessionIntSpace * 3

	  "tuesday 9:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 4

	  "tuesday 11:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 5

	  "tuesday 14:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 6

	  "tuesday 16:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace + sessionYSpace + sessionIntSpace * 7

	  "wednesday 9:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 8

	  "wednesday 11:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 9

	  "wednesday 14:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 10

	  "wednesday 16:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace * 2 + sessionYSpace + sessionIntSpace * 11

	  "thursday 9:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 12

	  "thursday 11:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 13

	  "thursday 14:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 14

	  "thursday 16:00 grand":
	    x: 770 + sessionXSpace + sessionIntSpace * 15
	    y: whiteSpace * 3 + sessionYSpace + sessionIntSpace * 15

  
	  #undefined
	  undefined:
	    x: sessionXSpace + sessionIntSpace * 16
	    y: sessionYSpace + sessionIntSpace * 0

	# "monday 11:00 undefined":     {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *1}, 
	# "monday 14:00 undefined":     {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *2}, 
	# "monday 16:00 undefined":     {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *3}, 
	# "tuesday 9:00 undefined":     {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *4}, 
	# "tuesday 11:00 undefined":    {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *5}, 
	# "tuesday 14:00 undefined":    {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *6}, 
	# "tuesday 16:00 undefined":    {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *7}, 
	# "wednesday 9:00 undefined":   {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *8}, 
	# "wednesday 11:00 undefined":  {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *9}, 
	# "wednesday 14:00 undefined":  {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *10},
	# "wednesday 16:00 undefined":  {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *11},
	# "thursday 9:00 undefined":    {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *12},
	# "thursday 11:00 undefined":   {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *13},
	# "thursday 14:00 undefined":   {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *14},
	# "thursday 16:00 undefined":   {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *15},