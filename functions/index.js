const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gp-oogle.firebaseio.com',
  storageBucket: 'gp-oogle.appspot.com'
});

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

// Convert CSV to JSON to FIRESTORE (not JSON File)
exports.csvToJson = functions.https.onRequest((req, res) => {
  let fileInputName = 'hpg-test.csv';

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

// Send JSON File To Firestore
exports.jsonToFirestore = functions.https.onRequest((req, res) => {
  const jsonToFirestore = async () => {
    try {
      await firestoreService.restore('hpg-test.json');
      console.log('Upload Success');
    } catch (error) {
      console.log(error);
    }
  };

  jsonToFirestore();
});
