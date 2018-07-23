const Promise = require('bluebird');
const request = require('request-promise');

/*
  checkOpen takes a single foodtruck object parameter from SF API
  returns boolean, true if foodtruck is open now, false otherwise
*/
checkOpen = (foodtruck) => {
  // CHECK IF FOODTRUCK HAS STARTTIME ENDTIME AND DAYORDER IN OBJ
  if (!foodtruck.starttime || !foodtruck.endtime || !foodtruck.dayorder) {
    return false;
  }

/* TODO: Uncomment to use current time & date variables
  // CURRENT DATE AND TIME
  const currentDate = new Date(Date.now());
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();
  */

  // TODO: REMOVE TEST VARIABLES
  const currentDay = 5;
  const currentHour = 11;

  // DAY OF THE WEEK AND TIME THAT THE FOODTRUCK IS OPEN AND CLOSED
  const startHourTime = parseInt(foodtruck.starttime.substring(0, foodtruck.endtime.length - 2));
  const endHourTime = parseInt(foodtruck.endtime.substring(0, foodtruck.endtime.length - 2));
  const dayOpen = parseInt(foodtruck.dayorder);

  // CHECK IF THE CURRENTDAY IS THE DAY THAT THE FOODTRUCK IS OPEN
  //    && CHECK IF THE CURRENT HOUR IS EQUAL OR PAST THE OPENING HOUR
  //    && IF CURRENT HOUR IS LESS THAN TRUCK CLOSING HOUR
  //    RETURN TRUE
  if(currentDay == dayOpen && currentHour >= startHourTime && currentHour <= endHourTime){
    return true;
  }
  // ELSE IF NOT OPEN NOW, RETURN FALSE IF NOT OPEN
  else{
    return false;
  }
}

/* Helper function to compare truck.name to alphebatize
*/
compare = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}


/* Takes array of all the food trucks returned from API call
    returns a new array of all open food truck objects, checking if they are currently open, then sorting by name
*/
getAllOpenTrucks = (allTrucks) => {
  if (!allTrucks || allTrucks == undefined || allTrucks.length < 0) {
    return;
  }
  let openTrucks = [];

  // LOOP THROUGH ARRAY OF ALL FOOD TRUCKS
  for(var i = 0; i<allTrucks.length; i++){
    const foodtruck = allTrucks[i];

    // CHECK IF THE SINGLE FOOD TRUCK IS OPEN THIS DAY AND HOUR
    // IF OPEN, ADD NEW FOOD TRUCK OBJECT TO openTrucks ARRAY
    if(checkOpen(foodtruck)){
      const truck = {};
      truck.name = foodtruck.applicant;
      truck.address = foodtruck.location;
      openTrucks.push(truck);
    }
  }
  // RETURN ALPHEBATIZED array of currently open food trucks
  return openTrucks.sort(compare);
}


/* Function to log FOOD TRUCK OBJECT TO CONSOLE BY START AND END INDEX
    Taking an openTrucks array, and logging each food truck's name and address
*/
foodtrucksToString = (foodtrucks, startIdx, endIdx) => {
  if (!foodtrucks || foodtrucks == undefined || foodtrucks.length <0) {
    return;
  }
  for (var i = startIdx; i <= endIdx ; i++) {
    if (i > foodtrucks.length || !foodtrucks[i] ) {
      return;
    }
    console.log('______________________________', i);
    console.log('NAME  ADDRESS');
    console.log(foodtrucks[i].name + ' | ' + foodtrucks[i].address);
  }
}

/* API REQUEST TO SFGOV TO RETREIVE ALL FOOD TRUCK data
    returns promise of food truck data
*/
ftJSON = ()=>{
  return request({
    "method":"GET",
    "uri": "http://data.sfgov.org/resource/bbb8-hzi6.json",
    "json": true
  }).then(data =>{
    return new Promise(function(resolve, reject){
      resolve(getAllOpenTrucks(data));
    })

  })
}

module.exports = {
  ftJSON,
  foodtrucksToString
}
