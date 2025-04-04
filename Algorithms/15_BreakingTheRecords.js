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
 * Complete the 'breakingRecords' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY scores as parameter.
 */

function breakingRecords(scores) {
  if (scores.length === 0) {
    return [0, 0];
  }

  let highestScore = scores[0], lowestScore = scores[0];
  let countMax = 0, countMin = 0;

  scores.forEach(score => {
    if (score > highestScore) {
      highestScore = score;
      countMax++;
    }

    if (score < lowestScore) {
      lowestScore = score;
      countMin++;
    }
  });
  return [countMax, countMin];
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const scores = readLine().replace(/\s+$/g, '').split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

  const result = breakingRecords(scores);

  ws.write(result.join(' ') + '\n');

  ws.end();
}
