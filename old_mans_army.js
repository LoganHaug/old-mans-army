
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
let title_img, mackandal, jb;
function preload() {
    f = loadFont("font.ttf");
    text_file = loadJSON("text.json");
    title_img = loadImage("assets/title.png");
    mackandal = loadImage("assets/mackandal.png");
    jb = loadImage("assets/jb.png");
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
    if (inp.value() !== "") {
        input_text = inp.value();
        inp.value("");
    }
}

function title_screen() {
    image(title_img, 200, 50);
    fill("white");
    textSize(40);
    textAlign(CENTER);
    text(text_file["title_screen"]["main"], width / 2, 560);
    textSize(25);
    text(text_file["title_screen"]["sub-text"], width / 2, 600);
    text(text_file["title_screen"]["end"], width / 2, 750) ;
}

function char_select() {
    image(jb, 200, 50);
    image(mackandal, 700, 50);
    textSize(30);
    textAlign(CENTER);
    text(text_file["char_select"]["main"], width / 2, height - 320 );
    textSize(20);
    text(text_file["char_select"]["jb"], width / 2, height - 200);
    text(text_file["char_select"]["mc"], width / 2, height - 150);
    text(text_file["char_select"]["back"], width / 2, height - 100);
}

function jb_game() {
    background(55);

}

/* p5 draw function */
function draw() {
    if (state === "title" && keyIsPressed === true) {
        background(55);
        state = "char_select";
        char_select();
    } else if (state === "char_select" && input_text === "3") {
        input_text = "";
        background(55);
        state = "title"
        title_screen();
    } 
}
