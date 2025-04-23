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

function getSubArrays(a) {
    a = a.sort((a, b) => a - b);

    const subArrays = [];
    const subArray = [];

    for (let i = 1; i < a.length; i++) {
        if (Math.abs(a[i] - a[i - 1]) <= 1) {
            if (subArray.length === 0) {
                subArray.push(a[i - 1]);
                subArray.push(a[i]);
            } else {
                if (Math.abs(a[i] - subArray[0]) <= 1) {
                    subArray.push(a[i]);
                }
                else {
                    subArrays.push([...subArray]);
                    subArray.length = 0;
                }
            }
        } else {
            if (subArray.length === 0) {
                subArray.push(a[i - 1]);
            }
            
            subArrays.push([...subArray]);
            subArray.length = 0;

            if (i === a.length - 1) {
                subArray.push(a[i]);
            }
        }
    }
    if (subArray.length > 0) subArrays.push([...subArray]);

    return subArrays;
}

/*
 * Complete the 'pickingNumbers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function pickingNumbers(a) {

    if (a.length === 0) {
        return 0;
    } else if (a.length < 2) {
        return 1;
    } else {

        const subArrays = getSubArrays(a);

        const maxLength = Math.max(...subArrays.map(sub => sub.length));

        return maxLength;
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
