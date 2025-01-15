const search = {

    itemList : document.getElementById('input-search'),
    search_bar : document.getElementById('search-input'),

    //for showing all items in the list
    make_item_list : function() {
        let lettersArray = Array.from(items_sorted.keys());

        for (const letter in lettersArray) {
            let item_array = items_sorted.get(lettersArray[letter]); //holds all items that start with a certain letter

            this.set_row_content(item_array);
        }
    },

    //showing filtered items in the list
    set_item_list : function() {
        this.itemList.innerHTML = '';

        let matching = this.filter();
        this.set_row_content(matching);
    },

    set_row_content : function(item_list) {
            for (const item in item_list) {
                //div will nest an image and the associated text
                let new_div = document.createElement('div');
                let new_img = document.createElement('img');
                let new_text = document.createElement('p');

                new_div.classList.add('flex-format-row');

                //pull images from resources based on key
                new_img.setAttribute('src', `./resources/${item_list[item]}.jpg`);
                new_img.setAttribute('placeholder', 'placeholder');
                new_img.classList.add('search-img');

                new_text.innerHTML = items.get(item_list[item])[0];
                new_div.appendChild(new_img);
                new_div.appendChild(new_text);
                this.itemList.appendChild(new_div);
                this.select_item_handler(new_text);
            }
    },

    select_item_handler : function(item) {
        let item_name = item.innerHTML;
        item.style.border = '1px solid black';
        console.log(item_name, 'setting handler');

        item.addEventListener("click", () => {
            this.search_bar.value = item_name; // Assuming 'this' context is correct
            console.log('clicked:', item_name);
        });
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = 'grey';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'white';
        });
    },

    filter : function() {
        window.setTimeout(() => {}, 100);
        let input_text = this.search_bar.value;
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