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
        "phone": document.querySelector("#newContactSubmitPhone").value
    }

    contactData.push(newContactData)
    document.querySelector("#newContactSubmitName").value = "";
    document.querySelector("#newContactSubmitEmail").value = "";
    document.querySelector("#newContactSubmitPhone").value = "";
    closeNewContact();
}


