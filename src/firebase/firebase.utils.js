import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC3nnVI6ZPL2dUL_UgGBWCoppm1grcWPF4",
  authDomain: "react-crown-clothing-ecommerce.firebaseapp.com",
  databaseURL: "https://react-crown-clothing-ecommerce.firebaseio.com",
  projectId: "react-crown-clothing-ecommerce",
  storageBucket: "react-crown-clothing-ecommerce.appspot.com",
  messagingSenderId: "677654042730",
  appId: "1:677654042730:web:d65716aca4fff87c871213",
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
