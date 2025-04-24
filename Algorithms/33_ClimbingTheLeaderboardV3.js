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

function climbingLeaderboard(ranked, player) {
  const uniqueRanked = [...new Set(ranked)].sort((a, b) => b - a);

  const result = [];
  for (const score of player) {
    let left = 0;
    let right = uniqueRanked.length - 1;
    let position = uniqueRanked.length + 1; // Default position if score is smallest

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (uniqueRanked[mid] <= score) {
        position = mid + 1;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    result.push(position);
  }

  return result;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const rankedCount = parseInt(readLine().trim(), 10);

  const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

  const playerCount = parseInt(readLine().trim(), 10);

  const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

  const result = climbingLeaderboard(ranked, player);

  ws.write(result.join('\n') + '\n');

  ws.end();
}
