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

function getRankingPositions(arrTemp) {
  const posRanking = [1];
  let pos = 1;

  for (let i = 1; i < arrTemp.length; i++) {
    if (arrTemp[i - 1] > arrTemp[i]) {
      pos++;
      posRanking.push(pos);
      continue;
    }
    posRanking.push(pos);
  }

  return posRanking;
}

function climbingLeaderboard(ranked, player) {
  ranked = ranked.sort((a, b) => b - a);
  const playerPositions = [];

  player.forEach(score => {
    const arrTemp = [...ranked];
    arrTemp.push(score);
    arrTemp.sort((a, b) => b - a);

    let index = arrTemp.indexOf(score);

    playerPositions.push(getRankingPositions(arrTemp)[index]);
    
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
