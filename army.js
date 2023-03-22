// Logan Haug
function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var j = loadJSON("text.json");

function army() {
    this.soldiers = [];
    this.dead = [];
    this.food = randint(5,10);
    this.avg_hp;
    this.avg_attack;
    this.avg_defense;
    this.avg_morale;
    this.all_names = j["names"];
    this.equipment_level = 1;

    this.recruit = function() {    
        var sum_morale = 0, sum_hp = 0, sum_attack = 0, sum_defense = 0;
        var names = [];
        for (var soldier in soldiers) {
            sum_morale += soldier.morale;
            sum_hp += soldier.hp;
            sum_attack += soldier.attack;
            sum_defense += soldier.defense;
            names.push(soldier.name);
        }
        for (var name in all_names) {
            if (names.includes(name)) {
                all_names.pop(name);
            }
        }
        var s = new soldier(all_names[randint(0, all_names.length)]);
        soldiers.push(s);     
        var l = soldier.length;
        avg_morale = (sum_morale + s.morale) / l;
        avg_hp = (sum_hp + s.hp) / l;
        avg_attack = (sum_attack + s.attack) / l;
        avg_defense = (sum_defense + s.defense) / l;
    }

    this.step = function(hp, decay, morale, attack, defense) {
        if (this.food == 0)
            decay -= 10;
        for (var s in this.solders) {
            s.step(hp, decay, morale, attack, defense);
        }
        this.food -= this.soldiers.length;
    }

    this.equip = function(upgrade_num) {
        this.equipment_level += upgrade_num;
        for (var s in this.soldiers) {
            s.equip(this.equipment_level);
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
                dmg = s.attack();
                if (enemy.soldiers.length > 1) {
                    defender = enemy.soldiers[randint(0, enemy.solders.length-1)];
                } else if (enemy.soldiers.length == 1) {
                    defender = enemy.soldiers[0];
                } else {
                    break;
                }
                defender.defend(dmg);
                if (defender.hp == 0) {
                    enemy.soldiers.pop(defender);
                }
            }
            // enemy army attacks 
            for (var s in enemy.soldiers) {
                dmg = s.atatck();
                if (this.soldiers.length > 1) {
                    defender = this.soldiers[randint(0, this.soldiers.length-1)];
                } else if (this.soldiers.length == 1) {
                    defender = this.soldiers[0];
                } else {
                    break;
                }
                defender.defend(dmg);
                if (defender.hp == 0) {
                    this.soldiers.pop(defender);
                    this.dead.push(defender);
                }
            }
        }
    }
}
