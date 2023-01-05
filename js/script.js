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
  document.querySelector(".logout-btn").classList.toggle("toggle-logout-btn");
  localStorage.clear();
};


function showMessage(messageID) {
  let noteContainer = document.getElementById(messageID);
  noteContainer.style.display = "flex";
  noteContainer.classList.add('showMessage');
  setTimeout(() => { noteContainer.style.display = "none"; noteContainer.classList.remove('showMessage') }, 3000);
};


async function loadTasks() {
  await downloadFromServer();
  let allTasksAsJson = backend.getItem('allTasks');
  allTasks = JSON.parse(allTasksAsJson) || [];
  lastTaskID = backend.getItem('lastTaskID');
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
  if(document.querySelector(".user-avatar-header") !== null) {
  document.querySelector(".user-avatar-header").style.display = "none";
  document.querySelector(".header-nav-user-container").innerHTML = `
  <div class="name-circle-header">
      <span class="name-circle-header-span">${initials}</span>
    </div>
  `
};
}

function greetUser(currentUserName) {
  if(document.querySelector(".greetname") !== null) {
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
}

function init() {
  loadTasks();
  loadCurrentUser();
};


async function activatePage(iconID) {
    await includeHTML();
    let navEntry = document.getElementById(`icon-${iconID}`);
    navEntry.classList.add('aside-nav-focus');
    init();
};
