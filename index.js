require('dotenv').config();

const mongoose = require('mongoose');
const UserModel = require('./api/models/user');
const Post = require('./api/models/post');

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '100kb' }));

const uri = `mongodb+srv://srijanpaul:${process.env.MDB_PASSWORD}@cluster0.5m7qf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const homePageTweetCount = 10;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error);

db.on('open', () => {
	console.log('Connected to MongoDB atlas database.');
});

app.get('/', async (req, res) => {
	const posts = await Post.find({});
	res.render('index.ejs', { posts });
});

app.get('/login', async (req, res) => {
	const posts = await Post.find({});
	res.render('login.ejs', { posts });
});

app.post('/post', (req, res) => {
	const postData = req.body;
	const post = new Post(req.body);
	console.log(postData, post)
	post.save((err, post) => {
		if (err) console.error(err);
	});
	res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
