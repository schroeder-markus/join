let email = '';


function onResetPageLoad() {
    email = getEmailUrlParameter();
}


function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
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
        resetPassword.value = '';
        confPassword.value = '';
    } else {
        noMatchSpan.classList.remove('d-none');
        confPassword.classList.add('confirm-password');
        confPassword.value = '';
    }

}