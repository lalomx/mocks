const express = require("express");
const app = express();
const mongoose = require("mongoose");

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);
const mensajeModel = require("./models/mensaje");
const mensaje = require("./models/mensaje");
const prodRouter = require("./router/prodrouter");

mongoose
	.connect(
		"mongodb+srv://manuelaBordaDiaz:Hyugagomez8@cluster0.gms6i.mongodb.net/chat?retryWrites=true&w=majority"
	)
	.then(() => {
		app.get("api/productos-test", prodRouter);
		app.get("/", (req, res) => {
			res.sendFile(`${__dirname}/public/js/index.html`);
		});
		server.listen(8080, () => {
			console.log("listeing server on  http://localhost:8080 ");
		});

		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(express.static("public"));

		io.on("connection", async (socket) => {
			console.log("new user connected");
			socket.on("mensajes", async (msg) => {
				msg.fyh = new Date().toLocaleString();
				await mensajeModel.saveMessage();
				socket.broadcast.emit("mensaje", msg);
			});
		});
	})
	.catch((err) => {
		console.log(err);
	});
