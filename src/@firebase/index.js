import * as firebase from "firebase/app";

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