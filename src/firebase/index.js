import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBFlj6sMM-Rd-egMIUCTUoVgehpcj_fWkg",
    authDomain: "credencialsia.firebaseapp.com",
    projectId: "credencialsia",
    storageBucket: "credencialsia.appspot.com",
    messagingSenderId: "55510330806",
    appId: "1:55510330806:web:ba1d76154434346e4ca517"
  };
  
  const app= initializeApp(firebaseConfig);
  const db=getFirestore(app)
  const auth=getAuth()

  export {
    db,auth
  }
  