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
  /*
  
   const [GChatState, setGChatState] = useState({
    productdetails: {},
    userdetails: {},
    currentConversationData:{},
    // chatCurrentData:{},
  });
  */ 

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      console.log("current conversationdata:=",GChatstate.currentConversationData);
// Log and validate the current conversation data
console.log("current conversationdata:=", GChatstate.currentConversationData);

if (
  GChatstate.currentConversationData &&
  GChatstate.currentConversationData.productID &&
  GChatstate.currentConversationData.productID.firebase_pid
) {
  // Extract necessary values
  const { productID } = GChatstate.currentConversationData;
  const { firebase_pid } = productID;

  // Construct the conversation ID
  const conversationID = `${productID.productId}_${state.f_id}_${firebase_pid}`;

  // Call the sendMessage function
  sendMessage(
    conversationID,
    message, // Text message to send
    productID.productId,
    state.f_id, // Sender ID
    firebase_pid // Receiver ID
  );
} else {
  console.error("Invalid conversation data or productID is missing.");
}
      
    }
  };

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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContent: {
    flex: 1,
    padding: 10,
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
    paddingVertical: 10, // Adjust vertical padding (top and bottom)
    paddingHorizontal: 15, // Adjust horizontal padding
    backgroundColor: '#f1f1f1',
    marginHorizontal: 5,
    marginBottom: 35, // Add spacing between items
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
