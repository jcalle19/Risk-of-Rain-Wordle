/**
 * TODO: 
 * - Add comparison between given item info and the randomly selected item info
 * - Add colors to show users which are correct/partial/incorrect
 * - Make the final guess remain while restricting any future guesses
 * - Show correct item and make a restart button that clears all elements and generates a new item
 * For next commit:
 * - added try-catch in guess function to make sure item exists in items map
 */


let player_health;
let current_item = "none";
let guessed_item;
let guess_counter = 0;
let difficulty = 0;

/** For consistency, these are the possible options for each category
 * Rarity: Common, Uncommon, Legendary, Boss/Planet, Lunar, Void, Equipment
 * Colors (Adding to this as I add more items): Yellow, Brown, Green, Orange, Black
 * Type: Damage, Utility, Healing
 * Description: (Adding to this as I add more items): Atk-speed, On-hit, On-Proc
 * Unlocked: Unlocked, Challenge, DLC
 * Expansion: Vanilla, SotV, SotS
 */
const items = new Map([
    ["soldiersyringe", /*---*/["Soldier Syringe", ["Common"], ["Yellow"], ["Damage"], ["Atk-Speed"], ["Unlocked"], ["Vanilla"]]],
    ["ukulele", /*----------*/["Ukulele", ["Uncommon"], ["Brown"], ["Damage"], ["On-hit"], ["Unlocked"], ["Vanilla"]]],
    ["57leafclover", /*-----*/["57 Leaf Clover", ["Legendary"], ["Green"], ["Utility"], ["On-Proc"], ["Not Unlocked"], ["Vanilla"]]],
    ["moltenperforator", /*-*/["Molten Perforator", ["Boss/Planet"], ["Orange", "Black"], ["Damage"], ["On-hit"], ["Unlocked"], ["Vanilla"]]],
    ["shapedglass", /*------*/["Shaped Glass", ["Lunar"], ["White"], ["Damage"], ["Dmg-stat", "Health-stat"], ["Unlocked"], ["Vanilla"]]],
    ["polylute", /*---------*/["Polylute", ["Void"], ["Purple"], ["Damage"], ["On-hit"], ["Unlocked"], ["SotV"]]],
]);

//Makes array of keys and grabs random index
function generateItem() {
    let itemsArray = Array.from(items.keys());
    current_item = itemsArray[Math.floor(Math.random() * itemsArray.length)];
    document.getElementById('gen-item').textContent = current_item;
}

/** Takes guess from player and then,
 * - Checks for the item in the item map
 * - lists the item characteristics in the table (will need to modify addrow)
 * - 
 * - clears the search bars
 */
function makeGuess(inputText, tableID) {
    let search_input = document.getElementById("search-input");
    let guessed_input = search_input.value;
    //try {
    guessed_item = items.get(guessed_input.toLowerCase().replace(/\s+/g, ''));
    addrow(tableID, guessed_item);
    search_input.value = "";
    //console.log(typeof guessed_item[0]);
    //console.log(typeof current_item);
    compareItems();
    //}
    //catch (error) {
    //alert("Item does not exist!");
    //}
}
//Called when user guesses
function addrow(tableID, new_guess) {
    let table_proxy = document.getElementById(tableID)
    let new_row;
    let curr_cell_text;

    if (guess_counter < 5) {
        new_row = table_proxy.insertRow(-1);
        //Inserting cells for all slots
        for (let cells = 0; cells < 7; cells++) {
            curr_cell_text = document.createTextNode(guessed_item[cells]);
            new_cell = new_row.insertCell(cells);
            new_cell.id = "row-" + guess_counter + "-cell-" + cells;
            new_cell.appendChild(curr_cell_text);
        }
        guess_counter++;
    }
    //update ask counter to reset guesses
    else deleteGuesses(tableID);
}

//comparing guessed item and current item
function compareItems() {
    let current_attributes = items.get(current_item);

    let formatted_guess = (guessed_item[0].toLowerCase()).replace(/\s+/g, ''); //now in key format
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
    for (let index = 1; index < guessed_attributes.length; index++) {
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
            } else if (correct_count != guessed_attributes[index].length && guessed_attributes[index].length === curr_attributes[index].length) {//same size, not all correct
                color_test_array.push("orange")
            } else if (guessed_attributes[index].length != curr_attributes[index].length) { //5, not same size, some correct
                color_test_array.push("orange");
            }
        } else { //none correct
            color_test_array.push("red");
        }
        correct_count = 0;
    }
    console.log(color_test_array);
}

function deleteGuesses(tableID) {
    let table_proxy = document.getElementById(tableID);
    for (let i = 0; i < 5; i++) {
        table_proxy.deleteRow(1);
    }
    guess_counter = 0;
}
