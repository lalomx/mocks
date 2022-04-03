const { Schema, model } = require("mongoose");
const faker = require("faker");

class Product {
	constructor() {
		const schema = new Schema({
			name: { type: String, default: faker.name() },
			price: { type: Number, default: faker.datatype.number() },
			url: { type: String, default: faker.image() },
		});
		this.model = model("productos", schema);
	}
	async saveProd(product) {
		await this.model.create(product);
	}

	async getAll() {
		const products = await this.model.find();
		console.log(`productos en ecommerce: ${products.length}`);
		return products;
	}

	async getById(id) {
		const product = await this.model.findById(id);
		return product;
	}

	async updateById(id, newP) {
		const newProd = await this.model.findByIdAndUpdate(id, newP);
		await this.model.save();
		return newProd;
	}

	async deleteById(id) {
		const product = await this.model.findByIdAndDelete(id);
		const newArray = await this.model.find();
		return newArray;
	}
}
