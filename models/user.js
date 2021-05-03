const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = Schema({
	handle: { type: String, required: true, unique: true },
	hashed_password: { type: String, required: true },
	// An array of user handles.
	followers: [String],
	bio: String,
	postCount: { type: Number, default: 0 },
});

UserSchema.methods.checkPassword = async function (password) {
	return await bcrypt.compare(password, this.hashed_password);
};

UserSchema.methods.getPublicData = function () {
	return {
		handle: this.handle,
		followers: this.followers,
		bio: this.bio,
		postCount: this.postCount || 0
	};
};

const UserModel = model('User', UserSchema);

module.exports = UserModel;
