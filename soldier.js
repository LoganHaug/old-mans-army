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
    this.equipment = 1;
    this.name = name;

    this.display = function() {
        return this.name + "\t" + this.hp + "/" + this.hp_max + "\t" + this.atk + "\t" + this.defense + "\t" + this.morale;
    }

    this.step = function(hp_step, morale_step, attack_step, defense_step) {
        this.hp += hp_step;
        if (this.hp < 0)
            this.hp = 0;
        else if (this.hp > this.hp_max)
            this.hp = this.hp_max;
        this.morale += morale_step;
        if (this.morale > 100)
            this.morale = 100;
        this.atk += attack_step;
        if (this.atk < 0)
            this.atk = 0;
        this.defense += defense_step;
        if (this.defense < 0)
            this.defense = 0;
    }

    this.attack = function() {
        return Math.floor(this.atk * this.equipment * (randint(50, 120) / 100));
    }

    this.defend = function(damage) {
        if (damage - this.defense < 0) {
            damage = 1;
        } else {
            damage -= this.defense;
        }
        this.hp -= damage;
        if (this.hp < 0)
            this.hp = 0;
    }

    this.equip = function(e) {
        this.equipment = e;
    }
}
