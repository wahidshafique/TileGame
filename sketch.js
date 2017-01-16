var w;
var columns;
var rows;
var board = [];

var total;
var randArray;

//this is the core of the 9 tile groups
var highestVal = 3;

function setup() {
    canvas = createCanvas(800, 800);
    //width of the squares
    w = 50;
    columns = 16;
    rows = 16;

    //make the random coordinates for the blocks
    randArray = Array.from({
        length: 6
    }, () => Math.floor(Math.random() * 128) * 2);

    //first run to just make the object array
    populateTitles();
    //draw the updated tiles
    drawboard();
    drawboard();
}

var i = 0;

function draw() {
    //    board[i].number = 3;
    //    drawboard();
    //    i++;
}

//the initial array of objects is made here
function populateTitles() {
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            var index = j + i * rows;
            board[index] = new Tile(i, j);
        }
    }
}

function drawboard() {
    //the steps for making the mineable cores is 2
    console.log(randArray);
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < columns; y++) {
            var index = x + y * rows;
            if (randArray.includes(index)) {
                populateBorder(index);
            }
            board[index].display();
        }
    }
}

function populateBorder(index) {
    if (posMap(index) <= rows || posMap(index) >= (rows * columns) - columns || posMap(index) % 16 === 0) {
        return;
    }

    board[posMap(index)].number = 3;

    board[posMap(index, 0, -1)].number = 2;
    board[posMap(index, 1, -1)].number = 2;
    board[posMap(index, 1, 0)].number = 2;
    board[posMap(index, 1, 1)].number = 2;
    board[posMap(index, 0, 1)].number = 2;
    board[posMap(index, -1, 1)].number = 2;
    board[posMap(index, -1, 0)].number = 2;
    board[posMap(index, -1, -1)].number = 2;
}

function posMap(index, xMod, yMod) {
    xMod = xMod || 0;
    yMod = yMod || 0;
    return ((index % rows) + xMod) + ((index / rows) + yMod) * rows;
}

function mousePressed() {
    for (var i = 0; i < board.length; i++) {
        board[i].clicked();
    }
    //drawboard();
}