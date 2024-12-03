import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable, Image, Animated, FlatList, Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Chat from './Chat';
import MakeOffer from './MakeOffer';
import { realtimeDb } from '../../../Config/Firebaseconfig';
import { onValue, ref } from 'firebase/database';
import SendMsg from './SendMsg';
import RecieveMsg from './RecieveMsg';
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';

interface Message {
  id: string;
  content: string;
  status: string;
  timestamp: number;
  productID: string;
  senderID: string;
  receiverID: string;
}


const Chat_MakeOfferModal = ({ visible, closeModal }) => {
  const [state, , , , GChatstate, setGChatstate] = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('Chat'); // Initially set to 'Chat'
  const [ispressed, setIspressed] = useState(false);
  const tabanim = useRef(new Animated.Value(0)).current;
  // Render content based on the active tab

  useEffect(() => {
    Animated.timing(tabanim, {
      toValue: ispressed ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [ispressed])
  useEffect(() => {
    Animated.timing(tabanim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [activeTab])
  const [messages, setMessages] = useState([]);
    // Extract necessary values
// Extract necessary values


const [userID, setuserID] = useState('');

useEffect(() => {
  if (GChatstate) {
    const { currentConversationData } = GChatstate;
    const { productID } = currentConversationData || {};
    const { firebase_pid } = productID || {};

    const conversationID = `${productID?.productId}_${state.f_id}_${firebase_pid}`;
    const userID = state.f_id;
    setuserID(userID);
    const messagesRef = ref(realtimeDb, `conversations/${conversationID}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const formattedMessages: Message[] = Object.entries(messagesData).map(([key, value]) => {
          const message = value as Message;
          return {
            id: key,
            content: message.content || '',
            status: message.status || 'unread',
            timestamp: message.timestamp || 0,
            productID: message.productID || '',
            senderID: message.senderID || '',
            receiverID: message.receiverID || '',
          };
        }).sort((a, b) => a.timestamp - b.timestamp);

        setMessages(formattedMessages);
      } else {
        setMessages([]); // Handle no messages
      }
    });

    return () => unsubscribe();
  }
}, [GChatstate, state.f_id]);

  const renderMessage = ({ item }) => {
    return item.senderID === userID ? (
      <SendMsg text={item.content} />
    ) : (
      <RecieveMsg text={item.content} />
    );
  };
  const translateY = tabanim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 620], // Adjust the range based on your layout
  })
  const renderContent = () => {
    switch (activeTab) {
      case 'Make Offer':
        return <MakeOffer />;
      case 'Chat':
      default:
        return <Chat />;
    }
  };


  return (
    <Modal animationType="none" transparent={false} visible={visible}>

      <View style={styles.header}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => {
          console.log('Back Arrow Pressed');
          closeModal();
        }}>
          <AntDesign name="arrowleft" size={24} color="#00457E" />
        </TouchableOpacity>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s', // Replace with dynamic user profile URL
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={styles.nameAndTime}>
            <Text style={styles.profileName}>
              {GChatstate?.currentConversationData?.sellerDetails?.username || "No details"}
            </Text>

            <Text style={styles.chatTime}>{GChatstate?.currentConversationData?.productID?.title || "No details"}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => {
              const phoneNumber = GChatstate?.currentConversationData?.sellerDetails?.phone_number;

              if (phoneNumber) {
                const url = `tel:${phoneNumber}`;
                Linking.openURL(url).catch((err) => console.error("Failed to open dialer:", err));
              } else {
                console.log("Phone number not available");
              }
            }}
          >
            {GChatstate?.currentConversationData?.sellerDetails?.phone_number ? (
              <AntDesign name="phone" size={24} color="#00457E" />
            ) : (
              <Svg
                width={30} // Set width
                height={30} // Set height
                viewBox="0 0 1024 1024" // Match the viewBox of the path
                fill="none" // Set initial fill to none
              >
                <Path
                  d="M746.086 916.070c-67.994 0-258.253-16.589-427.213-185.549-205.619-205.414-185.344-442.573-184.32-452.608l1.229-12.083 100.352-125.747h178.176l103.629 103.629v170.803l-74.547 74.752c11.878 18.432 29.901 43.622 51.814 65.536 22.118 22.118 47.514 40.346 65.946 52.019l74.547-72.090 192.512 0.205 79.872 101.99v178.586l-124.314 98.714-12.083 1.229c-1.638-0.205-10.65 0.614-25.6 0.614zM215.45 296.96c-1.229 45.875 5.734 219.955 161.382 375.603 155.443 155.443 329.318 162.611 375.808 161.382l73.523-58.368v-110.797l-37.888-48.538h-119.603l-94.618 91.341-26.214-13.722c-2.458-1.229-62.054-32.973-110.797-81.715s-80.282-108.339-81.715-110.797l-14.131-26.624 94.413-94.618v-103.014l-55.706-55.706h-104.858l-59.597 75.571zM776.602 333.619l72.704-72.704v-106.291l-56.934-56.934h-116.531l-55.501 55.501v90.726h81.92v-56.73l7.578-7.578h48.742l9.011 9.011v38.502l-72.704 72.704v80.691h81.92v-46.899zM776.602 421.683h-81.92v73.318h81.92v-73.318z"
                  fill="#00457E" // Set fill color (customize as needed)
                />
              </Svg>
            )}
          </TouchableOpacity>


          <TouchableOpacity onPress={() => console.log('Menu Button Pressed')}>
            <AntDesign name="ellipsis1" size={24} color="#00457E" />
          </TouchableOpacity>
        </View>
      </View>


      <Animated.View style={[styles.modalContainer, { transform: [{ translateY }] }]}>
        {/* Header */}
        {/* messages */}
        <View style={styles.container}>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            style={styles.chatContainer}
          />
        
        </View>
        {/* Tabs and Toggle */}
        <View style={{ alignItems: 'center', position: "relative", bottom: 2 }}>
          <TouchableOpacity style={styles.opentab} onPress={() => { setIspressed(!ispressed) }} activeOpacity={1}>
            {ispressed ? (
              <AntDesign name="up" size={25} color={"#00457E"} />
            ) : (
              <AntDesign name="down" size={25} color={"#00457E"} />
            )}
          </TouchableOpacity>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'Chat' && styles.activeTab]}
              onPress={() => {
                setActiveTab('Chat');
                // if (!ispressed) {
                setIspressed(true);
                // }


              }}
              activeOpacity={1}
            >
              <Text style={[styles.tabText, activeTab === 'Chat' && styles.activeTabText]}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tab, activeTab === 'Make Offer' && styles.activeTab]}
              onPress={() => {
                setActiveTab('Make Offer');
                // if(!ispressed){
                setIspressed(true);

                // }
              }}
              activeOpacity={1}
            >
              <Text style={[styles.tabText, activeTab === 'Make Offer' && styles.activeTabText]}>Make Offer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>{renderContent()}</View>
      </Animated.View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
  },
  chatContainer: {
    padding: 10,
  },
  content: {
    width: "100%",
    height: "100%"
  },
  modalContainer: {
    position: 'absolute',
    width: '100%',
    // backgroundColor: '#ddd',
    borderRadius: 10,
    padding: 10,


  },
  modalExpanded: {
    bottom: 0, // Fully expanded to the bottom
    height: '50%', // Half-screen height
    transform: [{ translateY: 0 }],
  },
  modalCollapsed: {
    bottom: 0, // Bottom of the screen
    height: '13%', // Smaller portion visible initially
    transform: [{ translateY: 10 }], // Adjust to shift up/down
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#00457E',
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  tab: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  tabText: {
    color: '#333',
    fontSize: 18,
  },
  activeTab: {
    backgroundColor: '#f1f1f1',
    borderBottomColor: '#00457E',
    borderBottomWidth: 3,
  },
  activeTabText: {
    color: '#00457E',
    fontSize: 18,
  },
  body: {
    flex: 1,
    paddingTop: 20,
    width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  opentab: {
    backgroundColor: '#ddd',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: -10,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10, // Add margin to space it from the back arrow
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameAndTime: {
    flexDirection: 'column',
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00457E',
  },
  chatTime: {
    fontSize: 12,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15, // Add spacing between action buttons
  },

});

export default Chat_MakeOfferModal;
