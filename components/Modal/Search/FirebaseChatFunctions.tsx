import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Alert, ToastAndroid } from "react-native";
import { ref, set, get, getDatabase, orderByChild, equalTo, DatabaseReference, Query,query,onValue } from "firebase/database"; // Added `get` for checking existence
import { auth, realtimeDb } from "../../../Config/Firebaseconfig"; // Import `auth` and `realtimeDb` from your config
import { useContext } from "react";
import { AuthContext } from "../../../redux/ContextApi/UserAuthProvider";
import { v4 as uuidv4 } from "uuid";
// import { query } from "firebase/firestore";


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
const generateProductId = () => `product_${uuidv4()}`;

export const OrderCreateFirebaseRealtime = async (
  state,
  GCreateOrderAuctionState,
  setCreateOrderAuctionState,GChatstate
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
        weight:GCreateOrderAuctionState.enterWeight||"anonymous",
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
      console.log("Order saved to Firebase Realtime Database:", newOrder);
    } else {
      console.log("Resetting to empty state...");
      setCreateOrderAuctionState(emptyState);
      return null;
    }
  } catch (error) {
    console.error("Error saving order to Firebase:", error);
  }
};
// Utility to generate a unique and compact ID
const generateCompactId = (prefix) => `${prefix}_${uuidv4().split("-")[0]}`;

// // Create a conversation in Firebase
// export const CreateConversationSeller = async (firebase_prodId, buyerID, sellerID) => {
//   try {
//     console.log("CreateConversationSeller called");

//     // Fetch product details
//     const productRef = ref(realtimeDb, `products/${firebase_prodId}`);
//     const productSnapshot = await get(productRef);

//     if (!productSnapshot.exists()) {
//       console.error("Product details not found for ID:", firebase_prodId);
//       return null;
//     }
//     const productDetails = productSnapshot.val();

//     // Fetch seller details
//     const sellerRef = ref(realtimeDb, `users/${sellerID}`);
//     const sellerSnapshot = await get(sellerRef);

//     if (!sellerSnapshot.exists()) {
//       console.error("Seller details not found for ID:", sellerID);
//       return null;
//     }
//     const sellerDetails = sellerSnapshot.val();

//     // Fetch buyer details
//     const buyerRef = ref(realtimeDb, `users/${buyerID}`);
//     const buyerSnapshot = await get(buyerRef);

//     if (!buyerSnapshot.exists()) {
//       console.error("Buyer details not found for ID:", buyerID);
//       return null;
//     }
//     const buyerDetails = buyerSnapshot.val();

//     // Generate a unique ID for the conversation
//     const conversationID = `${firebase_prodId}_${buyerID}_${sellerID}`;

//     // Structure the conversation data
//     const newConversation = {
//       productID: productDetails,
//       sellerDetails,
//       buyerDetails,
//       messages: {}, // Initialize with an empty object for messages
//     };

//     // Save the new conversation to Firebase Realtime Database
//     const conversationRef = ref(realtimeDb, `conversations/${conversationID}`);
//     await set(conversationRef, newConversation);

//     console.log("Conversation created successfully:", newConversation);

//     return conversationID; // Return the conversation ID
//   } catch (error) {
//     console.error("Error creating conversation in Firebase:", error);
//     return null;
//   }
// };

export const CreateConversationSeller = async (firebase_prodId, buyerID, sellerID) => {
  const conversationID = `${firebase_prodId}_${buyerID}_${sellerID}`;
  const conversationRef = ref(realtimeDb, `conversations/${conversationID}`);

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
      // console.error("Product details not found for ID:", firebase_prodId);
      return null;
    }
    const productDetails = productSnapshot.val();

    // Fetch seller details
    const sellerRef = ref(realtimeDb, `users/${sellerID}`);
    const sellerSnapshot = await get(sellerRef);

    if (!sellerSnapshot.exists()) {
      // console.error("Seller details not found for ID:", sellerID);
      return null;
    }
    const sellerDetails = sellerSnapshot.val();

    // Fetch buyer details
    const buyerRef = ref(realtimeDb, `users/${buyerID}`);
    const buyerSnapshot = await get(buyerRef);

    if (!buyerSnapshot.exists()) {
      // console.error("Buyer details not found for ID:", buyerID);
      return null;
    }
    const buyerDetails = buyerSnapshot.val();

    // Structure the conversation data
    const newConversation = {
      productID: productDetails,
      sellerDetails,
      buyerDetails,
      messages: {}, // Initialize with an empty object for messages
    };

    // Save the new conversation to Firebase Realtime Database
    await set(conversationRef, newConversation);
    // console.log("New conversation created successfully:", newConversation);

    return newConversation; // Return the newly created conversation
  } catch (error) {
    console.error("Error creating conversation in Firebase:", error);
    return null;
  }
};



// Send a message in an existing conversation
export const sendMessage = async (conversationID, text, productID, senderID, receiverID) => {
  try {
    console.log("sendMessage called");

    // Generate a unique message ID
    const messageID = generateCompactId("message");

    // Structure the message data
    const newMessage = {
      id: messageID,
      content: text,
      status: "unread", // Default status
      timestamp: Date.now(), // Current timestamp
      productID,
      senderID,
      receiverID,
    };

    // Update the messages field in the conversation
    const messageRef = ref(realtimeDb, `conversations/${conversationID}/messages/${messageID}`);
    await set(messageRef, newMessage);

    console.log("Message sent successfully:", newMessage);

    return messageID; // Return the message ID
  } catch (error) {
    console.error("Error sending message in Firebase:", error);
    return null;
  }
};


// export const listenToMyConversations = async (
//   firebase_uid,
//   onConversationsUpdate
// ) => {
//   console.log("Fetching conversations...");

//   const conversationsRef = ref(realtimeDb, "conversations");

//   const queryAll = query(
//     conversationsRef,
//     orderByChild("buyerID"), // Testing with buyerID
//     equalTo(firebase_uid)
//   );

//   try {
//     const snapshot = await get(queryAll); // Fetch snapshot
//     console.log("Snapshot exists:", snapshot.exists());

//     if (snapshot.exists()) {
//       const data = snapshot.val();
//       console.log("Conversations data:", data);

//       const conversations = Object.entries(data).map(([id, details]) => ({
//         id,
//         ...details,
//       }));

//       // Invoke the callback with the conversations
//       onConversationsUpdate(conversations);
//     } else {
//       console.log("No conversations found.");
//       onConversationsUpdate([]);
//     }
//   } catch (error) {
//     console.error("Error fetching conversations:", error);
//   }
// };





