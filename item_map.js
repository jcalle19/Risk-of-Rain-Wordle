/** For consistency, these are the possible options for each category
 * Rarity: Common, Uncommon, Legendary, Boss/Planet, Lunar, Void, Equipment
 * Colors (Adding to this as I add more items): Yellow, Brown, Green, Orange, Black
 * Type: Damage, Utility, Healing
 * Description: (Adding to this as I add more items): 
 * Atk-speed, On-hit, On-kill, On-Proc, AoE, heals, Debuff, Dmg-negation, Chance, Attack, Explosive, Dmg-stat, conditional
 * "when-hurt", consumable, spd-stat, armor, money, items, minions
 * Unlocked: Unlocked, Challenge, DLC
 * Expansion: Vanilla, SotV, SotS
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