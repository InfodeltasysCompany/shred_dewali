import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BuyButtonAnimated from '../../../ReuseComponent/BuyButtonAnimated'
import BuyButtonAgain from '../../../ReuseComponent/BuyButtonAgain'

const BuyingChats = () => {
  const onclick =()=>{
    console.log("hello world..")
  }
  return (
    <View style={styles.container}>
      {/* <BuyButtonAnimated onclick={onclick}/> */}
      <BuyButtonAgain/>
    </View>
  )
}

export default BuyingChats

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignContent:"center"
  }
})