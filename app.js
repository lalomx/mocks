const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

// app.get("/", (req, res) => {
// 	res.sendFile(`${__dirname}/public/js/index.html`);
// });
server.listen(8080, () => {
	console.log("listeing server on  http://localhost:8080 ");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

io.on("connection", (socket) => {
	console.log("new user connected");
	socket.on("mensajes", (msg) => {
		console.log("mensaje" + msg);
	});
});
