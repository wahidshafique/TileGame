function Tile(col, row) {
    //this.number = floor(random(1, 4));
    this.number = 1;

    this.visible = false;
    this.showText = true;
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

    this.clicked = function () {
        if (this.number > 0) {
            if (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.size && mouseY < this.y + this.size) {
                totalScore += this.number;
                this.number--;
                scoreText.innerHTML = "Score: " + totalScore;
                return true;
                //this.showText = !this.showText;
                //console.log(this.x, this.y);
            }
        }
        return false;
    }
}