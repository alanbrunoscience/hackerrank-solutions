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
 * Complete the 'getTotalX' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

// Greatest Common Divisor (Euclidean algorithm)
function gcd(a, b) {
  while (b) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Least Common Multiple
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function getTotalX(a, b) {
  a.sort((a, b) => (b - a));
  b.sort((a, b) => (b - a));

  // Calculate LCM of all elements in 'a'
  let currentLCM = a[0];
  for (let i = 1; i < a.length; i++) {
    currentLCM = lcm(currentLCM, a[i]);
  }

  // Calculate GCD of all elements in 'b'
  let currentGCD = b[0];
  for (let i = 1; i < b.length; i++) {
    currentGCD = gcd(currentGCD, b[i]);
  }

  // Generate multiples of LCM up to currentGCD
  const arrNum = [];
  if (currentLCM <= currentGCD) {
    for (let i = currentLCM; i <= currentGCD; i += currentLCM) {
      arrNum.push(i);
    }
  }

  let countNum = 0;

  for (let num of arrNum) {
    let isValid = true;
    for (let elem of b) {
      if (elem % num !== 0) {
        isValid = false;
        break;
      }
    }
    if (isValid) countNum++;
  }

  return countNum;

}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

  const n = parseInt(firstMultipleInput[0], 10);

  const m = parseInt(firstMultipleInput[1], 10);

  const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

  const brr = readLine().replace(/\s+$/g, '').split(' ').map(brrTemp => parseInt(brrTemp, 10));

  const total = getTotalX(arr, brr);

  ws.write(total + '\n');

  ws.end();
}