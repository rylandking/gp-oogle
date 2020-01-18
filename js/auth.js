// Listen for Auth Status Changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('User logged in: ', user);
    setupUI(user);
  } else {
    console.log('User logged out');
    setupUI(user);
  }
});

// Sign Up
const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get User Info
  const email = signUpForm['signup-email'].value;
  const password = signUpForm['signup-password'].value;

  // Sign Up The User
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const modal = document.querySelector('#modal-signup');
      // Close Modal
      M.Modal.getInstance(modal).close();
      // Reset Sign Up Form Inputs
      signUpForm.reset();
      signUpForm.querySelector('.error').innerHTML = '';
    })
    .catch(err => {
      signUpForm.querySelector('.error').innerHTML = err.message;
    });
});

// Log Out
const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
  e.preventDefault();

  auth.signOut();
});

// Log In
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get User Info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      const modal = document.querySelector('#modal-login');
      // Close Modal
      M.Modal.getInstance(modal).close();
      // Reset Sign Up Form Inputs
      loginForm.reset();
      loginForm.querySelector('.error').innerHTML = '';
    })
    .catch(err => {
      loginForm.querySelector('.error').innerHTML = err.message;
    });
});
