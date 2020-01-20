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

// JSON to Firestore via Cloud Functions
const jsonToFirestoreForm = document.querySelector('#json-to-firestore');
jsonToFirestoreForm.addEventListener('submit', e => {
  e.preventDefault();

  const jsonToFirestore = functions.httpsCallable('jsonToFirestore');
  jsonToFirestore();
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

// db.collection('test')
//   .add({
//     gpoID: 'H036022',
//     GLN: '1100009486610',
//     memberName: 'Cascade Foot Clinic LLC',
//     address: '185 NE 12th St',
//     city: 'Madras',
//     state: 'OR',
//     zip: '97741     ',
//     phone: '541-388-2861',
//     directParentName: 'Cascade Foot Clinic LLC',
//     topParentName: 'Expansion LLC',
//     classOfTrade: 'Ambulatory Care',
//     facilityType: 'Physician Clinic'
//   })
//   .then(() => {
//     // Confirm document was added to Firestore
//     console.log('Document added to Firestore');
//   })
//   .catch(err => {
//     // Show error of why document was not added to Firestore
//     confirmation.innerHTML = `${err.message}`;
//   });
