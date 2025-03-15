const combatHandler = {
    player_info : {
        health_modifier : 1,
        health_initial : 0,
        level : 1,
        health : 0,
        damage : 10,
        armor : 0,
        critical_chance : .1,
        items : new Map([]),
    },

    enemy_info : {
        name : '',
        health_modifier : 1,
        level : 1,
        damage : 0,
        health : 0,
        modifier : 'none',
    },

    enemy_display_name : document.getElementById('enemy-name'),

    enemy_display_health : document.getElementById('enemy-health'),

    game_start : function() {
        this.update_player_health(this.player_info.health_initial);
        this.display_stage_items();
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

    display_stage_items : function() {
        let item_table = document.getElementById('item-select');
        let current_row;
        let current_node;
        for (let j = 0; j < 2; j++) {
            current_row = document.createElement('tr');
            for (let i = 0; i < 7; i++) { //generate random item
                current_node = document.createElement('td');
                this.format_item_cell(current_node);
                current_row.appendChild(current_node);
            }
            item_table.appendChild(current_row);
        }
    },

    //will add styling and text based on chest type
    //will add event handler for on click transition
    format_item_cell : function(cell) {
        //webApp.setRotations('');
        let new_chest = this.generate_stage_items();
        this.set_text(new_chest, cell);
        this.set_color(new_chest, cell);
        
    },

    set_text : function(new_chest, cell) {
        if (new_chest.size === 'small') {
            cell.innerHTML = '?';
        } else if (new_chest.size === 'large') {
            cell.innerHTML = '?!';
        }
        cell.style.fontSize = '30px';
    },

    set_color : function(new_chest, cell) {
        switch (new_chest.type) {
            case 'regular':
                cell.style.backgroundColor = '#a5a5a5';
                cell.style.borderLeft = '5px solid #7b7b7b';
                cell.style.borderRight = '5px solid #7b7b7b';
                cell.style.borderTop = '5px solid #c3c3c3';
                cell.style.borderBottom = '5px solid #c3c3c3';
                break;
            case 'damage':
                cell.style.backgroundColor = "red";
                cell.style.borderLeft = "5px solid #9b0202";
                cell.style.borderRight = "5px solid #9b0202";
                cell.style.borderTop = "5px solid #f65353";
                cell.style.borderBottom = "5px solid #f65353";
                break;
            case 'healing':
                cell.style.backgroundColor = "#5eae2f";
                cell.style.borderLeft = "5px solid #408816";
                cell.style.borderRight = "5px solid #408816";
                cell.style.borderTop = "5px solid #85da54";
                cell.style.borderBottom = "5px solid #85da54";
                break;
            case 'utility':
                cell.style.backgroundColor = "#445eb5";
                cell.style.borderLeft = "5px solid #3954A1";
                cell.style.borderRight = "5px solid #3954A1";
                cell.style.borderTop = "5px solid #6280ED";
                cell.style.borderBottom = "5px solid #6280ED";
                break;
            default:
                console.log('something went wrong', new_chest.type);
        }
    },

    /*
    1-2 = large damage chest
    3-4 = large healing chest
    5-6 = large utility chest
    7-20 = regular large chest
    21-25 = damage chest
    26-30 = healing chest
    31-35 = utility chest
    36-70= regular chest
    */
    generate_stage_items : function() {
        let randNum = Math.ceil(Math.random() * 100);
        let chest = {
            type:'',
            size: '',
        }
        switch (true) {
            case this.inRange_inclusive(randNum, 1,2):
                chest.type='damage';
                chest.size='large';
                console.log('large damage chest', randNum);
                break;
            case this.inRange_inclusive(randNum, 3,4):
                chest.type='healing';
                chest.size='large';
                console.log('large healing chest', randNum);
                break;
            case this.inRange_inclusive(randNum, 5,6):
                chest.type='utility';
                chest.size='large';
                console.log('large utility chest', randNum);
                break;
            case this.inRange_inclusive(randNum, 7,20):
                chest.type='regular';
                chest.size='large';
                console.log('large chest regular', randNum);
                break;
            case this.inRange_inclusive(randNum, 21,27):
                chest.type='damage';
                chest.size='small';
                console.log('damage chest', randNum);
                break;
            case this.inRange_inclusive(randNum, 27,33):
                chest.type='healing';
                chest.size='small';
                console.log('healing chest', randNum);
                break;
            case this.inRange_inclusive(randNum, 34,40):
                chest.type='utility';
                chest.size='small';
                console.log('utility chest', randNum);
                break;
            case this.inRange_inclusive(randNum, 41,80):
                chest.type='regular';
                chest.size='small';
                console.log('regular chest', randNum);
                break;
            default:
                console.log('nothing', randNum);
                break;
        }
        return chest;
    },

    inRange_inclusive : function(value, min, max) {
        if (min <= value && value <= max) {
            return true;
        } else {return false}
    },

    clear_items : function() {
        let item_table = document.getElementById('item-select');
        item_table.innerHTML = '';
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