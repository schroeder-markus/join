"use strict"

let contactData = [];

function editContact () {
    document.querySelector(".edit-contact-container").style.display = "flex";
}

function cancelContact () {
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
        "name": document.querySelector("#newContactSubmitName").value,
        "mail": document.querySelector("#newContactSubmitEmail").value,
        "phone": document.querySelector("#newContactSubmitPhone").value,
        "initials" : document.querySelector("#newContactSubmitName").value.split(" ").map((n)=>n[0]).join("")
    }

    contactData.push(newContactData)
    document.querySelector("#newContactSubmitName").value = "";
    document.querySelector("#newContactSubmitEmail").value = "";
    document.querySelector("#newContactSubmitPhone").value = "";
    createContactList()
    closeNewContact();
}


function createContactList() {

    document.querySelector(".contacts-list").innerHTML = ``
    for (let i = 0; i < contactData.length; i++) {
        const contactName = contactData[i].name;
        const contactMail = contactData[i].mail;
        const contactLetter = contactData[i].initials;

        document.querySelector(".contacts-list").innerHTML += `
        <div class="contact-names" onclick="showContactData(${i})">
        <div class="name-circle">
          <span class="name-circle-letter">${contactLetter}</span>
        </div>
        <div class="name-fullname">
          <span class="name-contact-name">${contactName}</span>
          <span class="name-contact-mail">${contactMail}</span>
        </div>
      </div>  
        `
    }
}

function showContactData(contactID) {
    console.log("click")
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
    <div class="edit-contact" onclick="editContact()">
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
    `
}

