
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
let state;
let character;
let button;
var input_text = "";
function setup() {
	// Create the canvas
	cnv = createCanvas(1200, 800);
	// Center the Canvas
    centerCanvas();
    frameRate(20);
    background(55);
    textFont(f);
    // Set input field
    inp = select("#inp");

    // Set input button
    button = select("#submit");
    button.mousePressed(btn_handle);

    // start at the title screen
    title_screen();
    state = "title"
}

function btn_handle() {
    input_text = inp.value();
    console.log(input_text);
}

function inp_handle() {
    }

function title_screen() {
    textSize(40);
    textAlign(CENTER);
    text(text_file["title_screen"]["main"], width / 2, height / 4);
    textSize(25);
    text(text_file["title_screen"]["sub-text"], width / 2, height / 2.5);
    text(text_file["title_screen"]["end"], width / 2, height - 200) ;
}

function char_select() {
    textSize(40);
    textAlign(CENTER);
    text(text_file["char_select"]["main"], width / 2, height / 3);
    textSize(30);
    text(text_file["char_select"]["jb"], width / 2, height / 2 + 50);
    text(text_file["char_select"]["mc"], width / 2, height / 2 + 100);
}

/* p5 draw function */
function draw() {
    if (state === "title" && keyIsPressed === true) {
        background(55);
        state = "char_select";
        char_select();
    }
}
