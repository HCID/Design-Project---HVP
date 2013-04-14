var folder = "10apr13";

var authors = require('./data/'+folder+'/authors.json');
var groups = require('./data/'+folder+'/groups.json');
var schedule = require('./data/'+folder+'/schedule.json');
var sessions = require('./data/'+folder+'/sessions.json');
var submissions = require('./data/'+folder+'/submissions.json');
var letterCodes = require('./data/'+folder+'/letterCodes.json');

var _ = require('underscore');
var fs = require('fs');

var outputFilename = 'data/data.json';



var data = [];
var id = 1;

_.forEach(submissions.rows, function(ev) {
  var event = {
    id: id++,
    subId: ev.id,
    name: ev.value.title,
    code: letterCodes.code[ev.id],
    type: ev.value.venue,
    abstract: ev.value.abstract,
    cbStatement: ev.value.cbStatement,
    bookmarks: Math.floor((Math.random()*200)),
    keywords: ev.value.authorKeywords ? ev.value.authorKeywords.split("; ") : [],
    communities: _.map(ev.value.communities, function (a) {return a.toLowerCase()}) ,
  }
  
  // Video
  if(ev.value.videoPreviewFile) {
    event.video = ev.value.videoPreviewFile
  }
  
  event.sessions = [];
  // Session data
  if(ev.value.session) {
    var eventSession = _.find(sessions.rows, function(ses) {
      return ses.id == ev.value.session;
    });   
    event.sessions.push({
      id: ev.value.session,
      name: eventSession.value.title,
      code: letterCodes.code[eventSession.value.schedule],
    }); 
    
   
  } else if (ev.value.sessions) {
    _.each(ev.value.sessions, function (session) {
      var eventSession = _.find(sessions.rows, function(ses) {
        return ses.id == session;
      });       
      event.sessions.push({
        id: eventSession.value._id,
        name: eventSession.value.title,
        code: letterCodes.code[ev.id]
      }); 
    })
  }

  _.each(event.sessions, function(session) {
   //schedule info
    var sch = _.find(schedule.rows, function (sched) {
      return session.id == sched.value.session
    });
    if(sch) {
      session.room = sch.value.room.toLowerCase();
      session.starTime = sch.value.time.split("-")[0];
      session.endTime = sch.value.time.split("-")[1];
      session.day = sch.value.day;
    }
  });



  //Authors
  if(ev.value.authorList != undefined && ev.value.authorList != null) {
    event.authors = ev.value.authorList;
  }
  

  data.push(event);
});


fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to ");
    }
}); 
