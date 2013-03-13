var authors = require('./data/20feb13/authors-2013-2-20-12-25-28.json');
var groups = require('./data/20feb13/groups-2013-2-20-15-23-30.json');
var schedule = require('./data/20feb13/schedule-2013-2-20-12-25-24.json');
var sessions = require('./data/20feb13/sessions-2013-2-20-12-25-20.json');
var submissions = require('./data/20feb13/submissions-2013-2-20-12-25-16.json');
var _ = require('underscore');
var fs = require('fs');

var outputFilename = '/data/data.json';



var data = [];
var id = 1;

_.forEach(submissions.rows, function(ev) {
  var event = {
    id: id++,
    name: ev.value.title,
    type: ev.value.venue,
    abstract: ev.value.abstract,
    cbStatement: ev.value.cbStatement,
    bookmarks: Math.floor((Math.random()*200)),
    keywords: ev.value.authorKeywords ? ev.value.authorKeywords.split("; ") : [],
    communities: ev.value.communities
  }
  
  // Video
  if(ev.value.videoPreviewFile) {
    event.video = ev.value.videoPreviewFile
  }
  
  
  // Session data
  if(ev.value.session) {
    var eventSession = _.find(sessions.rows, function(ses) {
      return ses.id == ev.value.session;
    });   
    event.session = {
      id: ev.value.session,
      name: eventSession.value.title
    }; 
    
    //schedule info
    var sch = _.find(schedule.rows, function (sched) {
      return ev.value.session == sched.value.session
    });
    if(sch) {
      event.room = sch.value.room;
      event.starTime = sch.value.time.split("-")[0];
      event.endTime = sch.value.time.split("-")[1];
    }

  }
  
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
