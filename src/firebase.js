// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA3ZE9C1WIszC-1vpcVsCUJF8O-TG0ylYE',
  authDomain: 'clone-6f8df.firebaseapp.com',
  projectId: 'clone-6f8df',
  storageBucket: 'clone-6f8df.firebasestorage.app',
  messagingSenderId: '581999370124',
  appId: '1:581999370124:web:3c35ce3af11059c6e780a9',
  measurementId: 'G-730VWP3R5M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
