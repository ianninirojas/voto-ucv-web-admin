import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
require("firebase/firestore");

/**
 * Production Credentials
 */
var config = {
  apiKey: "AIzaSyB9F_KjrbY0VxCXiOVPH2DockpPrSZRbgE",
  authDomain: "admin-voto-ucv.firebaseapp.com",
  databaseURL: "https://admin-voto-ucv.firebaseio.com",
  projectId: "admin-voto-ucv",
  storageBucket: "admin-voto-ucv.appspot.com",
  messagingSenderId: "185235330067"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const storage = firebase.storage();
const firestore = firebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export {
  storage,
  firestore,
  auth,
  timestamp
};