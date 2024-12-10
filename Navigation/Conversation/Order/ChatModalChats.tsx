import React, { useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import SendMsg from "./SendMsg";
import RecieveMsg from "./RecieveMsg";
import LoadingMessages from "./LoadingMessages";

const ChatModalChats = ({ messages, state }) => {
  const flatListRef = useRef(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading process for messages
    const loadMessages = setTimeout(() => {
      setLoading(false); // Stop loading after messages are "loaded"
    }, 2000);

    return () => clearTimeout(loadMessages); // Cleanup timeout on unmount
  }, []);

  useEffect(() => {
    if (messages.length > 0 && !loading) {
      // Automatically scroll to the bottom when new messages arrive
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages, loading]); // Trigger scroll after messages change or loading state changes

  const renderMessage = ({ item }) => {
    if (!item || !state?.f_id) return null;

    // Conditionally render sent or received messages
    return item.senderID === state.f_id ? (
      <SendMsg item={item} />
    ) : (
      <RecieveMsg item={item} />
    );
  };

  if (loading) {
    // Show loading animation while loading
    return <LoadingMessages />;
  }

  return (
    <View style={{ flex: 1, padding: 10, paddingBottom: 50,marginTop:50, }}>
      <FlatList
        ref={flatListRef}
        data={messages} // Messages in the correct order (new at the bottom)
        renderItem={renderMessage}
        keyExtractor={(item, index) =>
          item?.timestamp?.toString() || index.toString()
        }
        contentContainerStyle={{ paddingBottom: 10 }} // Add padding for better visibility
        showsVerticalScrollIndicator={false} // Hides vertical scrollbar
      />
    </View>
  );
};

export default ChatModalChats;
