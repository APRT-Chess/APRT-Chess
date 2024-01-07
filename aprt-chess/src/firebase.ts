// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAyeN4FTvbSjLJj1fwlEB31MUg-y40iUE",
  authDomain: "aprt-chess.firebaseapp.com",
  projectId: "aprt-chess",
  storageBucket: "aprt-chess.appspot.com",
  messagingSenderId: "322781583306",
  appId: "1:322781583306:web:4b1e9eb5e6cb78e05aa133"
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);