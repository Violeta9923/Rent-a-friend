import {initializeApp} from 'firebase/app'
import {getAuth} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAsLwEuM-bnTXnLtqLJlgOkwQ9b7XmJMik",
  authDomain: "form-6e37d.firebaseapp.com",
  projectId: "form-6e37d",
  storageBucket: "form-6e37d.appspot.com",
  messagingSenderId: "1030297213534",
  appId: "1:1030297213534:web:1e64bea36fb6f4d55ab2cf",
  measurementId: "G-ZJKBF8DFG6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app

