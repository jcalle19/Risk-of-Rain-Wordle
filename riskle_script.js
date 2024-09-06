let player_health;
let current_item;
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
    ["soldier syringe", /*---*/["soldier syringe", "Common", "Yellow", "Damage", "Atk-Speed", "Unlocked", "Vanilla"]],
    ["ukulele", /*-----------*/["ukulele", "Uncommon", "Brown", "Damage", "On-hit", "Unlocked", "Vanilla"]],
    ["57 leaf clover", /*----*/["57 leaf clover", "Legendary", "Green", "Utility", "On-Proc", "Not Unlocked"]],
    ["molten perforator", /*-*/["molten perforator", "Boss/Planet", "Orange", "Damage", "On-hit", "Unlocked", "Vanilla"]],
    ["shaped glass", /*------*/["shaped glass", "Lunar", "White", "Damage", "Dmg-stat\nHealth-stat", "Unlocked", "Vanilla"]],
    ["polylute", /*----------*/["polylute", "Void", "Purple", "Damage", "On-hit", "Unlocked", "SotV"]],
]);

function generateItem() {
    let itemsArray = Array.from(items.keys());
    current_item = itemsArray[Math.floor(Math.random() * itemsArray.length)];
    //console.log(current_item); <- for debugging
}
/** Takes guess from player and then,
 * - Checks for the item in the item map
 * - lists the item characteristics in the table (will need to modify addrow)
 * - 
 * - clears the search bars
 */
function makeGuess(inputText, tableID) {
    let guessed_input = document.getElementById("search-input").value;
    guessed_item = items.get(guessed_input.toLowerCase());
    console.log(guessed_item);
    //Adding row after guess
    addrow(tableID, guessed_item);
}
//Called when user guesses
function addrow(tableID, new_guess) {
    let table_proxy = document.getElementById(tableID)
    let new_row;
    let curr_cell_text;

    //text tied to new cells, will add more in the future

    if (guess_counter < 5) {
        new_row = table_proxy.insertRow(-1);
        //Inserting cells for all slots
        for (let cells = 0; cells < 7; cells++) {
            curr_cell_text = document.createTextNode(guessed_item[cells]);
            new_cell = new_row.insertCell(cells);
            new_cell.appendChild(curr_cell_text);
        }
        console.log(guess_counter);
        guess_counter++;
    }
    //update ask counter to reset guesses
    else deleteGuesses(tableID);
}

function deleteGuesses(tableID) {
    let table_proxy = document.getElementById(tableID);
    for (let i = 0; i < 5; i++) {
        table_proxy.deleteRow(1);
    }
    guess_counter = 0;
}
