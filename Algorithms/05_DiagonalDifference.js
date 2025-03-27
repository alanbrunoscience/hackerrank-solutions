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

/*
 * Complete the 'diagonalDifference' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY arr as parameter.
 */

function diagonalDifference(arr) {
    let sumMainDiag = 0;
    let sumSecDiag = 0;

    for(let i = 0; i < arr.length; i++) {
      sumMainDiag += arr[i][i];
      sumSecDiag += arr[i][(arr.length-1) - i];
    }

    return Math.abs(sumMainDiag - sumSecDiag);

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = Number.parseInt(readLine().trim(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => {
            const num = Number.parseInt(arrTemp, 10);
            if(num < -100 || num > 100) {
                throw new Error(`Element ${num} out of the range (-100 to 100)`);
            }
            return num;
        });
    }

    const result = diagonalDifference(arr);

    ws.write(result + '\n');

    ws.end();
}