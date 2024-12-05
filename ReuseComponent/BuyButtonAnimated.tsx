import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useEffect } from 'react';

const BuyButtonAnimated = ({ onClick }) => {
    const borderAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start infinite animation loop
        const startAnimation = () => {
            Animated.loop(
                Animated.timing(borderAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: false, // Required for styles
                })
            ).start();
        };
        startAnimation();
    }, [borderAnim]);

    // Interpolating animated border width for visibility
    const animatedBorderWidth = borderAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 3, 0], // Pulsing effect
    });

    // Interpolating border color
    const animatedBorderColor = borderAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['gray', '#00457E', 'gray'], // Smooth color transition
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.buttonContainer,
                    {
                        borderWidth: animatedBorderWidth, // Animated border width
                        borderColor: animatedBorderColor, // Animated border color
                    },
                ]}
            >
                <TouchableOpacity
                    onPress={onClick}
                    style={styles.buttonTouchable}
                >
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
        backgroundColor: 'white', // To contrast with the animated border
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
        color: '#00457E',
    },
});
