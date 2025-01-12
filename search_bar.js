const search = {

    itemList : document.getElementById('input-search'),

    make_item_list : function() {
        let lettersArray = Array.from(items_sorted.keys());

        for (const letter in lettersArray) {
            let item_array = items_sorted.get(lettersArray[letter]); //holds all items that start with a certain letter

            for (const item in item_array) {
                let new_text = document.createElement('p');
                new_text.innerHTML = items.get(item_array[item])[0];
                this.itemList.appendChild(new_text);
            }
        }
    },

    set_item_list : function() {
        this.itemList.innerHTML = '';

        let matching = this.filter();
        for (const item in matching) {
            let new_text = document.createElement('p');
            new_text.innerHTML = items.get(matching[item])[0];
            this.itemList.appendChild(new_text);
        }
        
    },

    filter : function() {
        window.setTimeout(() => {}, 100);
        let search_bar = document.getElementById('search-input');
        let input_text = search_bar.value;
        console.log(input_text);
        let matching = [];
        let poss_inputs = items_sorted.get(input_text[0]);
        //console.log(poss_inputs);

        if (input_text.length === 0) {
            this.make_item_list();
            return [];
        }
        if (input_text.length === 1) { //will display possible inputs
            console.log(poss_inputs);
            return poss_inputs;
        } else if (input_text.length !== 0) {
            for (let i = 0; i < poss_inputs.length; i++) {
                console.log(poss_inputs[i].substring(0,4));
                if (input_text === poss_inputs[i].substring(0, input_text.length)) {
                    matching.push(poss_inputs[i]);
                }
            }
            return matching;
        }
    },

    clear : function() {
        document.getElementById('input-search').innerHTML = '';
    },
}