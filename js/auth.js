// Add Admin Cloud Function
const adminForm = document.querySelector('.admin-actions');
const adminFormResult = document.querySelector('#admin-result');

adminForm.addEventListener('submit', e => {
  e.preventDefault();
  const adminEmail = document.querySelector('#admin-email').value;

  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
    adminFormResult.innerHTML = `${adminEmail} is now an admin.`;
  });

  setTimeout(function() {
    adminForm.reset();
    adminFormResult.innerHTML = '';
  }, 5000);
});

// Listen for Auth Status Changes
auth.onAuthStateChanged(user => {
  if (user) {
    // Boolean if user is an admin
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });

    // Get Data On Click
    const searchButton = document.querySelector('#search-button');
    searchButton.addEventListener('click', e => {
      db.collection('test').onSnapshot(
        data => {
          setupMatchedList(data.docs);
        },
        err => {
          console.log(err.message);
        }
      );
    });
  } else {
    setupMatchedList([]);

    setupUI(user);
  }
});

// Refresh rosters
const refreshRostersForm = document.querySelector('#refresh-rosters-form');
const confirmation = document.querySelector('#upload-confirmation');
refreshRostersForm.addEventListener('submit', e => {
  e.preventDefault();

  db.collection('test')
    .add({
      address: refreshRostersForm['address'].value,
      city: refreshRostersForm['city'].value,
      directParentName: refreshRostersForm['directParentName'].value,
      gpoID: refreshRostersForm['gpoID'].value,
      gpoName: refreshRostersForm['gpoName'].value,
      memberName: refreshRostersForm['memberName'].value,
      phone: refreshRostersForm['phone'].value,
      state: refreshRostersForm['state'].value,
      topParentName: refreshRostersForm['topParentName'].value,
      zip: refreshRostersForm['zip'].value
    })
    .then(() => {
      // Confirm document was added to Firestore
      confirmation.innerHTML = 'Document added to Firestore';
    })
    .catch(err => {
      // Show error of why document was not added to Firestore
      confirmation.innerHTML = `${err.message}`;
    });
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
