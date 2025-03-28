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
 * Complete the 'birthdayCakeCandles' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY candles as parameter.
 */

// function birthdayCakeCandles(candles) {
//   const maxHeight = Math.max(...candles);
//   return candles.filter(height => height === maxHeight).length;
// }

function birthdayCakeCandles(candles) {

  candles.sort((a, b) => a - b);

  const maxHeight = candles.reduce(function (accumulator, currentValue) {
    return Math.max(accumulator, currentValue);
  }, -Infinity); // Initial value that ensures that any number in the list is greater than it (initially the accumulator = -Infinity)

  const tallestHeights = candles.filter(function (height) {
    return height === maxHeight;
  });

  return tallestHeights.length;

}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  let candlesCount;

  do {
    candlesCount = Number.parseInt(readLine().trim(), 10);
  } while (isNaN(candlesCount) || candlesCount < 1 || candlesCount > Math.pow(10, 5));

  const inputLine = readLine().replace(/\s+$/g, '').split(' ');

  if (inputLine.length !== candlesCount) {
    throw new Error(`The array has to have exactly ${candlesCount} elements.`);
  }

  const candles = inputLine.map(candlesTemp => {
    const height = Number.parseInt(candlesTemp, 10);
    if (isNaN(height)) {
      throw new Error(`Invalid element: '${candlesTemp}' is not a number.`);
    }
    if(height < 1 || height > Math.pow(10, 7)) {
      throw new Error(`Element ${height} out of the range (1 to 10^7)`);
    }
    return height;
  });

  const result = birthdayCakeCandles(candles);

  ws.write(result + '\n');

  ws.end();
}
