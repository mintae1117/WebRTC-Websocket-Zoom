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

wss.on("connection", (socket) => {
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
    socket.on("message", (message) => {
        console.log(message.toString('utf8'))
    })
    socket.send("hello!!!");
});


server.listen(3000, handleListen);
