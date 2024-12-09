import React, { useContext, useEffect, useRef, useState } from 'react';
import { Modal, View, StyleSheet, Animated } from 'react-native';
import Header from './ChatModalHeader';
import Chats from './ChatModalChats';
import Tabs from './ChatModalTabs';
import MakeOffer from './MakeOffer';
import Chat from './Chat';
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';
import { onValue, ref } from 'firebase/database';
import { realtimeDb } from '../../../Config/Firebaseconfig';

const Chat_MakeOfferModal = ({ visible, closeModal }) => {
  const [state, , , , GChatstate] = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('Chat');
  const [ispressed, setIspressed] = useState(false);
  const [messages, setMessages] = useState([]);
  const tabanim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(tabanim, { toValue: ispressed ? 1 : 0, duration: 300, useNativeDriver: true }).start();
  }, [ispressed]);

  useEffect(() => {
    if (visible && GChatstate && state) {
      const messagesRef = ref(realtimeDb, `conversations/messages/${GChatstate?.currentConversationData?.conversationId}`);
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        if (snapshot.exists()) {
          const messagesData = snapshot.val(); // Get the data from Firebase
          const formattedMessages = Object.entries(messagesData)  // Iterate over the entries
            .map(([key, item]: [string, any]) => ({
              content: item.text || '',  // Assuming your message data has text
              status: item.status || 'unread',  // Assuming status exists
              timestamp: item.timestamp || 0,  // Assuming timestamp exists
              senderID: item.sender || '',  // Assuming sender ID exists
            }))
            .sort((a, b) => a.timestamp - b.timestamp);  // Sort messages by timestamp
  
          setMessages(formattedMessages);
        }
      });
      return () => unsubscribe();
    }
  }, [GChatstate, state, visible]);
  

  const refineData = (GChatstate) => {
    if (!GChatstate || !state) return {};
    const { buyerId, sellerId } = GChatstate.currentConversationData || {};
    return buyerId?.firebase_uid === state.f_id ? sellerId : buyerId;
  };

  const translateY = tabanim.interpolate({ inputRange: [0, 1], outputRange: [380, 600] });

  return (
    <Modal animationType="none" transparent={false} visible={visible}>
      <Header closeModal={closeModal} refineData={refineData} GChatstate={GChatstate} />
      <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
        <Chats messages={messages} state={state} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} ispressed={ispressed} setIspressed={setIspressed} />
        <View style={styles.body}>{activeTab === 'Chat' ? <Chat /> : <MakeOffer />}</View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { position: 'absolute', width: '100%', borderRadius: 10 },
  body: { flex: 1, backgroundColor: '#f1f1f1' },
});

export default Chat_MakeOfferModal;
