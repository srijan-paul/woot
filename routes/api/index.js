const express = require('express');
const User = require('../../models/user');
const { isUsernameValid, hash, isPasswordValid } = require('../../util');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/u/:handle', async (req, res) => {
	// find user with handle and send if one exists.
	const { handle } = req.params;

	if (!handle) {
		res.status(404);
		res.end();
		return;
	}

	try {
		const user = await User.findOne({ handle });
		res.send(user);
	} catch (err) {
		res.status(404);
		res.end();
	}
});

/// this API end point is used to create a new user
/// and add him to the database. The response is a JSON
/// object that contains a status string ('ok' | 'bad-credentials') | 'failure'),
/// and the userhandle of the user that was just created.
router.post('/u', async (req, res) => {
	const { username, password } = req.body;

	if (isUsernameValid(username) && isPasswordValid(password)) {
		try {
			const hashedPassword = await hash(password);
			const user = new User({ handle: username, hashed_password: hashedPassword });
			await user.save();
			res.send({ status: 'ok', handle: user.handle });
		} catch (err) {
			console.error(err);
			res.status(500);
			res.send({ status: 'failure' });
		}
	} else {
		res.status(400);
		res.send({ status: 'bad-credentials' });
	}
});


router.post('/login', async (req, res) => {
	
});

module.exports = router;
