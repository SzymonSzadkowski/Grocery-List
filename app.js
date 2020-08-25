// select items and set variables

const alertMessage = document.querySelector('.alert-message');
const form = document.querySelector('.main-form');
const grocery = document.getElementById("form-input");
const formSubmit = document.querySelector('.form-submit');
const groceryListContainer = document.querySelector('.grocery-list-container');
const groceryList = document.querySelector('.grocery-list');
const clearItems = document.querySelector('.clear-items');

let itemId = 100;

// edit item option

let editElement;
let editFlag = false;
let editId = "";

// Event Listeners

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // stop when input is empty
    if (grocery.value) {
        showListContainer();
        addItemToList(grocery);
        addToLocalStorage(itemId, grocery.value);
        displayTemporaryAlert("item added to the list", "success");
        backToDefaultValue();
    } else {
        alert("Please insert an item")
    }
});

clearItems.addEventListener("click", () => {
    clearGroceryList();
    hideListContainer();
    displayTemporaryAlert("your list has been cleared", "delete");
    backToDefaultValue()
})

groceryList.addEventListener('click', (event) => {
    let eventClassList = event.target.classList;
    // edit button
    if (eventClassList.contains("fa-edit")) {
        console.log("edit!!");
    }
    // delete button
    else if (eventClassList.contains("fa-trash-alt")) {
        deleteItem(event.target);
        displayTemporaryAlert("item has been deleted", "delete")
        backToDefaultValue();
        if(groceryList.childElementCount <= 0){
            hideListContainer();
        }
    }
})


// Functions

function addItemToList(item) {
    const itemStructure = document.createElement("article");
    itemStructure.classList.add("item");
    const itemDataIdAttribute = document.createAttribute("data-id");
    itemDataIdAttribute.value = itemId;

    itemStructure.setAttributeNode(itemDataIdAttribute);
    itemStructure.innerHTML = `<p class="item-name">${item.value}</p>
    <button class="edit-item">
    <i class="far fa-edit"></i>
    </button>
    <button class="delete-item">
    <i class="far fa-trash-alt"></i>
    </button>`;

    groceryList.appendChild(itemStructure);
    // set id for next item
    itemId++;
};

function backToDefaultValue() {
    grocery.value = "";
    editFlag = false;
    editId = "";
    formSubmit.textContent = "add";;
}

function displayTemporaryAlert(text, action) {
    alertMessage.textContent = text;
    alertMessage.classList.add(`alert-${action}`);

    // remove after 600ms
    setTimeout(() => {
        alertMessage.textContent = "";
        alertMessage.classList.remove(`alert-${action}`);
    }, 600);
}

function showListContainer() {
    groceryListContainer.classList.add("grocery-list-container-show");
}

function hideListContainer() {
    groceryListContainer.classList.remove("grocery-list-container-show");
}

function clearGroceryList() {
    let itemsInList = document.querySelectorAll(".item");

    if(itemsInList.length > 0){
        itemsInList.forEach((item) => {
            groceryList.removeChild(item);
        });
    }
}

function deleteItem(item) {;
    // select the whole item
    let displayOfItem = item.parentElement.parentElement;
    groceryList.removeChild(displayOfItem);
}

function addToLocalStorage(id, value) {}



// function addItemToList(item) {
//     const itemValue = item.value;
//     itemId++;

//     if(itemValue){
//         return `<article class="item" id="${itemId}">
//         <p class="item-name">${itemValue}</p>
//         <button class="edit-item">
//             <i class="far fa-edit"></i>
//         </button>
//         <button class="delete-item">
//             <i class="far fa-trash-alt"></i>
//         </button>
//     </article>`
//     }
//     else{
//         alert("Please insert an item");
//     }
// };