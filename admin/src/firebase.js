import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRESTORE_API,
  authDomain: "ourtube-a2b99.firebaseapp.com",
  projectId: "ourtube-a2b99",
  storageBucket: "ourtube-a2b99.appspot.com",
  messagingSenderId: "1027937944652",
  appId: process.env.REACT_APP_FIRESTORE_APPID,
  measurementId: "G-E9S49EXYD4",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
