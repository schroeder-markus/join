


/**
 * This function reveals the signup-field over the login-field
 */
function signUp() {
    let signUpField = document.getElementById('sign_up_field');
    signUpField.classList.remove('d-none');
}

/**
 * This function hides the signup-field
 */
function backToLogIn() {
    let signUpField = document.getElementById('sign_up_field');
    signUpField.classList.add('d-none');
}

/**
 * This function collects all values from the signup-field and stors them in the backend (allUsers)
 */
function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({name: name.value, email: email.value, password: password.value})
    let allUsersAsString = JSON.stringify(users);
    backend.setItem('allUsers', allUsersAsString);
    backToLogIn();
}