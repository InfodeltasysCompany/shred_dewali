import { Animated, StyleSheet, View } from 'react-native';
import React, { useRef, useEffect } from 'react';

const SellChats = () => {
  const anim = useRef(new Animated.Value(0)).current;

 

  useEffect(() => {
    const infiniteAnimation =Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          // bounciness: 50,
          duration:1000,
          useNativeDriver: true, // Use native driver for better performance
        }),
        Animated.timing(anim, {
          toValue: 0,
          // bounciness: 50,
          duration:1000,
          useNativeDriver: true, // Use native driver for better performance
        })

      ])
    );
    infiniteAnimation.start();
   
  }, [anim]);
  const i = anim.interpolate({
    inputRange:[0,1],
    outputRange:[100,300]
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ani,
          {
           
            opacity:anim,
            transform: [{ translateY: i, },{translateX:i}], // Example animation using the interpolated value

          },
        ]}
      />
    </View>
  );
};

export default SellChats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  ani: {
    height: 100,
    width: 100,
    backgroundColor: 'blue',
  },
});
