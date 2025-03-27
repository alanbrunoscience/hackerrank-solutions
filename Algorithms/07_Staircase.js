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
 * Complete the 'staircase' function below.
 *
 * The function accepts INTEGER n as parameter.
 */

function staircase(n) {
    let countSpaces = n - 1;

    for (let i = 0; i < n; i++) {
      console.log(" ".repeat(countSpaces) + '#'.repeat(i+1));
      countSpaces--;
    }

}

function main() {

    let n;

    do {
      n = parseInt(readLine().trim(), 10);
      if (isNaN(n) || n <= 0 || n > 100) {
        console.log("Enter a number between 1 and 100.");
      }
    } while(isNaN(n) || n <= 0 || n > 100);

    staircase(n);
}
