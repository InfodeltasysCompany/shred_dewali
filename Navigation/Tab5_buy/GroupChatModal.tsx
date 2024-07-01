import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { getFirestore, collection, doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { AuthContext } from '../../redux/ContextApi/UserAuthProvider';

interface Message {
  userId: string;
  message: string;
  timestamp: string;
}

interface Participant {
  isAdmin: boolean;
  isAccepted: boolean;
  messages?: Message[];
}

const sendMessageToBiddingGroup = async (groupId: string, userId: string, message: string) => {
  const firestore = getFirestore();
  const groupRef = doc(firestore, 'biddingGroups', groupId);

  try {
    const groupDoc = await getDoc(groupRef);

    if (groupDoc.exists()) {
      const groupData = groupDoc.data() as {
        participants: Record<string, Participant>;
        pendingParticipants?: Record<string, { messages: Message[] }>;
        messages: Message[];
      };

      if (groupData.participants[userId]?.isAccepted) {
        await updateDoc(groupRef, {
          messages: arrayUnion({
            userId,
            message,
            timestamp: new Date().toISOString(), // Use ISO format for timestamp
          }),
        });

        console.log('Message sent to group.');
      } else {
        await updateDoc(groupRef, {
          pendingParticipants: {
            ...groupData.pendingParticipants,
            [userId]: {
              messages: arrayUnion({
                message,
                timestamp: new Date().toISOString(),
              }),
            },
          },
        });

        console.log('Message sent to admin for approval.');
      }
    } else {
      console.error('Group does not exist.');
    }
  } catch (error) {
    console.error('Error sending message to group: ', error);
  }
};

const getGroupId = (group) => {
  return Array.isArray(group) ? group[0].id : group.id;
};

const acceptUser = async (groupId: string, adminId: string, userId: string) => {
  const firestore = getFirestore();
  const groupRef = doc(firestore, 'biddingGroups', groupId);

  try {
    const groupDoc = await getDoc(groupRef);

    if (groupDoc.exists()) {
      const groupData = groupDoc.data() as {
        participants: Record<string, Participant>;
        pendingParticipants?: Record<string, { messages: Message[] }>;
        messages: Message[];
      };

      if (groupData.participants[adminId]?.isAdmin) {
        const updatedParticipants = {
          ...groupData.participants,
          [userId]: {
            isAdmin: false,
            isAccepted: true,
          },
        };

        const userPendingMessages = groupData.pendingParticipants?.[userId]?.messages || [];
        const updatedMessages = [
          ...groupData.messages,
          ...userPendingMessages.map(msg => ({ userId, ...msg })),
        ];

        const { [userId]: _, ...updatedPendingParticipants } = groupData.pendingParticipants || {};

        await updateDoc(groupRef, {
          participants: updatedParticipants,
          messages: updatedMessages,
          pendingParticipants: updatedPendingParticipants,
        });

        console.log(`User '${userId}' accepted in group '${groupId}'.`);
      } else {
        console.error('Only admins can accept users.');
      }
    } else {
      console.error('Group does not exist.');
    }
  } catch (error) {
    console.error('Error accepting user in group: ', error);
  }
};

const rejectUser = async (groupId: string, adminId: string, userId: string) => {
  const firestore = getFirestore();
  const groupRef = doc(firestore, 'biddingGroups', groupId);

  try {
    const groupDoc = await getDoc(groupRef);

    if (groupDoc.exists()) {
      const groupData = groupDoc.data() as {
        participants: Record<string, Participant>;
        pendingParticipants?: Record<string, { messages: Message[] }>;
      };

      if (groupData.participants[adminId]?.isAdmin) {
        const { [userId]: _, ...updatedPendingParticipants } = groupData.pendingParticipants || {};

        await updateDoc(groupRef, {
          pendingParticipants: updatedPendingParticipants,
        });

        console.log(`User '${userId}' rejected from group '${groupId}'.`);
      } else {
        console.error('Only admins can reject users.');
      }
    } else {
      console.error('Group does not exist.');
    }
  } catch (error) {
    console.error('Error rejecting user in group: ', error);
  }
};

const GroupChatModal = ({ modalVisible, onClose, group }: { modalVisible: boolean; onClose: () => void; group: { id: string; groupName: string; participants: Record<string, { isAdmin: boolean }> } | null }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [pendingMessages, setPendingMessages] = useState<Message[]>([]);
  const [state] = useContext(AuthContext);
  const { f_id } = state;

  useEffect(() => {
    if (group) {
      fetchMessages(getGroupId(group));
    }
  }, [group]);

  const fetchMessages = async (groupId: string) => {
    const firestore = getFirestore();
    const groupRef = doc(firestore, 'biddingGroups', groupId);

    try {
      const groupDoc = await getDoc(groupRef);

      if (groupDoc.exists()) {
        const groupData = groupDoc.data() as {
          participants: Record<string, Participant>;
          pendingParticipants?: Record<string, { messages: Message[] }>;
          messages: Message[];
        };

        if (groupData) {
          const groupMessages = groupData.messages || [];
          setMessages(groupMessages);

          if (groupData.participants[f_id]?.isAdmin) {
            const pending = Object.entries(groupData.pendingParticipants || {}).flatMap(([userId, participant]) =>
              participant.messages.map(msg => ({ userId, ...msg }))
            );
            setPendingMessages(pending);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching messages: ', error);
    }
  };

  const sendMessage = async () => {
    if (!messageText.trim()) {
      Alert.alert('Error', 'Message cannot be empty.');
      return;
    }

    try {
      await sendMessageToBiddingGroup(getGroupId(group), f_id, messageText);
      setMessageText('');
      fetchMessages(getGroupId(group)); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleAcceptUser = async (userId: string) => {
    try {
      await acceptUser(getGroupId(group), f_id, userId);
      fetchMessages(getGroupId(group)); // Refresh messages after accepting
    } catch (error) {
      console.error('Error accepting user:', error);
    }
  };

  const handleRejectUser = async (userId: string) => {
    try {
      await rejectUser(getGroupId(group), f_id, userId);
      fetchMessages(getGroupId(group)); // Refresh messages after rejecting
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  const getParticipants = (group) => {
    return Array.isArray(group) ? group[0].participants : group.participants;
  };
  const getGroupName = (group) => {
    return Array.isArray(group) ? group[0].groupName : group.groupName;
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalHeaderText}>{group ? getGroupName(group) : ''}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>

        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.userId === f_id ? styles.sentMessage : styles.receivedMessage,
              ]}
            >
              <Text>{item.message}</Text>
              {group && getParticipants(group)[f_id]?.isAdmin && (
                <View style={styles.pendingButtons}>
                  {/* <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => handleAcceptUser(item.userId)}
                  >
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.rejectButton}
                    onPress={() => handleRejectUser(item.userId)}
                  >
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity> */}
                </View>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        {group && getParticipants(group)[f_id]?.isAdmin && (
          <View>
            <Text style={styles.pendingHeader}>Pending Messages</Text>
            <FlatList
              data={pendingMessages}
              renderItem={({ item }) => (
                <View style={styles.pendingMessageContainer}>
                  <Text>{item.message}</Text>
                  <View style={styles.pendingButtons}>
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => handleAcceptUser(item.userId)}
                    >
                      <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => handleRejectUser(item.userId)}
                    >
                      <Text style={styles.buttonText}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 8,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  pendingHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  pendingMessageContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  pendingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  rejectButton: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GroupChatModal;
