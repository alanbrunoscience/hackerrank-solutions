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

function searchPageIndex(pages, targetPage) {
    let left = 0;
    let right = pages.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (pages[mid].includes(targetPage)) {
            return mid; // Target found
        } else if (pages[mid].every(page => page < targetPage)) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Target not found
}

function organizeBookPages(n) {
    const pages = [];
    pages.push([1]);
  
    for (let i = 2; i <= n; i += 2) {
      if (i + 1 <= n) {
        pages.push([i, i + 1]);
      } else {
        pages.push([i]);
      }
    }
    return pages;
  }

/*
 * Complete the 'pageCount' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER p
 */

function pageCount(n, p) {

    const pages = organizeBookPages(n);

    const indexPage = searchPageIndex(pages, p);

    if (indexPage === 0 || indexPage === (pages.length - 1)) {
        return 0;
    }
    return Math.min(indexPage, (pages.length - 1) - indexPage);
    // return Math.min((indexPage - 0), (pages.length - 1) - indexPage);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const p = parseInt(readLine().trim(), 10);

    const result = pageCount(n, p);

    ws.write(result + '\n');

    ws.end();
}
