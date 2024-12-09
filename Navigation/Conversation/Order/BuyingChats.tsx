import { Animated, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';
import { onValue, ref } from 'firebase/database';
import { realtimeDb } from '../../../Config/Firebaseconfig';
import Chat_MakeOfferModal from './Chat_MakeOfferModal';

const BuyingChats = () => {
  const [state, , , , GChatstate, setGChatstate] = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [ischatmakeoffermodalVisible, setIschatmakeoffermodalVisible] = useState(false);

  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const GetAllChats = () => {
      console.log('firebase_uid:', state?.f_id);
      const chatsRef = ref(realtimeDb, `conversations/chats/${state?.f_id}`);
      const unsubscribe = onValue(chatsRef, (snapshot) => {
        if (!snapshot.exists()) {
          console.log('No chats found.');
          setChats([]);
          return;
        }

        const filteredChats = [];
        snapshot.forEach((childSnapshot) => {
          const chat = childSnapshot.val();
          // if (chat?.messageId) {
          //   filteredChats.push({ key: childSnapshot.key, ...chat });
          // }
          if (chat?.messageId && chat?.productId?.firebase_pid !== state.f_id) {
            filteredChats.push({ key: childSnapshot.key, ...chat }); // Add key for easier rendering
          }
        });
        setChats(filteredChats);
      });

      return () => unsubscribe(); // Clean up listener
    };

    GetAllChats();
  }, [state?.f_id, GChatstate]);

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(borderAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        })
      ).start();
    };
    startAnimation();
  }, [borderAnim]);

  const refineData = (chat) => {
    const {buyerId,conversationId,productId,sellerId} = chat;
   if(buyerId.firebase_uid === state.f_id){
     return sellerId;
   }else{
     return buyerId;
   }
 };
  const animatedBorderWidth = borderAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 3, 0],
  });

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['gray', '#00457E', 'gray'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Chats</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Animated.View
              key={chat.key}
              style={[
                styles.buttonContainer,
                {
                  borderWidth: animatedBorderWidth,
                  borderColor: animatedBorderColor,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.chatItem}
                onPress={() => {
                  console.log('chat is:', chat);
                  setGChatstate((prevstate) => ({
                    ...prevstate,
                    currentConversationData: chat,
                  }));
                  setIschatmakeoffermodalVisible(true);
                }}
              >
                <View style={styles.chatHeader}>
                  <View style={styles.profileContainer}>
                    <View style={styles.profileImage}>
                      <Text style={styles.profileInitials}>
                        {chat?.sellerId?.username?.charAt(0).toUpperCase() || 'U'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.chatDetails}>
                    <Text style={styles.username}>
                      {refineData(chat)?.username || 'Unknown User'}
                    </Text>
                    <Text style={styles.chatText} numberOfLines={1}>
                      {chat?.lastMessage || 'No Details'}
                    </Text>
                    <Text style={styles.title}>
                      {chat?.productId?.title || 'No Title'}
                    </Text>
                    <Text style={styles.price}>
                      {chat?.productId?.price
                        ? `Price: ₹${chat.productId.price}`
                        : 'No Price Available'}
                    </Text>
                  </View>
                </View>

                <View style={styles.chatFooter}>
                  <Text style={styles.timestamp}>
                    {new Date(chat?.lastMessageTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    }) || '--:--'}
                  </Text>
                  {chat?.status === 'unread' && <View style={styles.unreadIndicator} />}
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))
        ) : (
          <Text style={styles.noChats}>No chats available</Text>
        )}
      </ScrollView>
      <Chat_MakeOfferModal
        visible={ischatmakeoffermodalVisible}
        closeModal={() =>
          setIschatmakeoffermodalVisible(!ischatmakeoffermodalVisible)
        }
      />
    </View>
  );
};

export default BuyingChats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 16, // Add padding for better spacing
  },
  buttonContainer: {
    height: 140,
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatItem: {
    padding: 12,
    width: '100%',
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
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    marginRight: 12,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00457E',
  },
  chatDetails: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  chatFooter: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  unreadIndicator: {
    // height: 10,
    // width: 10,
    // borderRadius: 5,
    // backgroundColor: '#FF0000',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    color: '#00457E',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
    color: '#008000',
  },
});
