import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoadingMessages from '../Order/LoadingMessages'

const SellBiddings = () => {
  return (
    <View style={styles.container}>
      <LoadingMessages/>
    </View>
  )
}

export default SellBiddings

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',alignItems:'center'
  }
})