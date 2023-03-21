
function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
let title_img, mackandal, jb, jb_map;
let audio;
function preload() {
    f = loadFont("font.ttf");
    text_file = loadJSON("text.json");
    title_img = loadImage("assets/title.png");
    mackandal = loadImage("assets/mackandal.png");
    jb = loadImage("assets/jb.png");
    jb_map = loadImage("assets/jb_map.png");
    audio = createAudio("assets/bg_music.mp3");
    audio.loop();
}

/* p5 Setup function */
let my_grid, boarders, inp;
let state;
let character;
let button;function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let audio_button;
let audio_state;
let slider;
var input_text = "";
async function setup() {
	// Create the canvas
	cnv = createCanvas(1200, 800);
	// Center the Canvas
    centerCanvas();
    frameRate(10);
    background(55);
    textFont(f);
    // Set input field
    inp = select("#inp");

    // Set input button
    button = select("#submit");
    button.mousePressed(btn_handle);

    // Set audio button
    audio_button = select("#audio");
    audio_button.mousePressed(audio_handle);
    audio_state = "playing";

    // Set v{olume slider
    slider = select("#vol");
    slider.mouseMoved(slider_handle);
    audio.volume(slider.value() / 150);

    // start at the title screen
    title_screen();
    state = "title";
    
}

function btn_handle() {
    if (inp.value() !== "") {
        input_text = inp.value();
        inp.value("");
    }
}

function audio_handle() {
    if (audio_state === "paused") {
        audio.play();
        audio_state = "playing";
    } else if (audio_state === "playing") {
        audio.pause();
        audio_state = "paused";
    }
}

function slider_handle() {
    audio.volume(slider.value() / 150);
}

function title_screen() {
    background(55);
    state = "title"
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
    background(55);
    state = "char_select";
    fill("white");
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
    state = "jb_game";
    background(55);
    image(jb_map, 150, 50);
    textAlign(LEFT);
    text(text_file["jb_game"]["bees"], width / 8, height - 170);
    text(text_file["jb_game"]["slaver_raid"], width / 8, height - 155);
    text(text_file["jb_game"]["free"], width / 8, height - 140);
    text(text_file["jb_game"]["hunt"], width / 8, height - 125);
    text(text_file["jb_game"]["speech"], width / 8 * 5, height - 170);
    text(text_file["jb_game"]["rest"], width / 8 * 5, height - 155);
    text(text_file["jb_game"]["status"], width / 8 * 5, height - 140);
    text(text_file["jb_game"]["quit"], width / 8 * 5, height - 125);
}

async function transition() {
    background("black");
    fill("grey");
    noStroke();
    rect(0, 0, width, 30);
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            rect(1200 / 10 * j + 50, 800 / 20 * i + 30, 20, 77);  
        }
        await sleep(30);
    }
    rect(0, 770, width, 30);
    draw_lock();
    await sleep(400);
}

function draw_lock() {
    fill("yellow");
    rect(width / 2 - 40, height / 2 - 40, 80, 80);
    rect(width / 2 - 30, height / 2 - 80, 10, 40);
    rect(width / 2 + 20, height / 2 - 80, 10, 40);
    rect(width / 2 - 30, height / 2 -80, 50, 10);
}

function md_game() {
    state = "md_game";
    background(55);
}

/* p5 draw function */
async function draw() {
    if (state === "title" && keyIsPressed === true) {
        background(55);
        transition();
        await sleep(1000);
        char_select();
    } else if (state === "char_select" && input_text === "3") {
        input_text = "";
        transition();
        await sleep(1000);
        title_screen();
    } else if (state === "char_select" && input_text === "1") {
        input_text = "";
        jb_game();
    } else if (state === "char_select" && input_text === "2") {
        input_text = "";
        md_game();
    } else if (state === "jb_game" && input_text === "8") {
        input_text = "";
        title_screen();
    }
}
