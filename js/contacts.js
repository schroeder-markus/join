let allContacts = [];

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
  removeEventlistenerOnSave(contactID);
}

function removeEventlistenerOnSave(contactID) {
  let saveBtn = document.querySelector(".save-btn");
  let saveBtnClicked = false;
  saveBtn.addEventListener("click", () => {
    if (!saveBtnClicked) {
      saveContactChange(contactID);
      saveBtnClicked = true;
    };
    saveBtn.removeEventListener("click", () => {});
  });
  document.querySelector(".add-new-contact").style.display = "none";
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
  closeEditSlide();
  document.querySelector(".add-new-contact").style.display = "unset";
}

function openEditSlide() {
  let editContainer = document.getElementById('edit-container');
  editContainer.classList.remove('closeslide');
}

function closeEditSlide() {
  let editContainer = document.getElementById('edit-container');
  editContainer.classList.add('closeslide');
  document.querySelector(".add-new-contact").style.display = "unset";
}

function cancelContact() {
  document.querySelector(".new-contact").style.display = "none";
}

function createContact() {
  document.querySelector(".create").style.display = "none";
}

function closeNewContact() {
  document.querySelector(".create").style.display = "flex";
}

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
  resetContactValue()
  createContactList();
  closeSlide();
  showMessage('contact-created')
}

function resetContactValue() {
  document.querySelector("#newContactSubmitName").value = "";
  document.querySelector("#newContactSubmitEmail").value = "";
  document.querySelector("#newContactSubmitPhone").value = "";
  document.querySelector("#newContactSubmitColor").value = "";
}

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
  document.querySelector(".contacts-list").innerHTML = ``;
  let initials = new Set();
  for (let i = 0; i < allContacts.length; i++) {
    initials.add(allContacts[i]["name"][0].toUpperCase());
  }
  initials = Array.from(initials).sort();
  for (let initial of initials) {
    document.querySelector(".contacts-list").innerHTML += contactLetterHtml(initial)
    for (let i = 0; i < allContacts.length; i++) {
      if (allContacts[i]["name"][0].toUpperCase() === initial) {
        document.querySelector(".contacts-list").innerHTML += contactlistHtml(i, allContacts)
      }
    }
  }
}

function contactLetterHtml(initial) {
  return `
    <div class="contact-letter">
                <div>
                  <span>${initial}</span>
                </div>
                <div class="divider"></div>
              </div>`;
}

function contactlistHtml(i, allContacts) {
  return `
        <div class="contact-names contact-names-hov" onclick="showContactData(${i}), selectContainer(this)">
        <div class="name-circle" style="background-color: ${allContacts[i]["color"]};">
          <span class="name-circle-letter">${allContacts[i]["name"]
            .split(" ")
            .map((n) => n[0])
            .join("")}</span>
        </div>
        <div class="name-fullname">
          <span class="name-contact-name">${allContacts[i]["name"]}</span>
          <span class="name-contact-mail cut">${allContacts[i]["mail"]}</span>
        </div>
      </div>  
        `;
}

function showContactData(contactID) {
  checkSize()
  document.querySelector(".contact-detail-container").innerHTML = contactDetailHtml(contactID)
}

function contactDetailHtml (contactID) {
  return `
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
    <div class="edit-contact-mobile" onclick="editContact(${contactID}), openEditSlide()">
      <svg class="editbutton" width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="57" height="57" rx="10" fill="#2A3647"></rect>
      <path d="M20.9449 35.5155L25.7643 38.4404L38.4074 17.6083C38.694 17.1362 38.5435 16.5211 38.0714 16.2346L34.9618 14.3474C34.4897 14.0608 33.8746 14.2113 33.5881 14.6834L20.9449 35.5155Z" fill="white"></path>
      <path d="M20.3599 36.4792L25.1792 39.4041L20.4506 41.6889L20.3599 36.4792Z" fill="white"></path>
      </svg>
    </div>
    <div class="edit-contact" onclick="editContact(${contactID}),openEditSlide()">
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
    document.querySelector(".contact-container-right").style.display = "flex";
    document.querySelector("#createButton").style.display = "none";
    document.querySelector(".close-icon").style.display = "flex";
  }
}

function closeDetailView() {
  document.querySelector(".contact-container-left").style.display = "flex";
  document.querySelector(".contact-container-right").style.display = "none";  
  document.querySelector(".close-icon").style.display = "none";
  document.querySelector("#createButton").style.display = "flex";
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