import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyANtRTacdSpnXpMUuLUmZ6cWLnzbS2ShJU",
  authDomain: "coronavirus-f6d3c.firebaseapp.com",
  databaseURL: "https://coronavirus-f6d3c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "coronavirus-f6d3c",
  storageBucket: "coronavirus-f6d3c.appspot.com",
  messagingSenderId: "562563890357",
  appId: "1:562563890357:web:76fb0a8db4d67ad82652fc",
  measurementId: "G-Q0FCWGXS39"
};
firebase.initializeApp(config);

export default firebase;