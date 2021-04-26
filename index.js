require('dotenv').config();

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '100kb' }));

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://srijanpaul:${process.env.MDB_PASSWORD}@cluster0.5m7qf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const homePageTweetCount = 10;

MongoClient.connect(uri, { useUnifiedTopology: true })
	.then(client => {
		console.log('Connected to mongo DB database.');
		const db = client.db('express-app');
		const tweetsCollection = db.collection('tweets');

		app.get('/', async (_, res) => {
			const cursor = tweetsCollection.find();
			cursor.sort({ _id: -1 }).limit(homePageTweetCount);

			try {
				const tweets = await cursor.toArray();
				res.render('index.ejs', { tweets });
			} catch (e) {
				res.status(200);
				res.end();
			}
		});

		app.post('/tweet', (req, res) => {
			tweetsCollection.insertOne(req.body).catch(console.error);
			res.redirect('/');
		});

		const port = process.env.PORT || 3000;
		app.listen(port, () => console.log(`Server started on port ${port}`));
	})
	.catch(console.error);
