import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCdkRN8YRfQEc7G6BJC5CP0IsQfrZRufas",
    authDomain: "codebattle-89907.firebaseapp.com",
    databaseURL: "https://codebattle-89907.firebaseio.com",
    projectId: "codebattle-89907",
    storageBucket: "codebattle-89907.appspot.com",
    messagingSenderId: "776625407118",
    appId: "1:776625407118:web:e9c7fe8fcdf788bd6435df",
    measurementId: "G-77GG720QS5"
};

console.log("FCM","firebase Init")
firebase.initializeApp(firebaseConfig);

export default firebase;