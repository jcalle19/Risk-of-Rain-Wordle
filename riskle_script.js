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

/** For consistency, these are the possible options for each category
 * Rarity: Common, Uncommon, Legendary, Boss/Planet, Lunar, Void, Equipment
 * Colors (Adding to this as I add more items): Yellow, Brown, Green, Orange, Black
 * Type: Damage, Utility, Healing
 * Description: (Adding to this as I add more items): 
 * Atk-speed, On-hit, On-kill, On-Proc, AoE, heals, Debuff, Dmg-negation, Chance, Attack, Explosive, Dmg-stat, conditional
 * "when-hurt", consumable, spd-stat, armor, money, items, minions
 * Unlocked: Unlocked, Challenge, DLC
 * Expansion: Vanilla, SotV, SotS
 * 
 * Notes to add:
 * - health-stat includes shield due to the low number of shield items
 * - when-hurt includes when killed due to the low number of on-player-death items
 * - conditional includes on-stage-start, against certain enemies, after killing a certain amount, after being in/out of combat, while sprinting
 * - on a timer, etc. Sorry if its broad but each category only has a couple items and I wanted to keep the number of descriptors to a minimum while 
 * - still explaining the item
 */
const items = new Map([
    ["soldiersyringe", /*-----*/["Soldier Syringe", ["Common"], ["Yellow"], ["Damage"], ["Atk-Speed"], ["Unlocked"], ["Vanilla"]]],
    ["bustlingfungus", /*-----*/["Bustling Fungus", ["Common"], ["Green"], ["Healing"], ["Conditional", "Heals", "AoE"], ["Unlocked"], ["Vanilla"]]],
    ["tritipdagger", /*-------*/["Tri-Tip Dagger", ["Common"], ["White", "Black"], ["Damage"], ["Chance", "On-hit", "Debuff"], ["Unlocked"], ["Vanilla"]]],
    ["repulsionarmorplate", /**/["Repulsion Armor Plate", ["Common"], ["Grey"], ["Utility"], ["when-hurt", "Dmg-negation"], ["Unlocked"], ["Vanilla"]]],
    ["armorpiercingrounds", /**/["Armor-Piercing Rounds", ["Common"], ["Yellow", "Black"], ["Damage"], ["Conditional", "Dmg-stat"], ["Challenge"], ["Vanilla"]]],
    ["backupmagazine", /*-----*/["Backup Magazine", ["Common"], ["Grey", "White"], ["Utility"], ["Survivor-Skill"], ["Challenge"], ["Vanilla"]]],
    ["bisonsteak", /*---------*/["Bison Steak", ["Common"], ["Red", "White"], ["Healing"], ["Health-stat"], ["Unlocked"], ["Vanilla"]]],
    ["antlershield", /*-------*/["Antler Shield", ["Common"], ["Brown", "White"], ["Utility"], ["Chance", "when-hurt", "attack"], ["Unlocked"], ["SotS"]]],
    ["blisteringlantern", /*--*/["Blistering Lantern", ["Common"], ["White", "Gold"], ["Damage"], ["Dmg-stat", "when-hurt"], ["Unlocked"], ["SotS"]]],
    ["bundleoffireworks", /*--*/["Bundle of Fireworks", ["Common"], ["Red", "White", "Orange"], ["Damage"], ["Conditional", "Explosive"], ["Challenge"], ["Vanilla"]]],
    ["cautiousslug", /*-------*/["Cautious Slug", ["Common"], ["Blue", "Green"], ["Healing"], ["Conditional", "Heals"], ["Unlocked"], ["Vanilla"]]],
    ["chronicexpansion", /*---*/["Chronic Expansion", ["Common"], ["Red", "White", "Black"], ["Damage"], ["Conditional", "Dmg-stat", "On-kill"], ["Unlocked"], ["SotS"]]],
    ["crowbar", /*------------*/["Crowbar", ["Common"], ["Red", "Grey"], ["Damage"], ["Conditional", "Dmg-stat"], ["Unlocked"], ["Vanilla"]]],
    ["delicatewatch", /*------*/["Delicate Watch", ["Common"], ["Black", "Gold"], ["Damage"], ["Consumable", "Dmg-stat"], ["Unlocked"], ["SotV"]]],
    ["energydrink", /*--------*/["Energy Drink", ["Common"], ["Green", "Blue"], ["Utility"], ["Conditional", "Spd-stat"], ["Unlocked"], ["Vanilla"]]],
    ["focuscrystal", /*-------*/["Focus Crystal", ["Common"], ["Pink"], ["Damage"], ["Conditional", "Dmg-stat"], ["Unlocked"], ["Vanilla"]]],
    ["gasoline", /*-----------*/["Gasoline", ["Common"], ["Red"], ["Damage"], ["On-kill", "AoE", "Debuff"], ["Unlocked"], ["Vanilla"]]],
    /*["itemscrap,white", []], Don't know if i should include this one*/
    ["knockbackfin", /*-------*/["Knockback Fin", ["Common"], ["Purple"], ["Utility"], ["Chance", "On-hit", "Attack"], ["Unlocked"], ["SotS"]]],
    ["lensmakersglasses", /*--*/["Lens-maker's Glasses", ["Common"], ["Black", "Red"], ["Damage"], ["Chance", "On-hit", "Dmg-stat"], ["Unlocked"], ["Vanilla"]]],
    ["medkit", /*-------------*/["MedKit", ["Common"], ["White", "Green"], ["Healing"], ["Heals", "when-hurt"], ["Challenge"], ["Vanilla"]]],
    ["mocha", /*--------------*/["Mocha", ["Common"], ["White", "Brown"], ["Damage", "Utility"], ["Atk-speed", "Spd-stat"], ["Unlocked"], ["SotV"]]],
    ["monstertooth", /*-------*/["Monster Tooth", ["Common"], ["Yellow", "Brown"], ["Healing"], ["Heals", "On-kill"], ["Unlocked"], ["Vanilla"]]],
    ["oddlyshapedopal", /*----*/["Oddly-Shaped Opal", ["Common"], ["Blue"], ["Utility"], ["Conditional", "Armor"], ["Unlocked"], ["SotV"]]],
    ["paulsgoathoof", /*------*/["Paul's Goat Hoof", ["Common"], ["Brown"], ["Utility"], ["Spd-stat"], ["Challenge"], ["Vanilla"]]],
    ["personalshieldgenerator", ["Personal Shield Generator", ["Common"], ["Black", "Blue"], ["Utility"], ["Health-stat"], ["Unlocked"], ["Vanilla"]]],
    ["powerelixir", /*--------*/["Power Elixir", ["Common"], ["Pink"], ["Healing"], ["Conditional", "Consumable", "Heals"], ["Unlocked"], ["SotV"]]],
    ["rollofpennies", /*------*/["Roll of Pennies", ["Common"], ["Green", "Brown"], ["Utility"], ["Money", "when-hurt"], ["Unlocked"], ["SotV"]]],
    ["rustedkey", /*----------*/["Rusted Key", ["Common"], ["Brown", "Grey"], ["Utility"], ["Conditional", "Items"], ["Challenge"], ["Vanilla"]]],
    ["stickybomb", /*---------*/["Sticky Bomb", ["Common"], ["Orange", "Blue"], ["Damage"], ["Chance", "On-hit", "Explosive"], ["Unlocked"], ["Vanilla"]]],
    ["stungrenade", /*--------*/["Stun Grenade", ["Common"], ["Green"], ["Utility"], ["Chance", "On-hit", "Debuff"], ["Unlocked"], ["Vanilla"]]],
    ["topazbrooch", /*--------*/["Topaz Brooch", ["Common"], ["Yellow", "Gold"], ["Utility", "Healing"], ["Heals", "On-kill"], ["Unlocked"], ["Vanilla"]]],
    ["toughertimes", /*-------*/["Tougher Times", ["Common"], ["Brown"], ["Utility"], ["Chance", "Dmg-negation"], ["Challenge"], ["Vanilla"]]],
    ["warbanner", /*----------*/["Warbanner", ["Common"], ["Red", "Yellow"], ["Utility"], ["Conditional", "Atk-speed", "Spd-stat"], ["Unlocked"], ["Vanilla"]]],
    //["warpedecho", /*---------*/["Warped Echo", ["Common"]]], <- Genuinly do not know how to describe this
    ["ukulele", /*------------*/["Ukulele", ["Uncommon"], ["Brown"], ["Damage"], ["Chance", "On-hit", "AoE", "Attack"], ["Unlocked"], ["Vanilla"]]],
    ["57leafclover", /*-------*/["57 Leaf Clover", ["Legendary"], ["Green"], ["Utility"], ["On-Proc"], ["Challenge"], ["Vanilla"]]],
    ["moltenperforator", /*---*/["Molten Perforator", ["Boss/Planet"], ["Orange", "Black"], ["Damage"], ["Chance", "On-hit", "AoE", "Explosive"], ["Unlocked"], ["Vanilla"]]],
    ["shapedglass", /*--------*/["Shaped Glass", ["Lunar"], ["White"], ["Damage"], ["Dmg-stat", "Health-stat"], ["Unlocked"], ["Vanilla"]]],
    ["polylute", /*-----------*/["Polylute", ["Void"], ["Blue"], ["Damage"], ["Chance", "On-hit", "Attack"], ["Unlocked"], ["SotV"]]],
    ["saferspaces", /*--------*/["Safer Spaces", ["Void"], ["Blue"], ["Utility"], ["Conditional", "Dmg-negation"], ["Unlocked"], ["SotV"]]],
    ["needletick", /*---------*/["Needletick", ["Void"], ["Purple"], ["Damage"], ["Chance", "On-hit", "Debuff", "Attack"], ["Unlocked"], ["SotV"]]],
    ["lostseerslenses", /*----*/["Lost Seer's Lenses", ["Void"], ["Blue", "Purple"], ["Damage"], ["Chance", "On-hit", "Attack"], ["Unlocked"], ["SotV"]]],
    ["weepingfungus", /*------*/["Weeping Fungus", ["Void"], ["Purple"], ["Healing"], ["Conditional", "Heals"], ["Unlocked"], ["SotV"]]],
    ["encrustedkey", /*-------*/["Encrusted Key", ["Void"], ["White"], ["Utility"], ["Conditional, Items"], ["Unlocked"], ["SotV"]]],
    ["singularityband", /*----*/["Singularity Band", ["Void"], ["Blue", "Purple"], ["Damage", "Utility"], ["Conditional", "Attack"], ["Unlocked"], ["SotV"]]],
    ["lysatecell", /*---------*/["Lysate Cell", ["Void"], ["Purple", "Blue"], ["Utility"], ["Survivor-Skill"], ["Unlocked"], ["SotV"]]],
    ["voidsentflame", /*------*/["Voidsent Flame", ["Void"], ["Orange", "Purple"], ["Damage"], ["Conditional", "On-hit", "Explosive"], ["Unlocked"], ["SotV"]]],
    ["plasmashrimp", /*-------*/["Plasma Shrimp", ["Void"], ["Blue"], ["Damage"], ["Health-stat", "Conditional", "Attack"], ["Unlocked"], ["SotV"]]],
    ["tentabauble", /*--------*/["Tentabauble", ["Void"], ["Purple", "Blue"], ["Utility"], ["Chance", "On-hit", "Debuff"], ["Unlocked"], ["SotV"]]],
    ["benthicbloom", /*-------*/["Benthic Bloom", ["Void"], ["Blue"], ["Utility"], ["Conditional", "Items"], ["Unlocked"], ["SotV"]]],
    ["pluripotentlarva", /*---*/["Pluripotent Larva", ["Void"], ["Blue", "Black"], ["Utility"], ["Conditional", "when-hurt", "Items"], ["Unlocked"], ["SotV"]]],
    ["newlyhatchedzoea", /*---*/["Newly Hatched Zoea", ["Void"], ["Purple"], ["Damage"], ["Conditional", "Minions"], ["Unlocked"], ["SotV"]]],
]);

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
    let guessed_input = search_input.value.toLowerCase().replace(/[\s'-]+/g, '');
    guessed_item = items.get(guessed_input);
    //try {
        addrow(tableID, guessed_item);
        search_input.value = "";
        compareItems();
    //}
    //catch (error) {
        //alert("Something went wrong!");
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
                document.getElementById(current_cell_id).style.backgroundColor = "#5eae2f";
            } else if (correct_count != guessed_attributes[index].length && guessed_attributes[index].length === curr_attributes[index].length) {//same size, not all correct
                color_test_array.push("yellow");
                document.getElementById(current_cell_id).style.backgroundColor = "yellow";
            } else if (guessed_attributes[index].length != curr_attributes[index].length) { //5, not same size, some correct
                color_test_array.push("yellow");
                document.getElementById(current_cell_id).style.backgroundColor = "yellow";
            }
        } else { //none correct
            color_test_array.push("red");
            document.getElementById(current_cell_id).style.backgroundColor = "red";
        }
        correct_count = 0;
    }
    console.log(color_test_array);
}

function deleteGuesses(tableID) {
    let table_proxy = document.getElementById(tableID);
    for (let i = 0; i < guess_counter; i++) {
        table_proxy.deleteRow(1);
    }
    guess_counter = 0;
    document.getElementById('gen-item').textContent = `The item was: ${current_item}`;
}

