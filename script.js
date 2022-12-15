'use strict'

setURL('https://gruppe-406.developerakademie.net/smallest_backend_ever');

let categories = [
    {
    'name': 'sales',
    'color': '#D95030',
    },
    {
    'name': 'backoffice',
    'color': '#497E76',
    },
    {
    'name': 'accounting',
    'color': '#FFFF00',
    },
];

// add Task form:

function addTask() {

};

function categoryDropdown() {
    let dropdownElement = document.getElementById('categories');
  
  if(dropdownElement.style.display == "none") {
  	 dropdownElement.style.display = "block";
     dropdownElement.innerHTML = `<div><span onclick="setNewCategory()">new category</span></div>`;
  for(let i = 0; i < categories.length; i++) {
  	 dropdownElement.innerHTML += `<div><span onclick="setCategory()">${categories[i]['name']}</span></div>`;
  }
  
  } else {
  	 dropdownElement.style.display = "none";
  }
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