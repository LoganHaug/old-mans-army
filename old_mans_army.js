
function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Flags the canvas
let cnv;

/* Centers the canvas */
function centerCanvas() {
	// Centers the canvas
	cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

/* Recenters the canvas on window re-size */
function windowResized() {
	centerCanvas();
}

let f;
let text_file;
function preload() {
    f = loadFont("font.ttf");
    text_file = loadJSON("text.json");
}

/* p5 Setup function */
let my_grid, boarders, inp;
function setup() {
	// Create the canvas
	cnv = createCanvas(1200, 800);
	// Center the Canvas
    centerCanvas();
    frameRate(20);
    background(55);
    textFont(f);
    textSize(40);
    inp = createInput("");
    inp.position(windowWidth / 4 - 60,  windowHeight - 50);
    inp.size(1100);
    textAlign(CENTER);
    text(text_file["title_screen"]["main"], width / 2, height / 4);
}

/* p5 draw function */
function draw() {

}
