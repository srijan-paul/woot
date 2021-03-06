const express = require('express');
const User = require('../../models/user');
const Post = require('../../models/post');
const jwt = require('jsonwebtoken');
const { isUsernameValid, hash, isPasswordValid } = require('../../util');

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/u/:handle', async (req, res) => {
	// find user with handle and send if one exists.
	const { handle } = req.params;

	if (!handle) {
		res.status(404).end();
		return;
	}

	try {
		const user = await User.findOne({ handle });
		res.send(user.getPublicData());
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
	console.log(req.body);

	if (isUsernameValid(username) && isPasswordValid(password)) {
		try {
			const hashedPassword = await hash(password);

			let userExists = false;
			User.findOne({ handle: username }, (err, _) => {
				if (err) return;
				userExists = true;
			});

			if (userExists) {
				res.status(409).end();
				return;
			}

			const user = new User({ handle: username, hashed_password: hashedPassword });
			await user.save();
			res.send({ status: 'ok', handle: user.handle });
		} catch (err) {
			console.error(err);
			res.status(500).send({ status: 'failure' });
		}
	} else {
		res.status(400).send({ status: 'bad-credentials' });
	}
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ handle: username });
		/// Note: these errors are caught by the catch block and
		/// packaged back to the client in the response, so no
		/// real errors are being thrown to the js runtime.
		if (!user) throw Error('No such user');
		if (!(await user.checkPassword(password))) throw new Error('Incorrect password.');

		const token = jwt.sign({ handle: username }, process.env.JWT_SECRET, { expiresIn: '7 days' });
		res.json({
			userData: user.getPublicData(),
			token: token,
		});
	} catch (err) {
		res.status(403).end();
	}
});

router.post('/post', async (req, res) => {
	try {
		const { content, author, parent } = req.body;

		if (Post.isContentValid(content)) {
			res.status(403).send({ error: 'Post content too short' });
			return;
		}

		const post = new Post({ content, author, parent });
		const postRef = await post.save();
		res.json({ id: postRef._id });
	} catch (e) {
		res.status(500).end();
	}
});

router.get('/post/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const post = await Post.findOne({ _id: id });
		res.json({ content: post.content, author: post.author, parent: post.parent });
	} catch (e) {
		res.status(404).end();
	}
});

module.exports = router;
