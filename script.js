function sendMessage() {
    let input = document.getElementById("message-input");
    let chatBox = document.getElementById("chat-box");

    if (input.value.trim() !== "") {
        let message = document.createElement("div");
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
