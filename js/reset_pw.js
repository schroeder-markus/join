
let email = '';



function onPageLoad() {
    email = getEmailUrlParameter();
    users = getUsers();
}

function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}

function getUsers() {
    return JSON.parse(backend.getItem('users')) || [];
}

function onSubmit(event) {
    event.preventDefault();
}