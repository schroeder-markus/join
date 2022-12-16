'use strict'

setURL('https://gruppe-406.developerakademie.net/smallest_backend_ever');


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

// add Task form:

function addTask() {

};

function categoryDropdown() {
    let dropdownElement = document.getElementById('categories');
    dropdownElement.innerHTML = ""; 

  if(dropdownElement.style.display != "block") {
  	 dropdownElement.style.display = "block";
     dropdownElement.innerHTML = `<div><span onclick="setNewCategory()">new category</span></div>`;
  for(let i = 0; i < categories.length; i++) {
  	 dropdownElement.innerHTML += `<div><span onclick="setCategory()">${categories[i]['name']}<span class="colorDot" style="background-color:${categories[i]['color']}"></span></div>`
     };
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

function setNewCategory() {

};

// 