function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignUp() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function signUp() {
    const username = document.getElementById('signup-username').value.trim();
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
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('currentUser', username);
        checkChatReset();
        displayChat(username);
    } else {
        alert('Invalid username or password.');
    }
}

function displayChat(username) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('chat-container').style.display = 'block';
    document.getElementById('username-display').textContent = `Logged in as: ${username}`;
    loadMessages();
}

function logOut() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    document.getElementById('chat-container').style.display = 'none';
    showLogin();
}

function sendMessage() {
    const input = document.getElementById("message-input");
    const chatBox = document.getElementById("chat-box");
    const username = localStorage.getItem('currentUser');

    if (!username) {
        alert("You must be logged in to send messages.");
        return;
    }

    if (input.value.trim() !== "") {
        const messageData = {
            username: username,
            message: input.value,
            timestamp: Date.now()
        };

        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(messageData);
        localStorage.setItem('messages', JSON.stringify(messages));

        addMessageToChat(messageData);
        
        chatBox.scrollTop = chatBox.scrollHeight;
        input.value = "";
    }
}

function addMessageToChat(messageData) {
    const chatBox = document.getElementById("chat-box");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const userNameElement = document.createElement("span");
    userNameElement.classList.add("username");
    userNameElement.textContent = messageData.username + ": ";

    const messageElement = document.createElement("span");
    messageElement.classList.add("message");
    messageElement.textContent = messageData.message;

    messageContainer.appendChild(userNameElement);
    messageContainer.appendChild(messageElement);
    chatBox.appendChild(messageContainer);
}

function loadMessages() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    const oneHourAgo = Date.now() - 3600000;
    
    messages = messages.filter(msg => msg.timestamp > oneHourAgo);
    
    messages.forEach(addMessageToChat);
    localStorage.setItem('messages', JSON.stringify(messages));
}

function checkEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function checkChatReset() {
    const lastReset = localStorage.getItem('lastChatReset');
    const now = Date.now();
    
    if (!lastReset || now - lastReset > 3600000) {
        localStorage.removeItem('messages');
        localStorage.setItem('lastChatReset', now);
    }
}

window.onload = () => {
    const username = localStorage.getItem('currentUser');
    if (localStorage.getItem('loggedIn') === 'true' && username) {
        checkChatReset();
        displayChat(username);
    } else {
        showLogin();
    }
};
