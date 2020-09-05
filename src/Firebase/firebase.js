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
  projectId: "testing2-54b27"
};

const Firebase = {
    app: firebase.initializeApp(config),
    auth: firebase.auth(),
    db: firebase.firestore(),
}

export default Firebase;

// let Firebase = app.initializeApp(config);
// export default Firebase;
