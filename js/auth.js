const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const userEmail = document.querySelector('#user-email');
const adminItems = document.querySelectorAll('.admin');

const setupUI = user => {
  if (user) {
    // Toggle admin elements
    if (user.admin) {
      adminItems.forEach(item => (item.style.display = 'block'));
    }
    // Toggle Authenticated UI Elements
    loggedInLinks.forEach(item => (item.style.display = 'block'));
    loggedOutLinks.forEach(item => (item.style.display = 'none'));

    // Show user email
    userEmail.append(user.email);
  } else {
    // Toggle admin elements
    adminItems.forEach(item => (item.style.display = 'none'));

    // Toggle Authenticated UI Elements
    loggedInLinks.forEach(item => (item.style.display = 'none'));
    loggedOutLinks.forEach(item => (item.style.display = 'block'));

    // Reset user email
    userEmail.innerHTML = '';
  }
};

// Listen for Auth Status Changes
auth.onAuthStateChanged(user => {
  if (user) {
    // Boolean if user is an admin
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
  } else {
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
