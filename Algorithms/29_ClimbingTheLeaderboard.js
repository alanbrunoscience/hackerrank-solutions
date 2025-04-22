'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function insertElementsNeatly(uniqueRanked, score) {
  let left = 0;
  let right = uniqueRanked.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    let guess = uniqueRanked[middle];

    if (guess === score) return middle;
    if (guess > score) left = middle + 1;
    else right = middle - 1;
  }
  return left;
}

function climbingLeaderboard(ranked, player) {
  const uniqueRanked = [...new Set(ranked)].sort((a, b) => b - a);
  const playerPositions = [];

  player.forEach(score => {
    let index = insertElementsNeatly(uniqueRanked, score);
    playerPositions.push(++index);
    
  });

  return playerPositions;
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
