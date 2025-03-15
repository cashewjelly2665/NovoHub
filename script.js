const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxiS0qE5MXlCuCLXKDDjAsVXiCBtzSIx6q5orG420mog7HFkAA6nCd1fW9uK59d3GOCqQ/exec";

function sendMessage() {
    const input = document.getElementById("message-input");
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

        fetch(SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: "sendMessage", data: messageData })
        })
        .then(response => response.json())
        .then(() => {
            loadMessages();
        })
        .catch(error => console.error('Error sending message:', error));

        input.value = "";
    }
}

function loadMessages() {
    fetch(SCRIPT_URL + "?action=getMessages")
        .then(response => response.json())
        .then(data => {
            const chatBox = document.getElementById("chat-box");
            chatBox.innerHTML = "";
            const oneHourAgo = Date.now() - 3600000;
            const filteredMessages = data.filter(msg => msg.timestamp > oneHourAgo);
            filteredMessages.forEach(addMessageToChat);
        })
        .catch(error => console.error('Error loading messages:', error));
}

setInterval(loadMessages, 2000);

window.onload = () => {
    const username = localStorage.getItem('currentUser');
    if (localStorage.getItem('loggedIn') === 'true' && username) {
        loadMessages();
    }
};
