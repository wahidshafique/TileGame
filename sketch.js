var w;
var columns;
var rows;
var board;
var next;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    //canvas.debugmsg();
    w = 50;
    // Calculate columns and rows
    columns = 16;
    rows = 16;

    board = new Array(columns);
    for (var i = 0; i < columns; i++) {
        board[i] = new Array(rows);
    }
    drawboard();
    console.log(board);
}

function drawboard() {
    for (var i = 0; i < columns; i++) {
        for (var j = 0; j < rows; j++) {
            if ((board[i][j] == 1)) fill(0);
            else fill(155);
            stroke(0);
            rect(i * w, j * w, w - 1, w - 1);
            fill(0, 102, 153, 51);
            text(floor(random(5)), i * w, j * w, w - 1, w - 1);
        }
    }
}
////function draw() {
//    fill(random(256), random(256), 153, 51);
//    var x = map(noise(w, 10), 0, 1, 720, 400);
//    var y = map(noise(w, 10), 0, 1, 720, 400);
//    ellipse(x, y / 2, 50, 50);
//}

function mouseClicked() {
    //if (mouseX, mouseY)
    if (mouseX)
        fill(random(256), random(256), 153, 51);
    ellipse(mouseX, mouseY, 50, 50);
    debugPrint(mouseX + " " + mouseY);
    // prevent default
}

//helpers
var counter = 0;

function debugPrint(message) {
    clear();
    counter++;
    text(counter + ". " + message, windowWidth / 2, windowHeight / 2, 200, 300);
}