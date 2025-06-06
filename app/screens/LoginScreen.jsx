import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontSize, height, width } from '../../utils/constants/responsiveUtils'
import { font } from '../../utils/constants/constant'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { router } from 'expo-router'
import OTPVerification from '../../components/OTPVerification'
import PhoneNumberInput from '../../components/PhoneNumberInput'
import UserDetails from '../../components/UserDetails'
import { Keyboard } from 'react-native';
import { askForLocationPermission } from '../../utils/api/locationService'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
    const [isGranted, setIsGranted] = useState(false);
    const [stage, setStage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        phoneNumber: '',
        otp: '',
        name: '',
        email: ''
    });
    useEffect(() => {
        // Never use async directly on useEffect
        const fetchStage = async () => {
            const value = await getStageLocal();
            setStage(value);
        };

        fetchStage();
        // The console.log here will show the initial value (0), not the fetched value
        // because the fetch is asynchronous
    }, []);

    // This useEffect will run after stage changes
    useEffect(() => {
        console.log("Current stage:", stage);
    }, [stage]);

    const getStageLocal = async () => {
        try {
            const value = await AsyncStorage.getItem('stage');
            if (value !== null) {
                return parseInt(value);
            } else {
                return 0;
            }
        } catch (e) {
            console.log("getStageLocal error:", e);
            return 0; // Return default value on error
        }
    };

    const storeStageLocal = async (value) => {
        try {
            await AsyncStorage.setItem('stage', value.toString());
            // No need to call getStageLocal here unless you're doing something with the return value
            // Instead, update the state directly
            setStage(value);
        } catch (e) {
            console.log("storeStageLocal error:", e);
        }
    };


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
            // Simulating verify Otp API CALL
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsLoading(false)
            await new Promise(resolve => setTimeout(resolve, 300));
            setUserData(prev => ({ ...prev, otp }));
            storeStageLocal(2);
            // setStage(2);
            router.navigate("screens/HomeScreen")
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle user details submission

    const handleUserDetailsSubmit = async (details) => {
        if (isGranted) {
            // router.navigate("screens/HomeScreen")
            // router.navigate("screens/HomeScreen")
            // setStage(1);
            console.log("granted handleuser")
        }
        else {
            try {
                const result = await askForLocationPermission();
                console.log(result);
                setIsGranted(result == 'granted');
                if (result === 'granted') {
                    Alert.alert("Permission granted", "Location permission has been granted.");
                }
            } catch (error) {
                console.error("Error requesting location permission:", error);
                setIsGranted("error");
                Alert.alert("Error", "There was an error requesting location permission.");
            }
        }
        // setIsLoading(true);
        try {
            // await new Promise(resolve => setTimeout(resolve, 1500));
            setUserData(prev => ({ ...prev, ...details }));
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
                if (userData.name && userData.email) {
                    handleUserDetailsSubmit({ name: userData.name, email: userData.email });
                    try {
                        setIsLoading(true)
                        Keyboard.dismiss();
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        setIsLoading(false);

                        await new Promise(resolve => setTimeout(resolve, 1000));
                        // router.navigate("screens/HomeScreen");
                        storeStageLocal(1)
                        setStage(1)

                    } catch (error) {
                        console.error(error);
                    } finally {
                        // setIsLoading(false);
                    }
                    // router.navigate("screens/HomeScreen")
                }
            case 1:
                if (userData.phoneNumber.length === 10) {
                    handlePhoneSubmit(userData.phoneNumber);
                    storeStageLocal(2)
                    setStage(2);
                }
                break;
            case 2:
                // OTP is auto-submitted when complete
                break;
                // case 2:
                //     if (userData.name && userData.email) {
                //         handleUserDetailsSubmit({ name: userData.name, email: userData.email });
                //         try {
                //             setIsLoading(true)
                //             Keyboard.dismiss();
                //             await new Promise(resolve => setTimeout(resolve, 1500));
                //             setIsLoading(false);

                //             await new Promise(resolve => setTimeout(resolve, 1000));
                //             router.navigate("screens/HomeScreen");
                //         } catch (error) {
                //             console.error(error);
                //         } finally {
                //             // setIsLoading(false);
                //         }
                //         // router.navigate("screens/HomeScreen")
                //     }

                break;
        }
    };

    // Check if next button should be enabled
    const isNextEnabled = () => {
        switch (stage) {
            case 0:
                return userData.name && userData.email;
            case 1:
                return userData.phoneNumber.length === 10;
            case 2:
                return false; // OTP is auto-submitted
            default:
                return false;
        }
    };

    // Render the current stage component
    const renderCurrentStage = () => {
        const key = `stage-${stage}`;

        switch (stage) {
            case 0:
                return <UserDetails key={key} onSubmit={handleUserDetailsSubmit} />;
            case 1:
                return <PhoneNumberInput key={key} onSubmit={handlePhoneSubmit} />;
            case 2:
                return <OTPVerification key={key} onSubmit={handleOTPSubmit} />;

            default:
                return null;
        }
    };


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
        marginBottom: height(1)
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