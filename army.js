// Logan Haug
function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function Army(j) {
    this.soldiers = [];
    this.dead = [];
    this.food = randint(5,10);
    this.avg_hp = 0;
    this.avg_attack = 0;
    this.avg_defense = 0;
    this.avg_morale = 0;
    this.all_names = j["names"];
    this.equipment_level = 1;

    this.reset = function() {
        this.soldiers = [];
        this.dead = [];
        this.food = randint(5,10);
        this.avg_hp = 0;
        this.avg_attack = 0;
        this.avg_defense = 0;
        this.avg_morale = 0;
        this.all_names = j["names"];
        this.equipment_level = 1;
    }

    this.display = function() {
        var display_str = "AVG ATK: " + this.avg_attack + "\tAVG DEFENSE: " + this.avg_defense;
        display_str += "\tAVG HP: " + this.avg_hp + "\tAVG MORALE: " + this.avg_morale;
        display_str += "\tFOOD: " + this.food + "\tEQUIP LVL: " + this.equipment_level + "\n";
        for (var s in this.soldiers) {
            display_str += this.soldiers[s].display() + "\n";
        }
        if (this.soldiers.length === 0)
            display_str += "\nNo soldiers to display : (";
        return display_str;
    }

    this.recruit = function() {    
        var sum_morale = 0, sum_hp = 0, sum_attack = 0, sum_defense = 0;
        var names = [];
        for (var soldier in this.soldiers) {
            sum_morale += this.soldiers[soldier].morale;
            sum_hp += this.soldiers[soldier].hp;
            sum_attack += this.soldiers[soldier].atk;
            sum_defense += this.soldiers[soldier].defense;
            names.push(this.soldiers[soldier].name);
        }
        for (var name in this.all_names) {
            if (names.includes(this.all_names[name])) {
                this.all_names.splice(this.all_names.indexOf(this.all_names[name]), 1);
            }
        }
        var s = new Soldier(this.all_names[randint(0, this.all_names.length - 1)]);
        this.soldiers.push(s);     
        var l = this.soldiers.length;
        this.avg_morale = Math.floor((sum_morale + s.morale) / l);
        this.avg_hp = Math.floor((sum_hp + s.hp) / l);
        this.avg_attack = Math.floor((sum_attack + s.atk) / l);
        this.avg_defense = Math.floor((sum_defense + s.defense) / l);
        return s;
    }

    this.step = function(hp, decay, morale, attack, defense) {
        if (this.food == 0)
            decay -= 10;
        for (var s in this.soldiers) {
            this.soldiers[s].step(hp, decay, morale, attack, defense);
        }
        this.food -= this.soldiers.length;
        if (this.food < 0)
            this.food = 0;
    }

    this.equip = function(upgrade_num) {
        this.equipment_level = upgrade_num;
        for (var s in this.soldiers) {
            this.soldiers[s].equip(this.equipment_level);
        }
    }

    this.hunt = function() {
        this.food += this.soldiers.length * randint(1,2);
    }

    this.battle = function(enemy) {
        var dmg;
        var defender;
        while (this.solders.length > 0 && enemy.solders.length > 0) {
             // This army attacks
            for (var s in this.soldiers) {
                dmg = this.soldiers[s].attack();
                if (enemy.soldiers.length > 1) {
                    defender = enemy.soldiers[randint(0, enemy.solders.length-1)];
                } else if (enemy.soldiers.length == 1) {
                    defender = enemy.soldiers[0];
                } else {
                    break;
                }
                defender.defend(dmg);
                if (defender.hp == 0) {
                    
                    enemy.soldiers.splice(enemy.soldiers.indexOf(defender), 1);
                }
            }
            // enemy army attacks 
            for (var s in enemy.soldiers) {
                dmg = enemy.soldiers[s].attack();
                if (this.soldiers.length > 1) {
                    defender = this.soldiers[randint(0, this.soldiers.length-1)];
                } else if (this.soldiers.length == 1) {
                    defender = this.soldiers[0];
                } else {
                    break;
                }
                defender.defend(dmg);
                if (defender.hp == 0) {
                    this.soldiers.splice(this.soldiers.indexOf(defender), 1);
                    this.dead.push(defender);
                }
            }
        }
    }

    this.bury = function() {
        var s;
        if (this.dead.length > 0) {
            s = this.dead.pop(); 
        }
        return s;
    }
}
