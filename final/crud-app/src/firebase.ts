// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0sQ99Q_8NzQ3O7r9O1N-mFoMk_KPa0Ew",
  authDomain: "crud-app-cc2da.firebaseapp.com",
  projectId: "crud-app-cc2da",
  storageBucket: "crud-app-cc2da.firebasestorage.app",
  messagingSenderId: "438338568755",
  appId: "1:438338568755:web:2cbf82192da18e000c1946",
  measurementId: "G-JVK0RJMGWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };