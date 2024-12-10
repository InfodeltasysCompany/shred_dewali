import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

const LoadingMessages = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // For text opacity
  const bounceAnims = Array(5)
    .fill(0)
    .map(() => useRef(new Animated.Value(0)).current); // For bouncing circles

  useEffect(() => {
    // Fade animation for text
    const startTextAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1, // Fully visible
            duration: 1000, // Duration of fade-in
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0, // Fully transparent
            duration: 1000, // Duration of fade-out
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    // Bounce animation for circles
    const startBounceAnimation = () => {
      const animations = bounceAnims.map((anim, index) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: -10, // Move up
              duration: 300,
              delay: index * 100, // Stagger animation for each circle
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0, // Move back to original position
              duration: 300,
              useNativeDriver: true,
            }),
          ])
        )
      );

      Animated.parallel(animations).start();
    };

    startTextAnimation();
    startBounceAnimation();
  }, [fadeAnim, bounceAnims]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
        Loading Messages
      </Animated.Text>
      <View style={styles.bounceContainer}>
        {bounceAnims.map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              styles[`circle${index + 1}`],
              { transform: [{ translateY: anim }] },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default LoadingMessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  bounceContainer: {
    flexDirection: "row",
    marginTop: 35,
    gap: 10,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  circle1: {
    backgroundColor: "red",
  },
  circle2: {
    backgroundColor: "blue",
  },
  circle3: {
    backgroundColor: "green",
  },
  circle4: {
    backgroundColor: "#b3b300",
  },
  circle5: {
    backgroundColor: "pink",
  },
});
