const User = require('../models/user');
const Post = require('../models/post');
const bcrypt = require('bcrypt');

async function getUserByHandle(handle) {
	if (typeof handle != 'string') return null;
	try {
		const user = await User.findOne({ handle });
		return user;
	} catch (_) {
		console.error(_)
		return null;
	}
}

module.exports = {
	getUserByHandle,
};
