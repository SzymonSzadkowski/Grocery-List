// select items and set variables

const alertMessage = document.querySelector('.alert-message');
const form = document.querySelector('.main-form');
const formInput = document.getElementById("form-input");
const formSubmit = document.querySelector('.form-submit');
const groceryListContainer = document.querySelector('.grocery-list-container');
const groceryList = document.querySelector('.grocery-list');
const clearItems = document.querySelector('.clear-items');

let itemId = 100;

// edit item option

let editFlag = false;
let editId = "";

// Event Listeners

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // stop when input is empty
    if (formInput.value && editFlag === false) {
        showListContainer();
        addItemToList(formInput);
        addToLocalStorage(itemId, formInput.value);
        displayTemporaryAlert("item added to the list", "success");
        backToDefaultValue();
    } else if (formInput.value && editFlag === true) {
        console.log(editId);
        let itemTarget = document.getElementById(editId);
        console.log(itemTarget);
        editNameOfItem(itemTarget, formInput.value);
        backToDefaultValue();
        displayTemporaryAlert("the item has been edited", "edit")
    }
    else{
        alert("Please insert an item")
    }
});

clearItems.addEventListener("click", () => {
    clearGroceryList();
    hideListContainer();
    displayTemporaryAlert("your list has been cleared", "delete");
    backToDefaultValue()
});

groceryList.addEventListener('click', (event) => {
    let eventTarget = event.target;
    let articleOfTarget = eventTarget.parentElement.parentElement;
    let idOfArticleOfTarget = articleOfTarget.id;
    console.log(idOfArticleOfTarget);
    let eventClassList = eventTarget.classList;
    // edit button
    if (eventClassList.contains("fa-edit")) {
        changeSubmitBtnText("edit");
        editId = idOfArticleOfTarget;
        console.log(editId);
        changeStateOfEditFlag();
    }
    // delete button
    else if (eventClassList.contains("fa-trash-alt")) {
        deleteItem(eventTarget);
        displayTemporaryAlert("item has been deleted", "delete")
        backToDefaultValue();
        if (groceryList.childElementCount <= 0){
            hideListContainer();
        }
    }
});


// Functions

function addItemToList(item) {
    const itemStructure = document.createElement("article");
    itemStructure.classList.add("item");
    const itemDataIdAttribute = document.createAttribute("id");
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
    formInput.value = "";
    editFlag = false;
    editId = "";
    formSubmit.textContent = "add";
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

function editNameOfItem(item, name){
    // select a paragraph which is the first child of article
    let itemNameToEdit = item.firstChild;
    itemNameToEdit.textContent = name;
}

function changeSubmitBtnText(text) {
    formSubmit.textContent = text;
}

function changeStateOfEditFlag() {
    if (editFlag === false) {
        editFlag = true;        
    }
    else{
        editFlag = false;
    }
}

function addToLocalStorage(id, value) {

}


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