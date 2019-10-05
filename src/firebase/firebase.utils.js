import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBHvmSLoYDTIXJJHTCI1cp7x28HLbgn_eQ",
  authDomain: "crwn-db-ae0b0.firebaseapp.com",
  databaseURL: "https://crwn-db-ae0b0.firebaseio.com",
  projectId: "crwn-db-ae0b0",
  storageBucket: "",
  messagingSenderId: "176856041756",
  appId: "1:176856041756:web:efb7e591140dcd089092d9"
};

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
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParamaters({ prompt: "select_account" });
provider.addScope("profile");
provider.addScope("email");
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
