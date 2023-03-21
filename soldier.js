function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function soldier() {
    this.hp_max = randint(80, 100);
    this.hp = hp_max - randint(0, 15);
    this.morale = randint(50, 100);
    this.attack = randint(0, 100);
    this.defense = randint(0, 100);
    this.state = 1; // 1 = alive, 0 = dead
    this.name;

    this.die = function() {
        this.state = 0;
    }

    this.display = function() {
        var display_str = this.name + " " + this.hp + "/" + this.hp_max + " ";
        display_str += "" + this.attack + " " + this.defense + " " + this.morale;
        return display_str; 
    }
}
