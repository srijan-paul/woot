// helpers:
const onClick = (el, callback) => el.addEventListener('click', callback);
const id = name => document.getElementById(name);

const LogInState = 1;
const SignUpState = 2;

const logInForm = id('login-form');
const signUpForm = id('signup-form');
const headerText = id('header-text');

const bottomLink = id('bottom-text-link');
const bottomText = id('bottom-text');

let currentState = LogInState;
function switchState() {
	currentState = currentState == LogInState ? SignUpState : LogInState;
	renderState();
}

function renderState() {
	if (currentState === SignUpState) {
		logInForm.style.display = 'none';
		signUpForm.style.display = 'flex';
		headerText.innerText = 'Sign up for';

		bottomText.innerText = 'Already have an account?';
		bottomLink.innerText = 'Log in';
	} else {
		headerText.innerText = 'Log in to';
		logInForm.style.display = 'flex';
		signUpForm.style.display = 'none';

		bottomText.innerText = "Don't have an account?";
		bottomLink.innerText = 'Sign Up!';
	}
}

// Handle sign up

const signUpBtn = id('signup-btn');
const logInBtn = id('signin-btn');

function getFormData(form) {
	const formData = new FormData(form);
	const data = {};

	for (const pair of formData.entries()) {
		data[pair[0]] = pair[1];
	}

	return data;
}

const isAlpha = k => k >= 'a' && k <= 'z';

function isNum(n) {
	const ascii = n.charCodeAt(0);
	// 48 and 57 are the ascii codes
	// for 0 and 9.
	return ascii >= 48 && ascii <= 57;
}

const isValidNameChar = k => isAlpha(k) || isNum(k) || k == '_';

const handleWarn = id('handle-error');
const passwordWarn = id('password-error');
const confirmPasswordWarn = id('confirm-error');

function assertWarning(cond, warnElement) {
	if (!cond) {
		warnElement.style.display = 'block';
	} else {
		warnElement.style.display = 'none';
	}

	return cond;
}

function validateUserCreds({ username, password, confirm_password }) {
	const pwMinLength = 8;
	const minNameLen = 3;
	const maxNameLen = 12;

	let check = true;

	for (const c of username) {
		check &&= assertWarning(isValidNameChar(c), handleWarn);
	}

	check &&= assertWarning(
		username.length >= minNameLen && username.length <= maxNameLen,
		handleWarn
	);
	check &&= assertWarning(password.length >= pwMinLength, passwordWarn);
	check &&= check && assertWarning(confirm_password == password, confirmPasswordWarn);

	return check;
}

onClick(signUpBtn, e => {
	e.preventDefault();
	const data = getFormData(signUpForm);
	if (validateUserCreds(data)) {
		// send POST request to create new user.
		axios
			.post('/api/user', {
				username: data.username,
				password: data.password,
			})
			.then(res => {})
			.catch(console.log);
	}
});
