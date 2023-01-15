"use strict";

let category = "";
let assignedPersons = [];
let date = "";
let priority = "";
let subtasks = [];
let lastTaskID = -1;

let selectedCategoryColor = "";
let showCategoryList = false;
let showContactList = false;

let formValidation = true;


// Init functions for add Task site

function initAddTask() {
    loadTasks();
    renderDropdownContent()
    addReturnKeyEventListener();
    loadCurrentUser();
    setCurrentDate('dueDate');
};

function setCurrentDate(inputElement) {
    document.getElementById(inputElement).valueAsDate = new Date();

};

function addReturnKeyEventListener() {
    let mainArea = document.getElementsByTagName('main')[0];
    mainArea.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            createTask();
        };
    })
};

// Toggle dropdown action (open / close) for the category Selection and the task assignment
// Action Depends on the actual global boolean variable: showCategoryList / showContactList

function renderDropdownContent() {
    renderCategoryList();
    renderAssignSelf();

};

function toggleCategoryDropdown() {
    showCategoryList = !showCategoryList;
    deleteAlert("categoryAlert");
    let dropdownContainer = document.getElementById("categoryDropdown");

    if (showCategoryList) {
        renderCategoryList();
        dropdownContainer.classList.add("showCategories");
    } else {
        dropdownContainer.classList.remove("showCategories");
    };
};


function toggleAssignDropdown() {
    showContactList = !showContactList;
    deleteAlert("assignAlert");
    let dropdownContainer = document.getElementById("assignToDropdown");

    if (showContactList) {
        dropdownContainer.classList.add("showContactSelection");
    } else {
        dropdownContainer.classList.remove("showContactSelection");
    };
};

// render functions for Dropdown Lists.
// renders "New Category" plus categories from category-array with a for-loop.

function renderCategoryList() {
    let dropList = document.getElementById("categories");
    dropList.innerHTML = '';
    dropList.innerHTML = `<div><span onclick="toggleView_DropdownAndNewEntry('categoryDropdown','newCategoryInput', 'catNameInput')">new category</span></div>`;
    for (let i = 0; i < categories.length; i++) {
        dropList.innerHTML += `<div><span onclick="setCategorySelectionAsInput(${i})">${createCategoryHtml(i)}</span></div>`;
    };
    renderColorSelection();
};

// creates an html element from given category Id (from categories array).
// Then it returns the span element back to the original render function, including a span with the assigned category color as background-Color.

function createCategoryHtml(i) {
    return `${categories[i]["name"]}<span class="colorDot" style="background-color:${categories[i]["color"]}">`;
};

// cancels New Category Dialogue

function cancelNewCategory() {
    resetNewCategoryColorAndInput();
    toggleView_DropdownAndNewEntry(
        "newCategoryInput",
        "categoryDropdown",
        "catNameInput"
    );
};

// resets selectable color for new Categories and empties the 'new Category' input field for further attempts.
// fired after cancelling OR finishing new category.

function resetNewCategoryColorAndInput() {
    let categoryInputElement = document.querySelector("#newCategoryInput input");
    categoryInputElement.value = "";
    selectedCategoryColor = "";
};

// fired after clicking the check-button in "new Category"-dialogue.
// checks if category name is filled and a color is selected.
// success: finishes dialogue. fail: shows "required"-Note.

function confirmNewCategory() {
    let categoryInputElement = document.querySelector("#newCategoryInput input");

    if (selectedCategoryColor.length > 0 && categoryInputElement.value.length > 0) {
        categories.push({
            name: `${categoryInputElement.value}`,
            color: `${selectedCategoryColor}`,
        });
        finishNewCategory(categoryInputElement.value);
        resetNewCategoryColorAndInput();
    } else {
        showColorRequiredAlert();
    };
};
// finishes the 'New Category'-dialogue after a SUCCESSFUL validation check for color and Input Value (included in confirmNewCategory())

function finishNewCategory(categoryName) {
    let categoryIndex = categories.findIndex(
        (object) => object.name === categoryName
    );
    toggleView_DropdownAndNewEntry(
        "newCategoryInput",
        "categoryDropdown",
        "catNameInput"
    );
    setCategorySelectionAsInput(categoryIndex);
};

// after a new category is successfully validated, the chosen name and color are set as value in the original category field.

function setCategorySelectionAsInput(i) {
    category = categories[i]["name"];
    let categoryInput = document.getElementById("categoryInput");
    categoryInput.innerHTML = `${createCategoryHtml(i)}`;
};

// after a failed validation in the "new category"-dialogue.

function showColorRequiredAlert() {
    let colorSelAlertElement = document.getElementById("colorSelAlert");

    if (selectedCategoryColor.length == 0) {
        colorSelAlertElement.style.display = "block";
    };
};

// renders Color Selection Buttons for new Categorys (visible after click on "New Category" in dropdown).

function renderColorSelection() {
    let colorSelectionElement = document.getElementById("colorSelection");
    colorSelectionElement.innerHTML = '';
    for (let i = 0; i < categoryColors.length; i++) {
        colorSelectionElement.innerHTML += `
        <button onclick="setColor(${i})" type="button" id="dot${i}" class="colorDot"
        style="background-color:${categoryColors[i]}" name="color"></button>
        `;
    };
};
// sets the chosen color for a new category as selected and then highlights the selection with a shadow class (dotShadow).

function setColor(i) {
    renderColorSelection();
    let colorDotElement = document.getElementById(`dot${i}`);
    let colorSelAlertElement = document.getElementById("colorSelAlert");
    colorDotElement.classList.add("dotShadow");
    selectedCategoryColor = categoryColors[i];
    colorSelAlertElement.style.display = "none";
};

// renders self assignment entry "you" or not, depending on if guest login is active or not.

function renderAssignSelf() {
    let assignYouElement = document.querySelector('.user-you');
    if(localStorage.getItem('currentUser') !== null) {
        assignYouElement.innerHTML = `
        <span onclick="toggleSelection(0)"><div id="contact(0)">You</div>
            <div class="assignCheckbox"><div id="contactChecked(0)"
            class="assignChecked"></div></div></span>
        `
    }
}

// changes the assignment selection to select / unselect and pushes selected names to assignedContacts array.

async function toggleSelection(i) {
    let contactName = await findName(i);
    let contactCheckedElement = document.getElementById(`contactChecked(${i})`);
    if (contactCheckedElement.style.display !== "block") {
        contactCheckedElement.style.display = "block";
        selectContact(contactName);
    } else {
        contactCheckedElement.style.display = "none";
        unselectContact(contactName);
    };
    renderNameCircles();
};


async function findName(i) {
    if (i == 0) {
        return await JSON.parse(localStorage.getItem('currentUser')).name;
    } else {
        return document.getElementById(`contact(${i})`).innerHTML
    }

};


function selectContact(contactName) {
    assignedPersons.push({
        name: `${contactName}`,
        initials: `${contactName.split(" ").map((n) => n[0]).join("")}`,
    });
};


function unselectContact(contactName) {
    assignedPersons.splice(findIndexOfContact(contactName), 1);
};


function findIndexOfContact(contactName) {
    return assignedPersons.map((contact) => contact.name).indexOf(contactName);
};


async function confirmMailAdress() {
    let contacts = await JSON.parse(backend.getItem('allContacts'))
    console.log(contacts);
    let mailInputElement = document.getElementById("mailInput");
    let contactIndex = findIndexFromMail(contacts, mailInputElement.value);
    if (contactIndex == -1) {
        showMailNotFoundAlert(mailInputElement.value);
    } else {
        finishInvitationInput(contacts, contactIndex);
    };
};


function findIndexFromMail(contacts, mailAdress) {
    return contacts.map((contact) => contact.mail).indexOf(mailAdress);
};


function finishInvitationInput(contacts, index) {
    if (assignedPersons.includes(contacts)){
    }else{
        assignedPersons.push({
            name: `${contacts[index].name}`,
            initials: `${contacts[index].initials}`,
            color: `${contacts[index].color}`,
        })
    };
    toggleView_DropdownAndNewEntry(
        "invitePersonInput",
        "assignToDropdown",
        "mailInput"
    );
    renderNameCircles();
};


function showMailNotFoundAlert(inputValue) {
    let mailNotFoundAlertElement = document.getElementById("mailNotFoundAlert");
    mailNotFoundAlertElement.innerHTML = `'${inputValue}' could not be found in contacts`;
    mailNotFoundAlertElement.style.display = "block";
};

// cancels invitation dialogue

function cancelInviteContact() {
    toggleView_DropdownAndNewEntry(
        "invitePersonInput",
        "assignToDropdown",
        "mailInput"
    );
};


function renderNameCircles() {
    let nameCirclesElement = document.getElementById("nameCircles");
    nameCirclesElement.innerHTML = '';
    for (let i = 0; i < assignedPersons.length; i++) {
        nameCirclesElement.innerHTML += `
        <span class="name-circle name-circle-letter" style="background-color:${assignedPersons[i].color}">
        ${assignedPersons[i].initials}</span></span>
        `;
    };
};


function toggleView_DropdownAndNewEntry(
    invisibleElementID,
    visibleElementID,
    inputFieldID
) {
    let invisibleElement = document.getElementById(invisibleElementID);
    let visibleElement = document.getElementById(visibleElementID);
    let inputFieldElement = document.getElementById(inputFieldID);

    invisibleElement.style.display = 'none';
    visibleElement.style.display = 'block';
    inputFieldElement.focus();
};


function setPrio(priorityValue) {
    deleteAlert('priorityAlert');
    let prioButtonElement = document.getElementById(`prioButton-${priorityValue}`
    );
    resetActivePrio();

    priority = priorityValue;
    prioButtonElement.classList.add('prioActive');
    prioButtonElement.style.backgroundColor = `var(--prio-${priorityValue})`;
};


function resetActivePrio() {
    if (priority.length > 0) {
        let activePrioButtonElement = document.getElementById(`prioButton-${priority}`);
        priority = "";
        activePrioButtonElement.classList.remove('prioActive');
        activePrioButtonElement.style.backgroundColor = `var(--main-white)`
    };
};


function addSubtask() {
    let subtaskInputField = document.getElementById('subtask');
    if (subtaskInputField.value.length < 3) {
        let subtaskAlert = document.getElementById('subtaskAlert');
        subtaskAlert.innerHTML = 'Please enter at least 3 characters';
    } else {
        subtasks.push({ 'name': subtaskInputField.value, 'done': false })
        renderSubtasksHTML('subtasks');
        subtaskInputField.value = '';
    };
};


function renderSubtasksHTML(htmlElement) {
    let subtasksElement = document.getElementById(htmlElement);
    subtasksElement.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        subtasksElement.innerHTML += `
      <span  class="subtask"><img onclick="toggleSubtaskSelection(${i})" id="box(${i})" src="${getCheckboxIcon(i)}" alt="">
      <div>${subtasks[i].name}</div></span>
      `
    };
};


function toggleSubtaskSelection(index) {
    let checkBox = document.getElementById(`box(${index})`);
    subtasks[index].done = !subtasks[index].done;
    checkBox.src = getCheckboxIcon(index);
};


function getCheckboxIcon(index) {
    if (!subtasks[index].done) {
        return 'img/icon-check-empty.svg';
    } else {
        return 'img/icon-check-ok.svg';
    }
};