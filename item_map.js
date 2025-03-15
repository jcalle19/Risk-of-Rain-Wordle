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

/*Rarities*/
const common = "Common";           const legendary = "Legendary";
const uncommon = "Uncommon";       const _void_ = "Void";
const boss_planet = "Boss/Planet"; const lunar = "Lunar";
/*Colors*/
const yellow = "Yellow"; const green = "Green";   const blue = "Blue";   const red = "Red";
const black = "Black";   const purple = "Purple"; const white = "White"; const orange = "Orange";
const grey = "Grey";     const pink = "Pink";     const brown = "Brown"; const gold = "Gold";
/*Item types*/
const damage = "Damage"; 
const healing = "Healing"; 
const utility = "Utility";
/*Item behavior*/
const atkSpeed = "Atk-Speed"; const conditional = "Conditional";      const heals = "Heals";
const AoE = "AoE";            const explosive = "Explosive";          const onHit = "On-hit"; 
const dmgStat = "Dmg-Stat";   const whenHurt = "When-Hurt";           const dmgNegation = "Dmg-Negation";
const debuff = "Debuff";      const healthStat = "Health-Stat";       const spdStat = "Spd-Stat";
const onKill = "On-Kill";     const survivorSkill = "Survivor-Skill"; const consumable = "Consumable";
const money = "Money";        const attack = "Attack";                const armor = "Armor"; 
const minions = "Minions";    const chance = "Chance";                const _items_ = "Items";
/*Item Unlock Condition*/
const unlocked = "Unlocked"; 
const challenge = "Challenge";
/*Expansion of item introduction*/
const vanilla = "Vanilla"; 
const SotV = "SotV"; 
const SotS = "SotS";
/*Colors*/
const undetermined = '#F6FFF0';
const greenBackground = '#5eae2f';
const yellowBackground = '#cdd702';

/*
const attribtues = [common, uncommon, legendary, uncommon, _void_, boss_planet, lunar,
    yellow, black, grey, green, purple, pink, blue, white, brown, red, orange, gold,
    damage, healing, utility, atkSpeed, AoE, dmgStat, debuff, onKill, money, minions,
    conditional, explosive, whenHurt, healthStat, survivorSkill, attack, chance, heals,
    onHit, dmgNegation, spdStat, consumable, armor, _items_, unlocked, challenge, vanilla,
    SotV, SotS,
]
*/

const items = new Map([
    ["soldierssyringe", /*----*/["Soldier's Syringe", [common], [yellow], [damage], [atkSpeed], [unlocked], [vanilla]]],
    ["bustlingfungus", /*-----*/["Bustling Fungus", [common], [green], [healing], [conditional, heals, AoE], [unlocked], [vanilla]]],
    ["tritipdagger", /*-------*/["Tri-Tip Dagger", [common], [white, black], [damage], [chance, onHit, debuff], [unlocked], [vanilla]]],
    ["repulsionarmorplate", /**/["Repulsion Armor Plate", [common], [grey], [utility], [whenHurt, dmgNegation], [unlocked], [vanilla]]],
    ["armorpiercingrounds", /**/["Armor-Piercing Rounds", [common], [yellow, black], [damage], [conditional, dmgStat], [challenge], [vanilla]]],
    ["backupmagazine", /*-----*/["Backup Magazine", [common], [grey, white], [utility], [survivorSkill], [challenge], [vanilla]]],
    ["bisonsteak", /*---------*/["Bison Steak", [common], [red, white], [healing], [healthStat], [unlocked], [vanilla]]],
    ["antlershield", /*-------*/["Antler Shield", [common], [brown, white], [utility], [chance, whenHurt, attack], [unlocked], [SotS]]],
    ["blisteringlantern", /*--*/["Blistering Lantern", [common], [white, gold], [damage], [dmgStat, whenHurt], [unlocked], [SotS]]],
    ["bundleoffireworks", /*--*/["Bundle of Fireworks", [common], [red, white, orange], [damage], [conditional, explosive], [challenge], [vanilla]]],
    ["cautiousslug", /*-------*/["Cautious Slug", [common], [blue, green], [healing], [conditional, heals], [unlocked], [vanilla]]],
    ["chronicexpansion", /*---*/["Chronic Expansion", [common], [red, white, black], [damage], [conditional, dmgStat, onKill], [unlocked], [SotS]]],
    ["crowbar", /*------------*/["Crowbar", [common], [red, grey], [damage], [conditional, dmgStat], [unlocked], [vanilla]]],
    ["delicatewatch", /*------*/["Delicate Watch", [common], [black, gold], [damage], [consumable, dmgStat], [unlocked], [SotV]]],
    ["energydrink", /*--------*/["Energy Drink", [common], [green, blue], [utility], [conditional, spdStat], [unlocked], [vanilla]]],
    ["focuscrystal", /*-------*/["Focus Crystal", [common], [pink], [damage], [conditional, dmgStat], [unlocked], [vanilla]]],
    ["gasoline", /*-----------*/["Gasoline", [common], [red], [damage], [onKill, AoE, debuff], [unlocked], [vanilla]]],
    /*["itemscrap,white", []], Don't know if i should include this one*/
    ["knockbackfin", /*-------*/["Knockback Fin", [common], [purple], [utility], [chance, onHit, attack], [unlocked], [SotS]]],
    ["lensmakersglasses", /*--*/["Lens-maker's Glasses", [common], [black, red], [damage], [chance, onHit, dmgStat], [unlocked], [vanilla]]],
    ["medkit", /*-------------*/["MedKit", [common], [white, green], [healing], [heals, whenHurt], [challenge], [vanilla]]],
    ["mocha", /*--------------*/["Mocha", [common], [white, brown], [damage, utility], [atkSpeed, spdStat], [unlocked], [SotV]]],
    ["monstertooth", /*-------*/["Monster Tooth", [common], [yellow, brown], [healing], [heals, onKill], [unlocked], [vanilla]]],
    ["oddlyshapedopal", /*----*/["Oddly-Shaped Opal", [common], [blue], [utility], [conditional, armor], [unlocked], [SotV]]],
    ["paulsgoathoof", /*------*/["Paul's Goat Hoof", [common], [brown], [utility], [spdStat], [challenge], [vanilla]]],
    ["personalshieldgenerator", ["Personal Shield Generator", [common], [black, blue], [utility], [healthStat], [unlocked], [vanilla]]],
    ["powerelixir", /*--------*/["Power Elixir", [common], [pink], [healing], [conditional, consumable, heals], [unlocked], [SotV]]],
    ["rollofpennies", /*------*/["Roll of Pennies", [common], [green, brown], [utility], [money, whenHurt], [unlocked], [SotV]]],
    ["rustedkey", /*----------*/["Rusted Key", [common], [brown, grey], [utility], [conditional, _items_], [challenge], [vanilla]]],
    ["stickybomb", /*---------*/["Sticky Bomb", [common], [orange, blue], [damage], [chance, onHit, explosive], [unlocked], [vanilla]]],
    ["stungrenade", /*--------*/["Stun Grenade", [common], [green], [utility], [chance, onHit, debuff], [unlocked], [vanilla]]],
    ["topazbrooch", /*--------*/["Topaz Brooch", [common], [yellow, gold], [utility, healing], [heals, onKill], [unlocked], [vanilla]]],
    ["toughertimes", /*-------*/["Tougher Times", [common], [brown], [utility], [chance, dmgNegation], [challenge], [vanilla]]],
    ["warbanner", /*----------*/["Warbanner", [common], [red, yellow], [utility], [conditional, atkSpeed, spdStat], [unlocked], [vanilla]]],
    //["warpedecho", /*---------*/["Warped Echo", [common]]], <- Genuinly do not know how to describe this
    ["ukulele", /*------------*/["Ukulele", [uncommon], [brown], [damage], [chance, onHit, AoE, attack], [unlocked], [vanilla]]],
    ["atgmissilemk1",/*-------*/["AtG Missile Mk1", [uncommon], [green, black], [damage], [chance, onHit, attack], [unlocked], [vanilla]]],
    ["57leafclover", /*-------*/["57 Leaf Clover", [legendary], [green], [utility], [chance], [challenge], [vanilla]]],
    ["moltenperforator", /*---*/["Molten Perforator", [boss_planet], [orange, black], [damage], [chance, onHit, AoE, explosive], [unlocked], [vanilla]]],
    ["shapedglass", /*--------*/["Shaped Glass", [lunar], [white], [damage], [dmgStat, healthStat], [unlocked], [vanilla]]],
    ["polylute", /*-----------*/["Polylute", [_void_], [blue], [damage], [chance, onHit, attack], [unlocked], [SotV]]],
    ["saferspaces", /*--------*/["Safer Spaces", [_void_], [blue], [utility], [conditional, dmgNegation], [unlocked], [SotV]]],
    ["needletick", /*---------*/["Needletick", [_void_], [purple], [damage], [chance, onHit, debuff, attack], [unlocked], [SotV]]],
    ["lostseerslenses", /*----*/["Lost Seer's Lenses", [_void_], [blue, purple], [damage], [chance, onHit, attack], [unlocked], [SotV]]],
    ["weepingfungus", /*------*/["Weeping Fungus", [_void_], [purple], [healing], [conditional, heals], [unlocked], [SotV]]],
    ["encrustedkey", /*-------*/["Encrusted Key", [_void_], [white], [utility], [conditional, _items_], [unlocked], [SotV]]],
    ["singularityband", /*----*/["Singularity Band", [_void_], [blue, purple], [damage, utility], [conditional, attack], [unlocked], [SotV]]],
    ["lysatecell", /*---------*/["Lysate Cell", [_void_], [purple, blue], [utility], [survivorSkill], [unlocked], [SotV]]],
    ["voidsentflame", /*------*/["Voidsent Flame", [_void_], [orange, purple], [damage], [conditional, onHit, explosive], [unlocked], [SotV]]],
    ["plasmashrimp", /*-------*/["Plasma Shrimp", [_void_], [blue], [damage], [healthStat, conditional, attack], [unlocked], [SotV]]],
    ["tentabauble", /*--------*/["Tentabauble", [_void_], [purple, blue], [utility], [chance, onHit, debuff], [unlocked], [SotV]]],
    ["benthicbloom", /*-------*/["Benthic Bloom", [_void_], [blue], [utility], [conditional, _items_], [unlocked], [SotV]]],
    ["pluripotentlarva", /*---*/["Pluripotent Larva", [_void_], [blue, black], [utility], [conditional, whenHurt, _items_], [unlocked], [SotV]]],
    ["newlyhatchedzoea", /*---*/["Newly Hatched Zoea", [_void_], [purple], [damage], [conditional, minions], [unlocked], [SotV]]],
]);


const items_sorted = new Map([
    ["a", ["armorpiercingrounds", "antlershield", "atgmissilemk1"]],
    ["b", ["bustlingfungus", "backupmagazine", "bisonsteak", "blisteringlantern", "bundleoffireworks","benthicbloom"]],
    ["c", ["cautiousslug", "chronicexpansion", "crowbar"]],
    ["d", ["delicatewatch"]],
    ["e", ["energydrink", "encrustedkey"]],
    ["f", ["focuscrystal"]],
    ["g", ["gasoline"]],
    ["h", []],
    ["i", []],
    ["j", []],
    ["k", ["knockbackfin"]],
    ["l", ["lensmakersglasses", "lostseerslenses", "lysatecell"]],
    ["m", ["medkit", "mocha", "monstertooth", "moltenperforator"]],
    ["n", ["needletick", "newlyhatchedzoea"]],
    ["o", ["oddlyshapedopal"]],
    ["p", ["paulsgoathoof", "personalshieldgenerator", "powerelixir", "polylute", "plasmashrimp", "pluripotentlarva"]],
    ["q", []],
    ["r", ["repulsionarmorplate", "rollofpennies", "rustedkey"]],
    ["s", ["soldierssyringe", "stickybomb", "stungrenade", "shapedglass", "saferspaces", "singularityband"]],
    ["t", ["tritipdagger", "topazbrooch", "toughertimes", "tentabauble"]],
    ["u", ["ukulele"]],
    ["v", ["voidsentflame"]],
    ["w", ["warbanner", "weepingfungus"]],
    ["x", []],
    ["y", []],
    ["z", []],
]);


/*All items included in this table are those in the table below this one*/
const items_sorted_categories = new Map([
    ["?r", 'soldierssyringe', 'lensmakersglasses', 'bustlingfungus', 'topazbrooch'],
    ["?d", 'soldierssyringe', 'lensmakersglasses'],
    ["?h", 'bustlingfungus', 'topazbrooch'],
    ["?u", 'topazbrooch'],
    ["?!r", ],
    ["?!d", ],
    ["?!h", ],
    ["?!u", ],
])
const  items_effect_values = new Map([
    ['soldierssyringe', [/*+10% base damage*/(d,n) => {return d + (.1 * n)}]],
    ['lensmakersglasses', [/*+10% critical strike chance*/ (d,n) => {return d + (.1 * n)}]],
    ['bustlingfungus', [/*+5 health per yellow square per stack*/(h,n) => {return h + (5 * n)}]],
    ['topazbrooch', [/*+1 armor per enemy kill*/ (n) => {return n}]],
    ['toughertimes', [/*chance to dodge attacks*/ (n) => {return ((.15 * n) / (.15 * n + 1))}]],
    ['atgmissilemk1', []],
    ['runaldsband', []],
    ['chronobauble', []],
    ['ghorstome', []],
    ['infusion', []],
    ['leptondaisy',[]],
    ['oldguillotine',[]],
    ['hardlightafterburner',[]],
    ['brilliantbehemoth',[]],
    ['rejuvenationrack', []],
]);

/*note for future
    implementing items
    1. make sure the items work before anything
        - manually give them and test the stats
    2. give option to buy items after each kill
        - make them take up the slots on the table after clearing it 
        - need table clear animation and item clear animation

    Items will either be on kill, on guess, or passive stat changes
    
    ok maybe you can do it in either order

    in order to implement any of the aoe items you need to revamp the combat system

    try to only add items that affect 1 enemy or ones that modify player stats

    your problem is you are bouncing around too much, you have the core working and now
    its time to fully flesh out the other stuff

    FULLY COMPLETE THE ITEM SYSTEM BEFORE MOVING ON!!!

    make item selection appear on the item table once removing the player guesses
    add gold mechanic and let players choose when to move on to the next stage
    hide items and make player choose which random ones to get

    3 enemies at once?
*/
