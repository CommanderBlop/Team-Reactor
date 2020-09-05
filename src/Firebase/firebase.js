// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// firebase.initializeApp(firebaseConfig);
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/functions';
import "firebase/performance";

const config = {
  apiKey: "AIzaSyAs9poikn_6GE2eP_Yz7nibaKrC9WcNGNU",
  authDomain: "team-reactors.firebaseapp.com",
  databaseURL: "https://team-reactors.firebaseio.com",
  projectId: "team-reactors",
  storageBucket: "team-reactors.appspot.com",
  messagingSenderId: "767264378815",
  appId: "1:767264378815:web:fa3a768a8eded80fdc5b0a",
  measurementId: "G-VBFR0CR7PS"
};

const Firebase = {
    app: firebase.initializeApp(config),
    auth: firebase.auth(),
    db: firebase.firestore(),
    storage: firebase.storage().ref(), 
}



export default Firebase;

// let Firebase = app.initializeApp(config);
// export default Firebase;
