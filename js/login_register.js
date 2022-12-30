let users = [];
checkYoN = false;


/**
 * This function loads allUsersAsString from backend and parses them to users
 */
async function usersFromServer() {
    await downloadFromServer();
    let allUsersAsString = backend.getItem('allUsers') || [];
    users = JSON.parse(allUsersAsString);
    console.log('loaded all users', users)
}

/**
* This function hides the signup-container
*/
function backToLogIn() {
    document.getElementById('submit').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
}


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
}

/**
 * This function reveals the forgot-password-container over the login-container
 */
function moveToFmP() {
    document.getElementById('login').classList.add('d-none');
    document.getElementById('fmp').classList.remove('d-none');

}

/**
 * This function reveals the login-container
 */
function moveToLogin() {
    document.getElementById('fmp').classList.add('d-none');
    document.getElementById('login').classList.remove('d-none');
}

/**
 * This function collects all values from the signup-field and stors them in the backend (allUsers)
 */
async function addUser() {
    let name = document.getElementById('submit-name');
    let email = document.getElementById('submit-email');
    let password = document.getElementById('submit-password');
    let user = {
        'name': name.value,
        'email': email.value,
        'password': password.value
    };
    users.push(user);
    let allUsersAsString = JSON.stringify(users);
    await backend.setItem('allUsers', allUsersAsString);
    document.getElementById('submit-success').classList.remove('d-none');
    backToLogIn();
}

function enterSummary() {
    window.location.href = "summary.html";
}

function logIn() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');

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
        document.getElementById('alarm').classList.remove('d-none');
    }
}

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


function slideInIndex() {
    let formWrapper = document.getElementById('formWrapper');
    let grayBgIndex = document.getElementById('grayBgIndex');
    formWrapper.innerHTML += `
        <div id="send-email" class="send-email">
            <img src="img/send_check.svg" alt="send">
            <span>An E-Mail has been sent to you</span>
        </div>`;
    grayBgIndex.classList.remove('d-none');
    //setTimeout(grayBgIndex.classList.add('d-none'), 1600);
}

function goToResetPw() {
    window.location.href = "reset-password.html";
}

