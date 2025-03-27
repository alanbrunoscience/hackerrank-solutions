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
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr) {
  let minSum = 0, maxSum = 0;

  arr.sort((a, b) => a - b);

  // const minElements = arr.slice(0, 4);
  // for(let element of minElements) {
  //   minSum += Number.parseInt(element);
  // }
  for(let i = 0; i < 4; i++) {
    minSum += Number.parseInt(arr[i]);
  }

  // const maxElements = arr.slice(1);
  // for(let element of maxElements) {
  //   maxSum += Number.parseInt(element);
  // }
  for(let i = 1; i <= 4; i++) {
    maxSum += Number.parseInt(arr[i]);
  }

  console.log(`${minSum} ${maxSum}`);
}

// function miniMaxSum(arr) {
//   arr.sort((a, b) => a - b); // Sort in ascending order

//   // Sum first 4 elements (min sum)
//   const minSum = arr.slice(0, 4).reduce((sum, num) => sum + num, 0);

//   // Sum last 4 elements (max sum)
//   const maxSum = arr.slice(-4).reduce((sum, num) => sum + num, 0);

//   console.log(`${minSum} ${maxSum}`);
// }

function main() {

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => {
      const num = Number.parseInt(arrTemp, 10);
      if(num < 1 || num > Math.pow(10, 9)) {
          throw new Error(`Element ${num} out of the range (1 to 10^9)`);
      }
      return num;
    });

    miniMaxSum(arr);
}
