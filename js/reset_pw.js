let newPassword;
let mailToFind = getEmailUrlParameter();

function getEmailUrlParameter() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let email = urlParams.get('email');
    return email;
}


function onSubmit(event) {
    event.preventDefault();
    checkPassword();
}


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


function goToLogin() {
    window.location.href = "index.html";
}


function checkIfEmailExists() {
    let emailsInBackend = backend;
    console.log(emailsInBackend);
}

async function setPW() {
    let index = users.findIndex(user => user.email === mailToFind);
    users[index].password = newPassword;
    let allUsersAsString = JSON.stringify(users);
    await backend.setItem('allUsers', allUsersAsString);
}