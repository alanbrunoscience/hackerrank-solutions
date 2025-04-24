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

function findGreaterValue(list, limit) {
  return Math.max(...list.filter(value => value <= limit));
}

function insertElementNeatly(rankingWithoutDup, score) {
  const newArray = [...rankingWithoutDup];
  const indexElement = newArray.indexOf(score);

  if(indexElement === -1) {
    const greaterValue = findGreaterValue(newArray, score);
    if(greaterValue === -Infinity) {
      newArray.push(score);
    } else {
      const insertIndex = newArray.indexOf(greaterValue);
      newArray.splice(insertIndex, 0, score);
    }
  } else {
    const subArr = newArray.slice(0, indexElement);
    subArr.push(score);
    return subArr;
  }

  return newArray;
}

function climbingLeaderboard(rankingWithoutDup, player) {
  rankingWithoutDup = rankingWithoutDup.sort((a, b) => b - a); // Ensure sorted descending
  const playerPositions = [];
  
  player.forEach(score => {
    const updatedArray = insertElementNeatly(rankingWithoutDup, score);
    const scoreIndex = updatedArray.indexOf(score);
    playerPositions.push(scoreIndex + 1);
  });

  return playerPositions;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rankedCount = parseInt(readLine().trim(), 10);

    const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount = parseInt(readLine().trim(), 10);

    const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const rankingWithoutDup = [...new Set(ranked)];

    const result = climbingLeaderboard(rankingWithoutDup, player);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
