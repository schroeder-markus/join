'use strict'

let selectedCategoryColor;
let assignedPersons = [];
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
        dropdownContainer.classList.add('showContactSelection');
    } else {
        dropdownContainer.classList.remove('showContactSelection');
    };
};

// render functions for Dropdown Lists.
// renders "New Category" plus categories from category-array with a for-loop.

function renderCategoryList() {
    let dropList = document.getElementById('categories');
    dropList.innerHTML = "";
    dropList.innerHTML = `<div><span onclick="toggleView_DropdownAndNewEntry('categoryDropdown','newCategoryInput', 'catNameInput')">new category</span></div>`
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
    toggleView_DropdownAndNewEntry('newCategoryInput', 'categoryDropdown', 'catNameInput');
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
// success: finishes dialogue. fail: shows "required"-notification.

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
        showColorRequiredAlert()
    };
};
// finishes the 'New Category'-dialogue after a SUCCESSFUL validation check for color and Input Value (included in confirmNewCategory())

function finishNewCategory(categoryName) {
    let categoryIndex = categories.findIndex(object => object.name === categoryName);
    toggleView_DropdownAndNewEntry('newCategoryInput', 'categoryDropdown', 'catNameInput');
    setCategorySelectionAsInput(categoryIndex);

};

// after a new category is successfully validated, the chosen name and color are set as value in the original category field.

function setCategorySelectionAsInput(i) {
    let categoryInput = document.getElementById('categoryInput');
    categoryInput.innerHTML = `${createCategoryHtml(i)}`
};

// after a failed validation in the "new category"-dialogue, the selected color the "required Alert" shows.

function showColorRequiredAlert() {
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

// changes the contact selection to select / unselect and pushes selected names to assignedContacts array.

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
    let firstName = document.getElementById(`firstName(${i})`).innerHTML;
    let lastName = document.getElementById(`lastName(${i})`).innerHTML;
    assignedPersons.push({
        'name' : `${firstName} ${lastName}`,
        'initials' : `${firstName.charAt(0)}${lastName.charAt(0)}`
    });
};


function unselectContact(i) {
    let firstName = document.getElementById(`firstName(${i})`).innerHTML;
    let lastName = document.getElementById(`lastName(${i})`).innerHTML;
    let fullName = document.getElementById(`${firstName} ${lastName}`);

    assignedPersons.splice(findIndexOfContact(fullName), 1);
};


function findIndexOfContact(contactName) {
    return assignedPersons.map(contact => contact.name).indexOf(contactName);

};


function confirmMailAdress() {
    let mailInputElement = document.getElementById('mailInput');
    let contactIndex = findIndexFromMail(mailInputElement.value);
    if( contactIndex == -1) {
        showMailNotFoundAlert(mailInputElement.value);
    } else {
        finishInvitationInput(contactIndex);
    }

};


function findIndexFromMail(mailAdress) {
    console.log(mailAdress);
    return contactData.map(contact => contact.mail).indexOf(mailAdress);
};


function showMailNotFoundAlert(inputValue) {
    let mailNotFoundAlertElement = document.getElementById('mailNotFoundAlert');
        mailNotFoundAlertElement.innerHTML = `'${inputValue}' could not be found in contacts`;
        mailNotFoundAlertElement.style.display = "block";
};


function finishInvitationInput(contactIndex) {
    assignedPersons.push({
        'name' : `${contactData[contactIndex].name}`,
        'initials' : `${contactData[contactIndex].initials}`
    });
    toggleView_DropdownAndNewEntry('invitePersonInput', 'assignToDropdown','mailInput');
    toggleAssignDropdown();

};


function toggleView_DropdownAndNewEntry(invisibleElementID, visibleElementID, inputFieldID) {
    let invisibleElement = document.getElementById(invisibleElementID);
    let visibleElement = document.getElementById(visibleElementID);
    let inputFieldElement = document.getElementById(inputFieldID);

    invisibleElement.style.display = "none";
    visibleElement.style.display = "block";
    inputFieldElement.focus();
};

function subtaskInput() {
    
};
