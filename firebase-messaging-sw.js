import firebase from "firebase";
// importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/7.17.1/firebase-messaging.js');


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

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
// Add the public key generated from the console here.
messaging.usePublicVapidKey("BNnWHeV6L8iGSPZ9wgsBksiH9H9_sG273S19M2S3_jbTz6RAMv5g3MvoEtLUimSMAX71EFL-QXb9wM25ub1KdsE");

messaging.onMessage((payload) => {
    console.log('Message received. ', payload);

});

// sendTokenToServer = () => {

// }
// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((currentToken) => {
    console.log("FCM", currentToken)
    if (currentToken) {
        console.log("currentToken", currentToken)
        //this.sendTokenToServer(currentToken);
    } else {
        //setTokenSentToServer(false);
    }
}).catch((err) => {
    console.log("FCM", err)
    //setTokenSentToServer(false);
});


// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.');
        // Indicate that the new Instance ID token has not yet been sent to the
        // app server.
        //setTokenSentToServer(false);
        // Send Instance ID token to app server.
        //sendTokenToServer(refreshedToken);
        // ...
    }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
    });
});


export default firebase;