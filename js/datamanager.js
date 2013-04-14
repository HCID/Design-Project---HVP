var filterJSON = function(json, key, value, defilter) {
  if (defilter == undefined) {
    defilter = false;
  }
  var result = [];
  
  json.forEach(function (row) {

    if(value.constructor === Array) {
      
        if (value[0] === "general") {
          if(!defilter) {
            var indUx = row[key].indexOf("ux");
            var indDes = row[key].indexOf("design");
            var indEng = row[key].indexOf("engineering");

            if ((row[key] == []) ||
                ((indUx >= 0) && (row[key].length == 1)) ||
                ((indDes >= 0) && (row[key].length == 1)) ||
                ((indEng >= 0) && (row[key].length == 1)) ||
                ((indUx >= 0) && (indDes >= 0) && (row[key].length == 2)) ||
                ((indUx >= 0) && (indEng >= 0) && (row[key].length == 2)) ||
                ((indEng >= 0) && (indDes >= 0) && (row[key].length == 2)) ||
                ((indUx >= 0) && (indDes >= 0) && (indEng >= 0) && (row[key].length == 3))){

              result.push(row);
            }
          } else {
            if ((row[key] == ["sustainability"]) || 
              (row[key] == ["hci4d"]) || 
              (row[key] == ["games"]) || 
              (row[key] == ["cci"]) || 
              (row[key] == ["arts"]) || 
              (row[key] == ["health"]) || 
              (row[key] == ["management"])){
              result.push(row);
            }
          } 

        } else {

          if(!defilter) {
            if (row[key].sort().join() == value.sort().join()) {
              result.push(row);
            }
          } else {
            if (row[key].sort().join() != value.sort().join()) {
              result.push(row);
            }
          } 
        }

    } else {

      if (mode === "sessions"){
          
        if(defilter) {
            var found = false;
            var i = 0;
            var l = row[key].length;
            while (i<l && !found) {
              found = (row[key][i].id === value);
              if (found) result.push(row);
              i++; 
            }

        } else {
            var l = row[key].length;

            if ((l == 1) && (row[key][0].id === value)) {
            } else {
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


