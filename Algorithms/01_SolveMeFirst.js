process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

function solveMeFirst(a, b) {
  return a + b;   
}

function main() {

    do {
      var a = Number.parseInt(readLine(), 10);
      var b = Number.parseInt(readLine(), 10);
    } while(isNaN(a) || isNaN(b) || a < 1 || a > 1000 || b < 1 || b > 1000);

    console.log(solveMeFirst(a, b));

}