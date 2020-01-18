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

    // Get Data On Click or Enter Key Stroke
    const searchButton = document.querySelector('#search-button');
    let searchInput = document.querySelector('#search-input');
    const searchMemberName = document.querySelector(
      'input[searchBy=searchMemberName]'
    );
    const searchAddress = document.querySelector(
      'input[searchBy=searchAddress]'
    );
    const searchCity = document.querySelector('input[searchBy=searchCity]');
    const searchPhone = document.querySelector('input[searchBy=searchPhone]');
    const searchZip = document.querySelector('input[searchBy=searchZip]');
    // Get all documents matching searchInput on 'enter' key click
    searchInput.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        searchButton.click();
      }
    });

    // Find all documents with city field matches searchInput
    const searchQuery = () => {
      db.collection('test')
        .where(field, '>=', searchInput)
        .where(field, '<=', searchInput + '\uf8ff')
        .get()
        .then(function(data) {
          data.forEach(function(doc) {
            setupMatchedList(data.docs);
          });
          // If no matching document
          if (data.empty) {
            noMatch();
          }
        })
        .catch(function(error) {
          console.log(error.message);
        });
    };

    // If no matching document, run this function
    const noMatch = () => {
      const matchedList = document.querySelector('#matched-list');
      matchedList.innerHTML = `<p id="no-matches" class="teal-text darken-4 center-align pt-3">No matches. Please try another search.</p>`;
    };

    // Get all documents matching searchInput on click
    searchButton.addEventListener('click', e => {
      // Get value inside searchInput
      searchInput = document.querySelector('#search-input').value.toLowerCase();
      // Ensure the searchInput string is > 0
      if (searchInput.length < 1) {
        noMatch();
      } else {
        if (searchMemberName.checked) {
          field = 'memberName';
          searchQuery();
        }
        if (searchAddress.checked) {
          field = 'address';
          searchQuery();
        }
        if (searchCity.checked) {
          field = 'city';
          searchQuery();
        }
        if (searchPhone.checked) {
          field = 'phone';
          searchQuery();
        }
        if (searchZip.checked) {
          field = 'zip';
          searchQuery();
        }
      }
    });
  } else {
    // If no authenticated user, set matched list to nothing
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
