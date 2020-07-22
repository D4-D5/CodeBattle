import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBcyZjXRnOlVmgqufNBT2_13dDvsQ5NkG0",
    authDomain: "codewar-6a42a.firebaseapp.com",
    databaseURL: "https://codewar-6a42a.firebaseio.com",
    projectId: "codewar-6a42a",
    storageBucket: "codewar-6a42a.appspot.com",
    messagingSenderId: "442945702185",
    appId: "1:442945702185:web:3e87aa807835dfd59f0f38",
    measurementId: "G-DG8KR6QKN7"
};

firebase.initializeApp(firebaseConfig);

export default firebase;