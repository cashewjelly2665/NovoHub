function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignUp() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Account created successfully! Please log in.');
        showLogin();
    } else {
        alert('Please fill out both fields.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('loggedIn', true);
        displayChat(username);
    } else {
        alert('Invalid username or password.');
    }
}

function displayChat(username) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    document.getElementById('username-display').textContent = `Username: ${username}`;
}

function logOut() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    document.getElementById('chat-container').style.display = 'none';
    showLogin();
}

function sendMessage() {
    const input = document.getElementById("message-input");
    const chatBox = document.getElementById("chat-box");

    if (input.value.trim() !== "") {
        const message = document.createElement("div");
        message.textContent = input.value;
        message.style.padding = "5px";
        message.style.margin = "5px 0";
        message.style.borderRadius = "5px";
        message.style.background = "#C8A2C8";
        message.style.color = "white";
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight;
        input.value = "";
    }
}

function checkEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

window.onload = () => {
    if (localStorage.getItem('loggedIn') === 'true') {
        const username = localStorage.getItem('username');
        displayChat(username);
    } else {
        showLogin();
    }
};
