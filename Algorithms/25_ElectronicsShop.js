'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
  inputString += inputStdin;
});

process.stdin.on('end', _ => {
  inputString = inputString.trim().split('\n').map(str => str.trim());

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the getMoneySpent function below.
 */
function getMoneySpent(keyboards, drives, b) {
  let maxValue = -1;

  for (let keyboard of keyboards) {
    for (let drive of drives) {
      let total = keyboard + drive;
      if (maxValue < total && total <= b) {
        maxValue = total;
      }
    }
  }
  return maxValue;
}

// function getMoneySpent(keyboards, drives, b) {

//   const maxValueSpent = [];

//   for (let keyboard of keyboards) {
//     let greaterValue = 0;
//     for (let drive of drives) {
//       if(greaterValue < keyboard + drive && keyboard + drive <= b) {
//         greaterValue = keyboard + drive;
//       }
      
//     }
//     maxValueSpent.push(greaterValue);
//   }

//   return (Math.max(...maxValueSpent) > 0? Math.max(...maxValueSpent) : -1);

// }

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const bnm = readLine().split(' ');

  const b = parseInt(bnm[0], 10);

  const n = parseInt(bnm[1], 10);

  const m = parseInt(bnm[2], 10);

  const keyboards = readLine().split(' ').map(keyboardsTemp => parseInt(keyboardsTemp, 10));

  const drives = readLine().split(' ').map(drivesTemp => parseInt(drivesTemp, 10));

  /*
   * The maximum amount of money she can spend on a keyboard and USB drive, or -1 if she can't purchase both items
   */

  let moneySpent = getMoneySpent(keyboards, drives, b);

  ws.write(moneySpent + "\n");

  ws.end();
}
