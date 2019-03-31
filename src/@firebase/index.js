import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
require("firebase/firestore");

/**
 * Production Credentials
 */
var config = {
  apiKey: "AIzaSyBE3rnjiv4nAJsDWTXgvO902M_E8ekvync",
  authDomain: "voto-ucv.firebaseapp.com",
  databaseURL: "https://voto-ucv.firebaseio.com",
  projectId: "voto-ucv",
  storageBucket: "voto-ucv.appspot.com",
  messagingSenderId: "527855181957"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const storage = firebase.storage();
const dbFirestore = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export {
  storage,
  dbFirestore,
  auth,
  timestamp
};