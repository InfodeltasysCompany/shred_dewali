import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Alert, ToastAndroid } from "react-native";
import { ref, set, get } from "firebase/database"; // Added `get` for checking existence
import { auth, realtimeDb } from "../../../Config/Firebaseconfig"; // Import `auth` and `realtimeDb` from your config

export const userCreatefirebaserealtime = async (firebase_uid, email, phone, username) => {
  if(firebase_uid && email && phone && username){
    console.log("userCreatefirebaserealtime is called");

    try {
        // Reference to the user's data in Realtime Database
        const userRef = ref(realtimeDb, `users/${firebase_uid}`);
        
        // Check if the user already exists
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
        //   Alert.alert("User Exists", "This user already exists in the database.");
        //   ToastAndroid.show("User already exists!", ToastAndroid.SHORT);
          return;
        }
    
        // If user does not exist, create the user
        await set(userRef, {
          email,
          phone_number: phone || "0", // Default to "0" if phone is not provided
          username: username || "Anonymous", // Default to "Anonymous" if username is undefined
          verify: "false", // Set to false initially
        });
    
        // Alert.alert("Success", "User created and stored successfully!");
        // ToastAndroid.show("User data saved successfully!", ToastAndroid.SHORT);
      } catch (error) {
        console.error("Error creating user:", error);
        // Alert.alert("Error", error.message);
        // ToastAndroid.show(`Error: ${error.message}`, ToastAndroid.LONG);
      }
  }else{
    console.log(`fields are empty firebaseUId${firebase_uid} uesername${username} email${email} phone${phone}`)
  }
   
};
