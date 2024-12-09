import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChatButtonAnimation = () => {
  return (
      <Pressable style={styles.container}>
        <Text style={styles.btntext}>Button</Text>
      </Pressable>
  )
}

export default ChatButtonAnimation

const styles = StyleSheet.create({
    container:{
        // flex:1,
        justifyContent:"center",alignItems:'center',backgroundColor:"blue",
        height:40,
        width:120,
        color:"white"
    },
    btntext:{
        color:"white",
        fontSize:25,
        fontWeight:"600",
        fontFamily:"verdana"
    }
})