require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100kb" }));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/tweet", (req, res) => {
  res.send({ status: "success" });
});

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://srijanpaul:${process.env.MDB_PASSWORD}@cluster0.5m7qf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to mongo DB database.");
    const db = client.db("express-app");
    const tweetsCollection = db.collection("tweets");
  })
  .catch((error) => console.error(error));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
