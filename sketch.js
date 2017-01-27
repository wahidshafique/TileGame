var gameOver = false;

var w;
var columns;
var rows;
var board = [];
var randArray;

//initially we are in scan mode, so it is true
var canScan = true;
var scanClicks = 6;

var canExtract = false;

var totalScore = 0;

var scoreText;
var clickText;

var maxClicks = 3;
const maxSpecial = 6;
var scanCheck;

//frame rate
var fr = 1;

//for local storage operation 
var highScoreText;
var highscore = localStorage.getItem("highscore");

//set up the dom events seperately here
//add a listener to the checkbox element 
document.addEventListener("DOMContentLoaded", function (event) {
    highScoreText = document.getElementById("highscore");
    highScorer();
    scoreText = document.getElementById("score");
    //you are in scan mode, so your scan clicks are shown
    clickText = document.getElementById("clicks");
    clickText.innerHTML = "Scan Clicks: " + scanClicks;

    var selectorText = document.getElementById("scanmode");
    var selector = document.getElementById('scancheck');

    //vanity styling
    var canvColor = document.getElementsByTagName("canvas");
    selector.addEventListener('change', function (event) {
        if (selector.checked) {
            selectorText.innerHTML = "extract mode ";
            clickText.innerHTML = "Clicks: " + maxClicks;

            canExtract = true;
            canScan = false;
            canvColor[0].style.border = "10px inset #2196f3";
        } else {
            selectorText.innerHTML = "scan mode";
            clickText.innerHTML = "Scan Clicks: " + scanClicks;

            canExtract = false;
            canScan = true;
            canvColor[0].style.border = "10px inset brown";
        }
    });
});

function highScorer() {
    if (highscore === null) {
        //first run, create the index
        highscore = 0;
        localStorage.setItem("highscore", totalScore);
        console.log("is null");
    } else if (totalScore > highscore) {
        console.log("total is greater");
        localStorage.setItem("highscore", totalScore);
        highScoreText.innerHTML = "High Score: " + totalScore + "000";
    } else {
        highScoreText.innerHTML = "High Score: " + highscore + "000";
    }
}

function setup() {
    frameRate(fr);
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

    //draw the updated tiles on first run
    drawboard();

    angleMode(DEGREES);
}

//callback to just loop over the board anonymously
function loopBoard(arg) {
    for (var x = 0; x < rows; x++) {
        for (var y = 0; y < columns; y++) {
            arg(x, y);
        }
    }
}

//display the board
function drawboard() {
    loopBoard(function (x, y) {
        board[x][y].display();
    });
}

//the initial array of objects is made here [16][16]
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

//decrement the special tiles by 1 
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

//when you are in scan mode..
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
    if (maxClicks === 0) {
        gameOverFun();
    } else if (canScan) {
        scanBoard();
    } else if (canExtract) {
        extractBoard();
    }
    drawboard();
}

function gameOverFun() {
    //end condition!
    if (!gameOver) {
        clear();
        console.log("GAME OVER!");
        document.getElementById("switch").style.visibility = "hidden";
        var p = document.getElementsByTagName("p");
        p[1].style.marginLeft = "45%";
        p[1].className += " jumpy";
        for (var i = 3; i < p.length; i++) {
            p[i].style.visibility = "hidden";
        }
        endShow(columns - 1, rows - 1);
        highScorer();
    }
}

function endShow(i, j) {
    if (i < 0) {
        i = columns - 1;
        --j;
    }
    if (j < 0) {
        gameOver = true;
        return
    };
    setTimeout(function () {
        board[i][j].visible = true;
        drawboard();
        endShow(--i, j);
    }, 10);
}

function scanBoard() {
    if (scanClicks > 0) {
        loopBoard(function (x, y) {
            if (board[x][y].checked()) {
                viewScannedTiles(x, y);
            }
        })
    }
}

function extractBoard() {
    if (maxClicks > 0) {
        loopBoard(function (x, y) {
            if (board[x][y].clicked()) {
                depopulateBorder(x, y);
            }
        });
    }
}

var n = 0;
var c = 12;
var angleNum = 137.5;
//little visual for the end
function draw() {
    if (gameOver) {

        if (fr !== 60) {
            fr += 0.5;
            frameRate(fr);
            //random jitter
            loopBoard(function (x, y) {
                //if (board[x][y].number > 1) {
                board[x][y].x = board[x][y].x + random(-6, 6);
                board[x][y].y = board[x][y].y + random(-6, 6);
                //}
            });
            drawboard();
        } else {
            taxis();

        }
    }
}
var switched = true;
//just trying stuff out here 
function taxis() {
    var angle = n * angleNum;
    var radius = c * sqrt(n);
    var x = radius * cos(angle) + width / 2;
    var y = radius * sin(angle) + height / 2;
    colorMode(HSB);
    fill(n % 256, 255, 255);
    noStroke();
    ellipse(x, y, 18, 18);
    if (n > 2000) switched = true;
    if (n < 1) switched = false;
    if (switched) {
        n--;
        angleNum -= random(0.1, 0.3);
    } else {
        n++;
        angleNum += random(0.1, 0.3);
    };
    console.log("n: " + n + " " + "angle: " + angleNum);

}

//debugging purposes
function keyPressed() {
    loopBoard(function (x, y) {
        board[x][y].showText = !board[x][y].showText;
    });
    drawboard();
}