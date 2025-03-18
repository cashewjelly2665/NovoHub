const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx-M2uuAqHKUaui0Kguf-q91e2nMbqsK6vN6IG8S30htPWVeAWrEQbkg6jA6jinrh2jdw/exec";

async function signUp() {
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value;

    if (!username || !password) {
        alert("Please fill out both fields.");
        return;
    }

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: "signUp", username, password }),
            mode: 'no-cors'
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        alert(data.message);
        if (data.success) showLogin();
    } catch (error) {
        console.error('Signup Fetch Error:', error);
        alert("Signup request failed. Check console.");
    }
}

async function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert("Please fill out both fields.");
        return;
    }

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: "login", username, password }),
            mode: 'no-cors'
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        alert(data.message);
        if (data.success) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('currentUser', username);
            displayChat(username);
        }
    } catch (error) {
        console.error('Login Fetch Error:', error);
        alert("Login request failed. Check console.");
    }
}

function showSignUp() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}
