import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import "firebase/analytics"
//import * as firebase from "firebase/app"




  const firebaseConfig = {
    apiKey: "AIzaSyD4AJqmbR53bqkvFjBKyXQ5qBfE0cuz47s",
    authDomain: "autofeed2020.firebaseapp.com",
    databaseURL: "https://autofeed2020.firebaseio.com",
    projectId: "autofeed2020",
    storageBucket: "autofeed2020.appspot.com",
    messagingSenderId: "1058552734780",
    appId: "1:1058552734780:web:32cae402102183ea668f39",
    measurementId: "G-M5CPTXRXFV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //firebase.analytics(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  export {db, auth}