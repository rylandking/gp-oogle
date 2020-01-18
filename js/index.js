const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const userEmail = document.querySelector('#user-email');

const setupUI = user => {
  if (user) {
    // Toggle UI Elements
    loggedInLinks.forEach(item => (item.style.display = 'block'));
    loggedOutLinks.forEach(item => (item.style.display = 'none'));

    // Show user email
    userEmail.append(user.email);
  } else {
    // Toggle UI Elements
    loggedInLinks.forEach(item => (item.style.display = 'none'));
    loggedOutLinks.forEach(item => (item.style.display = 'block'));

    // Reset user email
    userEmail.innerHTML = '';
  }
};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
});
