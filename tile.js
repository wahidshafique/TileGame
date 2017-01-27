function Tile(col, row) {
    //this.number = floor(random(1, 4));
    this.number = 1;

    this.visible = false;
    //DEBUG
    this.showText = false;

    this.colorVal = color(0);
    this.textColor = 0;
    this.x = row * w;
    this.y = col * w;
    this.size = w;

    this.display = function () {
            if (this.visible) {
                switch (this.number) {
                case 1:
                    this.colorVal = color(227, 108, 10);
                    break;
                case 2:
                    this.colorVal = color(255, 192, 0);
                    break;
                case 3:
                    this.colorVal = color(255, 255, 0);
                    break;
                case 4:
                    this.colorVal = color(0, 191, 255);
                    break;
                default:
                    this.colorVal = color(0, 0, 0);
                    break;
                }
            } else {
                this.colorVal = color(100, 100, 100);
            }
            fill(0);
            noStroke();
            fill(this.colorVal);
            rect(this.x, this.y, this.size, this.size);
            if (this.showText) {
                noStroke();
                fill(this.textColor);
                textSize(32);
                text(this.number, this.x + 16, this.y + 8, 32, 32);
            }

        }
        //describes when you click a tile to peek
    this.checked = function () {
        if (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.size && mouseY < this.y + this.size) {
            scanClicks--;
            clickText.innerHTML = "Scan Clicks: " + scanClicks;
            return true;
        }
        return false;
    }

    //describes when you click a tile for points
    this.clicked = function () {
        if (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.size && mouseY < this.y + this.size) {
            totalScore += this.number;
            this.number = 1;
            maxClicks--;
            //extra 0's to make people feel meaningful 
            scoreText.innerHTML = "Score: " + totalScore + "000";
            clickText.innerHTML = "Clicks: " + maxClicks;
            return true;
        }
        return false;
    }
}