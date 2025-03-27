'use strict';

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

/*
 * Complete the 'plusMinus' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function plusMinus(arr) {
    let countNeg = 0, countPos = 0, countZeros = 0;

    arr.sort(function(a, b) {
      return a - b;
    });

    arr.forEach(function(number) {
      if(number < 0) {
        countNeg++;
      } else if (number === 0) {
        countZeros++;
      } else {
        countPos++;
      }
    });

    console.log((countPos / arr.length).toFixed(6));
    console.log((countNeg / arr.length).toFixed(6));
    console.log((countZeros / arr.length).toFixed(6));
    
}

function main() {

    let n;
   
    do {
      n = Number.parseInt(readLine().trim(), 10);
    } while(isNaN(n) || n <= 0 || n > 100);

    const inputLine = readLine().replace(/\s+$/g, '').split(' ');

    if(inputLine.length !== n) {
      throw new Error(`The array has to have exactly ${n} elements.`);
    }
    
    const arr = inputLine.map(arrTemp => {
      const num = Number.parseInt(arrTemp, 10);
      if(isNaN(num)) {
        throw new Error(`Invalid element: '${arrTemp}' is not a number.`);
      }
      if(num < -100 || num > 100) {
        throw new Error(`Element ${num} out of the range (-100 to 100)`);
      }
      return num;
    });

    plusMinus(arr);
}
