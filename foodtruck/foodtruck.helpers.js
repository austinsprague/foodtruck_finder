/* *
* Checks if the foodtruck is open
* foodtruck is a single food truck object from SF API
* returns boolean, true if foodtruck is open now
*/
checkOpen = (foodtruck) => {
  if ( !foodtruck.start24 || !foodtruck.end24 || !foodtruck.dayorder ) {
    return false;
  }

  const currentDate = new Date(Date.now());
  const currentDay = currentDate.getDay();
  const currentHour = currentDate.getHours();

  const truckStartHour = parseInt(foodtruck.start24.substring(0, foodtruck.start24.length - 3));
  const truckEndHour = parseInt(foodtruck.end24.substring(0, foodtruck.end24.length - 3));
  const truckDayOpen = parseInt(foodtruck.dayorder);

  if( currentDay == truckDayOpen && currentHour >= truckStartHour && currentHour < truckEndHour ){
    return true;
  }
  else {
    return false;
  }
}

/* *
* Helper function to compare truck.name to sort
*/
compare = (a, b) => {
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
