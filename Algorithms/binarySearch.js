"use strict"

function binarySearch(list, item) {
  let left = 0;
  let right = list.length - 1;

  while(left <= right) {
    let middle = Math.floor((left + right) / 2);
    let guess = list[middle];

    if(guess === item) return middle;

    if(guess > item) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return -1;
}

function main() {

  // const list = [60, 50, 30, 30, 30, 30, 30, 30];
  const list = [60, 50, 30, 20];
  const item = 30;

  console.log(binarySearch(list, item));

}

main();