


import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Alert, ToastAndroid } from "react-native";
import { ref, set, get, getDatabase, orderByChild, equalTo, DatabaseReference, Query, query, onValue, update } from "firebase/database"; 
import { auth, realtimeDb } from "../../../Config/Firebaseconfig"; 
import { useContext } from "react";
import { AuthContext } from "../../../redux/ContextApi/UserAuthProvider";
import { v4 as uuidv4 } from "uuid";

// Function to create user data in Firebase Realtime Database
// export const userCreatefirebaserealtime = async (firebase_uid, email, phone, username) => {
//   if (firebase_uid && email && phone && username) {
//     console.log("userCreatefirebaserealtime is called");

//     try {
//       // Reference to the user's data in Realtime Database
//       const userRef = ref(realtimeDb, `users/${firebase_uid}`);

//       // Check if the user already exists
//       const snapshot = await get(userRef);
//       if (snapshot.exists()) {
//         return;
//       }

//       // If user does not exist, create the user
//       await set(userRef, {
//         firebase_uid,
//         email,
//         phone_number: phone || "0", // Default to "0" if phone is not provided
//         username: username || "Anonymous", // Default to "Anonymous" if username is undefined
//         verify: "false", // Set to false initially
//       });

//     } catch (error) {
//       console.error("Error creating user:", error);
//     }
//   } else {
//     console.log(`Fields are empty firebase_uid: ${firebase_uid}, username: ${username}, email: ${email}, phone: ${phone}`);
//   }
// };
// Define the user data structure
interface UserData {
  email?: string;
  phone_number?: string;
  username?: string;
  verify?: string;
}

export const userCreatefirebaserealtime = async (
  firebase_uid: string,
  email: string,
  phone: string,
  username: string
) => {
  if (firebase_uid && email && phone && username) {
    console.log("userCreatefirebaserealtime is called");

    try {
      // Reference to the user's data in Realtime Database
      const userRef = ref(realtimeDb, `users/${firebase_uid}`);

      // Check if the user already exists
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const existingData: UserData = snapshot.val();

        // Prepare the fields to be updated if they don't exist
        const updates: Partial<UserData> = {};
        if (!existingData.email) updates.email = email;
        if (!existingData.phone_number) updates.phone_number = phone || "0";
        if (!existingData.username) updates.username = username || "Anonymous";
        if (existingData.verify === undefined) updates.verify = "false";

        if (Object.keys(updates).length > 0) {
          // Update missing fields
          await update(userRef, updates);
          console.log("User data updated with missing fields:", updates);
        } else {
          console.log("No updates needed. All fields exist.");
        }
      } else {
        // If user does not exist, create the user
        await set(userRef, {
          firebase_uid,
          email,
          phone_number: phone || "0",
          username: username || "Anonymous",
          verify: "false",
        });
        console.log("New user created.");
      }
    } catch (error) {
      console.error("Error creating or updating user:", error);
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
        firebase_pid: state.f_id || "default_uid",
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


export const CreateConversationSeller = async (productId, buyerID, sellerID) => {
  if (!productId || !buyerID || !sellerID) {
    console.error("Missing required parameters:", { productId, buyerID, sellerID });
    return null;
  }

  const conversationID = `${productId}_seller_${sellerID}_buyer_${buyerID}`;
  const productRef = ref(realtimeDb, `product/${productId}`);
  console.log("buyerId:", buyerID);
  console.log("sellerId:", sellerID);
  console.log("productId:", productId);

  try {
    // Fetch product details
    const productSnapshot = await get(productRef);
    if (!productSnapshot.exists()) {
      console.error("Product details not found for ID:", productId);
      return null;
    }
    const productDetails = productSnapshot.val();
    console.log("Product details found:", productDetails);

    // Check if the conversation already exists
    const conversationRef = ref(realtimeDb, `conversations/chats/${buyerID}/${conversationID}`);
    const conversationSnapshot = await get(conversationRef);
    if (conversationSnapshot.exists()) {
      console.log(`Conversation already exists for ID: ${conversationID}`);
      return conversationSnapshot.val();
    }

    console.log("Creating a new conversation...");

    // Fetch seller and buyer details
    const [sellerSnapshot, buyerSnapshot] = await Promise.all([
      get(ref(realtimeDb, `users/${sellerID}`)),
      get(ref(realtimeDb, `users/${buyerID}`)),
    ]);

    if (!sellerSnapshot.exists()) {
      console.error("Seller details not found for ID:", sellerID);
      return null;
    }

    if (!buyerSnapshot.exists()) {
      console.error("Buyer details not found for ID:", buyerID);
      return null;
    }

    const sellerDetails = sellerSnapshot.val();
    const buyerDetails = buyerSnapshot.val();

    // Prepare conversation data
    const newConversation = {
      conversationId: conversationID,
      productId: productDetails,
      buyerId: buyerDetails,
      sellerId: sellerDetails,
      lastSender: null,
      lastMessage: null,
      lastMessageTime: null,
      messageId: null,
      status: null,
    };

    // Save the conversation under the buyer and seller nodes
    if(buyerID !== sellerID){
      await Promise.all([
        set(ref(realtimeDb, `conversations/chats/${buyerID}/${conversationID}`), newConversation),
        set(ref(realtimeDb, `conversations/chats/${sellerID}/${conversationID}`), newConversation),
      ]);
    }
    

    console.log("New conversation created successfully:", newConversation);
    return newConversation;
  } catch (error) {
    console.error("Error creating conversation in Firebase:", error);
    return null;
  }
};






export const sendMessage = async (productId, buyerID, sellerID, text, senderID) => { 
  // Validate parameters to ensure none of them are undefined or invalid
  if (!productId || !buyerID || !sellerID || !text || !senderID) {
    console.error("Error: Missing required parameters.");
    return null; // Return early if any required parameter is missing
  }

  const conversationID = `${productId}_seller_${sellerID}_buyer_${buyerID}`;
  const messageID = `${Date.now()}`; // Create a unique ID based on timestamp

  try {
    console.log("Sending message to conversation:", conversationID);

    // Reference to the conversation messages in Firebase
    const createMessageRef = ref(realtimeDb, `conversations/messages/${conversationID}/${messageID}`);
    
    // Reference to the root conversation data
    const sellerUpdateRef = ref(realtimeDb, `conversations/chats/${sellerID}/${conversationID}`);
    const buyerUpdateRef = ref(realtimeDb, `conversations/chats/${buyerID}/${conversationID}`);

    
    // Structure the new message
    const newMessage = {
      messageId: messageID,
      sender: senderID,
      text: text,
      timestamp: Date.now(), // Use current timestamp
      status: "unread", // Default status
    };

    // Structure the new conversation data (to update last message details)
    const updatedConversationData = {
      lastSender: senderID,
      lastMessage: text,
      lastMessageTime: newMessage.timestamp,
      messageId: messageID,
      status: "unread", // Default status for root
    };

    // Save the new message to the conversation's messages node
    await set(createMessageRef, newMessage);
    console.log("Message sent successfully:", newMessage);

    // Update the conversation's root-level data for both seller and buyer
    await update(buyerUpdateRef, {
      [`lastSender`]: senderID,
      [`lastMessage`]: text,
      [`lastMessageTime`]: newMessage.timestamp,
      [`messageId`]: messageID,
      [`status`]: "unread", // Set status for the buyer
     
    });
    await update(sellerUpdateRef,{
      [`lastSender`]: senderID,
      [`lastMessage`]: text,
      [`lastMessageTime`]: newMessage.timestamp,
      [`messageId`]: messageID,
      [`status`]: "unread", // Set status for the seller
    })

    console.log("Conversation updated successfully.");

    return messageID; // Return the message ID
  } catch (error) {
    console.error("Error sending message:", error);
    return null; // Return null in case of error
  }
};


const getAllChats = async (userID) => {
  if (!userID) {
    console.error("Error: Missing required parameters.");
    return null;
  }

  const userChatsRef = ref(realtimeDb, `conversation/chats/${userID}`);
  const chatsQuery = query(userChatsRef, orderByChild("messageId"));

  try {
    const snapshot = await get(chatsQuery);
    if (!snapshot.exists()) {
      console.log("No chats found.");
      return {};
    }

    // Filter out conversations with `null` messageId
    const filteredChats = {};
    snapshot.forEach((childSnapshot) => {
      const chat = childSnapshot.val();
      if (chat.messageId) {
        filteredChats[childSnapshot.key] = chat;
      }
    });

    console.log("Filtered Chats:", filteredChats);
    return filteredChats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return null;
  }
};

const getAllSeller = async (userID) => {
  if (!userID) {
    console.error("Error: Missing required parameters.");
    return null;
  }

  const userChatsRef = ref(realtimeDb, `conversation/chats/${userID}`);
  const chatsQuery = query(userChatsRef, orderByChild("messageId"));

  try {
    const snapshot = await get(chatsQuery);
    if (!snapshot.exists()) {
      console.log("No chats found.");
      return {};
    }

    // Filter out conversations with `null` messageId
    const filteredChats = {};
    snapshot.forEach((childSnapshot) => {
      const chat = childSnapshot.val();
      if (chat.messageId && chat.productId.productId === userID) {
        filteredChats[childSnapshot.key] = chat;
      }
    });

    console.log("Filtered Chats:", filteredChats);
    return filteredChats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return null;
  }
};

const getAllBuyer = async (userID) => {
  if (!userID) {
    console.error("Error: Missing required parameters.");
    return null;
  }

  const userChatsRef = ref(realtimeDb, `conversation/chats/${userID}`);
  const chatsQuery = query(userChatsRef, orderByChild("messageId"));

  try {
    const snapshot = await get(chatsQuery);
    if (!snapshot.exists()) {
      console.log("No chats found.");
      return {};
    }

    // Filter out conversations with `null` messageId
    const filteredChats = {};
    snapshot.forEach((childSnapshot) => {
      const chat = childSnapshot.val();
      if (chat.messageId && chat.productId.productId !== userID) {
        filteredChats[childSnapshot.key] = chat;
      }
    });

    console.log("Filtered Chats:", filteredChats);
    return filteredChats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return null;
  }
};