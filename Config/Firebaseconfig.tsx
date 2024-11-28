import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDmyZ22rFftD1DZadMMzEXaZjEAsBj51p4",
  authDomain: "shreddersbay-3aee0.firebaseapp.com",
  databaseURL: "https://shreddersbay-3aee0.firebaseio.com", // Ensure this is correct for Realtime Database
  projectId: "shreddersbay-3aee0",
  storageBucket: "shreddersbay-3aee0.appspot.com",
  messagingSenderId: "254504701779",
  appId: "1:254504701779:web:107c83e48c363679589ba6",
  measurementId: "G-252HHVFFLB"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Set persistence for Firebase Auth
setPersistence(auth, getReactNativePersistence(AsyncStorage))
  .then(() => {
    console.log('Persistence set successfully');
  })
  .catch((error) => {
    console.error('Error setting persistence: ', error);
  });

// Initialize Firestore
const firestoreDb = getFirestore(app);

// Initialize Realtime Database
const realtimeDb = getDatabase(app);

// Export the initialized services
export { app, auth, firestoreDb, realtimeDb };
