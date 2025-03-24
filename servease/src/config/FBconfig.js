import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const firebaseConfig = {
  apiKey: "AIzaSyDzQ6f7WzXUNdrwD_0HnbrFJ44ggfdqh4U",
  authDomain: "servease-32bd1.firebaseapp.com",
  projectId: "servease-32bd1",
  storageBucket: "servease-32bd1.firebasestorage.app",
  messagingSenderId: "455169858252",
  appId: "1:455169858252:web:bceb7349c4481687198069",
  measurementId: "G-3G8ZWRDQJR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };