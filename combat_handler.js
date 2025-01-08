const combatHandler = {
    player_info : {
        health_modifier : 1,
        health_initial : 0,
        health : 0,
        damage : 10,
        armor : 0,
    },

    enemy_info : {
        name : '',
        damage : 0,
        health : 0,
        health_modifier : 1,
        modifier : 'none',
    },

    enemy_display_name : document.getElementById('enemy-name'),

    enemy_display_health : document.getElementById('enemy-health'),

    game_start : function() {
        this.generate_enemy();
    },

    generate_enemy : function() {
        let enemyArray = Array.from(enemies.keys());
        let randEnemy = enemyArray[Math.floor(Math.random() * enemyArray.length)];

        this.enemy_info.name = randEnemy;
        this.enemy_info.health = enemies.get(randEnemy)[0];
        this.enemy_info.damage = enemies.get(randEnemy)[1];
        this.enemy_display_name.innerHTML = this.enemy_info.name;
        this.enemy_display_health.innerHTML = this.enemy_info.health;
    },

    set_health : function(health_initial) {
        this.player_info.health_initial = health_initial;
        this.player_info.health = health_initial;
    },

    update_player_health : function(new_health) {
        let health_percent;
        let healthBar = document.getElementById("health-bar");
        let displayed_health = document.getElementById("health-tag");
        let missing_health = document.getElementById("missing-health");

        //Modification section
        this.player_info.health = Number(new_health);
        health_percent = 100 * (new_health / this.player_info.health_initial);

        //Style section
        displayed_health.innerHTML = `${new_health} / ${this.player_info.health_initial}`;
        healthBar.style.width = String(health_percent) + "%";
        if (new_health != this.player_info.health_initial) { //Only give missing health a display if player guesses
            missing_health.style.borderColor = "#F6FFF0";
        }
        missing_health.style.width = String(100-health_percent) + "%";

    },

    update_enemy_health : function(new_health) {
        if (new_health <= 0) {
            this.generate_enemy();
        } else {
            this.enemy_info.health = new_health;
            this.enemy_display_name.innerHTML = this.enemy_info.name;
            this.enemy_display_health.innerHTML = this.enemy_info.health;
            console.log(this.enemy_info.health, " new enemy health ", this.enemy_info.name);
        }
        
    },

    enemy_defeated : function() {

    },

    give_items : function() {

    },

    calc_damage_dealt : function(colors) {
        let greenCount = 0;
        for (let i = 0; i < colors.length; i++) {
            colors[i] === 'green' ? greenCount+= 1 : greenCount += 0;
        }
        return (Number(this.player_info.damage) * Number(greenCount));
    },

    calc_damage_received : function(colors) {
        let redCount = 0;
        for (let i = 0; i < colors.length; i++) {
            colors[i] === 'red' ? redCount+= 1 : redCount += 0;
        }
        return (Number(this.enemy_info.damage) * Number(redCount));
    },
}