import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-database'

const config = {
  apiKey: "AIzaSyCJUSxj9z-5Y8yTxHUJ1Im1gqY9t2ZnlNk",
  authDomain: "todo-list-hhu.firebaseapp.com",
  databaseURL: "https://todo-list-hhu.firebaseio.com",
  projectId: "todo-list-hhu",
  storageBucket: "todo-list-hhu.appspot.com",
  messagingSenderId: "630512871483",
  appId: "1:630512871483:web:195bfce297b39f4eb8541e",
  measurementId: "G-NT3EFZPFLH"
}

firebase.initializeApp(config);

export default firebase;
