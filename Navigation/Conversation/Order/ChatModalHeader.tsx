import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ChatModalHeader = ({ closeModal, refineData, GChatstate }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={closeModal}>
        <AntDesign name="arrowleft" size={24} color="#00457E" />
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <TouchableOpacity>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s',
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.nameAndTime}>
          <Text style={styles.profileName}>
            {refineData(GChatstate)?.username || 'No Details'}
          </Text>
          <Text style={styles.chatTime}>
            {GChatstate?.currentConversationData?.productId?.title || 'No details'}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => {
            const phoneNumber = refineData(GChatstate)?.phone_number;
            if (phoneNumber) {
              Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
                console.error('Failed to open dialer:', err)
              );
            }
          }}
        >
          <AntDesign name="phone" size={24} color="#00457E" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  profileSection: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  profileImage: { width: 40, height: 40, borderRadius: 20 },
  nameAndTime: { marginLeft: 10 },
  profileName: { fontSize: 16, fontWeight: 'bold', color: '#00457E' },
  chatTime: { fontSize: 12, color: '#888' },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 15 },
});

export default ChatModalHeader;
