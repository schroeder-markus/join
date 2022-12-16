'use strict'

setURL('https://gruppe-406.developerakademie.net/smallest_backend_ever');

let categoryColors = [
  'var(--label-1)',
  'var(--label-2)',
  'var(--label-3)',
  'var(--label-4)',
  'var(--label-5)',
  'var(--label-6)',
];

let categories = [
  {
    'name': 'sales',
    'color': 'var(--label-1)',
  },
  {
    'name': 'backoffice',
    'color': 'var(--label-2)',
  },
  {
    'name': 'accounting',
    'color': 'var(--label-3)',
  },
];

// add Task:

function addTask() {
  
};


function categoryDropdown() {
    let dropdownElement = document.getElementById('categories');
    dropdownElement.innerHTML = ""; 

  if(dropdownElement.style.display != "block") {
  	 dropdownElement.style.display = "block";
     dropdownElement.innerHTML = `<div><span onclick="newEntryInput('categoryDropdown','newCategoryInput')">new category</span></div>`;
  for(let i = 0; i < categories.length; i++) {
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

