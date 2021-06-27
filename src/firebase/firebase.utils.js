import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBn1mZsKtdqtFdCEzLnCamEFOFo9sRoQhs",
  authDomain: "crown-db-dae99.firebaseapp.com",
  projectId: "crown-db-dae99",
  storageBucket: "crown-db-dae99.appspot.com",
  messagingSenderId: "1015283997190",
  appId: "1:1015283997190:web:4e4c4db8e5af2a075ac187",
  measurementId: "G-MKZ70DBCVM",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
