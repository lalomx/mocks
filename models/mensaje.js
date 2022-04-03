const { Schema, model } = require("mongoose");
const faker = require("faker");
const { schema, normalize } = require("normalizr");
class Mensaje {
	constructor() {
		const menSchema = new Schema({
			author: {
				name: { type: String, default: faker.name },
				lastName: { type: String, default: faker.name.lastName() },
				email: { type: String, default: faker.internet.email() },
				alias: { type: String, default: faker.internet.userName() },
				avatar: { type: String, default: "url" },
				age: { type: Number, default: faker.datatype.number() },
			},
			text: String,
		});
		this.model = model("mensajes", schema);
	}
	async saveMessage(message) {
		await this.model.create(message);
	}
	async readMessage() {
		const author = new schema.Entity("authors", {}, { idAttribute: "email" });
		const mensaje = new schema.Entity("mensajes", {
			author: author,
		});
		const data = new schema.Entity("data", {
			mensajes: [mensaje],
		});
		const mensajesDb = await this.model.find({});
		const normalizedD = normalize(
			{
				id: "mensajes",
				mensajes: mensajesDb,
			},
			data
		);
		console.log(normalizedD);
		return normalizedD;
	}
}
module.exports = new Mensaje();
