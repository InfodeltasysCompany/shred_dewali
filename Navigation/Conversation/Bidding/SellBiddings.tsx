import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'

const SellBiddings = () => {
  const anixy = useRef(new Animated.ValueXY({x:0,y:0})).current;
  const checkanim = ()=>{
    Animated.timing(anixy,{
      toValue:5,
      useNativeDriver:true,
    }).start();

  }
  return (
    <Animated.View style={{transform:[{scaleY:5}]}}>
      <Text style={{}}>SellBiddings</Text>
    </Animated.View>
  )
}

export default SellBiddings

const styles = StyleSheet.create({})