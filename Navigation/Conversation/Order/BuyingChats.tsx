import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../redux/ContextApi/UserAuthProvider';
import { onValue, ref } from 'firebase/database';
import { realtimeDb } from '../../../Config/Firebaseconfig';
import Chat_MakeOfferModal from './Chat_MakeOfferModal';

const BuyingChats = () => {
  const [state, , , , GChatstate,setGChatstate] = useContext(AuthContext); // Destructure only necessary values
  const [chats, setChats] = useState([]);
const [ischatmakeoffermodalVisible, setIschatmakeoffermodalVisible] = useState(false);
  useEffect(() => {
    const GetAllChats = () => {
      const chatsRef = ref(realtimeDb, `conversations/chats/${state?.f_id}`);
      onValue(chatsRef, (snapshot) => {
        if (!snapshot.exists()) {
          console.log('No chats found.');
          setChats([]); // Clear chats if none found
          return;
        }

        // Filter out conversations with `null` messageId
        const filteredChats = [];
        snapshot.forEach((childSnapshot) => {
          const chat = childSnapshot.val();
          if (chat?.messageId && chat?.productId?.firebase_pid !== state.f_id) {
            filteredChats.push({ key: childSnapshot.key, ...chat }); // Add key for easier rendering
          }
        });
        setChats(filteredChats); // Update state with filtered chats
      });
    };

    GetAllChats();
  }, [state?.f_id, GChatstate]); // Add proper dependencies

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buy Chats</Text>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <TouchableOpacity key={chat.key} style={styles.chatItem} onPress={()=>{console.log("chat is :",chat);
            setGChatstate(
              (prevstate) => ({
              ...prevstate,
              currentConversationData:chat,
            })
            
          );
            setIschatmakeoffermodalVisible(true);
          }}>
               <Text style={styles.chatText}>Message: {chat?chat.lastMessage:"No Details"}</Text>
            <Text style={styles.chatText}>Sender: {chat?chat.lastSender:"NO Details"}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noChats}>No chats available</Text>
      )}
      <Chat_MakeOfferModal visible={ischatmakeoffermodalVisible} closeModal={()=>setIschatmakeoffermodalVisible(!ischatmakeoffermodalVisible)}/>
    
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chatItem: {
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
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
