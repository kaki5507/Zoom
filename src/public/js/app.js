const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open",()=>{
    console.log("Ceonnected to Browser")
});

socket.addEventListener("message",(message) => {
    console.log("New message: ", message.data, " from the server");
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❗");
});

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);