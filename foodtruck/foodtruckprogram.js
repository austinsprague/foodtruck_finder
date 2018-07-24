#!/usr/bin/env node

const program = require('commander');
const { getOpenFoodTrucks, foodtrucksToString } = require('./foodtruck.js');
const { prompt } = require('inquirer');

const questions = [
  {
    type : 'input',
    name : 'next',
    message : 'CLICK ENTER FOR NEXT PAGE ...'
  }
];

runPrompt = ( foodtrucks, startIdx ) => {
  foodtrucksToString(foodtrucks, startIdx);
  startIdx = startIdx + 10;
  if (startIdx > foodtrucks.length) {
    return;
  }
  prompt( questions ).then( () => {
    runPrompt( foodtrucks, startIdx );
  })
}

runProgram = () => {
  getOpenFoodTrucks().then( foodtrucks => {
    const startIdx = 0;
    console.log('Number of Food Trucks Open: ', foodtrucks.length);
    runPrompt(foodtrucks, startIdx);
  })
}


program
  .version('0.0.1')
  .description('Food Truck Finder');

program
  .command('show-open')
  .alias('o')
  .description('Show Open food trucks')
  .action(() => {
    console.log('GETTING FOOD TRUCK DATA...');
    runProgram();
  })


program.parse(process.argv);
