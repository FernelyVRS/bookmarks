import firebase from 'firebase/app'
import 'firebase/firestore'


// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDaMeVxlZppSbxhY5dfaUI1WCK4lVCAEco",
    authDomain: "react-fb-crud-f3ebe.firebaseapp.com",
    projectId: "react-fb-crud-f3ebe",
    storageBucket: "react-fb-crud-f3ebe.appspot.com",
    messagingSenderId: "818522606096",
    appId: "1:818522606096:web:4dae91a52192c569ee1895"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore(); 