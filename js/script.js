"use strict";

setURL("https://gruppe-406.developerakademie.net/smallest_backend_ever");

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

function logOutClickAvatar() {
  document.querySelector(".logout-btn").classList.toggle("toggle-logout-btn")
};


function showMessage(messageID) {
  let noteContainer = document.getElementById(messageID);
  noteContainer.classList.add('showMessage');
  setTimeout(() => {noteContainer.classList.remove('showMessage')}, 3000);
};


async function loadTasks() {
  await downloadFromServer();
  let allTasksAsJson = backend.getItem('allTasks');
  allTasks = JSON.parse(allTasksAsJson) || [];
  lastTaskID = backend.getItem('lastTaskID');
};

async function loadCurrentUser(){
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); //Holt sich das JSON mit dem aktuelleun user
  if (currentUser) {
    let currentUserName = currentUser.name
    console.log(currentUserName)
    generateAvatar(currentUserName)
  }
}

function generateAvatar(currentUserName) {
  let initials = currentUserName.split(" ").map((n) => n[0]).join("");
  console.log(initials)
  document.querySelector(".user-avatar-header").style.display = "none";
  document.querySelector(".header-nav-user-container").innerHTML = `
  <div class="name-circle-header">
      <span class="name-circle-header-span">${initials}</span>
    </div>
  `
}

function init(){
  loadTasks();
  updateTasks();
};


