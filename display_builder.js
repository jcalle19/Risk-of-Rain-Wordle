/*Heavily relies on the displa*/

const display = {
    curr_color_array : [],
    showInfo : function(cellId) {
        let cell = document.getElementById(cellId);
        cell.style.display = 'inline-block';
    },

    hideInfo : function(cellId) {
        let cell = document.getElementById(cellId);
        cell.style.display = 'none';
    },

    setAll : function() {
        this.setInfoDisplay('rarities', this.displayInfo.green.rarity, this.displayInfo.yellow.rarity, this.displayInfo.red.rarity, this.displayInfo.undetermined.rarity);
        this.setInfoDisplay('colors', this.displayInfo.green.colors, this.displayInfo.yellow.colors, this.displayInfo.red.colors, this.displayInfo.undetermined.colors);
        this.setInfoDisplay('item_type', this.displayInfo.green.types, this.displayInfo.yellow.types, this.displayInfo.red.types, this.displayInfo.undetermined.types);
        this.setInfoDisplay('description', this.displayInfo.green.behavior, this.displayInfo.yellow.behavior, this.displayInfo.red.behavior, this.displayInfo.undetermined.behavior);
        this.setInfoDisplay('unlockable', this.displayInfo.green.unlock, this.displayInfo.yellow.unlock, this.displayInfo.red.unlock, this.displayInfo.undetermined.unlock);
        this.setInfoDisplay('expansion', this.displayInfo.green.expansion, this.displayInfo.yellow.expansion, this.displayInfo.red.expansion, this.displayInfo.undetermined.expansion);
    },

    buildAll : function() {
        this.updateInfoDisplay('rarities', 0, this.displayInfo.green.rarity, this.displayInfo.yellow.rarity, this.displayInfo.red.rarity, this.displayInfo.undetermined.rarity);
        this.updateInfoDisplay('colors', 1, this.displayInfo.green.colors, this.displayInfo.yellow.colors, this.displayInfo.red.colors, this.displayInfo.undetermined.colors);
        this.updateInfoDisplay('item_type', 2, this.displayInfo.green.types, this.displayInfo.yellow.types, this.displayInfo.red.types, this.displayInfo.undetermined.types);
        this.updateInfoDisplay('description', 3, this.displayInfo.green.behavior, this.displayInfo.yellow.behavior, this.displayInfo.red.behavior, this.displayInfo.undetermined.behavior);
        this.updateInfoDisplay('unlockable', 4, this.displayInfo.green.unlock, this.displayInfo.yellow.unlock, this.displayInfo.red.unlock, this.displayInfo.undetermined.unlock);
        this.updateInfoDisplay('expansion', 5, this.displayInfo.green.expansion, this.displayInfo.yellow.expansion, this.displayInfo.red.expansion, this.displayInfo.undetermined.expansion);
    },

    updateInfoDisplay : function(parentId, colorArrayIndex, greens, yellows, reds, undetermined) {
        let attributeColor = this.curr_color_array[colorArrayIndex];
        if (webApp.status.guessed_item !== 'none') {
            let guessedAttributes = webApp.status.guessed_item[colorArrayIndex + 1];
            let updatedElement;
            for (let i = 0; i < guessedAttributes.length; i++) {
                console.log(guessedAttributes[i]);
                updatedElement = document.getElementById(guessedAttributes[i]);
                undetermined.delete(String(guessedAttributes[i]));
                if (attributeColor === 'green') {
                    greens.set(guessedAttributes[i], greenBackground);
                } else if (attributeColor === 'yellow') {
                    yellows.set(guessedAttributes[i], yellowBackground);
                } else if (attributeColor === 'red') {
                    reds.set(guessedAttributes[i], 'red');
                }
                try {
                    updatedElement.classList.remove('undetermined');
                    updatedElement.classList.add(attributeColor);
                } catch { console.log(updatedElement); };
                this.setInfoDisplay(parentId, greens, yellows, 
                    reds, undetermined);
            }
        }
    },

    setInfoDisplay : function(parentId, greens, yellows, reds, undetermined) {
        let infoElement = document.getElementById(parentId);
        infoElement.innerHTML = '';
        let greensArray = Array.from(greens.keys());
        let yellowsArray = Array.from(yellows.keys());
        let redsArray = Array.from(reds.keys());
        let undArray = Array.from(undetermined.keys());
        
        let newElement;
        //Correct Attributes
        for (let i = 0; i < greensArray.length; i++) {
            newElement = document.createElement('p');
            newElement.id = greensArray[i];
            newElement.innerHTML = greensArray[i];
            try {newElement.classList.remove('undetermined');} catch (error){};
            newElement.classList.add('green');
            infoElement.appendChild(newElement);
        }

        //Partial Attributes
        for (let i = 0; i < yellowsArray.length; i++) {
            newElement = document.createElement('p');
            newElement.id = yellowsArray[i];
            newElement.innerHTML = yellowsArray[i];
            try {newElement.classList.remove('undetermined');} catch (error){};
            newElement.classList.add('yellow');
            infoElement.appendChild(newElement);
        }
        //Incorrect Attributes
        for (let i = 0; i < redsArray.length; i++) {
            newElement = document.createElement('p');
            newElement.id = redsArray[i];
            newElement.innerHTML = redsArray[i];
            try {newElement.classList.remove('undetermined');} catch (error){};
            newElement.classList.add('red');
            infoElement.appendChild(newElement);
        }

        //Undetermined Attributes
        for (let i = 0; i < undArray.length; i++) {
            newElement = document.createElement('p');
            newElement.id = undArray[i];
            newElement.innerHTML = undArray[i];
            newElement.classList.add('undetermined');
            infoElement.appendChild(newElement);
        }
    },

    displayInfo : {
        green : {
            rarity : new Map([]),
            colors : new Map([]),
            types : new Map([]),
            behavior : new Map([]),
            unlock : new Map([]),
            expansion : new Map([]),
        },
    
        yellow : {
            rarity : new Map([]),
            colors : new Map([]),
            types : new Map([]),
            behavior : new Map([]),
            unlock : new Map([]),
            expansion : new Map([]),
        },
    
        red : {
            rarity : new Map([]),
            colors : new Map([]),
            types : new Map([]),
            behavior : new Map([]),
            unlock : new Map([]),
            expansion : new Map([]),
        },
    
        undetermined : {
            rarity : new Map([
                [common, undetermined],[uncommon, undetermined],[legendary, undetermined],
                [boss_planet, undetermined],[lunar, undetermined],[_void_, undetermined],
            ]),
    
            colors : new Map ([
                [yellow, undetermined],[black, undetermined],[grey, undetermined],
                [green, undetermined],[purple, undetermined],[pink, undetermined],
                [blue, undetermined],[white, undetermined],[brown, undetermined],
                [red, undetermined],[orange, undetermined],[gold, undetermined],
            ]),
    
            types : new Map ([
                [damage, undetermined],[utility, undetermined],[healing, undetermined],
            ]),
    
            behavior : new Map ([
                [atkSpeed, undetermined],[AoE, undetermined],[dmgStat, undetermined],[debuff, undetermined],
                [onKill, undetermined],[money, undetermined],[minions, undetermined],[conditional, undetermined],
                [explosive, undetermined],[whenHurt, undetermined],[healthStat, undetermined],[survivorSkill, undetermined],
                [attack, undetermined],[chance, undetermined],[heals, undetermined],[onHit, undetermined],
                [dmgNegation, undetermined],[spdStat, undetermined],[consumable, undetermined],[armor, undetermined],
                [_items_, undetermined],
            ]),
    
            unlock : new Map ([
                [unlocked, undetermined],[challenge, undetermined],
            ]),
    
            expansion : new Map ([
                [vanilla, undetermined],[SotV, undetermined],[SotS, undetermined],
            ])
        }
    },

    displayInfoReset : {
        green : {
            rarity : new Map([]),
            colors : new Map([]),
            types : new Map([]),
            behavior : new Map([]),
            unlock : new Map([]),
            expansion : new Map([]),
        },
    
        yellow : {
            rarity : new Map([]),
            colors : new Map([]),
            types : new Map([]),
            behavior : new Map([]),
            unlock : new Map([]),
            expansion : new Map([]),
        },
    
        red : {
            rarity : new Map([]),
            colors : new Map([]),
            types : new Map([]),
            behavior : new Map([]),
            unlock : new Map([]),
            expansion : new Map([]),
        },
    
        undetermined : {
            rarity : new Map([
                [common, undetermined],[uncommon, undetermined],[legendary, undetermined],
                [boss_planet, undetermined],[lunar, undetermined],[_void_, undetermined],
            ]),
    
            colors : new Map ([
                [yellow, undetermined],[black, undetermined],[grey, undetermined],
                [green, undetermined],[purple, undetermined],[pink, undetermined],
                [blue, undetermined],[white, undetermined],[brown, undetermined],
                [red, undetermined],[orange, undetermined],[gold, undetermined],
            ]),
    
            types : new Map ([
                [damage, undetermined],[utility, undetermined],[healing, undetermined],
            ]),
    
            behavior : new Map ([
                [atkSpeed, undetermined],[AoE, undetermined],[dmgStat, undetermined],[debuff, undetermined],
                [onKill, undetermined],[money, undetermined],[minions, undetermined],[conditional, undetermined],
                [explosive, undetermined],[whenHurt, undetermined],[healthStat, undetermined],[survivorSkill, undetermined],
                [attack, undetermined],[chance, undetermined],[heals, undetermined],[onHit, undetermined],
                [dmgNegation, undetermined],[spdStat, undetermined],[consumable, undetermined],[armor, undetermined],
                [_items_, undetermined],
            ]),
    
            unlock : new Map ([
                [unlocked, undetermined],[challenge, undetermined],
            ]),
    
            expansion : new Map ([
                [vanilla, undetermined],[SotV, undetermined],[SotS, undetermined],
            ])
        }
    },


}