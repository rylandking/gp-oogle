// Sign Up
const signUpFrom = document.querySelector('#signup-form');

signUpFrom.addEventListener('submit', e => {
  e.preventDefault();

  // Get User Info
  const email = signUpFrom['signup-email'].value;
  const password = signUpFrom['signup-password'].value;

  // Sign Up The User
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-signup');
    // Close Modal
    M.Modal.getInstance(modal).close();
    // Reset Sign Up Form Inputs
    signUpFrom.reset();
  });
});
