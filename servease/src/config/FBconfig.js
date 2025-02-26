import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzQ6f7WzXUNdrwD_0HnbrFJ44ggfdqh4U",
  authDomain: "servease-32bd1.firebaseapp.com",
  projectId: "servease-32bd1",
  storageBucket: "servease-32bd1.firebasestorage.app",
  messagingSenderId: "455169858252",  
  appId: "1:455169858252:web:243d2307ec49e598198069"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };