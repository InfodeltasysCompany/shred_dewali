


import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Alert, ToastAndroid } from "react-native";
import { ref, set, get, getDatabase, orderByChild, equalTo, DatabaseReference, Query, query, onValue } from "firebase/database"; 
import { auth, realtimeDb } from "../../../Config/Firebaseconfig"; 
import { useContext } from "react";
import { AuthContext } from "../../../redux/ContextApi/UserAuthProvider";
import { v4 as uuidv4 } from "uuid";

// Function to create user data in Firebase Realtime Database
export const userCreatefirebaserealtime = async (firebase_uid, email, phone, username) => {
  if (firebase_uid && email && phone && username) {
    console.log("userCreatefirebaserealtime is called");

    try {
      // Reference to the user's data in Realtime Database
      const userRef = ref(realtimeDb, `users/${firebase_uid}`);

      // Check if the user already exists
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        return;
      }

      // If user does not exist, create the user
      await set(userRef, {
        firebase_uid,
        email,
        phone_number: phone || "0", // Default to "0" if phone is not provided
        username: username || "Anonymous", // Default to "Anonymous" if username is undefined
        verify: "false", // Set to false initially
      });

    } catch (error) {
      console.error("Error creating user:", error);
    }
  } else {
    console.log(`Fields are empty firebase_uid: ${firebase_uid}, username: ${username}, email: ${email}, phone: ${phone}`);
  }
};

// Helper function to generate a unique product ID
const generateProductId = () => `product_${uuidv4()}`;

// Function to create an order in Firebase Realtime Database
export const OrderCreateFirebaseRealtime = async (
  state, 
  GCreateOrderAuctionState, 
  setCreateOrderAuctionState, 
  GChatstate
) => {
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

    const isEmptyState = (obj) => {
      return Object.keys(obj).every(
        (key) => JSON.stringify(obj[key]) === JSON.stringify(emptyState[key])
      );
    };

    if (!isEmptyState(GCreateOrderAuctionState)) {
      console.log("Creating a new order in Firebase...");

      const newOrder = {
        productId: generateProductId(),
        description: GCreateOrderAuctionState.description || "No description provided",
        firebase_pid: GChatstate.userdetails.firebase_uid || "default_uid",
        image: GCreateOrderAuctionState.images || [],
        price: GCreateOrderAuctionState.enterPrice || 0,
        title: GCreateOrderAuctionState.title || "Untitled",
        userId: state.userIdApp || "anonymous",
        weight: GCreateOrderAuctionState.enterWeight || "anonymous",
      };

      // Validate newOrder before saving
      const hasUndefined = Object.values(newOrder).some((value) => value === undefined);
      if (hasUndefined) {
        console.error("Invalid data: newOrder contains undefined values:", newOrder);
        return;
      }

      setCreateOrderAuctionState(newOrder);

      const orderRef = ref(realtimeDb, `product/${newOrder.productId}`);
      await set(orderRef, newOrder);
      return newOrder.productId;
    } else {
      console.log("Resetting to empty state...");
      setCreateOrderAuctionState(emptyState);
      return null;
    }
  } catch (error) {
    console.error("Error saving order to Firebase:", error);
  }
};

// Helper function to generate a unique and compact ID
const generateCompactId = (prefix) => `${prefix}_${uuidv4().split("-")[0]}`;
// Function to create a new conversation
export const CreateConversationSeller = async (firebase_prodId, buyerID, sellerID) => { 
  const conversationID = `${firebase_prodId}_seller_${sellerID}_buyer_${buyerID}`;
  const productRef = ref(realtimeDb, `product/${firebase_prodId}`);

  try {
    console.log("Checking for product details at path:", `product/${firebase_prodId}`);

    // Fetch product details
    const productSnapshot = await get(productRef);
    if (!productSnapshot.exists()) {
      console.error("Product details not found for ID:", firebase_prodId);
      return null;
    }

    const productDetails = productSnapshot.val();
    console.log("Product details found:", productDetails);

    // Check if the conversation already exists under the product node
    const conversationRef = ref(realtimeDb, `conversations/${sellerID}/${firebase_prodId}/${conversationID}`);
    const conversationSnapshot = await get(conversationRef);
    if (conversationSnapshot.exists()) {
      console.log(`Conversation already exists for ID: ${conversationID}`);
      return conversationSnapshot.val(); // Return the existing conversation
    }

    console.log("Creating a new conversation...");

    // Fetch seller details
    const sellerRef = ref(realtimeDb, `users/${sellerID}`);
    const sellerSnapshot = await get(sellerRef);
    if (!sellerSnapshot.exists()) {
      console.error("Seller details not found for ID:", sellerID);
      return null;
    }
    const sellerDetails = sellerSnapshot.val();

    // Fetch buyer details
    const buyerRef = ref(realtimeDb, `users/${buyerID}`);
    const buyerSnapshot = await get(buyerRef);
    if (!buyerSnapshot.exists()) {
      console.error("Buyer details not found for ID:", buyerID);
      return null;
    }
    const buyerDetails = buyerSnapshot.val();

    // Structure the conversation data
    const newConversation = {
      sellerDetails,   // Seller details inside conversation
      prodDetails: productDetails, // Product details inside conversation
      buyerDetails,    // Buyer details inside conversation
      messages: {},    // Initialize with an empty object for messages
    };

    // Save the conversation data under the seller's product node
    await set(conversationRef, newConversation);
    console.log("New conversation created successfully:", newConversation);

    return newConversation; // Return the newly created conversation
  } catch (error) {
    console.error("Error creating conversation in Firebase:", error);
    return null;
  }
};

// Function to send a message in the conversation
export const sendMessage = async (firebase_prodId, buyerID, sellerID, text, senderID) => {
  // Validate parameters to ensure none of them are undefined or invalid
  if (!firebase_prodId || !buyerID || !sellerID || !text || !senderID) {
    console.error("Error: Missing required parameters.");
    return null; // Return early if any required parameter is missing
  }

  const conversationID = `${firebase_prodId}_seller_${sellerID}_buyer_${buyerID}`;
  const messageID = `${Date.now()}`; // Create a unique ID based on timestamp

  try {
    console.log("Sending message to conversation:", conversationID);

    // Reference to the conversation messages in Firebase
    const messageRef = ref(realtimeDb, `conversations/${sellerID}/${firebase_prodId}/${conversationID}/messages/${messageID}`);

    // Structure the new message
    const newMessage = {
      sender: senderID,
      text: text,
      timestamp: Date.now(), // Use current timestamp
      status: "unread", // Default status
    };

    // Save the new message to Firebase
    await set(messageRef, newMessage);
    console.log("Message sent successfully:", newMessage);

    return messageID; // Return the message ID
  } catch (error) {
    console.error("Error sending message:", error);
    return null; // Return null in case of error
  }
};
