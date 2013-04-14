/* Global variables */
var height = $(window).height();
var width = $(window).width();
var xSchedule = 730;
var ySchedule = 200;
var xSpace = 280;
var ySpace = 220;
var parallelData;
var mapXSpace = 200;

var sessionIntSpace = 60;
var sessionXSpace = 405;
var sessionYSpace = 270;
var whiteSpace = 20;
/* Positions array */

var fociFree = [{x: width/2, y: height/2}];

var fociSchedule = 
[{x: xSchedule, y: ySchedule},          {x: xSchedule + xSpace, y: ySchedule},           {x: xSchedule + xSpace*2, y: ySchedule},           {x: xSchedule + xSpace*3, y: ySchedule},
{x: xSchedule, y: ySchedule + ySpace},   {x: xSchedule + xSpace, y: ySchedule + ySpace},   {x: xSchedule + xSpace*2, y: ySchedule + ySpace},   {x: xSchedule + xSpace*3, y: ySchedule + ySpace},
{x: xSchedule, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace*2, y: ySchedule + ySpace*2}, {x: xSchedule + xSpace*3, y: ySchedule + ySpace*2},
{x: xSchedule, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace*2, y: ySchedule + ySpace*3}, {x: xSchedule + xSpace*3, y: ySchedule + ySpace*3},
{x: xSchedule + xSpace*4, y: ySchedule + ySpace*2}];

var fociMap = { 
  //level 3
  //Yellow
  "352ab": {x: mapXSpace+200, y: 200}, 
  "351": {x: mapXSpace+200, y: 400},
  "havane":{x: mapXSpace+200, y: 600},
  //red
  "362/363":{x: mapXSpace+400, y: 200},
  "361": {x: mapXSpace+400, y: 400},
  "343": {x: mapXSpace+400, y: 600}, //empty
  "342a":{x:mapXSpace+400, y:800},
  "bordeaux": {x:mapXSpace+400, y:1000}, 
  // level 2
  //green
  "253": {x: mapXSpace+600, y: 200}, //empty
  "252b": {x: mapXSpace+600, y: 400}, 
  "252a": {x: mapXSpace+600, y: 600}, 
  "251":{x: mapXSpace+600, y: 800},
  //blue
  "blue":{x: mapXSpace+800, y: 200},
  "243": {x: mapXSpace+800, y: 400}, //empty
  "242b":{x: mapXSpace+800, y: 600},
  "242ab": {x: mapXSpace+875, y: 700}, 
  "242a": {x: mapXSpace+800, y: 800}, 
  "241":{x: mapXSpace+800, y: 1000}, 

  // level 0
  "grand": {x:mapXSpace+1000, y:200},

  "undefined":{x: 2*mapXSpace+1000, y: 600}};

var fociSession = { 
//blue
  "monday 9:00 blue":     {x: sessionXSpace + sessionIntSpace *0 , y: sessionYSpace + sessionIntSpace *0},  
  "monday 11:00 blue":     {x: sessionXSpace + sessionIntSpace *0 , y: sessionYSpace + sessionIntSpace *1},  
  "monday 14:00 blue":     {x: sessionXSpace + sessionIntSpace *0 , y: sessionYSpace + sessionIntSpace *2},  
  "monday 16:00 blue":     {x: sessionXSpace + sessionIntSpace *0 , y: sessionYSpace + sessionIntSpace *3},  
  "tuesday 9:00 blue":     {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},  
  "tuesday 11:00 blue":    {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},  
  "tuesday 14:00 blue":    {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},  
  "tuesday 16:00 blue":    {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},  
  "wednesday 9:00 blue":   {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},  
  "wednesday 11:00 blue":  {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},  
  "wednesday 14:00 blue":  {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10}, 
  "wednesday 16:00 blue":  {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11}, 
  "thursday 9:00 blue":    {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12}, 
  "thursday 11:00 blue":   {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13}, 
  "thursday 14:00 blue":   {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14}, 
  "thursday 16:00 blue":   {x: sessionXSpace + sessionIntSpace *0 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15}, 
  //241
  "monday 9:00 241":     {x: 5+sessionXSpace + sessionIntSpace *1 , y: sessionYSpace + sessionIntSpace *0},  
  "monday 11:00 241":     {x: 5+sessionXSpace + sessionIntSpace *1 , y: sessionYSpace + sessionIntSpace *1},  
  "monday 14:00 241":     {x: 5+sessionXSpace + sessionIntSpace *1 , y: sessionYSpace + sessionIntSpace *2},  
  "monday 16:00 241":     {x: 5+sessionXSpace + sessionIntSpace *1 , y: sessionYSpace + sessionIntSpace *3},  
  "tuesday 9:00 241":     {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},  
  "tuesday 11:00 241":    {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},  
  "tuesday 14:00 241":    {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},  
  "tuesday 16:00 241":    {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},  
  "wednesday 9:00 241":   {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8}, 
  "wednesday 11:00 241":  {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9}, 
  "wednesday 14:00 241":  {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},
  "wednesday 16:00 241":  {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},
  "thursday 9:00 241":    {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},
  "thursday 11:00 241":   {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},
  "thursday 14:00 241":   {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},
  "thursday 16:00 241":   {x: 5+sessionXSpace + sessionIntSpace *1 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},
 //242ab
  "monday 9:00 242ab":     {x: 70 + sessionXSpace + sessionIntSpace *2 , y: sessionYSpace + sessionIntSpace *0},   
  "monday 11:00 242ab":     {x: 70 + sessionXSpace + sessionIntSpace *2 , y: sessionYSpace + sessionIntSpace *1},   
  "monday 14:00 242ab":     {x: 70 + sessionXSpace + sessionIntSpace *2 , y: sessionYSpace + sessionIntSpace *2},   
  "monday 16:00 242ab":     {x: 70 + sessionXSpace + sessionIntSpace *2 , y: sessionYSpace + sessionIntSpace *3},   
  "tuesday 9:00 242ab":     {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},   
  "tuesday 11:00 242ab":    {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},   
  "tuesday 14:00 242ab":    {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},   
  "tuesday 16:00 242ab":    {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},   
  "wednesday 9:00 242ab":   {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},  
  "wednesday 11:00 242ab":  {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},  
  "wednesday 14:00 242ab":  {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10}, 
  "wednesday 16:00 242ab":  {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11}, 
  "thursday 9:00 242ab":    {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12}, 
  "thursday 11:00 242ab":   {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13}, 
  "thursday 14:00 242ab":   {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14}, 
  "thursday 16:00 242ab":   {x: 70 + sessionXSpace + sessionIntSpace *2 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15}, 
//242b
  "thursday 9:00 242b":    {x: 50 + sessionXSpace + sessionIntSpace *1.75 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12}, 
  "thursday 11:00 242b":   {x: 50 + sessionXSpace + sessionIntSpace *1.75 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13}, 
  "thursday 14:00 242b":   {x: 50 + sessionXSpace + sessionIntSpace *1.75 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14}, 
  "thursday 16:00 242b":   {x: 50 + sessionXSpace + sessionIntSpace *1.75 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15}, 
  //242a
  "thursday 9:00 242a":    {x: 90 + sessionXSpace + sessionIntSpace *2.25 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},
  "thursday 11:00 242a":   {x: 90 + sessionXSpace + sessionIntSpace *2.25 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},
  "thursday 14:00 242a":   {x: 90 + sessionXSpace + sessionIntSpace *2.25 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},
  "thursday 16:00 242a":   {x: 90 + sessionXSpace + sessionIntSpace *2.25 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},
  //243
  "monday 9:00 243":     {x: 120 + sessionXSpace + sessionIntSpace *3 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 243":     {x: 120 + sessionXSpace + sessionIntSpace *3 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 243":     {x: 120 + sessionXSpace + sessionIntSpace *3 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 243":     {x: 120 + sessionXSpace + sessionIntSpace *3 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 243":     {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 243":    {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 243":    {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 243":    {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 243":   {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 243":  {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 243":  {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 243":  {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 243":    {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 243":   {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 243":   {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 243":   {x: 120 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
  //GREEN
  //251
  "monday 9:00 251":     {x: 245 + sessionXSpace + sessionIntSpace *3 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 251":     {x: 245 + sessionXSpace + sessionIntSpace *3 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 251":     {x: 245 + sessionXSpace + sessionIntSpace *3 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 251":     {x: 245 + sessionXSpace + sessionIntSpace *3 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 251":     {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 251":    {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 251":    {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 251":    {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 251":   {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 251":  {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 251":  {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 251":  {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 251":    {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 251":   {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 251":   {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 251":   {x: 245 + sessionXSpace + sessionIntSpace *3 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
  //252a
  "monday 9:00 252a":     {x: 270 + sessionXSpace + sessionIntSpace *4 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 252a":     {x: 270 + sessionXSpace + sessionIntSpace *4 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 252a":     {x: 270 + sessionXSpace + sessionIntSpace *4 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 252a":     {x: 270 + sessionXSpace + sessionIntSpace *4 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 252a":     {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 252a":    {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 252a":    {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 252a":    {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 252a":   {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 252a":  {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 252a":  {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 252a":  {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 252a":    {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 252a":   {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 252a":   {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 252a":   {x: 270 + sessionXSpace + sessionIntSpace *4 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
   //252b
  "monday 9:00 252b":     {x: 310 + sessionXSpace + sessionIntSpace *5 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 252b":     {x: 310 + sessionXSpace + sessionIntSpace *5 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 252b":     {x: 310 + sessionXSpace + sessionIntSpace *5 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 252b":     {x: 310 + sessionXSpace + sessionIntSpace *5 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 252b":     {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 252b":    {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 252b":    {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 252b":    {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 252b":   {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 252b":  {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 252b":  {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 252b":  {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 252b":    {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 252b":   {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 252b":   {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 252b":   {x: 310 + sessionXSpace + sessionIntSpace *5 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
   //253
  "monday 9:00 253":     {x: 330 + sessionXSpace + sessionIntSpace *6 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 253":     {x: 330 + sessionXSpace + sessionIntSpace *6 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 253":     {x: 330 + sessionXSpace + sessionIntSpace *6 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 253":     {x: 330 + sessionXSpace + sessionIntSpace *6 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 253":     {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 253":    {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 253":    {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 253":    {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 253":   {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 253":  {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 253":  {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 253":  {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 253":    {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 253":   {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 253":   {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 253":   {x: 330 + sessionXSpace + sessionIntSpace *6 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
  //RED
 //bordeaux
  "monday 9:00 bordeaux":     {x: 470 + sessionXSpace + sessionIntSpace *7 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 bordeaux":     {x: 470 + sessionXSpace + sessionIntSpace *7 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 bordeaux":     {x: 470 + sessionXSpace + sessionIntSpace *7 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 bordeaux":     {x: 470 + sessionXSpace + sessionIntSpace *7 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 bordeaux":     {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 bordeaux":    {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 bordeaux":    {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 bordeaux":    {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 bordeaux":   {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 bordeaux":  {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 bordeaux":  {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 bordeaux":  {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 bordeaux":    {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 bordeaux":   {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 bordeaux":   {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 bordeaux":   {x: 470 + sessionXSpace + sessionIntSpace *7 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
  //342a
  "monday 9:00 342a":     {x: 520 + sessionXSpace + sessionIntSpace *8 , y: sessionYSpace + sessionIntSpace *0},   
  "monday 11:00 342a":     {x: 520 + sessionXSpace + sessionIntSpace *8 , y: sessionYSpace + sessionIntSpace *1},   
  "monday 14:00 342a":     {x: 520 + sessionXSpace + sessionIntSpace *8 , y: sessionYSpace + sessionIntSpace *2},   
  "monday 16:00 342a":     {x: 520 + sessionXSpace + sessionIntSpace *8 , y: sessionYSpace + sessionIntSpace *3},   
  "tuesday 9:00 342a":     {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},   
  "tuesday 11:00 342a":    {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},   
  "tuesday 14:00 342a":    {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},   
  "tuesday 16:00 342a":    {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},   
  "wednesday 9:00 342a":   {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},  
  "wednesday 11:00 342a":  {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},  
  "wednesday 14:00 342a":  {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10}, 
  "wednesday 16:00 342a":  {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11}, 
  "thursday 9:00 342a":    {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12}, 
  "thursday 11:00 342a":   {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13}, 
  "thursday 14:00 342a":   {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14}, 
  "thursday 16:00 342a":   {x: 520 + sessionXSpace + sessionIntSpace *8 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15}, 
   //343
  "monday 9:00 343":     {x: 550 + sessionXSpace + sessionIntSpace *9 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 343":     {x: 550 + sessionXSpace + sessionIntSpace *9 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 343":     {x: 550 + sessionXSpace + sessionIntSpace *9 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 343":     {x: 550 + sessionXSpace + sessionIntSpace *9 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 343":     {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 343":    {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 343":    {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 343":    {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 343":   {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 343":  {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 343":  {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 343":  {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 343":    {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 343":   {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 343":   {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 343":   {x: 550 + sessionXSpace + sessionIntSpace *9 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
  //361
  "monday 9:00 361":     {x: 555 + sessionXSpace + sessionIntSpace *10 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 361":     {x: 555 + sessionXSpace + sessionIntSpace *10 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 361":     {x: 555 + sessionXSpace + sessionIntSpace *10 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 361":     {x: 555 + sessionXSpace + sessionIntSpace *10 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 361":     {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 361":    {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 361":    {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 361":    {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 361":   {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 361":  {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 361":  {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 361":  {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 361":    {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 361":   {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 361":   {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 361":   {x: 555 + sessionXSpace + sessionIntSpace *10 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
  //362/363
  "monday 9:00 362/363":     {x: 570 + sessionXSpace + sessionIntSpace *11 , y: sessionYSpace + sessionIntSpace *0},   
  "monday 11:00 362/363":     {x: 570 + sessionXSpace + sessionIntSpace *11 , y: sessionYSpace + sessionIntSpace *1},   
  "monday 14:00 362/363":     {x: 570 + sessionXSpace + sessionIntSpace *11 , y: sessionYSpace + sessionIntSpace *2},   
  "monday 16:00 362/363":     {x: 570 + sessionXSpace + sessionIntSpace *11 , y: sessionYSpace + sessionIntSpace *3},   
  "tuesday 9:00 362/363":     {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},   
  "tuesday 11:00 362/363":    {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},   
  "tuesday 14:00 362/363":    {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},   
  "tuesday 16:00 362/363":    {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},   
  "wednesday 9:00 362/363":   {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},  
  "wednesday 11:00 362/363":  {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},  
  "wednesday 14:00 362/363":  {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10}, 
  "wednesday 16:00 362/363":  {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11}, 
  "thursday 9:00 362/363":    {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12}, 
  "thursday 11:00 362/363":   {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13}, 
  "thursday 14:00 362/363":   {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14}, 
  "thursday 16:00 362/363":   {x: 570 + sessionXSpace + sessionIntSpace *11 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15}, 
  //havane
  "monday 9:00 havane":     {x: 660 + sessionXSpace + sessionIntSpace *12 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 havane":     {x: 660 + sessionXSpace + sessionIntSpace *12 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 havane":     {x: 660 + sessionXSpace + sessionIntSpace *12 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 havane":     {x: 660 + sessionXSpace + sessionIntSpace *12 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 havane":     {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 havane":    {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 havane":    {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 havane":    {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 havane":   {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 havane":  {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 havane":  {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 havane":  {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 havane":    {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 havane":   {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 havane":   {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 havane":   {x: 660 + sessionXSpace + sessionIntSpace *12 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
  //351
  "monday 9:00 351":     {x: 690 + sessionXSpace + sessionIntSpace *13 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 351":     {x: 690 + sessionXSpace + sessionIntSpace *13 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 351":     {x: 690 + sessionXSpace + sessionIntSpace *13 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 351":     {x: 690 + sessionXSpace + sessionIntSpace *13 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 351":     {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 351":    {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 351":    {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 351":    {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 351":   {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 351":  {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 351":  {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 351":  {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 351":    {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 351":   {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 351":   {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 351":   {x: 690 + sessionXSpace + sessionIntSpace *13 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
  //352ab
  "monday 9:00 352ab":      {x: 710 + sessionXSpace + sessionIntSpace *14 , y: sessionYSpace + sessionIntSpace *0},  
  "monday 11:00 352ab":     {x: 710 + sessionXSpace + sessionIntSpace *14 , y: sessionYSpace + sessionIntSpace *1},  
  "monday 14:00 352ab":     {x: 710 + sessionXSpace + sessionIntSpace *14 , y: sessionYSpace + sessionIntSpace *2},  
  "monday 16:00 352ab":     {x: 710 + sessionXSpace + sessionIntSpace *14 , y: sessionYSpace + sessionIntSpace *3},  
  "tuesday 9:00 352ab":     {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},  
  "tuesday 11:00 352ab":    {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},  
  "tuesday 14:00 352ab":    {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},  
  "tuesday 16:00 352ab":    {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},  
  "wednesday 9:00 352ab":   {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8}, 
  "wednesday 11:00 352ab":  {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9}, 
  "wednesday 14:00 352ab":  {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10}, 
  "wednesday 16:00 352ab":  {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11}, 
  "thursday 9:00 352ab":    {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12}, 
  "thursday 11:00 352ab":   {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13}, 
  "thursday 14:00 352ab":   {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14}, 
  "thursday 16:00 352ab":   {x: 710 + sessionXSpace + sessionIntSpace *14 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15}, 

   //grand
  "monday 9:00 grand":      {x: 770 + sessionXSpace + sessionIntSpace *15 , y: sessionYSpace + sessionIntSpace *0},    
  "monday 11:00 grand":     {x: 770 + sessionXSpace + sessionIntSpace *15 , y: sessionYSpace + sessionIntSpace *1},    
  "monday 14:00 grand":     {x: 770 + sessionXSpace + sessionIntSpace *15 , y: sessionYSpace + sessionIntSpace *2},    
  "monday 16:00 grand":     {x: 770 + sessionXSpace + sessionIntSpace *15 , y: sessionYSpace + sessionIntSpace *3},    
  "tuesday 9:00 grand":     {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace + sessionYSpace + sessionIntSpace *4},    
  "tuesday 11:00 grand":    {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace + sessionYSpace + sessionIntSpace *5},    
  "tuesday 14:00 grand":    {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace + sessionYSpace + sessionIntSpace *6},    
  "tuesday 16:00 grand":    {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace + sessionYSpace + sessionIntSpace *7},    
  "wednesday 9:00 grand":   {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *8},   
  "wednesday 11:00 grand":  {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *9},   
  "wednesday 14:00 grand":  {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *10},  
  "wednesday 16:00 grand":  {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace*2 + sessionYSpace + sessionIntSpace *11},  
  "thursday 9:00 grand":    {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *12},  
  "thursday 11:00 grand":   {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *13},  
  "thursday 14:00 grand":   {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *14},  
  "thursday 16:00 grand":   {x: 770 + sessionXSpace + sessionIntSpace *15 , y: whiteSpace*3 + sessionYSpace + sessionIntSpace *15},  
  //undefined
  "undefined":              {x: sessionXSpace + sessionIntSpace *16 , y: sessionYSpace + sessionIntSpace *0}
  // "monday 11:00 undefined":     {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *1}, 
  // "monday 14:00 undefined":     {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *2}, 
  // "monday 16:00 undefined":     {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *3}, 
  // "tuesday 9:00 undefined":     {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *4}, 
  // "tuesday 11:00 undefined":    {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *5}, 
  // "tuesday 14:00 undefined":    {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *6}, 
  // "tuesday 16:00 undefined":    {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *7}, 
  // "wednesday 9:00 undefined":   {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *8}, 
  // "wednesday 11:00 undefined":  {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *9}, 
  // "wednesday 14:00 undefined":  {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *10},
  // "wednesday 16:00 undefined":  {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *11},
  // "thursday 9:00 undefined":    {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *12},
  // "thursday 11:00 undefined":   {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *13},
  // "thursday 14:00 undefined":   {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *14},
  // "thursday 16:00 undefined":   {x: sessionXSpace + sessionIntSpace *17 , y: sessionYSpace + sessionIntSpace *15},
  
};


/* Schedule element object */
function Sch (day, time, id) {
    this.day = day;
    this.starTime = time;
    this.amount = 1;
    this.types = [];
    this.id = "s" + id;
    this.radius = 20;
}

/* Map element object */
function MapElt (room, id) {
    this.room = room;
    this.amount = 1;
    this.types = [];
    this.id = "m" + id;
    this.radius = 20;
}

/* Session element object */
function SessElt (obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.code = obj.code;
    this.day = obj.day;
    this.starTime = obj.starTime;
    this.endTime = obj.endTime;
    this.room = obj.room;
    this.amount = 1;
}

/* Sets the tick behaviour for each mode*/
var tick = function(e) {

  nodes.each(function(d) {

    if(d.y <= 0) {
      d.y += 1;
    }

    if(d.y >= height) {
      d.y -= 1;
    }

    if(d.x <= 0) {
      d.x += 1;
    }

    if(d.x >= width) {
      d.x -= 1;
    }

  })


  if(e !== undefined) {
        // Push nodes toward their designated focus.
    var k = .1 * e.alpha;

    if (mode == "schedule") {
      force.nodes().forEach(function(d) { 
        d.r = 40;

      });
      // vis.selectAll("circle").attr("r", d.radius);
      vis.selectAll("circle").attr("r", calculateR).each(function(d) { d.radius = calculateR(d) } );

      getSchedulePosition(k);

    } else if (mode == "free") {

      force.nodes().forEach(function(o, i) {
        o.y += (fociFree[0].y - o.y) * k;
        o.x += (fociFree[0].x - o.x) * k;        
      });

      force.nodes().forEach(collide(0.2));
      
    } else if (mode == "map") {
      force.nodes().forEach(function(d) { 
        d.r = 20;

      });
      // vis.selectAll("circle").attr("r", d.radius);
      vis.selectAll("circle").attr("r", calculateR).each(function(d) { d.radius = calculateR(d) } );
      getMapPosition(k);
    } else if (mode === "sessions") {
      force.nodes().forEach(function(d) { 
        d.r = 20;

      });
      // vis.selectAll("circle").attr("r", d.radius);
      vis.selectAll("circle").attr("r", calculateR).each(function(d) { d.radius = calculateR(d) } );
      getSessionPosition(k);
    }
  }


    d3.selectAll("g").attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";});
};
var nodes;

var toggleVisibility = function(force, key, value){
    force.selectAll("g").attr("visibility", function(d) {
      return d[key] === value ? "visible" : "hidden";
  });
}

/* Sets the position of each element in the schedule view*/
var getSchedulePosition = function (k) { 
  //calculate index
    force.nodes().forEach(function(o, i) {
      // undefined talks will end up in the 16th 
      var index = schIndex(o);

      o.y += (fociSchedule[index].y - o.y) * k;
      o.x += (fociSchedule[index].x - o.x) * k;
      
    });
}

/* Sets the position of each element in the map view*/
var getMapPosition = function (k) { 
  force.nodes().forEach(function(o, i) {
    if(fociMap[o["room"]]!== undefined){
      o.y += (fociMap[o["room"]].y - o.y) * k;
      o.x += (fociMap[o["room"]].x - o.x) * k;
    } else{
      o.y += (fociMap["undefined"].y - o.y) * k;
      o.x += (fociMap["undefined"].x - o.x) * k;
    }
  });
}

/* Sets the position of each element in the map view*/
var getSessionPosition = function (k) { 

  force.nodes().forEach(function(o, i) {

    if (o["room"] === undefined) {
      o.y += (fociSession["undefined"].y - o.y) * k;
      o.x += (fociSession["undefined"].x - o.x) * k;
    } else {
      var str = o["day"].toLowerCase() + " " + o["starTime"] + " " + o["room"];

      if(fociSession[str]!== undefined){
        o.y += (fociSession[str].y - o.y) * k;
        o.x += (fociSession[str].x - o.x) * k;
      } else{
        o.y += (fociSession["undefined"].y - o.y) * k;
        o.x += (fociSession["undefined"].x - o.x) * k;
      }
    }
  });
}

var collisionPadding = 5;

/* Determines how elements should collide
 */
function collide(jitter) {
  return function(d) {
    return data.forEach(function(d2) {
      var distance, minDistance, moveX, moveY, x, y;
      if (d !== d2) {
        x = d.x - d2.x;
        y = d.y - d2.y;
        distance = Math.sqrt(x * x + y * y);
        minDistance = d.radius + d2.radius + collisionPadding;
        if (distance < minDistance) {
          distance = (distance - minDistance) / distance * jitter;
          moveX = x * distance;
          moveY = y * distance;
          d.x -= moveX;
          d.y -= moveY;
          d2.x += moveX;
          return d2.y += moveY;
        }
      }
    });
  };
}

//Gruops by schedule, day-time, to create later concentric circles in the schedule view
var groupSchedule = function () {

  var auxArray = [];
  var auxArray2 = [];

  var id = 0;
  var id2 = 0;

  force.nodes().forEach (function(o, i) {

    var create = true;
    if (auxArray.length > 0) {
      var index = indexInSchArray(auxArray, o);
      create = (index < 0);
    }

    if (create) {
      var sch = new Sch(o.day, o.starTime, id);
      sch.types.push(o.type);
      id++;
      auxArray.push(sch);
    } else {
      auxArray[index].amount += 1;
      var indexType = auxArray[index].types.indexOf(o.type);
      if (indexType < 0) auxArray[index].types.push(o.type);
    }
  });
  
  // Creates all the entries in the array to have concentric circles
  auxArray.forEach(function(o, i) {
    var radius = 20;

    if (o.types.length == 0) {
      var sch = new Sch(o.day, o.starTime, id2);
      sch.radius = radius;
      sch.types.push(o.type);
      radius += 10;
      id2++;
      auxArray2.push(sch);
    } else {
      o.types.forEach(function(u,j) {
      var sch = new Sch(o.day, o.starTime, id2);
        sch.types.push(o.types[j]);
        sch.radius = radius;
        radius += 10;
        id2++;
        auxArray2.push(sch);
      });
    }

  });

  return auxArray2.reverse();
}

// Returns the index position of a data element in the schedule view
var schIndex = function (o) {

  var index = 16;
  if(o["day"] === "Monday"){
    if(o["starTime"] ==="9:00"){
        index = 0;
    } else if(o["starTime"] ==="11:00"){
        index = 4;
    } else if(o["starTime"] ==="14:00"){
        index = 8;
    } else{
        index = 12;
    }
  } else if(o["day"] === "Tuesday"){
    if(o["starTime"] ==="9:00"){
        index = 1;
    } else if(o["starTime"] ==="11:00"){
        index = 5;
    } else if(o["starTime"] ==="14:00"){
        index = 9;
    } else{
        index = 13;
    }
  } else if(o["day"] === "Wednesday"){
    if(o["starTime"] ==="9:00"){
        index = 2;
    } else if(o["starTime"] ==="11:00"){
        index = 6;
    } else if(o["starTime"] ==="14:00"){
        index = 10;
    } else{
        index = 14;
    }
  } else if(o["day"] === "Thursday"){
    if(o["starTime"] ==="9:00"){
        index = 3;
    } else if(o["starTime"] ==="11:00"){
        index = 7;
    } else if(o["starTime"] ==="14:00"){
        index = 11;
    } else{
        index = 15;
    }
  }

  return index;

}

/* Given an array "a" and an object "o"
    Returns the position of "o" in "a"
    -1 otherwise 
  */
var indexInSchArray = function (a, o) {
  var i = 0;
  var found = false;
  var l = a.length;

  while (i < l && !found) {
    found = ((a[i].day === o.day) && (a[i].starTime === o.starTime));
    i++;
  }

  return found ? i-1 : -1 ;

}

// Gruops by room to create later concentric circles in the map view
var groupMap = function () {

  var auxArray = [];
  var auxArray2 = [];

  var id = 0;
  var id2 = 0;

  force.nodes().forEach (function(o, i) {

    var index = indexInMapArray(auxArray, o);
    var create = index < 0;
    if (create) {
      var mapElt = new MapElt(o.room, id);
      mapElt.types.push(o.type);
      id++;
      auxArray.push(mapElt);
    } else {
      auxArray[index].amount += 1;
      var indexType = auxArray[index].types.indexOf(o.type);
      if (indexType < 0) auxArray[index].types.push(o.type);
    }

  });

  // Creates all the entries in the array to have concentric circles
  auxArray.forEach(function(o, i) {
    var radius = 20;

    if (o.types.length == 0) {
      var mapElt = new MapElt(o.room, id2);
      mapElt.radius = radius;
      mapElt.types.push(o.type);
      radius += 10;
      id2++;
      auxArray2.push(mapElt);
    } else {
      o.types.forEach(function(u,j) {
        var mapElt = new MapElt(o.room, id2);
        mapElt.types.push(o.types[j]);
        mapElt.radius = radius;
        radius += 10;
        id2++;
        auxArray2.push(mapElt);
      });
    }

  });

  return auxArray2.reverse();
}

/* Given an array "a" and an object "o"
    Returns the position of "o" in "a"
    -1 otherwise 
  */
var indexInMapArray = function (a, o) {
  var i = 0;
  var found = false;
  var l = a.length;

  while (i < l && !found) {
    found = (a[i].room === o.room);
    i++;
  }

  return found ? i-1 : -1;

}

// Gruops by Session to create later concentric circles in the map view
var groupSession = function () {

  var auxArray = [];

  force.nodes().forEach (function(o, i) {

    o.sessions.forEach(function(u, j) {
      var index = indexInSessionsArray(auxArray, u);
      var create = index < 0;
      if (create) {
        var sessElt = new SessElt (u);
        auxArray.push(sessElt);
      } else {
        auxArray[index].amount ++;
      }
    });

  });

  console.log("groupSession", auxArray);

  return auxArray;
}

var indexInSessionsArray = function (a, o) {
  var found = false;
  var l = a.length;
  var i = 0;
  console.log("indexInSessionsArray");


  while (i<l && !found) {
    console.log("a[id]", a[i].id);
    console.log("obj", o);
    found = (a[i].id === o.id);
    i++;
  }

  return found ? i-1 : -1;

}
