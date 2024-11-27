import { Button, StyleSheet, Text, View ,Animated} from 'react-native'
import React, { useRef, useState } from 'react'

const BuyingChats = () => {
  const anim = useRef(new Animated.Value(1)).current;
  const [isFaded, setIsFaded] = useState(false); // State to track animation toggle

  const fadeIn = () => {
    const toValue = isFaded ? 0 : 1; // Toggle between 0 and 1
    Animated.timing(anim, {
      toValue,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => setIsFaded(!isFaded)); // Update state after animation completes
  };
 
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.tview,{opacity:anim}]}>
        <Text style={styles.txt}>BuyingChats</Text>
      </Animated.View>
      <Button title='click me' onPress={fadeIn}/>

    </View>
  )
}

export default BuyingChats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  tview: {
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 30,

  },
  txt: {
    color: "black",
    fontSize: 30,
  }
})