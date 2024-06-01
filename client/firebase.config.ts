// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDiRQoQ9BlEg1MgYV65Rjb3LEJeH7wbmc",
    authDomain: "real-estate-32e06.firebaseapp.com",
    projectId: "real-estate-32e06",
    storageBucket: "real-estate-32e06.appspot.com",
    messagingSenderId: "383856613102",
    appId: "1:383856613102:web:a7e77cad044846e5d405ff",
    measurementId: "G-WQ69SD1L8G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);