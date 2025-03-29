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
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {

    // '12:45:54PM' (Input - s)

    let [hours, min, sec] = s.slice(0, 8).split(":"); // ['12', '45', '54']
    const getSuffix = s.slice(-2).toUpperCase();

    if (getSuffix === 'AM' && hours === '12') {
        hours = '00';
    } else if (getSuffix === 'PM') {
        if (Number.parseInt(hours) >= 1 && Number.parseInt(hours) < 12) {
            hours = Number.parseInt(hours) + 12;
        }
    }

    return `${hours}:${min}:${sec}`;

}

// function timeConversion(s) {

//     const timeArr12 = s.split(":"); // ['12', '45', '54PM']
//     const getSuffix = timeArr12[2].slice(2).toUpperCase();
//     let hour = timeArr12[0];

//     if(getSuffix === 'AM' && hour === '12') {
//         hour = '00';
//     } else if(getSuffix === 'PM') {
//         if(Number.parseInt(hour) >= 1 && Number.parseInt(hour) !== 12) {
//             hour = Number.parseInt(timeArr12[0]) + 12;
//         }
//     }

//     return `${hour}:${timeArr12[1]}:${timeArr12[2].slice(0, 2)}`;

// }

function validateInput(s) {

    // '12:40:22AM' (Input - s)

    let [hours, min, sec] = s.slice(0, 8).split(":"); // ['12', '40', '22']
    const getSuffix = s.slice(-2).toUpperCase(); // 'AM'

    if (Number.parseInt(hours) < 1 || Number.parseInt(hours) > 12
        || Number.parseInt(min) < 0 || Number.parseInt(min) > 59
        || Number.parseInt(sec) < 0 || Number.parseInt(sec) > 59
        || getSuffix !== "AM" && getSuffix !== "PM") {
        return false;
    }

    return true;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s;

    do {
        s = readLine();

        if(!validateInput(s)) {
            console.log(`\n-> Invalid time format! The time has to have the following format: hh:mm:ssAM or hh:mm:ssPM.\n`);
        }

    } while (!validateInput(s));
    
    const result = timeConversion(s);

    ws.write(result + '\n');

    ws.end();
}