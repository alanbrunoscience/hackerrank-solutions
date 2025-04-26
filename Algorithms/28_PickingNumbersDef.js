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
    a.sort((a, b) => a - b);
    console.log(a);

    let i = 0, j = 0;
    const subArray = [];
    const subArrays = [];

    while (i < a.length) {
        subArray.push(a[i]);
        for (j = i + 1; j < a.length; j++) {
            if (Math.abs(a[j] - a[i]) <= 1) {
                subArray.push(a[j]);
            } else {
                break;
            }
        }
        subArrays.push([...subArray]);
        subArray.length = 0;
        i = j;
    }
    return subArrays;
}

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
