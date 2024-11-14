import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Skeleton = ({
  width = '100%',
  height = 20,
  radius = 4,
  duration = 1000,
  type = 'text',
  css = {}
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [animatedValue, duration]);

  const gradientPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const skeletonStyles = {
    text: { height, width, borderRadius: radius },
    avatar: { width: 60, height: 60, borderRadius: 30 },
    card: { width, height: 150, borderRadius: 10, ...css },
  };

  const gradientColors = [
    '#e0e0e0', // Darker shade
    '#f5f5f5', // Lighter shade
    '#e0e0e0', // Darker shade
  ];

  // Get screen width for LinearGradient width
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, css]}>
      <View style={[styles.skeletonWrapper, skeletonStyles[type]]}>
        <Animated.View
          style={[
            styles.gradientWrapper,
            { transform: [{ translateX: gradientPosition }] },
          ]}
        >
          <LinearGradient
            colors={gradientColors}
            start={[0, 0]}
            end={[1, 0]}
            style={[styles.gradient, { width: screenWidth }]} // Use numeric width
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonWrapper: {
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  gradientWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    height: '100%',
  },
});

export default Skeleton;
//  <Skeleton type="text" width="100%" height={15} css={{ marginTop: 10 }} />
{/* <Skeleton type="text" width="90%" height={15} css={{ marginTop: 35 }} />
<Skeleton type="text" width="75%" height={15} />
<Skeleton type="text" width="85%" height={15} /> */}