import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { fontSize, height, width } from '../../utils/constants/responsiveUtils'
import { font } from '../../utils/constants/constant'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { router } from 'expo-router'
import OTPVerification from '../../components/OTPVerification'
import PhoneNumberInput from '../../components/PhoneNumberInput'
import UserDetails from '../../components/UserDetails'
import { Keyboard } from 'react-native';

const LoginScreen = () => {
    const [stage, setStage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        phoneNumber: '',
        otp: '',
        name: '',
        email: ''
    });

    // Handle phone number submission
    const handlePhoneSubmit = async (phoneNumber) => {
        if (phoneNumber.length === 10) {
            Keyboard.dismiss();
        }

        try {
            setUserData(prev => ({ ...prev, phoneNumber }));
        } catch (error) {
            console.error(error);
        }
    };

    // Handle OTP verification
    const handleOTPSubmit = async (otp) => {
        setIsLoading(true);
        try {

            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsLoading(false)
            await new Promise(resolve => setTimeout(resolve, 300));
            setUserData(prev => ({ ...prev, otp }));
            setStage(2);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle user details submission
    const handleUserDetailsSubmit = async (details) => {
        // setIsLoading(true);
        try {
            // await new Promise(resolve => setTimeout(resolve, 1500));
            setUserData(prev => ({ ...prev, ...details }));
            // router.navigate("screens/HomeScreen");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle next button press
    const handleNext = async () => {
        switch (stage) {
            case 0:
                if (userData.phoneNumber.length === 10) {
                    handlePhoneSubmit(userData.phoneNumber);
                    setStage(1);
                }
                break;
            case 1:
                // OTP is auto-submitted when complete
                break;
            case 2:
                if (userData.name && userData.email) {
                    handleUserDetailsSubmit({ name: userData.name, email: userData.email });
                    try {
                        setIsLoading(true)
                        Keyboard.dismiss();
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        setIsLoading(false);

                        await new Promise(resolve => setTimeout(resolve, 1000));
                        router.navigate("screens/HomeScreen");
                    } catch (error) {
                        console.error(error);
                    } finally {
                        // setIsLoading(false);
                    }
                    // router.navigate("screens/HomeScreen")
                }

                break;
        }
    };

    // Check if next button should be enabled
    const isNextEnabled = () => {
        switch (stage) {
            case 0:
                return userData.phoneNumber.length === 10;
            case 1:
                return false; // OTP is auto-submitted
            case 2:
                return userData.name && userData.email;
            default:
                return false;
        }
    };

    // Render the current stage component
    const renderCurrentStage = () => {
        const key = `stage-${stage}`;

        switch (stage) {
            case 0:
                return <PhoneNumberInput key={key} onSubmit={handlePhoneSubmit} />;
            case 1:
                return <OTPVerification key={key} onSubmit={handleOTPSubmit} />;
            case 2:
                return <UserDetails key={key} onSubmit={handleUserDetailsSubmit} />;
            default:
                return null;
        }
    };

    // Header and subtitle for each stage
    // const getStageHeader = () => {
    //     switch (stage) {
    //         case 0:
    //             return {
    //                 title: 'Welcome to Elixir',
    //                 subtitle: 'Your Health & Wealth Partner',
    //             };
    //         case 1:
    //             return {
    //                 title: 'Verify OTP',
    //                 subtitle: 'Enter the code sent to your phone',
    //             };
    //         case 2:
    //             return {
    //                 title: 'Complete Your Profile',
    //                 subtitle: 'Let us know a bit more about you',
    //             };
    //         default:
    //             return { title: '', subtitle: '' };
    //     }
    // };
    // const { title: stageTitle, subtitle: stageSubtitle } = getStageHeader();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={height(5)}
            style={{ flex: 1 }}
        >
            <View style={styles.container}
            >
                <Image source={require('../../assets/elixir-bg.png')}
                    resizeMode='stretch'
                    style={{
                        height: height(85),
                        width: width(100),
                        position: 'absolute',
                        opacity: .7
                    }}
                />
                <View style={styles.headerRow}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('./../../assets/elixir-logo.png')}
                                style={styles.logo}
                                resizeMode='cover'
                            />
                            <View style={styles.titleContainer}>
                                <Text style={styles.headerText}>Elixir</Text>
                                <Text style={styles.subHeaderText}>Health & Wealth</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.stageIndicatorRow}>
                        {[0, 1, 2].map((item) => (
                            <View
                                key={`indicator-${item}`}
                                style={[
                                    styles.indicator,
                                    stage >= item ? styles.activeIndicator : {}
                                ]}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    {renderCurrentStage()}
                </View>

                {stage !== 5 && (
                    <Animated.View
                        style={[
                            styles.nextButtonContainer,
                            stage === 2 && styles.nextButtonContainerBottom
                        ]}
                        entering={FadeIn}
                        exiting={FadeOut}
                    >
                        <TouchableOpacity
                            style={[styles.nextButton, !isNextEnabled() && styles.nextButtonDisabled]}
                            onPress={handleNext}
                            disabled={!isNextEnabled()}
                        >
                            <Text style={styles.nextButtonText}>Next</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {isLoading && (
                    <Animated.View
                        style={styles.loadingOverlay}
                        entering={FadeIn}
                        exiting={FadeOut}
                    >
                        <Animated.View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#00A86B" />
                            <Text style={styles.loadingText}>
                                {
                                    stage == 1 ? "Verifing OTP " : "Please wait..."
                                }

                            </Text>
                        </Animated.View>
                    </Animated.View>
                )}
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width(100),
        paddingTop: height(2),
        paddingBottom: height(2),
        paddingHorizontal: width(5),
        height: height(12),
        backgroundColor: 'transparent',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: width(2),
    },
    logo: {
        height: height(6),
        width: width(14),
        borderRadius: width(2),
    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: "center",
        marginLeft: width(1),
    },
    headerText: {
        fontSize: fontSize(8),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
        letterSpacing: 1,
        lineHeight: height(4)
    },
    subHeaderText: {
        fontSize: fontSize(3.5),
        fontFamily: font.MontserratRegular,
        color: '#666',
        marginTop: height(0),

    },
    stageIndicatorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: width(2),
    },
    indicator: {
        width: width(7),
        height: width(1.5),
        backgroundColor: '#E0E0E0',
        marginHorizontal: width(0.7),
        borderRadius: width(1),
    },
    activeIndicator: {
        backgroundColor: '#00A86B',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: width(5),
    },
    nextButtonContainer: {
        paddingHorizontal: width(5),
        paddingBottom: height(2),
        // backgroundColor: 'transparent',
    },
    nextButtonContainerBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // backgroundColor: '#F8F9FA',
        paddingTop: height(2),
        // borderTopWidth: 1,
        // borderTopColor: '#E0E0E0',
    },
    nextButton: {
        backgroundColor: '#00A86B',
        paddingVertical: height(2),
        borderRadius: width(2),
        alignItems: 'center',
        shadowColor: '#00A86B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    nextButtonDisabled: {
        backgroundColor: '#B8E6D0',
    },
    nextButtonText: {
        color: 'white',
        fontSize: fontSize(4.5),
        fontFamily: font.MontserratSemiBold,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        backgroundColor: 'white',
        padding: width(6),
        borderRadius: width(4),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    loadingText: {
        marginTop: height(2),
        fontSize: fontSize(4),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
    },
    stageHeaderContainer: {
        marginLeft: width(3),
        justifyContent: 'center',
    },
    stageTitle: {
        fontSize: fontSize(5.5),
        fontFamily: font.MontserratSemiBold,
        color: '#222',
        marginBottom: height(0.5),
    },
    stageSubtitle: {
        fontSize: fontSize(3.5),
        fontFamily: font.MontserratRegular,
        color: '#666',
    },
});