'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'dayOfProgrammer' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER year as parameter.
 */

const isLeapYear = year => {
  if (year < 1918) {
    return year % 4 === 0; // Julian rule
  }
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0); // Gregorian rule
}

const dayOfProgrammer = year => {

  const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year === 1918) {
    months[1] = 15;
  } else if (isLeapYear(year)) {
    months[1] = 29;
  }

  let sumDays = 0, i = 0;

  while (sumDays + months[i] <= 256) {
    sumDays += months[i];
    i++;
  }

  const day = String(256 - sumDays).padStart(2, '0');
  const month = String(i + 1).padStart(2, '0');

  return `${day}.${month}.${year}`;

}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const year = parseInt(readLine().trim(), 10);

  const result = dayOfProgrammer(year);

  ws.write(result + '\n');

  ws.end();
}
