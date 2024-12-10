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
  const [isPressed, setIsPressed] = useState(false);
  const [messages, setMessages] = useState([]);
  const tabAnim = useRef(new Animated.Value(0)).current;
  const chatsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(tabAnim, {
      toValue: isPressed ? 1 : 0,
      friction: 5,
      tension: 40,
      useNativeDriver: false,
    }).start();

    Animated.spring(chatsAnim, {
      toValue: isPressed ? 1 : 0,
      friction: 5,
      tension: 40,
      useNativeDriver: false,
    }).start();
  }, [isPressed]);

  useEffect(() => {
    if (visible && GChatstate && state) {
      const messagesRef = ref(
        realtimeDb,
        `conversations/messages/${GChatstate?.currentConversationData?.conversationId}`
      );
      const unsubscribe = onValue(messagesRef, (snapshot) => {
        if (snapshot.exists()) {
          const messagesData = snapshot.val();
          const formattedMessages = Object.entries(messagesData)
          .map(([key, item]: [string, any]) => ({
            content: item.text || '',
            status: item.status || 'unread',
            timestamp: item.timestamp || 0,
            senderID: item.sender || '',
          }))
            .sort((a, b) => a.timestamp - b.timestamp);

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

  const chatHeight = chatsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['95%', '75%'],
  });

  const tabsHeight = tabAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['9%', '30%'],
  });

  return (
    <Modal animationType="none" transparent={false} visible={visible}>
      <View style={{marginBottom:60}}>
      <Header closeModal={closeModal} refineData={refineData} GChatstate={GChatstate} />

      </View>

      {/* Chats Section */}
      <Animated.View style={[styles.chatsContainer, { height: chatHeight }]}>
        <Chats messages={messages} state={state} />
      </Animated.View>

      {/* Tabs Section */}
      <Animated.View style={[styles.tabsContainer, { height: tabsHeight }]}>
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ispressed={isPressed}
          setIspressed={setIsPressed}
        />
        <View style={styles.body}>
          {activeTab === 'Chat' ? <Chat /> : <MakeOffer />}
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  chatsContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  tabsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
  body: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
});

export default Chat_MakeOfferModal;
