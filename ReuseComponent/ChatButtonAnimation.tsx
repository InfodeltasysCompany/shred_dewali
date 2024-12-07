import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useEffect } from 'react';

const BuyButtonAnimated = ({ onClick }) => {
    const borderAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the loop animation for border color movement
        const startAnimation = () => {
            Animated.loop(
                Animated.timing(borderAnim, {
                    toValue: 1,
                    duration: 5000, // Slower animation (5 seconds)
                    useNativeDriver: false, // Use false as border color cannot use native driver
                })
            ).start();
        };
        startAnimation();
    }, [borderAnim]);

    // Interpolating border color values to create the rainbow effect
    const animatedTopBorderColor = borderAnim.interpolate({
        inputRange: [0, 0.14, 0.28, 0.42, 0.57, 0.71, 0.85, 1],
        outputRange: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'red'], // Rainbow colors
    });

    const animatedRightBorderColor = borderAnim.interpolate({
        inputRange: [0, 0.14, 0.28, 0.42, 0.57, 0.71, 0.85, 1],
        outputRange: ['violet', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
    });

    const animatedBottomBorderColor = borderAnim.interpolate({
        inputRange: [0, 0.14, 0.28, 0.42, 0.57, 0.71, 0.85, 1],
        outputRange: ['blue', 'violet', 'red', 'orange', 'yellow', 'green', 'blue', 'violet'],
    });

    const animatedLeftBorderColor = borderAnim.interpolate({
        inputRange: [0, 0.14, 0.28, 0.42, 0.57, 0.71, 0.85, 1],
        outputRange: ['green', 'blue', 'violet', 'red', 'orange', 'yellow', 'green', 'blue'],
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.buttonContainer,
                    {
                        borderTopColor: animatedTopBorderColor, // Animated border top color
                        borderRightColor: animatedRightBorderColor, // Animated border right color
                        borderBottomColor: animatedBottomBorderColor, // Animated border bottom color
                        borderLeftColor: animatedLeftBorderColor, // Animated border left color
                        borderWidth: 5, // Border width stays constant
                    },
                ]}
            >
                <TouchableOpacity onPress={onClick} style={styles.buttonTouchable}>
                    <Text style={styles.buttonTextChat}>Chat</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default BuyButtonAnimated;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        height: 50,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white', // Button background color
        borderStyle: 'solid', // Make sure the border style is solid
    },
    buttonTouchable: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    buttonTextChat: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00457E', // Text color for the button
    },
});
