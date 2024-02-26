import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB4It56TfrLlE9PKrRYGkOZbBdpmyRPcSU",
    authDomain: "gtwrapped-775e7.firebaseapp.com",
    projectId: "gtwrapped-775e7",
    storageBucket: "gtwrapped-775e7.appspot.com",
    messagingSenderId: "542348903525",
    appId: "1:542348903525:web:d329606365810239ac328c",
    measurementId: "G-95WEVNCCEL"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db};