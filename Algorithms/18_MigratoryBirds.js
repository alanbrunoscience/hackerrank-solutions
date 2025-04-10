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
 * Complete the 'migratoryBirds' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function migratoryBirds(arr) {
  // Write your code here
  const birdsTypes = [0, 0, 0, 0, 0];

  arr.forEach(type => {
    birdsTypes[type - 1]++;
  });

  const highestFrequency = Math.max(...birdsTypes);

  return birdsTypes.indexOf(highestFrequency) + 1;

  // for (let i = 0; i < birdsTypes.length; i++) {
  //   if (birdsTypes[i] === highestFrequency) {
  //     return i + 1;
  //   }
  // }

}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const arrCount = parseInt(readLine().trim(), 10);

  const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

  const result = migratoryBirds(arr);

  ws.write(result + '\n');

  ws.end();
}
