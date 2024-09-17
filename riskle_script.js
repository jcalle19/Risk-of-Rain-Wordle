/**
 * TODO: 
 * - Make the final guess remain while restricting any future guesses
 * - add health system
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
 */


let player_health;
let current_item = "none";
let guessed_item;
let guess_counter = 0;
let difficulty = 0;

/*
 * Notes to add:
 * - health-stat includes shield due to the low number of shield items
 * - when-hurt includes when killed due to the low number of on-player-death items
 * - conditional includes on-stage-start, against certain enemies, after killing a certain amount, after being in/out of combat, while sprinting
 * - on a timer, etc. Sorry if its broad but each category only has a couple items and I wanted to keep the number of descriptors to a minimum while 
 * - still explaining the item
 */
const game_state = {
    current_item : "none",
}

function start_game() {
    document.getElementById("gameplay-section").style.display = "block";
}

//Makes array of keys and grabs random index
function generateItem() {
    let itemsArray = Array.from(items.keys());
    current_item = itemsArray[Math.floor(Math.random() * itemsArray.length)];
    console.log(current_item);
}

/** Takes guess from player and then,
 * - Checks for the item in the item map
 * - adds item info in a row
 * - compares with current item
 * - clears the search bars
 */
function makeGuess(inputText, tableID) {
    let search_input = document.getElementById("search-input");
    let guessed_input = search_input.value.toLowerCase().replace(/[\s'-]+/g, ''); //removes special characters and spaces to match keys
    guessed_item = items.get(guessed_input);
    //try {
        addrow(tableID, guessed_item);
        search_input.value = "";
        compareItems();
    //}
    //catch (error) {
        //alert("Something went wrong!");
        //console.log(error);
    //}
}
//Called when user guesses
function addrow(tableID, new_guess) {
    let table_proxy = document.getElementById(tableID)
    let new_row;

    if (guess_counter < 5) {
        new_row = table_proxy.insertRow(-1);
        //Inserting cells for all slots
        for (let cells = 0; cells < 7; cells++) {
            new_cell = new_row.insertCell(cells);
            new_cell.id = "row-" + guess_counter + "-cell-" + cells;
            new_cell.innerHTML = guessed_item[cells].toString().replace(/[,]+/g, '<br>');
        }
        guess_counter++;
    }
    //update ask counter to reset guesses
    else deleteGuesses(tableID);
}

//comparing guessed item and current item
function compareItems() {
    let current_attributes = items.get(current_item);
    let formatted_guess = (guessed_item[0].toLowerCase()).replace(/[\s'-]+/g, ''); //now in key format
    if (formatted_guess == current_item) {
        compareAttributes(guessed_item, current_attributes); //debugging, need to remove once finished
        alert("You Win! :)");
    }
    else {
        compareAttributes(guessed_item, current_attributes);
    }
}

/**
 * For each attribute of the guessed and current items
 * 1- check if each item in guessed is in current
 * 2- if yes, check to see if they are the same size
 * 3-- if yes, give the attribute a green color
 * 4-- if no, give the attribute an orange color
 * 5- if no, but some are, then give orange
 * 6- if no, and none are, give red
 */
function compareAttributes(guessed_attributes, curr_attributes) {
    let correct_count = 0;
    let color_test_array = [];
    let current_cell_id;
    for (let index = 1; index < guessed_attributes.length; index++) {
        current_cell_id = `row-${guess_counter - 1}-cell-${index}`;
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
                color_cells(current_cell_id, "green");
            } else if (correct_count != guessed_attributes[index].length && guessed_attributes[index].length === curr_attributes[index].length) {//same size, not all correct
                color_test_array.push("yellow");
                color_cells(current_cell_id, "yellow");
            } else if (guessed_attributes[index].length != curr_attributes[index].length) { //5, not same size, some correct
                color_test_array.push("yellow");
                color_cells(current_cell_id, "yellow");
            }
        } else { //none correct
            color_test_array.push("red");
            color_cells(current_cell_id, "red");
        }
        correct_count = 0;
    }
    console.log(color_test_array);
}

function color_cells(cell_id, color) {
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
}
function deleteGuesses(tableID) {
    let table_proxy = document.getElementById(tableID);
    for (let i = 0; i < guess_counter; i++) {
        table_proxy.deleteRow(1);
    }
    guess_counter = 0;
    document.getElementById('gen-item').innerHTML = `The item was: ${current_item}`;
}

