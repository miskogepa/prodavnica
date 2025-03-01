// Challenge: Import 'initializeApp' from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// Challenge: Import 'getDatabase' from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// ovo je kopirano kada sam napravio firebase project i napravio realtime database
const appSettings = {
    databaseURL: "https://prodavnica-c345b-default-rtdb.europe-west1.firebasedatabase.app/"
}

//sada spajamo nas projekat sa firebase
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppinglist');

//uzimamo input iz inputa
const inputFieldEl = document.getElementById('input-field');
const buttonEl = document.getElementById('add-button');
const shoppingListEl = document.getElementById("shopping-list")

buttonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue);
    // appendItemToShoppingListEl(inputValue)
    clearInputFieldEl()

});


onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())
    
    clearShoppingListEl()
    
    for (let i = 0; i < itemsArray.length; i++) {
        appendItemToShoppingListEl(itemsArray[i])
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

//funkcija za brisanje inputa
function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}