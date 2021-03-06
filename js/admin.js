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

// Upload CSV to Firebase Storage
const uploadCSVToStorage = document.querySelector('#upload-csv-file');

uploadCSVToStorage.addEventListener('click', e => {
  e.preventDefault();

  const file = document.querySelector('#roster-file').files[0];
  const name = +new Date() + '-' + file.name;
  const metadata = { contentType: file.type };

  // Upload file to Firebase Storage
  let storageRef = storage.ref();
  const task = storageRef.child(name).put(file, metadata);
  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      console.log(url);
    })
    .catch(console.error);
});
