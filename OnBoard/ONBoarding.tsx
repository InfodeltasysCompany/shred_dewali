
import { StyleSheet, View } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';

const ONBoarding = ({ navigation }) => {
    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem('onboardingCompleted', 'true');
            navigation.replace('Main');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <Onboarding
                containerStyles={{ paddingHorizontal: 15 }}
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View style={styles.lottie}>
                                <LottieView source={require('../assets/Animation/Animation1.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'LOGIN/SIGNUP',
                        subtitle: 'Sign Up to start exploring and unlock exclusive features.',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View style={styles.lottie}>
                                <LottieView source={require('../assets/Animation/sell.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'SELL/BUY SCRAP',
                        subtitle: 'Turn Your Scrap into cash, and cash into Scrap.',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View style={styles.lottie}>
                                <LottieView source={require('../assets/Animation/auction.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Auction',
                        subtitle: 'Where the highest Bidder wins big',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View style={styles.lottie}>
                                <LottieView source={require('../assets/Animation/chat.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Connecting With People',
                        subtitle: 'Instant scrap prices, no waiting! Chat with us now.',
                    },
                ]}
                onDone={completeOnboarding} // Call completeOnboarding when done
            />
        </View>
    );
};

export default ONBoarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    lottie: {
        width: 300,
        height: 400,
    },
    lottie1: {
        width: 400,
        height: 500,
    },
});
