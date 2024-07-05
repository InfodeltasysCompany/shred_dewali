import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, ScrollView, TouchableOpacity, Modal, Linking, RefreshControl } from "react-native";
import { getFirestore, collection, query, where, getDocs, Firestore, addDoc, QuerySnapshot, onSnapshot, orderBy } from 'firebase/firestore';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import { Directions } from 'react-native-gesture-handler';
import ChatBlank from './ChatBlank';
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';
import { useFocusEffect } from '@react-navigation/native';

const AllChats = ({ navigation }) => {

  const [state, setState] = useContext(AuthContext);
  const { gUserCred, userCred, userIdApp, f_email, f_mobile, f_id, f_name, f_password } = state;
  const [users, setUsers] = useState([]);
  const [fromChatUserIdFbse, setFromChatUserIdFbse] = useState('')
  const [toChatUserIdFbse, setToChatUserIdFbse] = useState('')
  const [toChatUserMobileFbse, setToChatUserMobileFbse] = useState('')
  const [toChatUserEmailFbse, setToChatUserEmailFbse] = useState('')
  const [toChatUserNameFbse, setToChatUserNameFbse] = useState('')
  const [uid, setUid] = useState(userIdApp)
  const [refreshing, setRefreshing] = useState(false);
  const [userid, setuserid] = useState(userIdApp)
  const [hasRunUsersGettingFunc, setHasRunUsersGettingFunc] = useState(false)




  useEffect(() => {
    getUsers();
  }, [fromChatUserIdFbse, userIdApp]);



  const onRefresh = () => {
    getUsers();

  }

  useFocusEffect(() => {
    if (userIdApp && users.length == 0) {
      getUsers();
    }
  });

  const getUsers = async () => {
    console.log("f_id in allchats=>",f_id);
    try {
      if (f_email) {
        const firebaseDB = getFirestore();
        const userCollection = collection(firebaseDB, 'users');
        const usersQuery = query(userCollection, where('email', '!=', f_email));

        // console.log("Users query:", usersQuery); // Check the users query

        const querySnapshot = await getDocs(usersQuery);
        const userData = querySnapshot.docs.map(documentSnapshot => ({
          id: documentSnapshot.id,
          fullName: documentSnapshot.get("name"),
          mobile: documentSnapshot.get("mobile"),
          email: documentSnapshot.get("email"),
          ...documentSnapshot.data()
        }));

        console.log("Fetched users data:", userData); // Check the fetched users data
        setFromChatUserIdFbse(f_id)
        // console.log("firebase form chat user Id:fromchatuseridfbse-",fromChatUserIdFbse);


        setUsers(userData);
      }
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };


  const [isModalVisible, setModalVisible] = useState(false);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    // setToChatUserIdFbse(id)
  };

  const setsSelectedUserId = (id: any, name: any, mobile: any, email: any,) => {
    setToChatUserIdFbse(id)
    setToChatUserNameFbse(name)
    setToChatUserEmailFbse(email)
    setToChatUserMobileFbse(mobile)
    toggleModal();

  }

  return (
    <View >



      {userIdApp && users.length > 0 ? (


        <ScrollView style={{}} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
            tintColor="#0000ff"
          />
        }>
          {users.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.userItem}
              onPress={() => setsSelectedUserId(item.id, item.name, item.mobile, item.email)}
            >
              <Text style={styles.userId}>ID: {item.id}</Text>
              <Text style={styles.fullName}>Full Name: {item.name}</Text>
              <Text style={styles.mobile}>Mobile: {item.mobile}</Text>
              <Text style={styles.email}>Email: {item.email}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <>

          <ScrollView refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#0000ff']}
              tintColor="#0000ff"
            />
          }>

            <ChatBlank navigation={navigation} />
          </ScrollView>


        </>
      )}
      {userIdApp && (
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0000ff']}
            tintColor="#0000ff"
          />
        }>

          <ChatBlank navigation={navigation} />
        </ScrollView>
      )}

      <MainChats
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        formchatUserIdFbse={fromChatUserIdFbse}
        tochatUserIdFbse={toChatUserIdFbse}
        tochatUserNameFbse={toChatUserNameFbse}
        toChatUserMobileFbse={toChatUserMobileFbse}
      />
    </View>
  );

};




const MainChats: React.FC<{
  isModalVisible: boolean;
  toggleModal: () => void;
  formchatUserIdFbse: string;
  tochatUserIdFbse: string;
  tochatUserNameFbse: string;
  toChatUserMobileFbse: string;


}> = ({ isModalVisible, toggleModal, formchatUserIdFbse, tochatUserIdFbse, tochatUserNameFbse, toChatUserMobileFbse }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const firebaseDB = getFirestore(); // Get the Firestore instance

  useEffect(() => {
    const subscriber = onSnapshot(
      query(
        collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'),
        orderBy('createdAt', 'desc')
      ),
      (querySnapshot) => {
        const allmessages: IMessage[] = [];
        querySnapshot.forEach((doc) => {
          const messageData = doc.data();
          allmessages.push({
            _id: doc.id,
            text: messageData.text,
            createdAt: new Date(messageData.createdAt),
            user: {
              _id: messageData.sendBy,
            },
          });
        });
        setMessages(allmessages);
      }
    );
    return () => subscriber();
  }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

  const onSend = useCallback(async (messages = []) => {
    const newMessage = messages[0];
    const messageToSend: IMessage = {
      ...newMessage,
      sendBy: formchatUserIdFbse,
      sendTo: tochatUserIdFbse,
      createdAt: Date.now(),
    };

    // Update the state by merging the new message with the existing messages array
    setMessages((previousMessages) => [...previousMessages, messageToSend]);

    // Add message to the sender's chat collection
    try {
      await addDoc(collection(firebaseDB, 'chats', `${formchatUserIdFbse}_${tochatUserIdFbse}`, 'messages'), messageToSend);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // Add message to the receiver's chat collection
    try {
      await addDoc(collection(firebaseDB, 'chats', `${tochatUserIdFbse}_${formchatUserIdFbse}`, 'messages'), messageToSend);
    } catch (error) {
      console.error('Error sending message to the receiver:', error);
    }
  }, [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]);

  const closeModal = () => {
    toggleModal();
  };
  const openDialer = () => {
    Linking.openURL(`tel:${toChatUserMobileFbse}`);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.header}>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="arrow-back" style={{ fontSize: 30 }} />

            </TouchableOpacity>
            <Text style={{ fontSize: 22, marginLeft: 10 }}>{tochatUserNameFbse}</Text>
          </View>



          {
            toChatUserMobileFbse ?
              <View style={{}}>
                <TouchableOpacity style={{}} onPress={openDialer}>
                  <Ionicons name="call" style={{ fontSize: 25, marginRight: 10 }} />
                </TouchableOpacity>
              </View> :
              null
          }



        </View>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: formchatUserIdFbse,
          }}
        />
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    elevation: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'lightcoral',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,

    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
    backgroundColor: 'white',
  },

  header: {
    flexDirection: "row",
    // justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightgray",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userItem1: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
  },
  userId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fullName: {
    fontSize: 16,
    marginBottom: 4,
  },
  mobile: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
});

export default AllChats;
