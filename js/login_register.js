

/**
 * This function hides the signup-container
 */
function backToLogIn() {
    document.getElementById('submit').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
}

/**
 * This function reveals the signup-container over the login-container
 */
function signUp() {
    document.getElementById('submit').classList.remove('d-none');
    document.getElementById('login').classList.add('d-none');
}

/**
 * This function reveals the forgot-password-container over the login-container
 */
function moveToFmP() {
    document.getElementById('login').classList.add('d-none');
    document.getElementById('fmp').classList.remove('d-none');

}

/**
 * This function reveals the forgot-password-container over the login-container
 */
function moveToLogin() {
    document.getElementById('fmp').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
}

/**
 * This function collects all values from the signup-field and stors them in the backend (allUsers)
 */
function addUser() {
    let name = document.getElementById('submit-name');
    let email = document.getElementById('submit-email');
    let password = document.getElementById('submit-password');
    users.push({name: name.value, email: email.value, password: password.value})
    /*let allUsersAsString = JSON.stringify(users);
    backend.setItem('allUsers', allUsersAsString);*/
    backToLogIn();
  }