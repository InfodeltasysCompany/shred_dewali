


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

// Function to create a conversation for the seller
export const CreateConversationSeller = async (firebase_prodId, buyerID, sellerID) => {
  const conversationID = `${firebase_prodId}_seller_${sellerID}_buyer_${buyerID}`;
  const conversationRef = ref(realtimeDb, `conversations/${sellerID}/${firebase_prodId}`);

  try {
    // Check if the conversation already exists
    const conversationSnapshot = await get(conversationRef);

    if (conversationSnapshot.exists()) {
      console.log(`Conversation already exists for ID: ${conversationID}`);
      return conversationSnapshot.val(); // Return the existing conversation
    }

    console.log("Creating a new conversation...");

    // Fetch product details
    const productRef = ref(realtimeDb, `product/${firebase_prodId}`);
    const productSnapshot = await get(productRef);
    if (!productSnapshot.exists()) {
      console.error("Product details not found for ID:", firebase_prodId);
      return null;
    }
    const productDetails = productSnapshot.val();

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
      conversationID,
      sellerDetails,
      buyerDetails,
      prodDetails: productDetails,
      messages: {} // Initialize with an empty object for messages
    };

    // Save the new conversation to Firebase Realtime Database
    await set(conversationRef, newConversation);

    console.log("New conversation created successfully:", newConversation);

    return newConversation; // Return the newly created conversation
  } catch (error) {
    console.error("Error creating conversation in Firebase:", error);
    return null;
  }
};

// Function to send a message in a conversation
export const sendMessage = async (firebase_prodId, buyerID, sellerID, text, senderID) => {
  console.warn("firebase prod id is :",firebase_prodId);
console.warn("buyerId is:",buyerID);
console.warn("sellerId is:",sellerID);
console.warn("text is :",text);
console.warn("senderid is:",senderID);
  if (!firebase_prodId || !buyerID || !sellerID || !text || !senderID) {
    console.error("ERROR: Missing required parameters.");
    return "Invalid parameters provided";
  }

  const conversationID = `${firebase_prodId}_seller_${sellerID}_buyer_${buyerID}`;
  const conversationRef = ref(realtimeDb, `conversations/${sellerID}/${firebase_prodId}`);

  try {
    console.log("sendMessage called");

    // Check if the conversation exists
    const conversationSnapshot = await get(conversationRef);
    if (!conversationSnapshot.exists()) {
      // If conversation does not exist, create it first
      console.log("Conversation not found, creating new conversation...");

      // Fetch product details
      const productRef = ref(realtimeDb, `product/${firebase_prodId}`);
      const productSnapshot = await get(productRef);
      if (!productSnapshot.exists()) {
        console.error("ERROR: Product details not found for ID:", firebase_prodId);
        return "Product details not found";
      }
      const productDetails = productSnapshot.val();

      // Fetch seller details
      const sellerRef = ref(realtimeDb, `users/${sellerID}`);
      const sellerSnapshot = await get(sellerRef);
      if (!sellerSnapshot.exists()) {
        console.error("ERROR: Seller details not found for ID:", sellerID);
        return "Seller details not found";
      }
      const sellerDetails = sellerSnapshot.val();

      // Fetch buyer details
      const buyerRef = ref(realtimeDb, `users/${buyerID}`);
      const buyerSnapshot = await get(buyerRef);
      if (!buyerSnapshot.exists()) {
        console.error("ERROR: Buyer details not found for ID:", buyerID);
        return "Buyer details not found";
      }
      const buyerDetails = buyerSnapshot.val();

      // Structure the conversation data
      const newConversation = {
        conversationID,
        sellerDetails,
        buyerDetails,
        prodDetails: productDetails,
        messages: {} // Initialize with an empty object for messages
      };

      // Save the new conversation to Firebase Realtime Database
      await set(conversationRef, newConversation);
      console.log("New conversation created successfully:", newConversation);
    } else {
      console.log("Conversation already exists, adding message...");
    }

    // Generate a unique message ID
    const messageID = generateCompactId("message");

    // Structure the message data
    const newMessage = {
      sender: senderID,
      text: text,
      timestamp: Date.now(), // Current timestamp
      status: "unread", // Default status
    };

    // Reference to the conversation messages in Firebase Realtime Database
    const messageRef = ref(realtimeDb, `conversations/${sellerID}/${firebase_prodId}/messages/${messageID}`);

    // Save the new message to Firebase Realtime Database
    await set(messageRef, newMessage);

    console.log("Message sent successfully:", newMessage);

    return messageID; // Return the message ID
  } catch (error) {
    console.error("ERROR: Error sending message in Firebase:", error);
    return "Error sending message";
  }
};

