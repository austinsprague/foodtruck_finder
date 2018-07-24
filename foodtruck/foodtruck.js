const Promise = require('bluebird');
const request = require('request-promise');
const { compare, checkOpen } = require('./foodtruck.helpers.js')

/* *
* Loops through all food trucks, checks if open and returns array of open food trucks
* allTrucks array of all the food trucks returned from SF gov API call
* returns a new alphebatized array of all open food truck objects
*/
filterOpenTrucks = (allTrucks) => {
  if (!allTrucks || allTrucks == undefined || allTrucks.length < 0) {
    return;
  }
  let openTrucks = [];

  for(var i = 0; i<allTrucks.length; i++){
    const foodtruck = allTrucks[i];

    if(checkOpen(foodtruck)){
      const truck = {};
      truck.name = foodtruck.applicant;
      truck.address = foodtruck.location;
      openTrucks.push(truck);
    }
  }
  return openTrucks.sort(compare);
}


/* *
* Loops through food truck array, and log's the object by 10
* openFoodTrucks array of filtered openTrucks
* startIdx index of array to start the logging, used to log by pages of 10
*/
foodTrucksToString = (openFoodTrucks, startIdx) => {
  if (!openFoodTrucks || openFoodTrucks == undefined || openFoodTrucks.length <0) {
    return;
  }
  
  const endIdx = startIdx + 10;

  for (var i = startIdx; i < endIdx ; i++) {
    if (i > openFoodTrucks.length || !openFoodTrucks[i] ) {
      return;
    }
    console.log('NAME  ADDRESS');
    console.log(openFoodTrucks[i].name + ' | ' + openFoodTrucks[i].address);
  }
}

/* *
* GET API request to SFGOV to retrieve all food truck data
* returns promise of food truck data, filtered and alphebetized in array of new foodtruck objects
*/
getOpenFoodTrucks = () =>{
  return request({
    "method":"GET",
    "uri": "http://data.sfgov.org/resource/bbb8-hzi6.json",
    "json": true
  }).then(data =>{
    return new Promise(function(resolve, reject){
      resolve(filterOpenTrucks(data));
    })
  })
}

module.exports = {
  getOpenFoodTrucks,
  foodTrucksToString
}
