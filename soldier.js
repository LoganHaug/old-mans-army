function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Soldier(name) {
    this.hp_max = randint(80, 100);
    this.hp = this.hp_max - randint(0, 15);
    this.morale = randint(50, 100);
    this.atk = randint(2, 10);
    this.defense = randint(2, 10);
    this.equipment;
    this.name = name;
    this.decay;

    this.display = function() {
        var display_str = this.name + "\t" + this.hp + "/" + this.hp_max + "\t" + this.atk + "\t" + this.defense + "\t" + this.morale;
        return display_str; 
    }

    this.step = function(hp_step, decay_step, morale_step, attack_step, defense_step) {
        this.decay = decay_step;
        this.hp += this.decay;
        this.morale += morale_step;
        this.atk += attack_step;
        this.defense += defense_step;
    }

    this.attack = function() {
        return this.atk * this.equipment * (randint(50, 120) / 100);
    }

    this.defend = function(damage) {
        if (damage - this.defense < 0) {
            damage = 0;
        } else {
            damage -= defense;
        }
        this.hp -= damage;
        if (this.hp < 0)
            this.hp = 0;
    }

    this.equip = function(e) {
        this.equipment += e;
    }
}
