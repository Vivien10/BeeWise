import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBjsgwAeRRSAZ7iSOhDhiFGtWiOnPHG6q4",
  authDomain: "beewise-projects.firebaseapp.com",
  projectId: "beewise-projects",
  storageBucket: "beewise-projects.appspot.com",
  messagingSenderId: "927059225722",
  appId: "1:927059225722:web:092730519fe44477769fc3",
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
