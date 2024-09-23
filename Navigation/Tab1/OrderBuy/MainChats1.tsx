import { Ionicons } from "@expo/vector-icons";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, Linking, Modal, Text, TouchableOpacity, View ,StyleSheet} from "react-native";
import { GiftedChat ,IMessage} from "react-native-gifted-chat";

export const MainChats1: React.FC<{
     isModalVisible: boolean;
     toggleModal: () => void;
     formchatUserIdFbse: string;
     tochatUserIdFbse: string;
     tochatUserNameFbse: string;
     toChatUserMobileFbse: string;
   }> = ({
     isModalVisible,
     toggleModal,
     formchatUserIdFbse,
     tochatUserIdFbse,
     tochatUserNameFbse,
     toChatUserMobileFbse,
   }) => {
       const [messages, setMessages] = useState<IMessage[]>([]);
       const firebaseDB = getFirestore(); // Get the Firestore instance
   
       useEffect(() => {
         const subscriber = onSnapshot(
           query(
             collection(
               firebaseDB,
               "chats",
               `${formchatUserIdFbse}_${tochatUserIdFbse}`,
               "messages"
             ),
             orderBy("createdAt", "desc")
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
   
       const onSend = useCallback(
         async (messages = []) => {
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
             await addDoc(
               collection(
                 firebaseDB,
                 "chats",
                 `${formchatUserIdFbse}_${tochatUserIdFbse}`,
                 "messages"
               ),
               messageToSend
             );
           } catch (error) {
             console.error("Error sending message:", error);
           }
   
           // Add message to the receiver's chat collection
           try {
             await addDoc(
               collection(
                 firebaseDB,
                 "chats",
                 `${tochatUserIdFbse}_${formchatUserIdFbse}`,
                 "messages"
               ),
               messageToSend
             );
           } catch (error) {
             console.error("Error sending message to the receiver:", error);
           }
         },
         [firebaseDB, formchatUserIdFbse, tochatUserIdFbse]
       );
   
       const closeModal = () => {
         toggleModal();
       };
       const openDialer = () => {
         Linking.openURL(`tel:${toChatUserMobileFbse}`);
       };
   
       return (
         <Modal
           animationType="slide"
           transparent={true}
           visible={isModalVisible}
           onRequestClose={toggleModal}
         >
           <View style={styles.modalContainer}>
             <View style={styles.header}>
               <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                 <TouchableOpacity onPress={closeModal}>
                   <Ionicons name="arrow-back" style={{ fontSize: 30 }} />
                 </TouchableOpacity>
                 <Text style={{ fontSize: 22, marginLeft: 10 }}>
                   {tochatUserNameFbse}
                 </Text>
               </View>
   
               <View style={{}}>
                 <TouchableOpacity style={{}} onPress={openDialer}>
                   <Ionicons name="call" style={{ fontSize: 25, marginRight: 10 }} />
                 </TouchableOpacity>
               </View>
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
          image2: {
            width: 100,
            height: 100,
          },
          container123: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          },
          itemContainer123: {
            marginBottom: 20,
          },
          imageContainer123: {
            flexDirection: "row",
          },
          image123: {
            width: 500,
            height: 200,
            marginRight: 10,
            borderRadius: 5,
          },
          imageContainer1: {
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          },
        
          textContainer7: {
            borderWidth: 1,
            padding: 20,
            margin: 4,
            borderRadius: 4,
            borderColor: "#ddd",
          },
        
          centeredView: {
            flex: 1,
            marginTop: 10,
          },
        
          modalView: {
            // #666666
            margin: 2,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 2,
              height: 2,
            },
        
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 50,
          },
        
          buttonClose: {
            position: "absolute",
            top: 20,
            right: 10,
            backgroundColor: "#cccc00",
            borderRadius: 20,
            padding: 10,
            elevation: 2,
          },
        
          textStyle: {
            color: "white",
            fontWeight: "bold",
          },
          modalText: {
            marginBottom: 10,
            textAlign: "center",
          },
        
          //
        
          heading1: {
            marginTop: 20,
            marginLeft: 15,
            margin: 10,
          },
        
          accept: {
            fontSize: 20,
            color: "black",
            borderWidth: 1,
            borderRadius: 50,
            padding: 8,
            borderColor: "transparent",
            backgroundColor: "#ddd",
          },
        
          delete: {
            fontSize: 20,
            color: "#fff",
            borderWidth: 1,
            borderRadius: 2,
            padding: 5,
            backgroundColor: "red",
          },
        
          detail: {
            fontSize: 20,
            color: "black",
            borderColor: "transparent",
            borderWidth: 1,
            borderRadius: 90,
            paddingHorizontal: 35,
            paddingVertical: 10,
            backgroundColor: "#cccc00",
          },
        
          image1: {
            width: 50,
            height: 50,
            marginRight: 8,
          },
        
          card1: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginVertical: 10,
          },
        
          card: {
            width: "48%",
            marginBottom: 10,
            backgroundColor: "#fff",
            borderRadius: 6,
            borderWidth: 2,
            borderColor: "lightgray",
        
          },
        
          textContainer: {
            padding: 10,
          },
        
          textContainer3: {
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center",
          },
        
        
          textContainer2: {
            fontSize: 18,
            fontWeight: "500",
            color: "black",
            marginBottom: 5,
            fontFamily: 'sans-serif',
          },
        
          textContainer4: {
            fontSize: 15,
            color: "black",
            marginBottom: 5,
            marginRight: 5,
          },
        
          textContainer5: {
            fontSize: 15,
            color: "darkgray",
            marginBottom: 2,
          },
          textContainer6: {
            fontSize: 12,
            marginTop: 10,
            color: "gray",
        
        
          },
        
          textContainer8: {
            fontSize: 12,
            color: "gray",
        
          },
        
          imageContainer: {
            width: "100%",
            height: 120,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            overflow: "hidden",
            alignItems: "center",
          },
        
          logo: {
            flexDirection: "row",
            // alignItems: 'center'
            // textAlign: 'center
          },
        
          container: {
            flex: 1,
            marginTop: 35,
            padding: 10,
            backgroundColor: "#00457E'",
          },
        
          container1: {
            marginBottom: 8,
            borderBottomWidth: 1,
            paddingBottom: 8,
            borderBottomColor: "#CCC",
            flexDirection: "row",
          },
        
          container2: {
            padding: 10,
            margin: 10,
            flexWrap: "wrap",
            flex: 1,
            flexDirection: "row",
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "#ccc",
          },
        
          scrollView: {
            flex: 1,
            backgroundColor: "white",
            // #e6e6e6
          },
        
          contentContainer: {
            alignItems: "center",
          },
        
          text1: {
            color: "black",
          },
        
          container3: {
            padding: 10,
          },
        
          container4: {},
          container5: {},
        
          scrollContent: {
            padding: 11,
          },
        
          order: {
        
            fontSize: 20,
        
            color: "#00457E",
            // fontFamily: 'sans-sarif',
            marginBottom: 20,
            marginTop: 20,
            fontWeight: "500",
          },
        
        
          tinyLogo: {
            width: 160,
            height: 160,
            marginRight: 8,
            padding: 5,
            borderWidth: 2,
            borderColor: "#ccc",
            borderRadius: 20,
          },
        
          tinyLogo1: {
            width: "100%",
            height: 300,
            resizeMode: "contain",
          },
        
          heading: {
            fontSize: 25,
            fontWeight: "bold",
            color: "#00457E",
            alignItems: "center",
            marginTop: 8,
          },
        
          searchbox: {
            paddingHorizontal: 8,
            paddingVertical: 8,
            marginTop: 10,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 8,
            borderBottomWidth: 1,
            width: 340,
            height: 50,
            justifyContent: 'center',
          },
          image: {
            height: 100,
            width: 140,
            marginTop: 5,
          },
        
          title: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 8,
          },
          userItem: {
            width: Dimensions.get("window").width - 50,
            alignSelf: "center",
            marginTop: 20,
            flexDirection: "column",
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
          },
          closeButton: {
            padding: 10,
            backgroundColor: "lightcoral",
            borderRadius: 5,
          },
          modalContainer: {
            flex: 1,
        
            backgroundColor: "white",
          },
        
          header: {
            flexDirection: "row",
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
        
          updateModalView1: {
            flex: 1,
            justifyContent: "flex-end",
          },
        
          transparentTop: {
            flex: 1,
            backgroundColor: "transparent",
          },
        
          blackBottom: {
            height: "35%",
            backgroundColor: "white",
        
          },
        
        
          iconimg: {
            width: 100,
            height: 100,
            borderRadius: 20,
            margin: 10,
          },
        
          updateicon: {
            flex: 1,
            flexDirection: "row",
            gap: 15,
          },
        
          shreds: {
            fontSize: 30,
            fontWeight: "600",
            color: "black",
            marginTop: 8,
          },
        
          shredsbay: {
            fontSize: 20,
            color: "gray",
            marginTop: 8,
            marginRight: 10, // Changed from marginright to marginRight
          },
        
          text: {},
        
          updatebtn: {
            flex: 1,
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "center",
            marginTop: 50,
          },
        });