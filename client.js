const io = require("socket.io-client");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const socket = io("http://localhost:3000");

console.log("Connecting to api server...");

let name = null;

socket.on("connect", () => {
    name = process.argv[2];
    console.log("Welcome %s", name);
});

socket.on("disconnect", (reason) => {
    console.log("user disconnected");
});

// socket.on('welcome', (msg) => {
//     console.log(msg);
// });

rl.on("line", (input) => {
    socket.emit('send-client-chat-msg', input);
});

socket.on('send-chat-msg', (msg) => {
    console.log(msg);
});