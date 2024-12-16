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
            health : 0,
            health_initial : 0,
        },

        set_difficulty : function(difficulty, health) {
            try {
                this.status.difficulty =  difficulty;
                shown_difficulty = document.getElementById("current-difficulty");
                shown_difficulty.innerHTML = difficulty;
                this.set_health(health); //setting starting health
            } catch (error) {
                alert("Something wrong with difficulty");
            }
        },

        set_health : function(health_initial) {
            this.status.health_initial = health_initial;
            this.status.health = health_initial;
        },

        update_health : function(new_health) {
            let health_percent;
            let healthBar = document.getElementById("health-bar");
            let displayed_health = document.getElementById("health-tag");
            let missing_health = document.getElementById("missing-health");

            //Modification section
            this.status.health = Number(new_health);
            health_percent = 100 * (new_health / this.status.health_initial);

            //Style section
            displayed_health.innerHTML = `${new_health} / ${this.status.health_initial}`;
            healthBar.style.width = String(health_percent) + "%";
            if (new_health != this.status.health_initial) { //Only give missing health a display if player guesses
                missing_health.style.borderColor = "#F6FFF0";
            }
            missing_health.style.width = String(100-health_percent) + "%";


        },

        start_game : function() {
            if (this.status.difficulty === "none") {
                alert("Please Select a Difficulty");
            } else {
                this.generateItem();
                this.update_health(this.status.health_initial);
                document.getElementById("gameplay-section").style.display = "block";
                document.getElementById("health-section").style.display = "block";
            }
        },
    
        //Makes array of keys and grabs random index
        generateItem : function() {
            let itemsArray = Array.from(items.keys());
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
            if (this.status.health != 0) {
                if (items.has(guessed_input)) {
                    try {
                        this.status.guessed_item = items.get(guessed_input);
                        this.addRow(tableID, guessed_input);
                        search_input.value = "";
                        this.compareItems(tableID);
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
            let dynamicContainer = document.getElementById("dynamic-container");
            let new_row;
            let new_cell;
            //Inserting cells for all slots
            new_row = table_proxy.insertRow(-1);
            new_cell = new_row.insertCell(0);
            new_cell.innerHTML=`<img src=\"./resources/${new_guess}.jpg\" placeholder=\"placeholder\"><br>
                                <p class="item-label">${this.status.guessed_item[0].toString().replace(" ", '<br>')}</p>`;
            for (let cells = 1; cells < 7; cells++) {
                new_cell = new_row.insertCell(cells);
                new_cell.id = "row-" + this.status.guess_counter + "-cell-" + cells;
                new_cell.innerHTML = this.status.guessed_item[cells].toString().replace(/[,]+/g, '<br>');
                this.enterAnimation(table_proxy, new_cell, cells, dynamicContainer);

            }
            this.status.guess_counter++;
        },
    
        enterAnimation : function(table, new_cell, order, container) {
            requestAnimationFrame(() => {
                const tableInfo = table.getBoundingClientRect();
                const cellInfo = new_cell.getBoundingClientRect();
                console.log(cellInfo.width, cellInfo.height, cellInfo.top, cellInfo.left);

                let posX = cellInfo.left - tableInfo.left;
                let posY = cellInfo.top - tableInfo.top;
                let delay = order * .2;
                let animationTile = document.createElement("section");
                animationTile.classList.add("testsection", "appear-animate");
                animationTile.style.cssText = `width:${cellInfo.width}px; height:${cellInfo.height}px; top:${posY}px; left:${posX}px;`;
                animationTile.offsetHeight;
                animationTile.innerHTML = `<div class="tile rise-animate" style="animation-delay:${delay}s"></div>` +
                                          `<div class="tile rise-animate" style="animation-delay:${delay + .1}s"></div>` +
                                          `<div class="tile rise-animate" style="animation-delay:${delay + .2}s"></div>` +
                                          `<div class="tile rise-animate" style="animation-delay:${delay + .3}s"></div>`;
                container.appendChild(animationTile);
            });           
        },

        //comparing guessed item and current item
        compareItems : function(tableID) {
            let current_attributes = items.get(this.status.current_item);
            let formatted_guess = (this.status.guessed_item[0].toLowerCase()).replace(/[\s'-]+/g, ''); //now in key format
            if (formatted_guess == this.status.current_item) {
                this.compareAttributes(this.status.guessed_item, current_attributes);
                alert("You Win! :)");
            }
            else {
                console.log(this.status.current_item);
                this.update_health(this.status.health - 100);
                if (this.status.health === 0) {
                    this.deleteGuesses(tableID);
                }
                else this.compareAttributes(this.status.guessed_item, current_attributes);
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
            let color_test_array = [];
            let current_cell_id;
            for (let index = 1; index < guessed_attributes.length; index++) {
                current_cell_id = `row-${this.status.guess_counter - 1}-cell-${index}`;
                for (let innerIndex = 0; innerIndex < guessed_attributes[index].length; innerIndex++) { //1
                    if (curr_attributes[index].includes(guessed_attributes[index][innerIndex])) {
                        correct_count++;
                    }
                    console.log(correct_count);
                }
                //If all of guessed are in current and they are the same size
                if (correct_count != 0) {
                    if (correct_count === guessed_attributes[index].length && correct_count === curr_attributes[index].length) { //all correct and same size
                        color_test_array.push("green");
                        this.color_cells(current_cell_id, "green");
                    } else if (correct_count != guessed_attributes[index].length && guessed_attributes[index].length === curr_attributes[index].length) {//same size, not all correct
                        color_test_array.push("yellow");
                        this.color_cells(current_cell_id, "yellow");
                    } else if (guessed_attributes[index].length != curr_attributes[index].length) { //5, not same size, some correct
                        color_test_array.push("yellow");
                        this.color_cells(current_cell_id, "yellow");
                    }
                } else { //none correct
                    color_test_array.push("red");
                    this.color_cells(current_cell_id, "red");
                }
                correct_count = 0;
            }
            console.log(color_test_array);
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
                    break;
                case "yellow":
                    cellElement.style.backgroundColor = "#cdd702";
                    cellElement.style.borderLeft = "5px solid #a4ab1c";
                    cellElement.style.borderRight = "5px solid #a4ab1c";
                    cellElement.style.borderTop = "5px solid #e5ec61";
                    cellElement.style.borderBottom = "5px solid #e5ec61";
                    break;
                case "red":
                    cellElement.style.backgroundColor = "red";
                    cellElement.style.borderLeft = "5px solid #9b0202";
                    cellElement.style.borderRight = "5px solid #9b0202";
                    cellElement.style.borderTop = "5px solid #f65353";
                    cellElement.style.borderBottom = "5px solid #f65353";
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
            this.start_game();
        }
    }




