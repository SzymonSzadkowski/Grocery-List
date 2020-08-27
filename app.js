// select items and set variables

const alertMessage = document.querySelector('.alert-message');
const form = document.querySelector('.main-form');
const formInput = document.getElementById("form-input");
const formSubmit = document.querySelector('.form-submit');
const groceryListContainer = document.querySelector('.grocery-list-container');
const groceryList = document.querySelector('.grocery-list');
const clearItems = document.querySelector('.clear-items');

let editFlag = false;
let editId = "";
let itemId = Math.floor(Math.random() * 1000);


// Event Listeners

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // stop when input is empty
    if (formInput.value && editFlag === false) {
        showListContainer();
        addItemToList(formInput);
        displayTemporaryAlert("item added to the list", "success");
        addToLocalStorage(itemId, formInput.value);
        backToDefaultValue();
    } else if (formInput.value && editFlag === true) {
        let itemTarget = document.getElementById(editId);
        editNameOfItem(itemTarget, formInput.value);
        editLocalStorage(editId, formInput.value);
        backToDefaultValue();
        displayTemporaryAlert("the item has been edited", "edit")
    } else {
        alert("Please insert an item")
    }
});

groceryList.addEventListener('click', (event) => {
    let eventTarget = event.target;
    let articleOfTarget = eventTarget.parentElement.parentElement;
    let idOfArticleOfTarget = articleOfTarget.id;
    let eventClassList = eventTarget.classList;
    // edit button
    if (eventClassList.contains("fa-edit")) {
        changeSubmitBtnText("edit");
        editId = idOfArticleOfTarget;
        let itemNamePlace = document.getElementById(editId).firstChild;
        formInput.value = itemNamePlace.textContent;
        changeStateOfEditFlag();
    }
    // delete button
    else if (eventClassList.contains("fa-trash-alt")) {
        deleteItem(eventTarget);
        displayTemporaryAlert("item has been deleted", "delete");
        removeFromLocalStorage(idOfArticleOfTarget);
        backToDefaultValue();
        if (groceryList.childElementCount <= 0) {
            hideListContainer();
        }
    }
});

clearItems.addEventListener("click", () => {
    clearGroceryList();
    hideListContainer();
    displayTemporaryAlert("your list has been cleared", "delete");
    clearLocalStorage();
    backToDefaultValue()
});

window.addEventListener("DOMContentLoaded", () => {
    let itemsInList = getLocalStorage();
    if (itemsInList.length > 0) {
        showListContainer();
        displayItemsFromLocalStorage();
    }
});

// Functions

function addItemToList(item) {
    // prevent dublication of id
    itemId++;
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
};

function backToDefaultValue() {
    formInput.value = "";
    editFlag = false;
    editId = "";
    formSubmit.textContent = "add";
};

function displayTemporaryAlert(text, action) {
    alertMessage.textContent = text;
    alertMessage.classList.add(`alert-${action}`);

    // remove after 600ms
    setTimeout(() => {
        alertMessage.textContent = "";
        alertMessage.classList.remove(`alert-${action}`);
    }, 600);
};

function showListContainer() {
    groceryListContainer.classList.add("grocery-list-container-show");
};

function hideListContainer() {
    groceryListContainer.classList.remove("grocery-list-container-show");
};

function clearGroceryList() {
    let itemsInList = document.querySelectorAll(".item");

    if (itemsInList.length > 0) {
        itemsInList.forEach((item) => {
            groceryList.removeChild(item);
        });
    }
};

function deleteItem(item) {
    ;
    // select the whole item
    let displayOfItem = item.parentElement.parentElement;
    groceryList.removeChild(displayOfItem);
};

function editNameOfItem(item, name) {
    // select a paragraph which is the first child of article
    let itemNameToEdit = item.firstChild;
    itemNameToEdit.textContent = name;
};

function changeSubmitBtnText(text) {
    formSubmit.textContent = text;
};

function changeStateOfEditFlag() {
    if (editFlag === false) {
        editFlag = true;
    } else {
        editFlag = false;
    }
};

function addToLocalStorage(id, value) {
    const itemToAdd = {
        id,
        value
    };
    let listOfItems = getLocalStorage();
    listOfItems.push(itemToAdd);
    localStorage.setItem("list", JSON.stringify(listOfItems));
};

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
};

function removeFromLocalStorage(id) {
    let listOfItems = getLocalStorage();
    listOfItems = listOfItems.filter((item) => {
        if (item.id.toString() !== id) {
            return item;
        };
    });
    localStorage.setItem("list", JSON.stringify(listOfItems));
};

function editLocalStorage(id, value) {
    let listOfItems = getLocalStorage();
    listOfItems = listOfItems.map((item) => {
        if (item.id.toString() === id) {
            item.value = value;
        }
        return item
    })
    localStorage.setItem("list", JSON.stringify(listOfItems));
};

function clearLocalStorage() {
    localStorage.clear();
};

function displayItemsFromLocalStorage() {
    let listOfItems = getLocalStorage();
    if (listOfItems.length > 0) {
        listOfItems.forEach((item) => {
            const itemStructure = document.createElement("article");
            itemStructure.classList.add("item");
            const itemDataIdAttribute = document.createAttribute("id");
            itemDataIdAttribute.value = item.id;
            itemStructure.setAttributeNode(itemDataIdAttribute);
            itemStructure.innerHTML = `<p class="item-name">${item.value}</p>
            <button class="edit-item">
            <i class="far fa-edit"></i>
            </button>
            <button class="delete-item">
            <i class="far fa-trash-alt"></i>
            </button>`;
            groceryList.appendChild(itemStructure);
        })
    }
};