import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyAF_yAPA3qLR67_Po99SjOCxlYE8gOgdME",
  authDomain: "rick-and-morty-app-5133b.firebaseapp.com",
  projectId: "rick-and-morty-app-5133b",
  storageBucket: "rick-and-morty-app-5133b.appspot.com",
  messagingSenderId: "838324489044",
  appId: "1:838324489044:web:8a04cebf4c81da8c9dd6c1",
  measurementId: "G-KESTV6SY9L",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore().collection("favs");

export const updateDB = (array, uid) => {
  return db.doc(uid).set({ array });
};

export const getFavs = (uid) => {
  return db
    .doc(uid)
    .get()
    .then((snap) => {
      return snap.data().array;
    })
    .catch((err) => console.log("Error: ", err));
};

export function loginWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((snap) => snap.user);
}

export function logoutWithGoogle() {
  firebase.auth().signOut();
}
