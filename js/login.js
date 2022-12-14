

function logIn() {
    let email = document.getElementById('login-email');
    let password = document.getElementById('login-password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        console.log('user exsists!');
    } else {
        console.log('NO SUCH USER!');
    }
}