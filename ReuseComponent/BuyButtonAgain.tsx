import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useEffect } from 'react';

const BuyButtonAgain = ({ onClick }) => {
    const rotationAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Infinite rotation animation
        const startRotation = () => {
            Animated.loop(
                Animated.timing(rotationAnim, {
                    toValue: 1,
                    duration: 2000, // Duration for a full rotation
                    useNativeDriver: true, // Enables GPU acceleration
                })
            ).start();
        };
        startRotation();
    }, [rotationAnim]);

    // Interpolating the rotation value to create a smooth spin
    const rotation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'], // Full rotation
    });

    return (
        <View style={styles.container}>
            <View style={styles.outerContainer}>
                {/* Rotating Border */}
                <Animated.View
                    style={[
                        styles.animatedBorder,
                        {
                            transform: [{ rotate: rotation }],
                        },
                    ]}
                >
                    <View style={styles.innerButton}>
                        {/* Static Button */}
                        <TouchableOpacity onPress={onClick} style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextChat}>Chat</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </View>
    );
};

export default BuyButtonAgain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    outerContainer: {
        width: 130,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    animatedBorder: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'transparent',
        borderTopColor: 'blue', // Animated top border
        borderRightColor: 'gray',
        borderBottomColor: 'blue',
        borderLeftColor: 'gray',
    },
    innerButton: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
