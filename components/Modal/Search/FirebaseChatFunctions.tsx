import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Alert, ToastAndroid } from "react-native";
import { ref, set, get, getDatabase } from "firebase/database"; // Added `get` for checking existence
import { auth, realtimeDb } from "../../../Config/Firebaseconfig"; // Import `auth` and `realtimeDb` from your config
import { useContext } from "react";
import { AuthContext } from "../../../redux/ContextApi/UserAuthProvider";

export const userCreatefirebaserealtime = async (firebase_uid, email, phone, username) => {
  if (firebase_uid && email && phone && username) {
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
  } else {
    console.log(`fields are empty firebaseUId${firebase_uid} uesername${username} email${email} phone${phone}`)
  }

};
// Helper function to generate a unique product ID
const generateProductId = () => `product_${Math.random().toString(36).substr(2, 9)}`;

export const OrderCreateFirebaseRealtime = async (
  state,
  GCreateOrderAuctionState,
  setCreateOrderAuctionState
) => {
  // Define the empty state
  const emptyState = {
    userId: "",
    firebase_uid: "",
    category: "",
    categoryId: "",
    catagoryImgSource: "",
    subcategory: "",
    minimumPresetPrice: "",
    title: "",
    description: "",
    enterPrice: "",
    enterWeight: "",
    images: [],
    address: {},
    date: "",
    isAuction: false,
    startDate: "",
    endDate: "",
    productId: "",
  };

  try {
    console.log("OrderCreateFirebaseRealtime called");

    // Check if the current state is not empty
    if (JSON.stringify(GCreateOrderAuctionState) !== JSON.stringify(emptyState)) {
      console.log("Creating a new order in Firebase...");

      // Generate new data
      const newOrder = {
        productId: generateProductId(),
        description: GCreateOrderAuctionState.description,
        firebase_pid: GCreateOrderAuctionState.firebase_uid,
        image: GCreateOrderAuctionState.images,
        price: GCreateOrderAuctionState.enterPrice,
        title: GCreateOrderAuctionState.title,
        userId: state.userIdApp,
      };

      // Update local state
      setCreateOrderAuctionState(newOrder);

      // Save data to Firebase Realtime Database
      const orderRef = ref(realtimeDb, `product/${newOrder.productId}`); // Define a path for the new order
      await set(orderRef, newOrder); // Save the new order to the database
      console.log("Order saved to Firebase Realtime Database:", newOrder);
    } else {
      console.log("Resetting to empty state...");
      // Reset the state to the empty state
      setCreateOrderAuctionState(emptyState);
    }
  } catch (error) {
    console.error("Error saving order to Firebase:", error);
  }
};