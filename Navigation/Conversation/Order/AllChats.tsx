import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Chat_MakeOfferModal from './Chat_MakeOfferModal';

const AllChats = () => {
  const [ischatOfferModalvisible, setIschatOfferModalvisible] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.user} onPress={()=>setIschatOfferModalvisible(!ischatOfferModalvisible)}>
        <Text style={styles.userText}>vinit</Text>
      </TouchableOpacity>
    <Chat_MakeOfferModal visible={ischatOfferModalvisible} closeModal={()=>setIschatOfferModalvisible(!ischatOfferModalvisible)}/>
    </View>
  )
}

export default AllChats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  user: {
    height: 40,
    width: "100%",
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: "gray"


  },
  userText: {
    color: "blue",
    fontSize: 25,

  }
})