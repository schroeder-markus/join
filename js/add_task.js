'use strict'

let selectedCategoryColor;
let assignedContacts = [];
let showCategoryList = false;
let showContactList = false;

// Toggles dropdown action (open / close) for the category Selection and the task assignment
// Action Depends on the actual global boolean variable: showCategoryList / showContactList

function toggleCategoryDropdown() {
    showCategoryList = !showCategoryList;

    let dropdownContainer = document.getElementById('categoryDropdown');

    if (showCategoryList) {
        renderCategoryList();
        dropdownContainer.classList.add('showCategories');
    } else {
        dropdownContainer.classList.remove('showCategories')
    };
};


function toggleAssignDropdown() {
    showContactList = !showContactList;

    let dropdownContainer = document.getElementById('assignToDropdown');

    if (showContactList) {
        // renderContactSelection();
        dropdownContainer.classList.add('showContactSelection');
    } else {
        dropdownContainer.classList.remove('showContactSelection');
    };
};

// render functions for Dropdown Lists.
// renders "New Category" plus categories from category-array with a for loop.

function renderCategoryList() {
    let dropList = document.getElementById('categories');
    dropList.innerHTML = "";
    dropList.innerHTML = `<div><span onclick="toggleView_DropdownAndNewEntry('categoryDropdown','newCategoryInput')">new category</span></div>`
    for (let i = 0; i < categories.length; i++) {
        dropList.innerHTML += `<div><span onclick="setCategorySelectionAsInput(${i})">${createCategoryHtml(i)}</span></div>`
    };
    renderColorSelection();
};

// creates an html element from given category Id (from categories array).
// Then it returns the span element back to the original render function, including a span with the assigned category color as background-Color. 

function createCategoryHtml(i) {
    return `${categories[i]['name']}<span class="colorDot" style="background-color:${categories[i]['color']}">`

};

// aborts New Category Dialogue

function cancelNewCategory() {
    resetNewCategoryColorAndInput();
    toggleView_DropdownAndNewEntry('newCategoryInput', 'categoryDropdown');
};

// resets selectable color for new Categories and empties the 'new Category' input field for further attempts.
// fired after cancelling OR finishing new category.

function resetNewCategoryColorAndInput() {
    let categoryInputElement = document.querySelector('#newCategoryInput input');
    categoryInputElement.value = "";
    selectedCategoryColor = undefined;
};


// fired after clicking the check-button in "new Category"-dialogue.
// checks if category name is filled and a color is selected.
// success: finishes dialogue. fail: shows required-notification.

function confirmNewCategory() {
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
// finishes the 'New Category'-dialogue after a SUCCESSFUL validation check for color and Input Value (included in confirmNewCategory())

function finishNewCategory(categoryName) {
    let categoryIndex = categories.findIndex(object => object.name === categoryName);
    toggleView_DropdownAndNewEntry('newCategoryInput', 'categoryDropdown');
    setCategorySelectionAsInput(categoryIndex);

};

// after a new category is successfully validated, the chosen name and color are set as value in the original category field.

function setCategorySelectionAsInput(i) {
    let categoryInput = document.getElementById('categoryInput');
    categoryInput.innerHTML = `${createCategoryHtml(i)}`
};

// after a failed validation in the "new category"-dialogue, the selected color the "required Alert" shows.

function showRequired() {
    let colorSelAlertElement = document.getElementById('colorSelAlert');

    if (selectedCategoryColor == undefined) {
        colorSelAlertElement.style.display = "block";
    }
};

// renders Color Selection Buttons for new Categorys (visible after click on "New Category" in dropdown).

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

// sets the chosen color for a new category as selected and then highlights the selection with a shadow class (dotShadow).

function setColor(i) {
    renderColorSelection();
    let colorDotElement = document.getElementById(`dot${i}`);
    let colorSelAlertElement = document.getElementById('colorSelAlert');
    colorDotElement.classList.add('dotShadow');
    selectedCategoryColor = categoryColors[i];
    colorSelAlertElement.style.display = "none";
};

// renders actual User ("You") as selectable, all contacts from contact-array with a for loop and then adds the 'invite New Contact' option" .

// function renderContactSelection() {
//     let dropList = document.getElementById('contactSelection');
//     dropList.innerHTML = "";
//     dropList.innerHTML = `<div><span onclick="assignContact()">You<div id="contactCheckbox()" class="assignCheckbox"><div class="assignChecked"></div></div></span></div>`
//     for (let i = 0; i < contactData.length; i++) {
//         dropList.innerHTML += `<div><span onclick="toggleSelection(${i})"><div id="contact(${i})">${contactData[i].name}</div><div class="assignCheckbox"><div id="contactChecked(${i})" class="assignChecked"></div></div></span></div>`
//     };
//     dropList.innerHTML += `<div><span onclick="toggleView_DropdownAndNewEntry('assignToDropdown','invitePersonInput')">Invite new Contact<img src="img/icon-contacts-dark.svg" alt="contactIconDark"</span></div>`;
// };

// selects oder unselects contacts for assignment. The entry has a check-button and the contact is added or removed from the assignedContacts array.

function toggleSelection(i) {
    let contactCheckedElement = document.getElementById(`contactChecked(${i})`);
    if (contactCheckedElement.style.display != "block") {
        contactCheckedElement.style.display = "block";
        selectContact(i);
    } else {
        contactCheckedElement.style.display = "none";
        unselectContact(i);
    }
};


function selectContact(i) {
    let contactElement = document.getElementById(`contact(${i})`);
    assignedContacts.push(contactElement.innerHTML);
};


function unselectContact(i) {
    let contactElement = document.getElementById(`contact(${i})`);
    assignedContacts.splice(findIndexOfContact(contactElement.innerHTML), 1);
};


function findIndexOfContact(contactName) {
    return assignedContacts.indexOf(contactName);

};


function commitSubtask() {

};


function toggleView_DropdownAndNewEntry(IDinvisibleElement, IDvisibleElement) {
    let invisibleElement = document.getElementById(IDinvisibleElement);
    let visibleElement = document.getElementById(IDvisibleElement);

    invisibleElement.style.display = "none";
    visibleElement.style.display = "block";

};

function subtaskInput() {
    // u.a. muss hier das 'confirmOrcancel-Element' eingeblendet werden.
};


function addTask() {

};