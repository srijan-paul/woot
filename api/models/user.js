const { Schema, model, Types } = require('mongoose');

const UserSchema = Schema({
	handle: { type: String, required: true, unique: true },
	hashed_password: { type: String, required: true },
	followers: [String],
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;
