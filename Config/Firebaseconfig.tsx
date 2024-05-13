import {getApp,getApps,initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth";

import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyB72iqhP8VPJFi49H8h3UNb2N8SQeG9htg",
    authDomain: "shreddersbay-6e906.firebaseapp.com",
    projectId: "shreddersbay-6e906",
    storageBucket: "shreddersbay-6e906.appspot.com",
    messagingSenderId: "763429625259",
    appId: "1:763429625259:web:a3e0c04dc16541a82386ee",
    measurementId: "G-4JHRZX1430"
  };

  const app = getApps.length> 0 ? getApp() : initializeApp(firebaseConfig)

  // const firebaseAuth = getAuth(app)

  const firebaseDB = getFirestore(app);

  // export { app, firebaseAuth, firebaseDB}
  export { app,firebaseDB}