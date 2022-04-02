const socket = io();
const firstname = document.getElementById("name");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const alias = document.getElementById("alias");
const avatar = document.getElementById("avatar");
const age = document.getElementById("age");
const text = document.getElementById("text");
const messageForm = document.getElementById("messageForm");

messageForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const msg = {
		user: user.uuid.v4(),
		name: firstname.value,
		lastName: lastName.value,
		email: email.value,
		alias: alias.value,
		avatar: avatar.value,
		age: age.value,
		text: text.value,
	};

	socket.emit("nuevoMensaje", msg);

	messageForm.reset();

	message.focus();
});

socket.on("mensajes", (msg) => {
	const html = listaMensajes(msg);

	document.getElementById("mensajes").innerHTML = html;
});

const listaMensajes = (mensajes) =>
	mensajes
		.map(
			(msg) =>
				`
      <div>
        <b style="color:blue;">${msg.name}</b>
        [<span style="color:brown;">${msg.fyh}</span>] :
        <i style="color:green;">${msg.text}</i>
      </div>
    `
		)
		.join(" ");
