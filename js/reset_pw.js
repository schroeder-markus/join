let newPassword;
let mailToFind = getEmailUrlParameter();


/**
 * This function returns the email from queryString parameter
 * 
 * @returns 
 */
function getEmailUrlParameter() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let email = urlParams.get('email');
    return email;
}


/**
 * This function prevents form from reloading the page
 * 
 * @param {*} event 
 */
function onSubmit(event) {
    event.preventDefault();
    checkPassword();
}


/**
 * This function checks if reset password and confirm password match
 */
function checkPassword() {
    let resetPassword = document.getElementById('reset-password');
    let confPassword = document.getElementById('confirm-password');
    let noMatchSpan = document.getElementById('no-match');

    if (resetPassword.value == confPassword.value) {
        console.log('cool pw confirmed');
        noMatchSpan.classList.add('d-none');
        confPassword.classList.remove('confirm-password');
        newPassword = resetPassword.value;
        setPW();
        slideIn();
        resetPassword.value = '';
        confPassword.value = '';
    } else {
        noMatchSpan.classList.remove('d-none');
        confPassword.classList.add('confirm-password');
        confPassword.value = '';
    }

}


/**
 * This function slides in a popup if user resets password successfully
 */
function slideIn() {
    let resetPwContainer = document.getElementById('resetPWContainer');
    let grayBg = document.getElementById('grayBg');
    resetPwContainer.innerHTML += `
    <div class="reset-pw">
        <span>You reset your password</span>
    </div>`;
    grayBg.classList.remove('d-none');
    setTimeout(goToLogin, 1600);
}


/**
 * This function moves the user back to login-page
 */
function goToLogin() {
    window.location.href = "index.html";
}


/**
 * This function sets the new password
 */
async function setPW() {
    let index = users.findIndex(user => user.email === mailToFind);
    users[index].password = newPassword;
    let allUsersAsString = JSON.stringify(users);
    await backend.setItem('allUsers', allUsersAsString);
}