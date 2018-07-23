const program = require('commander');
const { ftJSON, foodtrucksToString } = require('./foodtruck.js');
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
  return ftJSON().then(foodtrucks=>{
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
  .command('show-open-food-trucks [pagenumber]')
  .alias('a')
  .description('Show Open food trucks')
  .action((pagenumber) => {
    if (!pagenumber) {
      pagenumber = 1;
    }
    console.log('PAGE ', pagenumber);
    ftJSON(pagenumber);
})

program
  .command('show-open-food-trucks')
  .alias('b')
  .description('Show Open food trucks')
  .action(() => {
    runProgram()
  })


program.parse(process.argv);
