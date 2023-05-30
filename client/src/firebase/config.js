import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAiz_YmOLFdD1B2iXNkn7hvhT5UxLPIjLU",
  authDomain: "computersworldltd.firebaseapp.com",
  projectId: "computersworldltd",
  storageBucket: "computersworldltd.appspot.com",
  messagingSenderId: "187041138443",
  appId: "1:187041138443:web:39ba4f6cad9f88077e040e",
  // apiKey: import.meta.env.VITE_APP_APIKEY,
  // authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  // projectId: import.meta.env.VITE_APP_PROJECTID,
  // storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  // messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
  // appId: import.meta.env.VITE_APP_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const timestamp = serverTimestamp();

export default app;
