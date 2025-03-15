const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxiS0qE5MXlCuCLXKDDjAsVXiCBtzSIx6q5orG420mog7HFkAA6nCd1fW9uK59d3GOCqQ/exec";

function signUp() {
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value;

    if (!username || !password) {
        alert("Please fill out both fields.");
        return;
    }

    fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "signUp", username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            showLogin();
        }
    })
    .catch(error => console.error('Error:', error));
}

function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert("Please fill out both fields.");
        return;
    }

    fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "login", username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('currentUser', username);
            displayChat(username);
        }
    })
    .catch(error => console.error('Error:', error));
}
