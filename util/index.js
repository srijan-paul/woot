const bcrypt = require('bcrypt');
const config = require('./config.json');

function isUsernameValid(name) {
	if (typeof name != 'string') return false;
	return name.length >= config.minUserNameLen && name.length <= config.maxUserNameLen;
}

function isPasswordValid(password) {
	return password.length >= config.minPasswordLen && password.length <= config.maxPasswordLen;
}

async function hash(password) {
	return await bcrypt.hash(password, config.saltRounds);
}

module.exports = {
	isUsernameValid,
	hash,
	isPasswordValid,
};
