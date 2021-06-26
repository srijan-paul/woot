const cookie = document.cookie;

const currentUser = {
	handle: null,
	token: null,
};

if (cookie) {
  // The cookie is in the form 'handle=HANDLE;token=JWTTOKEN'
	const [name, token] = cookie.split(';');
	currentUser.handle = name.split('=')[1];
	currentUser.token = token.split('=')[1];
}
