let allContacts = [

];

function editContact(contactID) {
  document.querySelector(".edit-contact-container").style.display = "flex";
  document.querySelector("#submit-name").value = allContacts[contactID].name;
  document.querySelector("#submit-email").value = allContacts[contactID].mail;
  document.querySelector("#submit-phone").value = allContacts[contactID].phone;
  document.querySelector("#submit-color").value = allContacts[contactID].color;
  document.querySelector(
    "#name-circle-letter-edit"
  ).innerHTML = `${allContacts[contactID].initials}`;
  document.querySelector(".name-circle-large-edit").style.backgroundColor = `${allContacts[contactID].color}`;
  let saveBtn = document.querySelector(".save-btn");
  let saveBtnClicked = false;
  saveBtn.addEventListener("click", () => {
    if (!saveBtnClicked) {
      saveContactChange(contactID);
      saveBtnClicked = true;
    };
    saveBtn.removeEventListener("click", () => {});
  });
}

function saveContactChange(contactID) {
  allContacts[contactID].name = document.querySelector("#submit-name").value;
  allContacts[contactID].mail = document.querySelector("#submit-email").value;
  allContacts[contactID].phone = document.querySelector("#submit-phone").value;
  allContacts[contactID].color = document.querySelector("#submit-color").value;
  allContacts[contactID].initials = document
    .querySelector("#submit-name")
    .value.split(" ")
    .map((n) => n[0])
    .join("");
  saveAllContacts()  
  createContactList();
  showContactData(contactID);
  closeEditContact();
}

function cancelContact() {
  document.querySelector(".new-contact-container").style.display = "none";
}

function createContact() {
  document.querySelector(".new-contact-container").style.display = "flex";
}

function closeEditContact() {
  document.querySelector(".edit-contact-container").style.display = "none";
}

function closeNewContact() {
  document.querySelector(".new-contact-container").style.display = "none";
}

// Add Contacts

function addNewContact() {
  let newContactData = {
    name: document.querySelector("#newContactSubmitName").value,
    mail: document.querySelector("#newContactSubmitEmail").value,
    phone: document.querySelector("#newContactSubmitPhone").value,
    color: document.querySelector("#newContactSubmitColor").value,
    initials: document
      .querySelector("#newContactSubmitName")
      .value.split(" ")
      .map((n) => n[0])
      .join(""),
  };

  allContacts.push(newContactData);
  saveAllContacts()
  document.querySelector("#newContactSubmitName").value = "";
  document.querySelector("#newContactSubmitEmail").value = "";
  document.querySelector("#newContactSubmitPhone").value = "";
  document.querySelector("#newContactSubmitColor").value = "";
  createContactList();
  closeNewContact();
  showMessage('contact-created')

}

// function saveAllContacts() {
//     let allContactsAsString = JSON.stringify(allContacts) //JSON for all Contacts
//     localStorage.setItem("allContacts", allContactsAsString)
// }

// function loadAllContacts() {
//   let allContactsAsString = localStorage.getItem("allContacts");
//   allContacts = JSON.parse(allContactsAsString);
//   console.log(allContactsAsString)
// }

async function saveAllContacts() {
  let allContactsAsString = JSON.stringify(allContacts);
  await backend.setItem('allContacts', allContactsAsString);
};

async function loadAllContacts() {
    await downloadFromServer();
    let allContactsAsJson = backend.getItem('allContacts');
    allContacts = JSON.parse(allContactsAsJson) || [];
    createContactList();
};

function createContactList() {
  // loadAllContacts()
  document.querySelector(".contacts-list").innerHTML = ``;
  let initials = new Set();

  // Erstelle ein Set von Initialen aus den Namen der Kontakte
  for (let i = 0; i < allContacts.length; i++) {
    initials.add(allContacts[i]["name"][0].toUpperCase());
  }

  // Wandle das Set in ein Array um und sortiere es
  initials = Array.from(initials).sort();

  // Erstelle eine Liste der Kontakte nach Initialen sortiert
  for (let initial of initials) {
    document.querySelector(".contacts-list").innerHTML += `
    <div class="contact-letter">
                <div>
                  <span>${initial}</span>
                </div>
                <div class="divider"></div>
              </div>`;
    for (let i = 0; i < allContacts.length; i++) {
      if (allContacts[i]["name"][0].toUpperCase() === initial) {
        document.querySelector(".contacts-list").innerHTML += `
        <div class="contact-names contact-names-hov" onclick="showContactData(${i}), selectContainer(this)">
        <div class="name-circle" style="background-color: ${allContacts[i]["color"]};">
          <span class="name-circle-letter">${allContacts[i]["name"]
            .split(" ")
            .map((n) => n[0])
            .join("")}</span>
        </div>
        <div class="name-fullname">
          <span class="name-contact-name">${allContacts[i]["name"]}</span>
          <span class="name-contact-mail">${allContacts[i]["mail"]}</span>
        </div>
      </div>  
        `;
      }
    }
  }
}

function showContactData(contactID) {
  checkSize()
  document.querySelector(".contact-detail-container").innerHTML = `
    <div class="contact-detail-name">
    <div class="name-circle-large" style="background-color: ${allContacts[contactID]["color"]};">
      <span class="name-circle-letter-large">${allContacts[contactID].initials}</span>
    </div>
    <div class="contact-detail-fullname">
      <span class="contact-detail-contactname">${allContacts[contactID].name}</span>
      <span class="contact-detail-addtask" onclick="window.location.href='./addTask.html'"><img src="img/icon-plus-addtask.svg" alt=""><span>Add Task </span>
  </div>
</div>
<div class="contact-detail-data">
  <div class="contact-information">
    <span>Contact Information</span>
    <div class="edit-contact" onclick="editContact(${contactID})">
      <img src="img/pencil-no-bg.svg" alt="">
      <span>Edit Contact</span>
    </div>
  </div>
  <div class="contact-details">
    <span class="contact-bold">E-Mail</span>
    <span class="contact-detail-data-mail">${allContacts[contactID].mail}</span>
  </div>
  <div class="contact-details">
    <span class="contact-bold">Phone</span>
    <span class="contact-detail-data-phone">${allContacts[contactID].phone}</span>
  </div>
</div>
    `;
}

function checkSize() {
  if (window.innerWidth < 600) {
    document.querySelector(".contact-container-left").style.display = "none";
    document.querySelector("#createButton").style.display = "none";
  }
}

let selectedContainer = null;

  function selectContainer(container) {
    if (selectedContainer) {
      selectedContainer.classList.remove('selected');
      selectedContainer.classList.add("contact-names-hov")
    }

    container.classList.remove('contact-names-hov')
    selectedContainer = container;
    selectedContainer.classList.add('selected');
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth < 600) {
      document.querySelector(".contact-container-right").style.display = "none";
    }
  });