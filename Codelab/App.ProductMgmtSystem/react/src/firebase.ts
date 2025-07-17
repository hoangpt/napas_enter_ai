// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBacKB1QHYbvR6TMq05BauM7VbHckzN7vI',
  authDomain: 'honda-dde49.firebaseapp.com',
  databaseURL:
    'https://honda-dde49-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'honda-dde49',
  storageBucket: 'honda-dde49.appspot.com',
  messagingSenderId: '434394729056',
  appId: '1:434394729056:web:f14090ec32763133619105',
  measurementId: 'G-S29N2GSY0R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
