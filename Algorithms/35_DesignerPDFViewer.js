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
 * Complete the 'designerPdfViewer' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY h
 *  2. STRING word
 */

function designerPdfViewer(h, word) {
  if (h.length !== 26 || word === '') return 0;

  const letters = [
    'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p',
    'q', 'r', 's', 't',
    'u', 'v', 'w', 'x',
    'y', 'z'
  ];

  const lowercaseWord = word.toLowerCase();
  let greaterHeight = 0;

  for (const letter of lowercaseWord) {
    // const index = letters.indexOf(letter);
    const index = letter.charCodeAt(0) - 'a'.charCodeAt(0);
    if (index < 0 || index >= 26) continue;
    if (h[index] > greaterHeight) greaterHeight = h[index];
  };

  return word.length * greaterHeight;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const h = readLine().replace(/\s+$/g, '').split(' ').map(hTemp => parseInt(hTemp, 10));

  const word = readLine();

  const result = designerPdfViewer(h, word);

  ws.write(result + '\n');

  ws.end();
}