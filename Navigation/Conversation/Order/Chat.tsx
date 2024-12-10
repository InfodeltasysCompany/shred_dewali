import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { sendMessage } from '../../../components/Modal/Search/FirebaseChatFunctions';
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';

const Chat = () => {
  const [state, , , , GChatstate, setGChatstate] = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [suggestedMessages] = useState([
    'Is the product still available?',
    'Can I get a discount?',
    'What is the condition of the product?',
    'How much is the shipping?',
    'Can I see more pictures?',
  ]);

  const handleSend = async () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage(''); // Clear the message input
  
      // Log current conversation data for debugging
      console.log("current conversationdata:=", GChatstate.currentConversationData);
  
      // Ensure necessary data exists in the current conversation state
      const conversationData = GChatstate.currentConversationData;
  
      if (
        conversationData &&
        conversationData.productId && 
        conversationData.productId.firebase_pid && 
        conversationData.sellerId && 
        conversationData.buyerId
      ) {
        const { productId } = conversationData.productId; // Product ID from conversation data
        const firebase_pid = conversationData.productId.firebase_pid; // Firebase PID
        const buyerId = conversationData.buyerId.firebase_uid; // Extract buyer's username as ID
        const sellerId = conversationData.productId.firebase_pid; // Extract seller's username as ID
        const senderID = state.f_id; // Sender ID from the app state (current user)
  
        // Log parameters for debugging
        console.log("firebase user prod id is:", firebase_pid);
        console.log("firebase product id is:", productId);
        console.log("buyerId is:", buyerId);
        console.log("sellerId is:", sellerId);
        console.log("text is:", message);
        console.log("senderid is:", senderID);
  
        // Validate required parameters
        if (!buyerId || !sellerId || !firebase_pid || !message || !senderID) {
          console.error("ERROR: Missing required parameters.");
          return; // Return early if any parameter is missing
        }
  
        // Send the message if all parameters are valid
        try {
          await sendMessage(productId, buyerId, firebase_pid, message, senderID);
          console.log("Message sent successfully!");
        } catch (error) {
          console.error("Failed to send message:", error);
        }
      } else {
        console.error("ERROR: Missing required conversation data.");
      }
    }
  };
  
  // Function to handle the selection of suggested messages
  const handleSuggestedMessage = (suggestion) => {
    setMessage(suggestion);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjusts for iOS/Android
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Chat Header */}
        <View style={styles.header}>
          {/* Add your header content here */}
        </View>

        {/* Chat Content */}
        <View style={styles.chatContent}>
          <Text style={styles.productDescription}>
            Chat to know more! Close the deal faster by asking more about the product or person.
          </Text>
          {/* Suggested Inputs */}
          <FlatList
            data={suggestedMessages}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestedMessage}
                onPress={() => handleSuggestedMessage(item)}
              >
                <Text style={styles.suggestedMessageText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* Chat Input */}
      <View style={styles.chatInputContainer}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 10,
    backgroundColor: '#f2f2f2',
    // borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContent: {
    flex: 1,
    // padding: 10,
    alignItems: 'center',
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
    marginTop: 10,
  },
  suggestedMessage: {
    paddingVertical: 5, 
    paddingHorizontal: 5,
    backgroundColor: '#f1f1f1',
    marginHorizontal: 5,
    // marginBottom: 35,
    borderRadius: 20,
  },
  suggestedMessageText: {
    fontSize: 14,
    color: '#007bff',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    // marginTop:-30
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flexGrow: 1,
  },
});
