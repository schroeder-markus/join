let contactData = [
  {
    name: "Daniela Faber",
    mail: "DanielaFaber@einrot.com",
    phone: 0911719268,
    initials: "DF",
  },
  {
    name: "Sabrina Trommler",
    mail: "SabrinaTrommler@cuvox.de",
    phone: 08841281030,
    initials: "ST",
  },
  {
    name: "Sandra Reiter",
    mail: "SabrinaTrommler@cuvox.de",
    phone: 08841281030,
    initials: "SR",
  },
  {
    name: "Mario Moeller",
    mail: "MarioMoeller@cuvox.de",
    phone: 06541620484,
    initials: "MM",
  },
];



function editContact(contactID) {
  document.querySelector(".edit-contact-container").style.display = "flex";
  document.querySelector("#submit-name").value = contactData[contactID].name;
  document.querySelector("#submit-email").value = contactData[contactID].mail;
  document.querySelector("#submit-phone").value = contactData[contactID].phone;
  document.querySelector(
    "#name-circle-letter-edit"
  ).innerHTML = `${contactData[contactID].initials}`;
  let saveBtn = document.querySelector(".save-btn");
  let saveBtnClicked = false;
  saveBtn.addEventListener("click", () => {
    if (!saveBtnClicked) {
      saveContactChange(contactID);
      saveBtnClicked = true;
    }
    saveBtn.removeEventListener("click", () => {});
  });
}

function saveContactChange(contactID) {
  contactData[contactID].name = document.querySelector("#submit-name").value;
  contactData[contactID].mail = document.querySelector("#submit-email").value;
  contactData[contactID].phone = document.querySelector("#submit-phone").value;
  contactData[contactID].initials = document
    .querySelector("#submit-name")
    .value.split(" ")
    .map((n) => n[0])
    .join("");
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
    initials: document
      .querySelector("#newContactSubmitName")
      .value.split(" ")
      .map((n) => n[0])
      .join(""),
  };

  contactData.push(newContactData);
  document.querySelector("#newContactSubmitName").value = "";
  document.querySelector("#newContactSubmitEmail").value = "";
  document.querySelector("#newContactSubmitPhone").value = "";
  createContactList();
  closeNewContact();
}

function createContactList() {
  document.querySelector(".contacts-list").innerHTML = ``;
  let initials = new Set();

  // Erstelle ein Set von Initialen aus den Namen der Kontakte
  for (let i = 0; i < contactData.length; i++) {
    initials.add(contactData[i]["name"][0].toUpperCase());
  }

  // Wandle das Set in ein Array um und sortiere es
  initials = Array.from(initials).sort();

  // Erstelle eine Liste der Kontakte nach Initialen sortiert
  for (let initial of initials) {
    console.log(initial);
    document.querySelector(".contacts-list").innerHTML += `
    <div class="contact-letter">
                <div>
                  <span>${initial}</span>
                </div>
                <div class="divider"></div>
              </div>`;
    for (let i = 0; i < contactData.length; i++) {
      if (contactData[i]["name"][0].toUpperCase() === initial) {
        console.log("- " + contactData[i]["name"]);
        document.querySelector(".contacts-list").innerHTML += `
        <div class="contact-names" onclick="showContactData(${i}), selectContainer(this)">
        <div class="name-circle">
          <span class="name-circle-letter">${contactData[i]["name"]
            .split(" ")
            .map((n) => n[0])
            .join("")}</span>
        </div>
        <div class="name-fullname">
          <span class="name-contact-name">${contactData[i]["name"]}</span>
          <span class="name-contact-mail">${contactData[i]["mail"]}</span>
        </div>
      </div>  
        `;
      }
    }
  }
}

function showContactData(contactID) {
  document.querySelector(".contact-detail-container").innerHTML = `
    <div class="contact-detail-name">
    <div class="name-circle-large">
      <span class="name-circle-letter-large">${contactData[contactID].initials}</span>
    </div>
    <div class="contact-detail-fullname">
      <span class="contact-detail-contactname">${contactData[contactID].name}</span>
      <span class="contact-detail-addtask"><img src="img/icon-plus-addtask.svg" alt=""><span>Add Task </span>
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
    <span class="contact-detail-data-mail">${contactData[contactID].mail}</span>
  </div>
  <div class="contact-details">
    <span class="contact-bold">Phone</span>
    <span class="contact-detail-data-phone">${contactData[contactID].phone}</span>
  </div>
</div>
    `;
}


let selectedContainer = null;

  function selectContainer(container) {
    if (selectedContainer) {
      selectedContainer.classList.remove('selected');
    }

    selectedContainer = container;
    selectedContainer.classList.add('selected');
    selectedContainer.style.pointerEvents = 'auto';
  }