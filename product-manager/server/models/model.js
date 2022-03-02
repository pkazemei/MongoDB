const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
		minlength: [2, 'Title must have at least 2 characters']
	},
	price: {
		type: Number,
		required: [true, 'Price is required'],
		min: [0, 'Price must be at least 0']
	},
	description: {
		type: String
	}
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;