const bcrypt = require('bcrypt');
const config = require('./config.json');
const axios = require('axios').default;

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

/// avatars are generated from the dicebear API,
/// We call the API with a randomly generated string
/// that acts as the 'seed'.
async function generateAvatar() {
	const seedLen = 10;
	let seed = '';
	for (let i = 0; i < seedLen; ++i) {
		// generates a random letter between 'a' - 'z'
		seed += String.fromCharCode(Math.random() * 26 + 97);
	}

	return await axios.get(`https://avatars.dicebear.com/api/gridy/${seed}.svg`);
}

module.exports = {
	isUsernameValid,
	hash,
	isPasswordValid,
};
