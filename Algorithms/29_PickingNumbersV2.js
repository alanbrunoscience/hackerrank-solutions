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
 * Complete the 'pickingNumbers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function pickingNumbers(a) {

    a = a.sort((a, b) => a - b);
    console.log(a);

    if (a.length === 0) {
        return 0;
    } else if (a.length < 2) {
        return 1;
    } else {

        let countMaxLength = -Infinity;

        let i = 0, j = 0;

        while (i < a.length) {
            let count = 1;
            for (j = i + 1; j < a.length; j++) {
                if (Math.abs(a[j] - a[i]) <= 1) {
                    count++;
                } else {
                    i = j;
                    break;
                }
            }

            if (count > countMaxLength) countMaxLength = count;

            if (i !== j) i++;

        }

        return countMaxLength;

    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = pickingNumbers(a);

    ws.write(result + '\n');

    ws.end();
}
