/* *
* Checks if the foodtruck is open now
* foodtruck is a single foodtruck object from SF API
* returns boolean, true if foodtruck is open now, false otherwise
*/
checkOpen = (foodtruck) => {
  // CHECK IF FOODTRUCK HAS STARTTIME ENDTIME AND DAYORDER IN OBJ
  if (!foodtruck.starttime || !foodtruck.endtime || !foodtruck.dayorder) {
    return false;
  }

  // CURRENT DATE AND TIME
  const currentDate = new Date(Date.now());
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();

  // DAY OF THE WEEK AND TIME THAT THE FOODTRUCK IS OPEN AND CLOSED
  const startHourTime = parseInt(foodtruck.starttime.substring(0, foodtruck.endtime.length - 2));
  const endHourTime = parseInt(foodtruck.endtime.substring(0, foodtruck.endtime.length - 2));
  const dayOpen = parseInt(foodtruck.dayorder);

  //  RETURN TRUE IF THE CURRENTDAY IS THE DAY/TIME THAT THE FOODTRUCK IS OPEN
  //    && IF THE CURRENT HOUR IS EQUAL OR PAST THE OPENING HOUR
  //    && IF CURRENT HOUR IS LESS THAN TRUCK CLOSING HOUR
  if(currentDay == dayOpen && currentHour >= startHourTime && currentHour <= endHourTime){
    return true;
  }
  // ELSE IF NOT OPEN NOW, RETURN FALSE
  else{
    return false;
  }
}

/* *
* Helper function to compare truck.name to alphebatize list
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

module.exports = {
  compare,
  checkOpen
}
