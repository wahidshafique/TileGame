function Tile(col, row) {
    //this.number = floor(random(1, 4));
    this.number = 1;

    this.showText = true;
    this.colorVal = color(0);
    this.textColor = 0;
    this.x = row * w;
    this.y = col * w;
    this.size = w;

    this.display = function () {
        //this handles the values and sets the right colors in display
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
        default:
            break;
        }
        fill(0);
        stroke(155);
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
        if (mouseX > this.x && mouseY > this.y && mouseX < this.x + this.size && mouseY < this.y + this.size) {
            this.colorVal = color(15);
            this.showText = !this.showText;
            console.log(this.x, this.y);
        }
    }
}