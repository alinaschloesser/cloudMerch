const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductsSchema = new Schema({
	name: String,
	price: Number,
	description: String,
	img: String,
	quantity: Number,
	department: String,
	keywords: Array,
});

const Products = mongoose.model('products', ProductsSchema);

module.exports = Products;
