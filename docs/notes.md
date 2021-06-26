# Dev documentation for development of Woot app.

API end-points:

- `/api`
  - **GET** `/api/u/:handle` : Fetches the publicly available data of the user whose handle is `:handle`
  - **POST** `/api/u/` : Creates a new username based on the data received in the payload, which must be in the form: `{username: string, password: string }`
  - **GET** `/api/login`: Logs the user in after verifying the credentials in the payload `{ username: string, password: string }`. Returns the publicly available user data along with a signed JSON Web Token.
  - **GET** `/api/post/:id`: Returns the post data of the post with id `id` in the form `{ content: string, author: string, parent: string | null }`
  - **POST** `/api/poist`: Accepts a payload with the form ` { author: string, parent: string | null, content: string }`, and creates the post. The POST request HTTP headers must contain a signed JWT which is returned by the server on **GET** `/api/login`.

## Database Schema

### User

```js
{
	handle: string,	// Primary Key
	hashedPassword: string,
	followers: Array<string>, // array of user handles, each member is a Foreign Key on user
	bio: string,
	postCount: number
}
```

### Post

```javascript
{
    _id: string, 	// Primary Key
    author: string,
    content: string,
    parent: string // Foreign key on Post
}
```

To 'remember' a user, JWTs are used. The JWT is made when the user sends a log-in request to the server. The server responds by sending back the logged in user's information and a  **JWT**. 

On the client side, the token is stored as a cookie in the browser. On every subsequent request sent to the server that requires authorization, a `token` is sent in the HTTP headers.

On the client side:

```javascript
	axios
      .post('api/login', { username, password })
      .then(res => {
        if (res.status == 200) {
            const handle = res.data.userData.handle;
            const jwt = res.data.token;
            window.location.href = '/u/' + handle;
            // store the JWT in a cookie jar
            document.cookie = `jwt=${jwt}`;
        }
    })
```

On the server side:

```javascript
const user = await User.findOne({ handle: username });
if (!(await user.checkPassword(password))) {
    // handle incorrect password.
    return;
}

const token = jwt.sign({ handle: username }, 
	process.env.JWT_SECRET, 
	{ expiresIn: '7 days' });

res.json({
    userData: user.getPublicData(),
    token: token,
});
```
