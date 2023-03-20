"use strict";

setURL("https://boubkir-benamar.de/smallest_backend_ever");

let allTasks = [];

let categoryColors = [
  "var(--label-1)",
  "var(--label-2)",
  "var(--label-3)",
  "var(--label-5)",
  "var(--label-6)",
  "var(--label-7)",
];

let categories = [
  {
    name: "sales",
    color: "var(--label-1)",
  },
  {
    name: "backoffice",
    color: "var(--label-2)",
  },
  {
    name: "accounting",
    color: "var(--label-3)",
  },
];


async function activatePage(iconID) {
  await includeHTML();
  let navEntry = document.getElementById(`icon-${iconID}`);
  navEntry.classList.add('aside-nav-focus');
  loadCurrentUser();
  addDocumentClickEvent();
};


function logOutClickAvatar() {
  document.querySelector(".logout-btn").classList.toggle("toggle-logout-btn");
  localStorage.clear();
};


function addDocumentClickEvent() {
  let logoutButtonElement = document.querySelector(".logout-btn");
  document.addEventListener("click", e => {
    if (e.target.className !== "logout-btn" && e.target.className !== "name-circle-header" && e.target.className !== "name-circle-header-span") {
      document.querySelector(".logout-btn").classList.add("toggle-logout-btn");
    }
  })
};


function addOverlayClickEvent(backgroundID, foregroundID) {
  let backgroundOverlay = document.getElementById(backgroundID);
  let foregroundOverlay = document.getElementById(foregroundID);
  stop_propagation(foregroundOverlay);
  backgroundOverlay.addEventListener("click", e => {
    if (backgroundID === 'cardinformation') {
      closeCardInformation();
    } else {
      closeSlide();
    }
  })
};


function stop_propagation(element) {
  element.addEventListener("click", e => {
    e.stopPropagation();
  })
};


function showMessage(messageID) {
  let noteContainer = document.getElementById(messageID);
  noteContainer.style.display = "flex";
  setTimeout(() => { noteContainer.classList.add('showMessage')}, 0)
  setTimeout(() => { noteContainer.style.display = "none"; noteContainer.classList.remove('showMessage') }, 3000);
};


async function loadTasks() {
  await downloadFromServer();
  let allTasksAsJson = backend.getItem('allTasks');
  allTasks = JSON.parse(allTasksAsJson) || [];
  lastTaskID = backend.getItem('lastTaskID') || -1;
};

async function loadCurrentUser() {
  await downloadFromServer();
  const currentUserJson = localStorage.getItem("currentUser");
  const currentUser = await JSON.parse(currentUserJson);
  if (currentUser) {
    let currentUserName = currentUser.name
    generateAvatar(currentUserName)
    greetUser(currentUserName)
  }
};

function generateAvatar(currentUserName) {
  let initials = currentUserName.split(" ").map((n) => n[0]).join("");
  if (currentUserName) {
    document.querySelector(".header-nav-user-container").innerHTML = `
  <div class="name-circle-header">
      <span class="name-circle-header-span">${initials}</span>
    </div>
  `
  };
}

function greetUser(currentUserName) {
  if (document.querySelector(".greetname") !== null) {
    document.querySelector(".greetname").innerHTML = `${currentUserName}`;
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      document.querySelector(".greet-daytime").innerHTML = `Good morning,`;
    } else if (currentTime < 18) {
      document.querySelector(".greet-daytime").innerHTML = `Good afternoon,`;
    } else {
      document.querySelector(".greet-daytime").innerHTML = `Good evening,`;
    }
  };
};

// form validation for add Task 

function createTask() {
  formValidation = true;
  let titleInput = document.getElementById("newTitle");
  let descriptionInput = document.getElementById("newDescription");
  let dueDate = document.getElementById("dueDate");

  checkInput('newTitle', titleInput.value);
  checkInput('newDescription', descriptionInput.value);
  checkCategory();
  checkAssigned();
  checkDueDate(dueDate.value);
  checkPriority();
  generateTaskObject(titleInput.value, descriptionInput.value, dueDate.value);
};


function checkInput(inputName, inputValue) {
  let alert = document.getElementById(`${inputName}Alert`);

  if (inputValue.length == 0) {
    formValidation = false;
    alert.innerHTML = "This field is required";
  }
};


function checkCategory() {
  let alert = document.getElementById(`categoryAlert`);

  if (category.length == 0) {
    formValidation = false;
    alert.innerHTML = "This field is required";
  };
};


function checkAssigned() {
  let alert = document.getElementById(`assignAlert`);

  if (assignedPersons.length == 0) {
    formValidation = false;
    alert.innerHTML = "You need to assign contacts";
  };
};


function checkDueDate(dueDateValue) {
  let alert = document.getElementById("dateAlert");
  alert.innerHTML = '';
  let today = new Date().setHours(0, 0, 0, 0);
  let dueDate = new Date(`${dueDateValue}`).setHours(0, 0, 0, 0);

  if (dueDateValue.length == 0 || dueDate < today) {
    formValidation = false;
    alert.innerHTML = "Invalid date. Select today or a future date.";
  };
};


function checkPriority() {
  let alert = document.getElementById(`priorityAlert`);

  if (priority.length == 0) {
    formValidation = false;
    alert.innerHTML = "You need to choose a priority";
  };
};


function deleteAlert(alertID) {
  document.getElementById(`${alertID}`).innerHTML = '';
};


function generateTaskObject(title, description, dueDate) {
  if (formValidation) {
    lastTaskID++;
    allTasks.push({
      'taskID': lastTaskID,
      'title': title,
      'description': description,
      'category': category,
      'assigned': assignedPersons,
      'Due Date': dueDate,
      'priority': priority,
      'subtasks': subtasks,
      'status': 'todo'
    });
    clearForm();
    showMessage('taskAdded');
    saveTasks();
    finishTask();
  };
};

function finishTask() {
  if (window.location.href.indexOf('board.html') > -1) {
    closeSlide();
  } else {
    setTimeout(() => { window.location.href = "board.html" }, 4000);
  };
};


async function saveTasks() {
  let allTasksAsString = JSON.stringify(allTasks);
  await backend.setItem('allTasks', allTasksAsString);
  await backend.setItem('lastTaskID', lastTaskID)
};


function clearForm() {
  clearInputFields();
  clearDescriptionField();
  clearCategoryDropdown();
  clearAssignDropdown();
  clearSubtasks();
  resetActivePrio();
  clearAllAlerts();
  setCurrentDate('dueDate');
};


function clearInputFields() {
  let inputFields = document.getElementsByTagName("input");
  for (let i = 0; i < inputFields.length; i++) {
    inputFields[i].value = "";
  }
};


function clearDescriptionField() {
  let descriptionInput = document.getElementById("newDescription");
  descriptionInput.value = "";
};


function clearCategoryDropdown() {
  let categoryInput = document.getElementById("categoryInput");
  categoryInput.innerHTML = `Select Task Category`;
  category = "";
  cancelNewCategory();
};


function clearAssignDropdown() {
  let nameCircles = document.getElementById('nameCircles');
  let assignChecks = document.getElementsByClassName('assignChecked');
  assignedPersons = [];
  nameCircles.innerHTML = '';
  for (let i = 0; i < assignChecks.length; i++) {
    assignChecks[i].style.display = "none";
  };
};

function clearSubtasks() {
  let subtasksElement = document.getElementById('subtasks');
  subtasksElement.innerHTML = '';
  subtasks = [];
};

function clearAllAlerts() {
  let alertElements = document.getElementsByClassName('requiredAlert');
  for (let i = 0; i < alertElements.length; i++) {
    alertElements[i].innerHTML = '';
  };
};

function hideUserYouOnGuest() {
  if (document.querySelector(".name-circle-header-span").textContent === "GU") {
    document.querySelector(".user-you").style.display = "none"
  }
}