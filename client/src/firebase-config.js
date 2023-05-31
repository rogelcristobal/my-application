// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcvpNcQBh682yo1UB1sN7WnRWMUxGXJzA",
  authDomain: "myapplication-f5777.firebaseapp.com",
  projectId: "myapplication-f5777",
  storageBucket: "myapplication-f5777.appspot.com",
  messagingSenderId: "893188122244",
  appId: "1:893188122244:web:ffbbc8d73d8f88d88a84d1"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)