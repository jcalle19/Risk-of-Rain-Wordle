let player_health;
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
    ["soldier's syringe", /*-*/["Common", "Yellow", "Damage", "Atk-Speed", "Unlocked", "Vanilla"]],
    ["Ukulele", /*-----------*/["Uncommon", "Brown", "Damage", "On-hit", "Unlocked", "Vanilla"]],
    ["57 Leaf Clover", /*----*/["Legendary", "Green", "Utility", "On-Proc",]]
    ["Molten Perforator", /*-*/["Boss/Planet", "Orange", "Damage", "On-hit", "Unlocked", "Vanilla"]],
    ["Shaped Glass", ["Lunar", "White", "Damage", "Dmg-stat/Health-stat", "Unlocked", "Vanilla"]],
]);

//Called when user guesses
function addrow(tableID) {
    let table_proxy = document.getElementById(tableID)
    let new_row;
    let curr_cell_text;

    //text tied to new cells, will add more in the future
    let cell_text = ["hello", "hello", "hello", "hello", "hello", "hello", "hello", "hello"];

    //
    if (guess_counter != 5) {
        new_row = table_proxy.insertRow(-1);
        //Inserting cells for all slots
        for (let cells = 0; cells < 7; cells++) {
            curr_cell_text = document.createTextNode(cell_text[cells]);
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
    console.log("delete function called");
    let table_proxy = document.getElementById(tableID);
    for (let i = 0; i < 5; i++) {
        table_proxy.deleteRow(1);
    }
    guess_counter = 0;
}
