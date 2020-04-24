import firebase from 'firebase'
import firestore from 'firebase/firestore'
let firebaseConfig = { 
    apiKey: "AIzaSyA34I1Ujff9vP2pGQ1Io_kPekNnL60M4XI", 
    authDomain: "vikash-geo-location.firebaseapp.com", 
    databaseURL: "https://vikash-geo-location.firebaseio.com", 
    projectId: "vikash-geo-location", 
    storageBucket: "vikash-geo-location.appspot.com", 
    messagingSenderId: "171782467159", 
    appId: "1:171782467159:web:b4db5703ba2cdc6cc5bd12", 
    measurementId: "G-SKWXQM532Z"
 };  
    // Initialize Firebaseconst 
firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({timestampInSnaoshots: true })
export default firebaseApp.firestore();