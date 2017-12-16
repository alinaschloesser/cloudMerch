const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');

const { Schema } = mongoose;

const SellerSchema = new Schema({
	googleID: String,
	name: String,
	// Add validation to email & password
	email: String,
	password: String,
	stores: [{
		type: Schema.Types.ObjectId,
		ref: 'Stores',
	}],
});

// methods ======================
// generating a hash
SellerSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
SellerSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

const Seller = mongoose.model('seller', SellerSchema);

module.exports = Seller;

