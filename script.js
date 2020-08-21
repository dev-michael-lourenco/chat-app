const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const name = prompt("Qual o seu nome");

appendMessage("Voce entrou");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}:${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} entrou na sala`);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} saiu da sala`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`Vocẽ:${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
