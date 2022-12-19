'use strict'

let selectedCategoryColor;
let assignedContacts = [];

function addTask() {

};


function categoryDropdown() {
    let dropdownElement = document.getElementById('categories');
    dropdownElement.innerHTML = "";

    if (dropdownElement.style.display != "block") {
        dropdownElement.style.display = "block";
        dropdownElement.innerHTML = `<div><span onclick="toggleView_DropdownAndNewEntry('categoryDropdown','newCategoryInput')">new category</span></div>`;      
        renderColorSelection();
        for (let i = 0; i < categories.length; i++) {
            dropdownElement.innerHTML += `<div><span onclick="setCategory(${i})">${createCategoryHtml(i)}</span></div>`
        };
    } else {
        dropdownElement.style.display = "none";
    };
};


function setCategory(i) {
    let categoryInput = document.getElementById('categoryInput');
    categoryInput.innerHTML = `${createCategoryHtml(i)}`
};


function createCategoryHtml(i) {
    return `${categories[i]['name']}<span class="colorDot" style="background-color:${categories[i]['color']}">`

};


function cancelInput() {
    resetNewCategoryColorAndInput();
    toggleView_DropdownAndNewEntry('newCategoryInput', 'categoryDropdown');
};


function setNewCategory() {
    let categoryInputElement = document.querySelector('#newCategoryInput input');

    if (selectedCategoryColor != undefined && categoryInputElement.value.length > 0) {
        categories.push({
            'name': `${categoryInputElement.value}`,
            'color': `${selectedCategoryColor}`,
        }
        );
        finishNewCategory(categoryInputElement.value);
        resetNewCategoryColorAndInput();
    } else {
        showRequired()
    };
};


function finishNewCategory(categoryName){
    let categoryIndex = categories.findIndex(object => object.name === categoryName);
    toggleView_DropdownAndNewEntry('newCategoryInput', 'categoryDropdown');
    setCategory(categoryIndex);

};

function resetNewCategoryColorAndInput() {
    let categoryInputElement = document.querySelector('#newCategoryInput input');
    categoryInputElement.value = "";
    selectedCategoryColor = undefined;
}


function showRequired() {
    let colorSelAlertElement = document.getElementById('colorSelAlert');

    if (selectedCategoryColor == undefined) {
            colorSelAlertElement.style.display = "block";
    }
};


function assignToDropdown() {
    let dropdownElement = document.getElementById('contactSelection');
    dropdownElement.innerHTML = "";

    if (dropdownElement.style.display != "block") {
        dropdownElement.style.display = "block";
        dropdownElement.innerHTML += `<div><span onclick="checkContact()">You<img id="contactCheckbox()" src="img/icon-selection-false.svg" alt="contactIconDark"</span></div>`;

        for (let i = 0; i < categories.length; i++) {
            dropdownElement.innerHTML += `<div><span onclick="checkContact(${i})">firstName lastName${(i)}<img id="contactCheckbox(${i}" src="img/icon-selection-false.svg" alt="contactIconDark"</span></div>`
        };
        dropdownElement.innerHTML += `<div><span onclick="toggleView_DropdownAndNewEntry('assignToDropdown','invitePersonInput')">Invite new Contact<img src="img/icon-contacts-dark.svg" alt="contactIconDark"</span></div>`;
    } else {
        dropdownElement.style.display = "none";
    };
};


function commitSubtask() {

};


function toggleView_DropdownAndNewEntry(IDinvisibleElement, IDvisibleElement) {
    let invisibleElement = document.getElementById(IDinvisibleElement);
    let visibleElement = document.getElementById(IDvisibleElement);

    invisibleElement.style.display = "none";
    visibleElement.style.display = "block";

};


function renderColorSelection() {
    let colorSelectionElement = document.getElementById('colorSelection');
    colorSelectionElement.innerHTML = '';
    for (let i = 0; i < categoryColors.length; i++) {
        colorSelectionElement.innerHTML += `
        <button onclick="setColor(${i})" type="button" id="dot${i}" class="colorDot"
        style="background-color:${categoryColors[i]}" name="color"></button>
        `
    };

};


function setColor(i) {
    renderColorSelection();
    let colorDotElement = document.getElementById(`dot${i}`);
    let colorSelAlertElement = document.getElementById('colorSelAlert');
    colorDotElement.classList.add('dotShadow');
    selectedCategoryColor = categoryColors[i];
    colorSelAlertElement.style.display = "none";
};


function subtaskInput() {
    // u.a. muss hier das 'confirmOrcancel-Element' eingeblendet werden.
};