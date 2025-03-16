const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbymVmMPr576EbNDosLvE25uY9FKjHBDXbT-Pu-wFaPIYEZN0UofQCS_dTiW11TxFq3UFA/exec";

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
            mode: 'cors'
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        alert(data.message);
        if (data.success) showLogin();
    } catch (error) {
        console.error('Fetch Error:', error);
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
            mode: 'cors'
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
        console.error('Fetch Error:', error);
        alert("Login request failed. Check console.");
    }
}
