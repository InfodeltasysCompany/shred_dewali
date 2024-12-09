import React, { useContext, useEffect, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { onValue, ref } from 'firebase/database';
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';
import { realtimeDb } from '../../../Config/Firebaseconfig';
import Chat_MakeOfferModal from './Chat_MakeOfferModal';

const AllChats = () => {
  const [state, , , , GChatstate, setGChatstate] = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [ischatmakeoffermodalVisible, setIschatmakeoffermodalVisible] = useState(false);

  const [animations, setAnimations] = useState({});

  useEffect(() => {
    const GetAllChats = () => {
      const chatsRef = ref(realtimeDb, `conversations/chats/${state?.f_id}`);
      onValue(chatsRef, (snapshot) => {
        if (!snapshot.exists()) {
          setChats([]);
          return;
        }

        const filteredChats = [];
        snapshot.forEach((childSnapshot) => {
          const chat = childSnapshot.val();
          if (chat?.messageId) {
            filteredChats.push({ key: childSnapshot.key, ...chat });
          }
        });
        setChats(filteredChats);

        // Initialize animation values
        const newAnimations = {};
        filteredChats.forEach((chat) => {
          newAnimations[chat.key] = new Animated.Value(0);
        });
        setAnimations(newAnimations);
      });
    };

    GetAllChats();
  }, [state?.f_id, GChatstate]);

  const startAnimation = (key) => {
    const animValue = animations[key];
    if (!animValue) return;

    animValue.stopAnimation();
    animValue.setValue(0);

    Animated.loop(
      Animated.timing(animValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      })
    ).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Chats</Text>
      {chats.length > 0 ? (
        chats.map((chat) => {
          const animatedBorderWidth = animations[chat.key]?.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 3, 0],
          });

          const animatedBorderColor = animations[chat.key]?.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ['gray', '#00457E', 'gray'],
          });

          return (
            <Animated.View
              key={chat.key}
              style={[
                styles.chatItem,
                {
                  borderWidth: animatedBorderWidth || 1,
                  borderColor: animatedBorderColor || 'gray',
                },
              ]}
            >
              <Pressable
                onPressIn={() => {
                  startAnimation(chat.key);
                  setGChatstate((prevstate) => ({
                    ...prevstate,
                    currentConversationData: chat,
                  }));
                  setIschatmakeoffermodalVisible(true);
                }}
              >
                <Text style={styles.chatText}>Message: {chat.lastMessage}</Text>
                <Text style={styles.chatText}>Sender: {chat.lastSender}</Text>
              </Pressable>
            </Animated.View>
          );
        })
      ) : (
        <Text style={styles.noChats}>No chats available</Text>
      )}

      <Chat_MakeOfferModal
        visible={ischatmakeoffermodalVisible}
        closeModal={() => setIschatmakeoffermodalVisible(false)}
      />
    </View>
  );
};

export default AllChats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatItem: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  chatText: {
    fontSize: 16,
  },
  noChats: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});
