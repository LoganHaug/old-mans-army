// Logan Haug
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
let title_img, jb, jb_map, headstone, mackandal;
let audio;
function preload() {
    f = loadFont("assets/font.ttf");
    text_file = loadJSON("text.json");
    title_img = loadImage("assets/title.png");
    jb = loadImage("assets/jb.png");
    jb_map = loadImage("assets/jb_map.png");
    headstone = loadImage("assets/headstone.png");
    mackandal = loadImage("assets/mackandal.png");
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
var army;
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
    
    army = new Army(text_file);
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
    // Check for conditions of game over
    if (army.soldiers.length > 0 && army.avg_morale < 10) {
        game_over();
        return;
    }
    fill("white");
    textSize(20);
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
    text(text_file["jb_game"]["ferry"], width / 8 * 5, height - 125);
    textAlign(CENTER);
    text(text_file["jb_game"]["quit"], width / 2, height - 100);
}

async function bees() {
    state = "bees";
    background(55);
    textSize(30);
    textAlign(CENTER);
    var b = false;
    if (army.soldiers.length < 16) {
        var s = army.recruit();
        text(text_file["recruit"], width / 2, height / 3);
        text(s.display(), width / 2, height / 2);
        b = army.step(0, 0, 0, 0);
    } else {
        text(text_file["recruit_fail"], width / 2, height / 2);
    }
    text("--Press any key to continue--", width / 2, height / 2 + 200);
    if (b) {
        state = "funeral";
    }
}

function lecompton() {
    state = "lecompton";
    background(55);
    textSize(30);
    textAlign(CENTER);
    fill("white");
    
    if (army.soldiers.length < 3) {
        text(text_file["lecompton_small"], width / 2, height / 2);
    } else {
        var enemy = new Army(text_file);
        var num_soldiers = randint(5, 10) + army.infamy;

        for (var i = 0; i < num_soldiers; i++) {
            s = enemy.recruit();
            console.log(s);
        }
        army.battle(enemy);

        if (army.soldiers.length > 0) {
            text(text_file["lecompton_success"], width / 2, height / 2);
        } else {
            text(text_file["lecompton_failure"], width / 2, height / 2);
            state = "lecompton_failure";
        }
        if (army.step(0, 20, 4, 4)) {
            state = "funeral";
        }
    }
    army.infamy += randint(3,4);
    army.equipment_level += 1;
    army.equip(army.equipment_level);
    text("--Press any key to continue--", width / 2, height / 2 + 200);
 
}

function pottawamie() {
    state = "pottawamie";
    background(55);
    textSize(30);
    textAlign(CENTER);
    fill("white");
    
    if (army.soldiers.length < 3) {
        text(text_file["pottawamie_small"], width / 2, height / 2);
    } else {
        var enemy = new Army(text_file);
        var num_soldiers = randint(1, 5) + army.infamy;

        for (var i = 0; i < num_soldiers; i++) {
            s = enemy.recruit();
            console.log(s);
        }
        army.battle(enemy);

        if (army.soldiers.length > 0) {
            text(text_file["pottawamie_success"], width / 2, height / 2);
        } else {
            text(text_file["pottawamie_failure"], width / 2, height / 2);
            state = "pottawamie_failure";
        }
        if (army.step(0, 10, 2, 2)) {
            state = "funeral";
        }
    }
    army.infamy += randint(1,2);
    text("--Press any key to continue--", width / 2, height / 2 + 200);
}

function ferry() {
    state = "ferry";
    if (army.avg_attack < 6 || army.avg_defense < 6 || army.equipment_level < 3) {
        background(55);
        textSize(30);
        textAlign(CENTER);
        text(text_file["ferry_fail"], width / 2, height / 2 - 50);
        text("--Press any key to continue--", width / 2, height / 2 + 200);
    } else {
        game_over(); 
    }
}

function hunt() {
    state = "hunt";
    background(55);
    textSize(30);
    textAlign(CENTER);
    var b = false;
    if (army.soldiers.length > 0) {
        army.hunt();
        text(text_file["hunt"], width / 2, height / 2);
        b = army.step(5, 5, 1, 0);
    } else {
        text(text_file["hunt_fail"], width / 2, height / 2);
    }
    text("--Press any key to continue--", width / 2, height - 100);
    if (b) {
        state = "funeral";
    }
}

function speaking_tour() {
    background(55);
    textSize(30);
    textAlign(CENTER);
    fill("white");

    state = "speaking_tour";
    text(text_file["speaking_tour"], width / 2, 200);
    text("--Press any key to continue--", width / 2, height - 100);
    army.step(0, -10, -1, -1);
}

function rest() { 
    background(55);
    textSize(30);
    textAlign(CENTER);
    state = "rest";
    var b = false;
    if (army.soldiers.length > 0 ) {
        b = army.step(30, 10, -1, -1);
        text(text_file["rest"], width / 2, height / 2);
    } else  {
        text(text_file["rest_fail"], width / 2, height / 2);
    }
    text("--Press any key to continue--", width / 2, height - 100);
    if (b) {
        state = "funeral";
    }
}

function stats() {
    state = "stats";
    background(55);
    textAlign(CENTER);
    textSize(25);
    text(army.display(), width / 2, 100); 
    text("--Press any key to continue--", width / 2, height - 100);
}

async function transition() {
    background("black");
    fill("grey");
    noStroke();
    rect(0, 0, width, 30);
    textAlign(CENTER);
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 10; j++) {
            rect(1200 / 10 * j + 50, 800 / 20 * i + 30, 20, 77);  
        }
        await sleep(30);
    }
    await rect(0, 770, width, 30);
    await sleep(200);
    await draw_lock();
    textSize(50);
    text(text_file["transition"], width / 2, height * 3 / 4);
    await sleep(600);
}

function draw_lock() {
    fill("yellow");
    rect(width / 2 - 40, height / 2 - 40, 80, 80);
    rect(width / 2 - 30, height / 2 - 80, 10, 40);
    rect(width / 2 + 20, height / 2 - 80, 10, 40);
    rect(width / 2 - 30, height / 2 - 80, 30, 10);
}

async function funeral() {
    background("black");
    textAlign(CENTER);
    textSize(25);
    fill("white");
    state = "funeral_playing";
 
    var b_obj;
    for (var b in army.dead) {
        background("black");
        b_obj = army.dead[b];
        // Flight instead of death
        if (text_file["flight"].includes(b_obj.name)) {
            image(mackandal, width / 2 - 150, 100);
            text(text_file["flight_death"] + b_obj.name, width / 2, height - 200);
        } else {
            image(headstone, 200, 50);
            text(text_file["death"] + b_obj.name, width / 2,  height - 100);
        }
        army.step(0, -10, 0, 0);
        await sleep(7000);
        clear();
    }
    army.bury();
    if (army.soldiers.length === 0) {
        game_over();
    } else {
        jb_game();
    }
}

function game_over() {
    background("black");
    textAlign(CENTER);
    textSize(25);
    fill("white");
    state = "game_over";
    // morale defeat
    if (army.avg_morale < 20) {
        text(text_file["morale_defeat"], width / 2, height / 2);
    }
    // death defeat
    else if (army.soldiers.length === 0) {
        text(text_file["death_defeat"], width / 2, height / 2);
    }
    // harpers ferry defeat
    else {
        text(text_file["ferry"], width / 2, 100);
    }
    text("--Press any key to continue--", width / 2, height - 100);
    army.reset();
}

/* p5 draw function */
async function draw() {
    if (state === "title" && keyIsPressed === true) {
        background(55);
        await transition();
        jb_game();
    } else if (state === "jb_game") {
        if (input_text === "9") {
            input_text = "";
            army.reset();
            await transition();
            title_screen();
        } else if (input_text === "1") {
            input_text = "";
            bees();
        } else if (input_text === "2") {
            input_text = "";
            lecompton();
        } else if (input_text === "3") {
            input_text = "";
            pottawamie(); 
        } else if (input_text === "4") {
            input_text = "";
            hunt();
        } else if (input_text === "5") {
            input_text = "";
            speaking_tour();
        } else if (input_text === "6") {
            input_text = "";
            rest();
        } else if (input_text === "7") {
            input_text = "";
            stats();
        } else if (input_text === "8") {
            input_text = "";
            ferry();
        }
    } else if (state === "bees" && keyIsPressed) {
        await transition();
        jb_game();
    } else if (state === "stats" && keyIsPressed) {
        await transition();
        jb_game();
    } else if (state === "hunt" && keyIsPressed) {
        await transition();
        jb_game();
    } else if (state === "rest" && keyIsPressed) {
        await transition();
        jb_game();
    } else if (state === "funeral" && keyIsPressed) {
        await transition();
        await funeral();
    } else if (state === "pottawamie" && keyIsPressed) {
        await transition();
        jb_game();
    } else if (state === "lecompton" && keyIsPressed) {
        await transition();
        jb_game();
    }else if (state === "game_over" && keyIsPressed) {
        await transition();
        army.reset();
        title_screen();
    } else if (state === "speaking_tour" && keyIsPressed) {
        await transition();
        jb_game();
    } else if (state === "ferry" && keyIsPressed) {
        await transition();
        jb_game();
    }
}
