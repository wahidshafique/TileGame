var w;
var columns;
var rows;
var board = [];
var randArray;

var switcher = true;
var canScan = false;

var totalScore = 0;

var scoreText;
var clickText;

var maxClicks = 3;
const maxSpecial = 6;

function setup() {
    scoreText = document.getElementById("score");
    clickText = document.getElementById("clicks");
    //    button = createButton('submit');
    //    button.position(600, 76);
    //    button.mousePressed(function () {
    //        canScan = !canScan;
    //    });

    canvas = createCanvas(800, 800);

    //width of the squares
    w = 50;
    columns = 16;
    rows = 16;

    //this creates an array to use for grid
    populateTiles();

    //create the special tiles 
    for (var i = 0; i < maxSpecial; i++) {
        populateBorder();
    }

    //draw the updated tiles
    drawboard();
}

//callback to just loop over the board anonymously
function loopBoard(arg) {
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < columns; y++) {
            arg(x, y);
        }
    }
}

//simply display the board
function drawboard() {
    loopBoard(function (x, y) {
        board[x][y].display();
    });
}

//the initial array of objects is made here
function populateTiles() {
    for (var j = 0; j < columns; j++) {
        board[j] = new Array(rows);
    }
    loopBoard(function (x, y) {
        board[x][y] = new Tile(x, y);
    });
}

//make the special tiles
function populateBorder() {
    var randX = Math.floor(random(rows - 1));
    var randY = Math.floor(random(columns - 1));

    board[randX][randY].number = 4;

    //populate inner edge
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (i === 0 && j == 0) {
                continue;
            }
            try {
                var tB = board[randX + i][randY + j];
                if (tB) {
                    if (tB.number === 1) {
                        tB.number = 3;
                    }
                }
            } catch (e) {
                continue;
            }
        }
    }
    //populate outer edges
    for (var i = -2; i < 3; i++) {
        for (var j = -2; j < 3; j++) {
            if (i === 0 && j == 0) {
                continue;
            }
            try {
                var tB = board[randX + i][randY + j];
                if (tB) {
                    if (tB.number === 1) {
                        tB.number = 2;
                    }

                }
            } catch (e) {
                continue;
            }
        }
    }
}

function depopulateBorder(x, y) {
    for (var i = -2; i < 3; i++) {
        for (var j = -2; j < 3; j++) {
            if (i === 0 && j == 0) {
                continue;
            }
            try {
                var tB = board[x + i][y + j];
                if (tB) {
                    if (tB.number > 1) {
                        tB.number -= 1;
                    }
                }
            } catch (e) {
                continue;
            }
        }
    }
}

function viewScannedTiles(x, y) {
    board[x][y].visible = true;

    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (i === 0 && j == 0) {
                continue;
            }
            try {
                var tB = board[x + i][y + j];
                if (tB) {
                    tB.visible = true;
                }
            } catch (e) {
                continue;
            }
        }
    }
}

function mousePressed() {
    if (maxClicks > 0) {
        var res = false;
        // if (canScan) {
        switcher = false;

        loopBoard(function (x, y) {
            var index = x + y * rows;
            res = board[x][y].clicked();
            if (res) {
                maxClicks--;
                clickText.innerHTML = "Clicks: " + maxClicks;
                viewScannedTiles(x, y);
                depopulateBorder(x, y);

            }
        });
        drawboard();
    }
}

function keyPressed() {
    loopBoard(function (x, y) {
        board[x][y].showText = !board[x][y].showText;
    });
    drawboard();
}