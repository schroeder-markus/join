let users = [];

/**
 * This function loads allUsers from backend and parses them to users
 */
async function usersFromServer() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('allUsers')) || [];
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
function addUser() {
    let name = document.getElementById('submit-name');
    let email = document.getElementById('submit-email');
    let password = document.getElementById('submit-password');
    users.push({name: name.value, email: email.value, password: password.value})
    let allUsersAsString = JSON.stringify(users);
    backend.setItem('allUsers', allUsersAsString);
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
        window.location.href = "summary.html";
    } else {
        document.getElementById('alarm').classList.remove('d-none');
    }
}