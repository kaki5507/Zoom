import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine","pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

console.log("hello");

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server =  http.createServer(app);
const wss = new WebSocket.Server({server});

function handleConnection(socket){
    console.log(socket);
}

const sockets = [];

function onSocketClose() {
    console.log("Disconnected from the Browser ❌");
}

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket.on("close", onSocketClose);
    socket.on("message", (message) => {
        const messageString = message.toString('utf8');
        sockets.forEach((aSocket) => aSocket.send(messageString));
    });
});

server.listen(3000, handleListen);