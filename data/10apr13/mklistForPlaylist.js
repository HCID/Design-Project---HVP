
var fs = require('fs');
// require('../extensions.js');


// var previewsDir = '/Users/carlagriggio/Movies/chiPreviews/';	// put here the path to the directory with the video previews (with trailing '/')
// var thumbnailsDir = '../thumbnails/';

var submissions = require('./submissions.json');
var sessions = require('./sessions.json');
var interactivity = require('./interactivity.json');
var letterCodes = require('./letterCodes.json');

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

function makeIndex(table) {
	for (var i = 0; i < table.rows.length; i++) {
		var item = table.rows[i].value;
		var code = item._id;
		var match = code.match(/([a-z]+)([0-9]+)/);
		var prefix = PCSprefix[match[1]];
		if (prefix) {
			code = prefix+match[2];
			if(prefix != "sp") {
				var session;
				try {
					session = sessions.rows.detect(function(session) {return session.id == item.session}).value;
				} catch(e) {
					session = sessions.rows.detect(function(session) {return session.id == item.sessions[0]}).value;
				}
				schedule = session.timeslot.split(' ');
				sessionName = session.title;
				
					var record = {
						id: code,
						letterCode: letterCodes.code[code],
						title: item.title,
						authors: item.authors,
						authorsArray: item.authors.split(',').map(function(author){ return author.trim()}),
						firstAuthor: item.authors.split(', ').first(),
						preview: 'vp-'+code+'.mp4',
						thumbnail: 'vp-'+code+'.mp4-0.jpg',
						session: item.session,
						sessionName: sessionName,
						abstract: item.cbStatement,
						length: item.length,
						affiliations: item.authorList.filter(function(author){
							return author.primary.institution != null && author.primary.institution != undefined
							}).map(function(author){ return author.primary.institution;	}),
						day: schedule[0],
						time: schedule[1],
						room: roomMapping[schedule[2]]
					};

				try {
					var newKeywordsString = item.authorKeywords.replace(/;/g,',');
					newKeywordsString = newKeywordsString.replace(/"/g,'');
					record.keywords = newKeywordsString;
					record.keywordsArray = newKeywordsString.split(',').map(function(keyword){ return keyword.trim()});
				} catch(e) {
					console.log(e);
					//console.log(item);
					record.keywords = "";
					record.keywordsArray =[];
				}
				if(item.title.length >= 72) 
					record.shortTitle = item.title.substring(0,69)+'...';
				else
					record.shortTitle = item.title;


				// if (item.subtype)
				// 	record.subtype = item.subtype;
				// if (item.cbStatement)
				// 	record.cbStatement = item.cbStatement;

				// add test for video preview file here to include only files with a preview
				if(fs.existsSync(previewsDir + record.preview))
					index.push(record);
			}
		}
	}
}

makeIndex(submissions);
makeIndex(interactivity);

var json = 'var $CHIEvents='+JSON.stringify(index, null, 4);
var fileName = 'events.js';
fs.writeFile(fileName, json, function(err) {
	if (err)
		console.log('*** Could not save '+fileName, err);
	else
		console.log('Wrote '+fileName);
});
