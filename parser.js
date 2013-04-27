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

var index = [];

var PCSprefix = {
  'pn': 'chi',
  'tochi': 'to',
  'case': 'cs', 
  'pan': 'pl', 
  //'crs': 'cr', 
  'crs':'crs',
  'sig': 'si', 
  'alt': 'alt',
};

var roomMapping = {
  "Havane": "HAVANE",
  "351": "351",
  "352AB":"352",
  "362/363":"362",
  "361":"361",
  "343":"343", //no events
  "342A":"342A",
  "Bordeaux":"BORDEAUX",
  "251":"251",
  "252A":"252A", //no events
  "252B":"252B",
  "253":"253", //no events
  "Blue":"BLEU",
  "243":"243", //no events
  "242B":"242B",
  "242A":"242A",
  "242AB":"242A",
  "241":"241",
  "Maillot":"MAILLOT" //no events
}

var videoTrans = function(sub){

  var code = sub.id;
  var match = code.match(/([a-z]+)([0-9]+)/);

  var prefix = PCSprefix[match[1]];
  if (prefix) {
    code = prefix+match[2];
    if(prefix != "sp") {
      return 'vp-'+code+'.mp4'
    }
  }

  return "";
}


_.forEach(submissions.rows, function(ev) {
  var event = {
    id: id++,
    subId: ev.id,
    name: ev.value.title,
    code: letterCodes.code[ev.id],
    type: ev.value.venue,
    abstract: ev.value.abstract,
    cbStatement: ev.value.cbStatement,
    award: ev.value.award,
    //bookmarks: Math.floor((Math.random()*200)),
    keywords: ev.value.authorKeywords ? ev.value.authorKeywords.split("; ") : [],
    communities: ev.value.communities ? _.map(ev.value.communities, function (a) {return a.toLowerCase()}) : [],
  }
  
  // Video
  if(ev.value.videoPreviewFile) {
    event.video = videoTrans(ev)//ev.value.videoPreviewFile
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
      code: letterCodes.code[eventSession.value.schedule] ? letterCodes.code[eventSession.value.schedule] : letterCodes.code[ev.id],
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

  //Speakers
  if(ev.value.speaker != undefined && ev.value.speaker != null) {
    event.speaker = ev.value.speaker;
  }
  

  data.push(event);
});



//     var match = code.match(/([a-z]+)([0-9]+)/);
//     var prefix = PCSprefix[match[1]];
//     if (prefix) {
//       code = prefix+match[2];
//       if(prefix != "sp") {
//         var session;
//         try {
//           session = sessions.rows.detect(function(session) {return session.id == sub.session}).value;
//         } catch(e) {
//           session = sessions.rows.detect(function(session) {return session.id == sub.sessions[0]}).value;
//         }
//         schedule = session.timeslot.split(' ');
//         sessionName = session.title;
        
//           var record = {
//             id: code,
//             letterCode: letterCodes.code[code],
//             title: sub.title,
//             authors: sub.authors,
//             authorsArray: sub.authors.split(',').map(function(author){ return author.trim()}),
//             firstAuthor: item.authors.split(', ').first(),
//             preview: 'vp-'+code+'.mp4',
//             thumbnail: 'vp-'+code+'.mp4-0.jpg',
//             session: sub.session,
//             sessionName: sessionName,
//             abstract: sub.cbStatement,
//             length: sub.length,
//             affiliations: ssub.authorList.filter(function(author){
//               return author.primary.institution != null && author.primary.institution != undefined
//               }).map(function(author){ return author.primary.institution; }),
//             day: schedule[0],
//             time: schedule[1],
//             room: roomMapping[schedule[2]]
//           };

//         try {
//           var newKeywordsString = sub.authorKeywords.replace(/;/g,',');
//           newKeywordsString = newKeywordsString.replace(/"/g,'');
//           record.keywords = newKeywordsString;
//           record.keywordsArray = newKeywordsString.split(',').map(function(keyword){ return keyword.trim()});
//         } catch(e) {
//           console.log(e);
//           console.log(sub);
//           record.keywords = "";
//           record.keywordsArray =[];
//         }
//         if(s.title.length >= 72) 
//           record.shortTitle = sub.title.substring(0,69)+'...';
//         else
//           record.shortTitle = sub.title;


//         // if (item.subtype)
//         //  record.subtype = item.subtype;
//         // if (item.cbStatement)
//         //  record.cbStatement = item.cbStatement;

//         // add test for video preview file here to include only files with a preview
//         if(fs.existsSync(previewsDir + record.preview))
//           index.push(record);
//       }
//     }

// }

fs.writeFile(outputFilename, JSON.stringify(data, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to ");
    }
}); 
