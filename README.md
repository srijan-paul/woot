# Woot
Woot is a WIP social media app that attempts to be a friendlier, smaller version of existing
sites like Reddit and Twitter. It is written in Javascript, with EJS, NodeJS, Express and MongoDB.

## Building and running
To build and run the site, first setup a mongoDB cloud account [here](https://www.mongodb.com/cloud),
take note of the URI you're provided with and paste it in a `.env` file in the root of this directory.

```
MDB_PASSWORD=<Your-MongoDB-Passwrd>
JWT_SECRET=<A-Randomly-generate-secure-string>
```

Next, install all the dependencies:

```
npm install .
```

To launch the site in dev mode, use `npm run dev`, and to build and deply for production use:

```
npm run build
npm run serve
```


## Hosted link
Coming soon!