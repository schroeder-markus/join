"use strict"

function editContact () {
    document.querySelector(".edit-contact-container").style.display = "flex";
}

function cancelContact () {
    document.querySelector(".edit-contact-container").style.display = "none";
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