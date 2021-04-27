const LogInState = 1;
const SignUpState = 2;


const logInForm = document.getElementById('login-form');
const signUpForm = document.getElementById('signup-form');
const headerText = document.getElementById('header-text');

const bottomLink = document.getElementById('bottom-text-link');
const bottomText = document.getElementById('bottom-text');

let currentState = LogInState;
function switchState() {
	currentState = currentState == LogInState ? SignUpState : LogInState;
	renderState();
}

function renderState() {
	if (currentState == SignUpState) {
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
