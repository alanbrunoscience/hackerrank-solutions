"use strict"

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
  // const tests = [
  //   [1, 2, 2, 3, 1, 2],  // Expected: 5 (subarray [1,2,2,1,2]) X
  //   [4, 6, 5, 3, 3, 1],  // Expected: 3 (subarray [3,3,4] when sorted)
  //   [1, 1, 1, 1],        // Expected: 4
  //   [1, 2, 3, 4, 5],     // Expected: 2 X
  //   [],                  // Expected: 0
  //   [1],                 // Expected: 1 X
  //   [1, 3, 5],           // Expected: 1
  // ];

  // tests.forEach(test => {
  //   console.log(`Array: [${test}] -> Result: ${pickingNumbers(test)}`);
  // });

  const a = [1, 2, 3, 4, 5];

  console.log(getSubArrays(a));
}

main();