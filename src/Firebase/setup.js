// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOs1kERRRGCxwAOlO4HWxC6eGsdvcbrk8",
    authDomain: "vuejs-demo-2f2d2.firebaseapp.com",
    projectId: "vuejs-demo-2f2d2",
    storageBucket: "vuejs-demo-2f2d2.appspot.com",
    messagingSenderId: "565433178150",
    appId: "1:565433178150:web:b15e91f979a4988f872ee7",
    measurementId: "G-PXEHMZH7LM"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
window.db = db;
