var filterJSON = function(json, key, value, defilter) {
  if (defilter == undefined) {
    defilter = false;
  }
  var result = [];
  json.forEach(function (row) {

    if(value.constructor === Array) {
      
      if(!defilter) {
        if (row[key].sort().join() == value.sort().join()) {
          result.push(row);
        }
      } else {
        if (row[key].sort().join() != value.sort().join()) {
          result.push(row);
        }
      } 

    } else {
      if(!defilter) {
        if (row[key] === value) {
          result.push(row);
        }
      } else {
        if (row[key] !== value) {
          result.push(row);
        }
      }  
    }
    
  });
  return result;
}


var countDifferentValuesForKey = function(json, key) {
  var differentValues = [];
  
  json.forEach(function (row) {
    if (differentValues.indexOf(row[key]) == -1) {
      differentValues.push(row[key]);
    }
  })
  return differentValues.length;
}

var getDifferentValuesForKey = function(json, key) {
  var differentValues = [];
  json.forEach(function (row) {
    if (differentValues.indexOf(row[key]) == -1) {
      differentValues.push(row[key]);
    }
  })
  return differentValues;
}

var groupJSON = function (json, key) { 

  var differentValues = [];
  
  json.forEach(function (row) {
    if (differentValues.indexOf(row[key]) == -1) {
      differentValues.push(row[key]);
    }
  })
  number =  differentValues.length;

  // Creating the number force arrays inside the forceData
  forceData = [];

  for (var i=0;i<number;i++) { 
    forceData.push([]);
    json.forEach(function (row) {
      if (differentValues.indexOf(row[key]) == i) {
        forceData[i].push(row);
      }
    })
  }
  return forceData;
}


