import express from "express";
import path from 'path';
import http from "http";
import { WebSocketServer } from "ws";// install Node.js WebSocket library => npm i ws

const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);// make http server
const wss = new WebSocketServer({server});// make websocket server on top of http server.

function onSocketClose() {
    console.log("Disconnected from the Browser ❌");
}

const sockets = [];
  

wss.on("connection", (socket) => {
    sockets.push(socket);

    console.log("Connected to Browser ✅");// Connection check.
    socket.on("close", onSocketClose);// Disconnect check.
    socket.on("message", (message) => {
        sockets.forEach((aSocket) => aSocket.send(message.toString()));
    });
});


server.listen(3000, handleListen);
