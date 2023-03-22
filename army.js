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

    this.recruit = function() {    
        var sum_morale = 0, sum_hp = 0, sum_attack = 0, sum_defense = 0;
        var names = [];
        for (var soldier in this.soldiers) {
            sum_morale += soldier.morale;
            sum_hp += soldier.hp;
            sum_attack += soldier.attack;
            sum_defense += soldier.defense;
            names.push(soldier.name);
        }
        for (var name in this.all_names) {
            if (names.includes(name)) {
                this.all_names.splice(this.allnames.indexOf(name), 1);
            }
        }
        var s = new Soldier(this.all_names[randint(0, this.all_names.length)]);
        this.soldiers.push(s);     
        var l = this.soldiers.length;
        avg_morale = (sum_morale + s.morale) / l;
        avg_hp = (sum_hp + s.hp) / l;
        avg_attack = (sum_attack + s.attack) / l;
        avg_defense = (sum_defense + s.defense) / l;
        return s;
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
        this.equipment_level = upgrade_num;
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
                    
                    enemy.soldiers.splice(enemy.soldiers.indexOf(defender), 1);
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
    }
}
