const meaning = document.getElementById("word-meaning");
const use = document.getElementById("word-example");
const same = document.getElementById("word-synonyms");
const display_text = document.querySelector(".show_text_def");
const display_example = document.querySelector(".show_text_example");
const display_synonym = document.querySelector(".show_text_synonyms");
const search_icon = document.getElementById("search-icon");
const search_text = document.getElementById("search");
const show_word = document.querySelector(".word_entered");
const cross_btn = document.querySelector("#cross_icon");

//adding event listner to search icon
search_icon.addEventListener("click", () => {
    if (search_text.value === "") alert("Input not given!");
    else {
        meaning.innerText = "Search for:";
        display_text.innerText = "";
        display_synonym.innerText = "";
        display_example.innerText = "";
        showWordProperty(search_text.value);
        //showing the word we have searched for in the search bar!
        let show_word_entered = document.createElement("span");
        show_word.innerText = "";
        show_word_entered.innerText = `Output for: ${search_text.value}`;
        show_word.appendChild(show_word_entered);
        search_text.value = "";




    }
})
cross_btn.addEventListener("click", () => {
        meaning.innerText = "Search for:";
        display_text.innerText = "";
        display_synonym.innerText = "";
        display_example.innerText = "";
        show_word.innerText = "";
    })
    //creating a function 
function showWordProperty(word) {
    //calling out API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
        .then((data) => {
            //before entering new word we have to clear the previous entries
            //word_use store all properties which is under the array of meanings

            let word_use = data[0].meanings;
            meaning.innerText = "";

            word_use.forEach(btn_meanings => {
                //mean_btn is to create a button with class btn-prop and also stores a meanings array element named as partOfSpeech

                let mean_btn = document.createElement("button");

                mean_btn.innerText = btn_meanings.partOfSpeech;
                mean_btn.classList.add("btn-prop")
                meaning.appendChild(mean_btn);

                mean_btn.addEventListener("click", (e) => {
                        //we pass the value of button clicked to the function

                        showDefination(e.target.innerText);

                    })
                    //calling of showDefination function
                    //INTENT->> we will compare the value with meanings.partOfSpeech if it matches then we will show the defination
                function showDefination(value) {
                    //console.log(value);
                    word_use.forEach(e => {
                        if (e.partOfSpeech === value) {
                            let show_defination = e.definitions; // show_defination will store the array of all different definations the value stores in it
                            //for each loop again to console log all the definations
                            let ul_def = document.createElement("ul");
                            ul_def.innerText += `Defination as ${value}:
                        `
                                //for example
                            let ul_example = document.createElement("ul");
                            ul_example.innerText += `All examples as ${value}--->
                        `
                                //writing js for adding synonym property
                            const synonym = btn_meanings.synonyms;
                            let ul_synonym = document.createElement("ul");
                            for (let key in synonym) {
                                let li_synonym = document.createElement("li");
                                //  console.log(synonym[key]);
                                li_synonym.innerText = `${synonym[key]}`;
                                ul_synonym.appendChild(li_synonym);

                            }

                            display_synonym.innerText = "";
                            display_synonym.appendChild(ul_synonym);



                            //creating a loop  
                            show_defination.forEach(show_def_text => {
                                let li_def = document.createElement("li");
                                li_def.innerText = `${show_def_text.definition}`;
                                ul_def.appendChild(li_def);
                                //for example
                                let li_example = document.createElement("li");
                                if (show_def_text.example === "" || show_def_text.example === undefined) {
                                    li_example.innerText = ``
                                    li_example.style = "list-style:none;"
                                    li_example.classList.add("example_alert");
                                    ul_example.appendChild(li_example);

                                } else {
                                    li_example.innerText = `${show_def_text.example}`;
                                    ul_example.appendChild(li_example);
                                }



                            })


                            display_text.innerText = "";
                            display_text.appendChild(ul_def);

                            display_example.innerText = "";
                            display_example.appendChild(ul_example);






                        }
                    })
                }



            })


        });
}