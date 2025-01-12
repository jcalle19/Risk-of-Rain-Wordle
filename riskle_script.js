/**
 * TODO: 
 * - Make the final guess remain while restricting any future guesses
 * - add all items (greens, reds, lunars, equipment)
 * - add suggestion and bug page
 * - turn item map into json file
 * - add css to make it look passable
 * For next commit:
 * - Finished adding common and void items
 * If Caught up:
 * - add new gamemodes
 * - add score system
 * - add unique modifiers
 * - add leaderboards
 * - add universal daily mode
 
 * Notes to add:
 * - health-stat includes shield due to the low number of shield items
 * - when-hurt includes when killed due to the low number of on-player-death items
 * - conditional includes on-stage-start, against certain enemies, after killing a certain amount, after being in/out of combat, while sprinting
 * - on a timer, etc. Sorry if its broad but each category only has a couple items and I wanted to keep the number of descriptors to a minimum while 
 * - still explaining the item
 */
    webApp = {
        status : {
            current_item : "none",
            guessed_item : "none",
            guess_counter : 0,
            max_guesses : 0,
            difficulty : "none",
            curr_color_array : [],
        },

        guessed_items : [],

        set_difficulty : function(difficulty, health) {
            try {
                this.status.difficulty =  difficulty;
                shown_difficulty = document.getElementById("current-difficulty");
                shown_difficulty.innerHTML = difficulty;
                combatHandler.set_health(health); //setting starting health
            } catch (error) {
                alert("Something wrong with difficulty");
            }
        },

        start_game : function() {
            if (this.status.difficulty === "none") {
                alert("Please Select a Difficulty");
            } else {
                this.generateItem();
                combatHandler.update_player_health(combatHandler.player_info.health_initial);
                combatHandler.generate_enemy();
                document.getElementById("start-button").style.display = "none";
                document.getElementById("artifact-menu").style.display = "none";
                document.getElementById("difficulty-easy").style.display = "none";
                document.getElementById("difficulty-normal").style.display = "none";
                document.getElementById("difficulty-hard").style.display = "none";
                document.getElementById("reset-game").style.display = "block";
                document.getElementById("gameplay-section").style.display = "block";
                document.getElementById("health-section").style.display = "block";
                display.setAll();
                search.make_item_list();
            }
        },
    
        //Makes array of keys and grabs random index
        generateItem : function() {
            let itemsArray = Array.from(items.keys());

            this.status.guessed_items = [];
            this.status.current_item = itemsArray[Math.floor(Math.random() * itemsArray.length)];
            console.log(this.status.current_item + " this one");
        },
        /** Takes guess from player and then,
        * - Checks for the item in the item map
        * - adds item info in a row
        * - compares with current item
        * - clears the search bars
        */
        makeGuess : function(inputText, tableID) {
            let search_input = document.getElementById("search-input");
            let guessed_input = search_input.value.toLowerCase().replace(/[\s'-]+/g, ''); //removes special characters and spaces to match keys
            if (combatHandler.player_info.health != 0) {
                if (items.has(guessed_input)) {
                    try {
                        if (!(this.status.guessed_items.includes(items.get(guessed_input)))) {
                            this.status.guessed_items.push(items.get(guessed_input));
                            this.status.guessed_item = items.get(guessed_input);
                            console.log(this.status.guessed_items);
                            this.addRow(tableID, guessed_input);
                            search_input.value = "";
                            this.compareItems(tableID);
                            display.buildAll();
                        } else {
                            alert("You already guessed that one")
                        }
                    }
                    catch (error) {
                        alert("Something went wrong!");
                        console.log(error);
                    }
                }
                
            }
        },
        
        addRow : function(tableID, new_guess) {
            let table_proxy = document.getElementById(tableID)
            let new_row;
            let new_cell;
            //Inserting cells for all slots
            new_row = table_proxy.insertRow(1);
            new_cell = new_row.insertCell(0);
            new_cell.innerHTML=`<img src=\"./resources/${new_guess}.jpg\" placeholder=\"placeholder\"><br>
                                <p class="item-label">${this.status.guessed_item[0].toString().replace(" ", '<br>')}</p>`;
            for (let cells = 1; cells < 7; cells++) {
                new_cell = new_row.insertCell(cells);
                new_cell.style.animationDelay = `${cells * .2}s`;
                new_cell.id = "row-" + this.status.guess_counter + "-cell-" + cells;
                new_cell.innerHTML = this.status.guessed_item[cells].toString().replace(/[,]+/g, '<br>');
            }
            this.status.guess_counter++;
        },

        //Adds event listeners to each added cell for reactive rotation transitions
        setRotations : function(cell, cellColor, gradColor) {
            let cell_info = cell.getBoundingClientRect();
            let originX;
            let originY;

            cell.addEventListener("mousemove", (event) => {
                    cell_info = cell.getBoundingClientRect();
                    originX = cell_info.left + (cell_info.width/2);
                    originY = cell_info.top + (cell_info.height/2);
                    let distance = Math.sqrt(((event.clientX - originX)**2) + ((event.clientY - originY)**2));
                    let deg = distance / (cell_info.width/2) * 20;
    
                    let rotY = (event.clientX - originX) / (cell_info.width/2);
                    let rotX = -1 * (event.clientY - originY) / (cell_info.height/2);

                    cell.style.transform = `rotate3d(${rotX},${rotY},0,${deg}deg)`;
                    cell.style.backgroundImage = `linear-gradient(${deg * 9}deg, ${cellColor}, ${gradColor})`;
                    cell.style.boxShadow = `${-5 * rotY}px ${5 * rotX}px black`;
                },
            );
            cell.addEventListener("mouseleave", (event)=> {
                    cell.style.transform = `rotate3d(0,0,0,0deg)`;
                    cell.style.backgroundImage = '';
                    cell.style.boxShadow = '';
                },
            );
        },

        //comparing guessed item and current item
        compareItems : function(tableID) {
            let current_attributes = items.get(this.status.current_item);
            let formatted_guess = (this.status.guessed_item[0].toLowerCase()).replace(/[\s'-]+/g, ''); //now in key format
            if (formatted_guess == this.status.current_item) {
                this.compareAttributes(this.status.guessed_item, current_attributes);
                combatHandler.update_enemy_health(0);
                this.deleteGuesses(tableID);
                this.generateItem();
                alert("You Win! :)");
            }
            else {

                this.compareAttributes(this.status.guessed_item, current_attributes);
                combatHandler.update_player_health(combatHandler.player_info.health - combatHandler.calc_damage_received(display.curr_color_array));
                combatHandler.update_enemy_health(combatHandler.enemy_info.health - combatHandler.calc_damage_dealt(display.curr_color_array));
                if (combatHandler.player_info.health === 0) {
                    this.deleteGuesses(tableID);
                }
            }
        },
    
        /**
        * For each attribute of the guessed and current items
        * 1- check if each item in guessed is in current
        * 2- if yes, check to see if they are the same size
        * 3-- if yes, give the attribute a green color
        * 4-- if no, give the attribute an orange color
        * 5- if no, but some are, then give orange
        * 6- if no, and none are, give red
        */
        compareAttributes : function(guessed_attributes, curr_attributes) {
            let correct_count = 0;
            let color_array = [];
            let current_cell_id;
            for (let index = 1; index < guessed_attributes.length; index++) {
                current_cell_id = `row-${this.status.guess_counter - 1}-cell-${index}`;

                for (let innerIndex = 0; innerIndex < guessed_attributes[index].length; innerIndex++) { //1
                    if (curr_attributes[index].includes(guessed_attributes[index][innerIndex])) {
                        correct_count++;
                    }
                }
                //If all of guessed are in current and they are the same size
                if (correct_count != 0) {
                    if (correct_count === guessed_attributes[index].length && correct_count === curr_attributes[index].length) { //all correct and same size
                        color_array.push('green');
                        this.color_cells(current_cell_id, "green");
                    } else if (correct_count != guessed_attributes[index].length && guessed_attributes[index].length === curr_attributes[index].length) {//same size, not all correct
                        color_array.push("yellow");
                        this.color_cells(current_cell_id, "yellow");
                    } else if (guessed_attributes[index].length != curr_attributes[index].length) { //5, not same size, some correct
                        color_array.push("yellow");
                        this.color_cells(current_cell_id, "yellow");
                    }
                } else { //none correct
                    color_array.push("red");
                    this.color_cells(current_cell_id, "red");
                }
                correct_count = 0;
                display.curr_color_array = color_array;
            }
        },
    
        color_cells : function(cell_id, color) {
            cellElement = document.getElementById(cell_id);
            switch (color) {
                case "green":
                    cellElement.style.backgroundColor = "#5eae2f";
                    cellElement.style.borderLeft = "5px solid #408816";
                    cellElement.style.borderRight = "5px solid #408816";
                    cellElement.style.borderTop = "5px solid #85da54";
                    cellElement.style.borderBottom = "5px solid #85da54";
                    this.setRotations(cellElement, 'green', '#85da54');
                    break;
                case "yellow":
                    cellElement.style.backgroundColor = "#cdd702";
                    cellElement.style.borderLeft = "5px solid #a4ab1c";
                    cellElement.style.borderRight = "5px solid #a4ab1c";
                    cellElement.style.borderTop = "5px solid #e5ec61";
                    cellElement.style.borderBottom = "5px solid #e5ec61";
                    this.setRotations(cellElement, 'yellow', '#e5ec61');
                    break;
                case "red":
                    cellElement.style.backgroundColor = "red";
                    cellElement.style.borderLeft = "5px solid #9b0202";
                    cellElement.style.borderRight = "5px solid #9b0202";
                    cellElement.style.borderTop = "5px solid #f65353";
                    cellElement.style.borderBottom = "5px solid #f65353";
                    this.setRotations(cellElement, 'red', '#f65353');
                    break;
                default:
                    console.log("something went wrong in color_cells function");
                    break;
            }
        },
    
        deleteGuesses : function(tableID) {
            let table_proxy = document.getElementById(tableID);
            for (let i = 0; i < this.status.guess_counter; i++) {
                table_proxy.deleteRow(1);
            }
            this.status.guess_counter = 0;
            document.getElementById('gen-item').innerHTML = `The item was: ${items.get(this.status.current_item)[0]}`;
        },

        resetGame : function(tableID) {
            this.deleteGuesses(tableID);
            display.displayInfo = display.displayInfoReset;
            search.clear();
            this.start_game();
        }
    }




