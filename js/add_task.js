

function addTask() {

};


function categoryDropdown() {
    let dropdownElement = document.getElementById('categories');
    dropdownElement.innerHTML = "";

    if (dropdownElement.style.display != "block") {
        dropdownElement.style.display = "block";
        dropdownElement.innerHTML = `<div><span onclick="newEntryInput('categoryDropdown','newCategoryInput')">new category</span></div>`;
        for (let i = 0; i < categories.length; i++) {
            dropdownElement.innerHTML += `<div><span onclick="setCategory(${i})">${createCategoryHtml(i)}</span></div>`
        };
    } else {
        dropdownElement.style.display = "none";
    };
};


function setCategory(i) {
    let categoryValue = document.getElementById('categoryValue');
    categoryValue.innerHTML = `${createCategoryHtml(i)}`
};


function createCategoryHtml(i) {
    return `${categories[i]['name']}<span class="colorDot" style="background-color:${categories[i]['color']}">`

};


function assignToDropdown() {
    let dropdownElement = document.getElementById('contactSelection');
    dropdownElement.innerHTML = "";

    if (dropdownElement.style.display != "block") {
        dropdownElement.style.display = "block";
      
        for (let i = 0; i < categories.length; i++) {
            dropdownElement.innerHTML += `<div><span onclick="checkContact(${i})">firstName lastName${(i)}<img id="contactSelector(${i}" src="img/icon-selection-false.svg" alt="contactIconDark"</span></div>`
        };
        dropdownElement.innerHTML += `<div><span onclick="newEntryInput('assignToDropdown','invitePersonInput')">Invite new Contact<img src="img/icon-contacts-dark.svg" alt="contactIconDark"</span></div>`;
    } else {
        dropdownElement.style.display = "none";
    };
};


function openDatePicker() {

};


function commitSubtasks() {

};


function clearInputFields() {

};


function newEntryInput(dropdownID, inputID) {
    let dropdownElement = document.getElementById(dropdownID);
    let inputElement = document.getElementById(inputID);

    dropdownElement.style.display = "none";
    inputElement.style.display = "block";

    renderColorSelection();

};


function renderColorSelection() {
    let colorSelectionElement = document.getElementById('colorSelection');

    colorSelectionElement.innerHTML = '';
    for (let i = 0; i < categoryColors.length; i++) {
        colorSelectionElement.innerHTML += ` 
        <button onclick="setColor(${i})" type="button" id="dot${i}" class="colorDot"
        style="background-color:${categoryColors[i]}"></button>`
    };       

};


function setColor() {
    
};