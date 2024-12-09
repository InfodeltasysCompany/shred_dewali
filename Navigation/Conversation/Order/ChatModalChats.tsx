import React, { useEffect, useRef } from 'react';
import { FlatList, View } from 'react-native';
import SendMsg from './SendMsg';
import RecieveMsg from './RecieveMsg';

const ChatModalChats = ({ messages, state }) => {
  const flatListRef = useRef(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true }); // Scroll to the bottom of the list
    }
  }, [messages]);

  const renderMessage = ({ item }) => {
    if (!item || !state?.f_id) return null;
    // Show messages based on whether it's sent or received
    return item.senderID !== state.f_id ? (
      <SendMsg item={item} />
    ) : (
      <RecieveMsg item={item} />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => item?.timestamp?.toString() || index.toString()}
        inverted // Ensures new messages appear at the bottom
        contentContainerStyle={{ paddingBottom: 10 }} // Add some padding at the bottom for better visibility
      />
    </View>
  );
};

export default ChatModalChats;
