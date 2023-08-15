import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFlj6sMM-Rd-egMIUCTUoVgehpcj_fWkg",
  authDomain: "credencialsia.firebaseapp.com",
  projectId: "credencialsia",
  storageBucket: "credencialsia.appspot.com",
  messagingSenderId: "55510330806",
  appId: "1:55510330806:web:ba1d76154434346e4ca517"
};

initializeApp(firebaseConfig);

const auth=getAuth()

export { auth };