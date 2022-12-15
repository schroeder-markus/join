
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

function moveToLogin() {
    document.getElementById('fmp').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
}