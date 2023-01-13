let users = [{ name: 'Test User', email: 'test@gmail.com', password: 'test' }];
checkYoN = false;


/**
 * This function loads allUsersAsString from backend and parses them to users
 */
async function usersFromServer(name) {
    await downloadFromServer();
    let allUsersAsString = backend.getItem('allUsers') || [];
    users = JSON.parse(allUsersAsString);
    //console.log('loaded all users', users)
}

/**
* This function hides the signup-container
*/
function backToLogIn() {
    document.getElementById('submit').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
    document.getElementById('fmp').classList.add('d-none');
    document.getElementById('signUpBox').classList.remove('d-none');
    document.getElementById('signUpBoxMobile').classList.add('sign-up-box-mobile');
    document.getElementById('signUpBoxMobile').classList.remove('d-none');
    document.getElementById('alarm').classList.add('d-none');
    document.getElementById('login-password').placeholder = 'Password';
}

/**
 * This function hides the submit-success-popup
 */
function hideSuccesSubmit() {
    document.getElementById('submit-success').classList.add('d-none');
}

/**
 * This function reveals the signup-container over the login-container
 */
function signUp() {
    document.getElementById('submit').classList.remove('d-none');
    document.getElementById('login').classList.add('d-none');
    document.getElementById('fmp').classList.add('d-none');
    document.getElementById('signUpBox').classList.add('d-none');
    document.getElementById('signUpBoxMobile').classList.remove('sign-up-box-mobile');
    document.getElementById('signUpBoxMobile').classList.add('d-none');
    document.getElementById('alarm').classList.add('d-none');
    document.getElementById('login-password').placeholder = 'Password';
}

/**
 * This function reveals the forgot-password-container over the login-container
 */
function moveToFmP() {
    document.getElementById('login').classList.add('d-none');
    document.getElementById('fmp').classList.remove('d-none');
    document.getElementById('submit').classList.add('d-none');
    document.getElementById('signUpBox').classList.add('d-none');
    document.getElementById('signUpBoxMobile').classList.remove('sign-up-box-mobile');
    document.getElementById('signUpBoxMobile').classList.add('d-none');
    document.getElementById('alarm').classList.add('d-none');
    document.getElementById('login-password').placeholder = 'Password';
}

/**
 * This function reveals the login-container
 */
function moveToLogin() {
    document.getElementById('fmp').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
    document.getElementById('submit').classList.add('d-none');
    document.getElementById('signUpBox').classList.remove('d-none');
    document.getElementById('signUpBoxMobile').classList.add('sign-up-box-mobile');
    document.getElementById('signUpBoxMobile').classList.remove('d-none');
    document.getElementById('login-password').placeholder = 'Password';
}


/**
 * This function moves the user from Reset-Password to index.html
 */
function moveToFmPfromReset() {
    window.location.href = "index.html";
}


/**
 * This function collects all values from the signup-field and stors them in the backend (allUsers)
 */
async function addUser() {
    let name = document.getElementById('submit-name');
    let email = document.getElementById('submit-email');
    let password = document.getElementById('submit-password');
    let user = {
        'name': name.value, 'email': email.value, 'password': password.value
    };
    users.push(user);
    let allUsersAsString = JSON.stringify(users);
    await backend.setItem('allUsers', allUsersAsString);
    document.getElementById('submit-success').classList.remove('d-none');
    backToLogIn();
}


/**
 * This function logs in a guest
 */
function enterSummary() {
    window.location.href = "summary.html";
}


/**
 * This function checks if User is submitted, checks if User wants to remember PW and Email, alarms if PW is wrong and sets an aktual User
 */
function logIn() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    let wrongPasswordAlarm = document.getElementById('alarm');
    let user = users.find(u => u.email == email.value && u.password == password.value);

    if (user) {
        if (document.getElementById('remember').checked == true) {
            localStorage.setItem('email', email.value);
            localStorage.setItem('password', password.value);
            checkYoN = true;
        } else {
            checkYoN = false;
            localStorage.removeItem("email");
            localStorage.removeItem("password");
        }
        window.location.href = "summary.html";
    } else {
        password.value = '';
        password.placeholder = 'Ups! Try again';
        wrongPasswordAlarm.classList.remove('d-none');
    }
    getActualUser();
}


/**
 * This function defines the actual User via emailvalue and safes the info in local storage
 */
function getActualUser() {
    let email = document.getElementById('login-email');
    let actualUser = email.value;
    let index = users.findIndex(user => user.email === actualUser);
    let user = users[index];
    let currentUserAsString = JSON.stringify(user);
    localStorage.setItem('currentUser', currentUserAsString);
}


/**
 * This function finds out if checkbox input remains checked or unchecked
 */
function onPageLoad() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    if (localStorage.email !== undefined && localStorage.password !== undefined) {
        checkYoN = true;
        email.value = localStorage.email;
        password.value = localStorage.password;
    } else {
        checkYoN = false;
    }
    document.getElementById('remember').checked = checkYoN;
}


/**
 * This function sends an email from browser
 * 
 * @param {string} event 
 */
async function sendEmail(event) {
    event.preventDefault(); // prevent default form action
    let formData = new FormData(event.target) //Create a formdata based on our form element in html
    let response = await action(formData);
    if (response.ok)
        slideInIndex();
    else
        alert('No Email sent');

}



function action(formData) {
    const input = 'https://gruppe-406.developerakademie.net/join/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };

    return fetch(
        input,
        requestInit
    );
}


/**
 * This function slides in a popup, if the user has successfull sent an email
 */
function slideInIndex() {
    let formWrapper = document.getElementById('formWrapper');
    let grayBgIndex = document.getElementById('grayBgIndex');
    formWrapper.innerHTML += `
        <div id="send-email" class="send-email">
            <img src="img/send_check.svg" alt="send">
            <span>An E-Mail has been sent to you</span>
        </div>`;
    grayBgIndex.classList.remove('d-none');
}



