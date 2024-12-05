import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { get, ref } from 'firebase/database';  // Import Firebase functions
import { realtimeDb } from '../../../Config/Firebaseconfig';  // Import your Firebase config
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';

interface Message {
  sender: string;
  text: string;
  status: string;
  timestamp: number;
}

interface Conversation {
  conversationId: string;
  sellerDetails: any;
  productDetails: any;
  buyerDetails: any;
  messages: { [key: string]: Message } | null; 
}

const AllChats = () => {
  const [state, , , , GChatstate, setGChatstate] = useContext(AuthContext);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = state.f_id;

  useEffect(() => {
    const fetchConversations = async () => {
      console.log("firebase_fid", userId);
      try {
        const conversationsRef = ref(realtimeDb, `conversations/${userId}`);
        const conversationsSnapshot = await get(conversationsRef);

        console.log("Conversations Snapshot:", conversationsSnapshot.val());  // Log the raw snapshot

        if (!conversationsSnapshot.exists()) {
          console.error("No conversations found for this user.");
          setError("No conversations found.");
          setLoading(false);
          return;
        }

        const conversationsData = conversationsSnapshot.val();
        const conversationList: Conversation[] = [];

        // Loop through the products for this user
        for (let productId in conversationsData) {
          const productData = conversationsData[productId];

          // Loop through the conversation IDs for each product
          for (let conversationId in productData) {
            const conversation = productData[conversationId];

            // Log details for debugging
            console.log("Product ID:", productId);
            console.log("Conversation ID:", conversationId);
            console.log("Seller Details:", conversation.sellerDetails);
            console.log("Buyer Details:", conversation.buyerDetails);
            console.log("Product Details:", conversation.prodDetails); 
            console.log("Messages:", conversation.messages);

            const sellerDetails = conversation.sellerDetails || {};
            const productDetails = conversation.prodDetails || {};
            const buyerDetails = conversation.buyerDetails || {};
            const messages = conversation.messages || {};  

            conversationList.push({
              conversationId,
              sellerDetails,
              productDetails,
              buyerDetails,
              messages,
            });
          }
        }

        setConversations(conversationList);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching conversation data:", err);
        setError(`Failed to load conversation data: ${err.message || err}`);
        setLoading(false);
      }
    };

    fetchConversations();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Chats</Text>

      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.conversationId}
          renderItem={({ item }) => (
            <View style={styles.chatItem}>
              <Text style={styles.chatTitle}>Product: {item.productDetails.title}</Text>
              <Text>Description: {item.productDetails.description}</Text>
              <Text>Price: {item.productDetails.price}</Text>
              <Text>Weight: {item.productDetails.weight}</Text>

              <Text style={styles.chatTitle}>Seller:</Text>
              <Text>Email: {item.sellerDetails.email}</Text>
              <Text>Phone: {item.sellerDetails.phone_number}</Text>
              <Text>Username: {item.sellerDetails.username}</Text>
              <Text>Verified: {item.sellerDetails.verify}</Text>

              <Text style={styles.chatTitle}>Buyer:</Text>
              <Text>Email: {item.buyerDetails.email}</Text>
              <Text>Phone: {item.buyerDetails.phone_number}</Text>
              <Text>Username: {item?item.buyerDetails.username:"no details"}</Text>
              <Text>Verified: {item?item.buyerDetails.verify:"no details"}</Text>

              <FlatList
                data={Object.values(item.messages)}  
                keyExtractor={(message, index) => index.toString()}
                renderItem={({ item }: { item: Message }) => (
                  <View style={styles.message}>
                    <Text>{item?item.sender:"no details"}</Text>
                    <Text>Status: {item?item.status:"no details"}</Text>
                    <Text>Timestamp: {new Date(item?item.timestamp:"no details").toLocaleString()}</Text>
                  </View>
                )}
              />
            </View>
          )}
        />
      ) : (
        <Text>No conversations found.</Text>
      )}
    </View>
  );
};

export default AllChats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  chatItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chatTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
