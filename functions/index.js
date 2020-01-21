const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gp-oogle.firebaseio.com',
  storageBucket: 'gp-oogle.appspot.com'
});

const storage = admin.storage();
const gcs = require('@google-cloud/storage');
let db = admin.firestore();
let csvToJson = require('convert-csv-to-json');
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config.js');

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Check that request is made by an admin
  if (context.auth.token.admin !== true) {
    return {
      error: 'Only admins can add other admins, sucker. 🛡'
    };
  }

  // Get the user and add a custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} is now an admin.`
      };
    })
    .catch(err => {
      return err;
    });
});

// Import newly uploaded CSV from Storage to Firestore
exports.importCSVToFirestore = functions.storage
  .object()
  .onFinalize(async object => {
    const fileBucket = object.bucket; // The Storage bucket that contains the file.
    const filePath = object.name; // File path in the bucket.
    const contentType = object.contentType; // File content type.
    const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

    const spawn = require('child-process-promise').spawn;
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    // Download file from bucket.
    const bucket = admin.storage().bucket(fileBucket);
    const tempFilePath = path.join(os.tmpdir(), filePath);
    const metadata = {
      contentType: contentType
    };
    await bucket
      .file(filePath)
      .download({ destination: tempFilePath })
      .then(() => {
        console.log('Image downloaded locally to', tempFilePath);
        let fileInputName = tempFilePath;

        csvToJson.fieldDelimiter(',').getJsonFromCsv(fileInputName);

        let json = csvToJson.getJsonFromCsv(fileInputName);
        for (let i = 0; i < json.length; i++) {
          console.log(json[i]);
          let setDoc = db
            .collection('cities6')
            .doc()
            .set(json[i]);

          console.log(i, json[i]);
        }
      });

    console.log(object);
    return;
  });
