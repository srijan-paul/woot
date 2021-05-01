const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = Schema({
	handle: { type: String, required: true, unique: true },
	hashed_password: { type: String, required: true },
	followers: [String], // An array of user handles.
});

UserSchema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.hashed_password);
};

UserSchema.methods.getPublicData = function () {
	return { handle: this.handle, followers: this.followers };
};

const UserModel = model('User', UserSchema);

module.exports = UserModel;
