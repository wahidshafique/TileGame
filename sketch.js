var w;
var columns;
var rows;
var board = [];
var randArray;

var switcher = true;
var canScan = false;

var totalScore = 0;
var scoreText;

function setup() {
    //    button = createButton('submit');
    //    button.position(150, 65);
    //    button.mousePressed(function () {
    //        canScan = !canScan;
    //    });

    canvas = createCanvas(800, 800);
    //width of the squares
    w = 50;
    columns = 16;
    rows = 16;
    //make the random coordinates for the blocks

    //first run to just make the object array
    populateTiles();
    populateBorder();
    //draw the updated tiles
    drawboard();
}

//the initial array of objects is made here
function populateTiles() {
    for (var j = 0; j < columns; j++) {
        board[j] = new Array(rows);
    }
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < columns; y++) {
            board[x][y] = new Tile(x, y);
        }
    }
}

function drawboard() {
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < columns; y++) {
            board[x][y].display();
        }
    }
}

function populateBorder() {
    var randX = Math.floor(random(rows - 1));
    var randY = Math.floor(random(columns - 1));

    board[randX][randY].number = 4;

    var innerPop = [];

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
                        innerPop.push(i + j);
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
    console.log(innerPop);
}


function depopulateBorder(x, y) {
    //depopulate inner edge
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if (i === 0 && j == 0) {
                continue;
            }
            try {
                var tB = board[x + i][y + j];
                if (tB) {
                    if (innerPop(tB.number) !== -1) {
                        console.log(tB.number);
                        tB.number -= 1;
                    }
                }
            } catch (e) {
                continue;
            }
        }
    }
    //depopulate outer edges
    for (var i = -2; i < 3; i++) {
        for (var j = -2; j < 3; j++) {
            if (i === 0 && j == 0) {
                continue;
            }
            try {
                var tB = board[x + i][y + j];
                if (tB) {
                    console.log(board[x][y].number);
                    if (tB.number !== 1) {
                        tB.number -= 1;
                    }
                }
            } catch (e) {
                continue;
            }
        }
    }
}

function posMap(index, xMod, yMod) {
    xMod = xMod || 0;
    yMod = yMod || 0;
    return ((index % rows) + xMod) + ((index / rows) + yMod) * rows;
}

function mousePressed() {
    var res = false;
    // if (canScan) {
    switcher = false;

    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < columns; y++) {
            var index = x + y * rows;
            res = board[x][y].clicked();
            if (res) {
                depopulateBorder(x, y);
            }
        }
    }
    drawboard();
}

function updateScoreText(score) {
    if (scoreText) {
        scoreText.remove();
    }
    scoreText = createP("Score: " + score).addClass('text-footer-score');
}