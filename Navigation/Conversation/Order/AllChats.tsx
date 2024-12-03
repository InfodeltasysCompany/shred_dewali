// import { StyleSheet, Text, View } from 'react-native';
// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';
// import { ref, get, query, orderByChild, equalTo } from "firebase/database"; 
// import { realtimeDb } from '../../../Config/Firebaseconfig';

// const AllChats = () => {
//   const [state] = useContext(AuthContext);
//   const firebase_uid = state?.f_id; // Firebase UID from context

//   const [Conversations, setConversations] = useState([]); // State to hold conversations

//   // Function to fetch conversations
//   const listenToMyConversations = async (firebase_uid, onConversationsUpdate) => {
//     console.log("Fetching conversations...");
    
//     // Reference to the "conversations" node in the Realtime Database
//     const conversationsRef = ref(realtimeDb, "conversations");
    
//     // Query to get conversations where the buyerID or sellerID matches the firebase_uid
//     const queryAll = query(
//       conversationsRef,
//       orderByChild("buyerID"), // Order by buyerID
//       equalTo(firebase_uid)     // Match the firebase_uid to the buyerID field
//     );

//     try {
//       // Fetch snapshot of the conversations
//       const snapshot = await get(queryAll);
//       console.log("Snapshot exists:", snapshot.exists());

//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         console.log("Conversations data:", data);

//         // Convert the data into an array of conversation objects
//         const conversations = Object.entries(data).map(([id, details]) => ({
//           id,
//           ...details,
//         }));

//         // Invoke the callback with the fetched conversations
//         onConversationsUpdate(conversations);
//       } else {
//         console.log("No conversations found.");
//         onConversationsUpdate([]); // Return empty array if no conversations are found
//       }
//     } catch (error) {
//       console.error("Error fetching conversations:", error);
//       onConversationsUpdate([]);  // Return empty array in case of error
//     }
//   };

//   // Fetch conversations on component mount or firebase_uid change
//   useEffect(() => {
//     if (firebase_uid) {
//       listenToMyConversations(firebase_uid, (fetchedConversations) => {
//         console.log("Fetched conversations:", fetchedConversations);
//         setConversations(fetchedConversations); // Update state with fetched conversations
//       });
//     } else {
//       console.log("No Firebase UID found. Please log in.");
//     }
//   }, [firebase_uid]);  // This effect will run when firebase_uid changes

//   return (
//     <View style={styles.container}>
//       <Text>AllChats</Text>
//       {/* Render conversations if available */}
//       {Conversations.length > 0 ? (
//         Conversations.map((conversation) => (
//           <Text key={conversation.id}>{conversation.id}</Text> // Display conversation ID
//         ))
//       ) : (
//         <Text>No conversations found</Text> // Show message if no conversations
//       )}
//     </View>
//   );
// }

// export default AllChats;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AllChats = () => {
  return (
    <View>
      <Text>AllChats</Text>
    </View>
  )
}

export default AllChats

const styles = StyleSheet.create({})