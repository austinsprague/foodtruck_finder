#!/usr/bin/env node

const program = require('commander');
const { getFoodTruckJSON, foodtrucksToString } = require('./foodtruck.js');
const { prompt } = require('inquirer');

const questions = [
  {
    type : 'confirm',
    name : 'confirmed',
    message : 'Next Page ...'
  },

];

function runPrompt(fts, stIdx, edIdx){
  foodtrucksToString(fts, stIdx, edIdx);

  if (edIdx > fts.length) {
    return;
  }

  const startIdx = edIdx + 1;
  const endIdx = edIdx + 10;

  prompt(questions).then(d=>{
    runPrompt(fts, startIdx , endIdx );
  })
}

function runProgram() {
  return getFoodTruckJSON().then(foodtrucks=>{
    const startIdx = 0;
    const endIdx = 9;
    console.log('FOODTRUCK LENGTH: ', foodtrucks.length );
    runPrompt(foodtrucks, startIdx, endIdx);
  })
}


program
  .version('0.0.1')
  .description('Food Truck Finder');

program
  .command('show-open-food-trucks')
  .alias('o')
  .description('Show Open food trucks')
  .action(() => {
    console.log('GETTING FOOD TRUCK DATA...');
    runProgram();
  })


program.parse(process.argv);
