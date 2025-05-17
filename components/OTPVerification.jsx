import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Keyboard
} from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { fontSize, height, width } from '../utils/constants/responsiveUtils';
import { font } from '../utils/constants/constant';

const OTPVerification = ({ onSubmit }) => {
    // Number of OTP digits
    const otpLength = 4;

    // State to store OTP digits individually for better control
    const [otpDigits, setOtpDigits] = useState(Array(otpLength).fill(''));

    // Create refs for each input field
    const inputRefs = useRef([]);

    // Initialize refs array
    useEffect(() => {
        inputRefs.current = Array(otpLength).fill().map((_, i) => inputRefs.current[i] || React.createRef());
    }, []);

    // Handle input changes for each box
    const handleOtpChange = (value, index) => {
        // Update the specific digit
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = value;
        setOtpDigits(newOtpDigits);

        // Auto-focus logic
        if (value !== '' && index < otpLength - 1) {
            // If a digit was entered and we're not at the last box, focus the next box
            inputRefs.current[index + 1].focus();
        }

        // If all digits are filled, hide keyboard and submit OTP
        if (newOtpDigits.filter(digit => digit !== '').length === otpLength) {
            Keyboard.dismiss();
            onSubmit(newOtpDigits.join(''));
        }
    };

    // Handle key press for backspace navigation
    const handleKeyPress = (e, index) => {
        // Check if backspace was pressed
        if (e.nativeEvent.key === 'Backspace') {
            // If current box is empty and not the first box, move focus to previous box
            if (otpDigits[index] === '' && index > 0) {
                inputRefs.current[index - 1].focus();

                // Clear the previous box too (optional behavior)
                const newOtpDigits = [...otpDigits];
                newOtpDigits[index - 1] = '';
                setOtpDigits(newOtpDigits);
            } else if (otpDigits[index] !== '') {
                // If current box has content, just clear it
                const newOtpDigits = [...otpDigits];
                newOtpDigits[index] = '';
                setOtpDigits(newOtpDigits);
            }
        }
    };

    // Focus the first empty input when component mounts
    useEffect(() => {
        const firstEmptyIndex = otpDigits.findIndex(digit => digit === '');
        if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
            inputRefs.current[firstEmptyIndex].focus();
        } else if (firstEmptyIndex === -1 && inputRefs.current[0]) {
            // If all filled, focus the first one
            inputRefs.current[0].focus();
        }
    }, []);

    return (
        <Animated.View
            style={styles.stageContainer}
            entering={SlideInRight}
            exiting={SlideOutLeft}
        >
            <Text style={styles.stageTitle}>Verify Your Number</Text>
            <Text style={styles.subtitle}>Enter the code we sent you</Text>
            <View style={styles.otpContainer}>
                {otpDigits.map((digit, index) => (
                    <TextInput
                        key={`otp-${index}`}
                        ref={(ref) => { inputRefs.current[index] = ref }}
                        style={[
                            styles.otpInput,
                            digit ? styles.otpInputFilled : {},
                            index === otpDigits.findIndex(d => d === '') ? styles.otpInputActive : {}
                        ]}
                        maxLength={1}
                        keyboardType="number-pad"
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        autoComplete="sms-otp" // helps with auto-fill on supported devices
                        caretHidden={false}
                        selectTextOnFocus
                    // cursorColor={"transparent"}

                    />
                ))}
            </View>

            <TouchableOpacity style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive code? </Text>
                <Text style={styles.resendButton}>Resend</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default OTPVerification;

const styles = StyleSheet.create({
    stageContainer: {
        backgroundColor: 'white',
        padding: width(6),
        borderRadius: width(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    stageTitle: {
        fontSize: fontSize(7),
        fontFamily: font.MontserratSemiBold,
        marginBottom: height(1),
        color: '#00A86B',
    },
    subtitle: {
        fontSize: fontSize(4),
        fontFamily: font.MontserratRegular,
        color: '#666',
        marginBottom: height(4),
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height(4),
    },
    otpInput: {
        width: width(15),
        height: width(15),
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: width(2),
        textAlign: 'center',
        fontSize: fontSize(6),
        verticalAlign: 'center',
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
        // paddingBottom: 10
    },
    otpInputFilled: {
        borderColor: '#00A86B',
        backgroundColor: '#F8F9FA',
        // paddingBottom: 2
    },
    otpInputActive: {
        borderColor: '#00A86B',
        borderWidth: 2,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: height(3),
    },
    resendText: {
        fontSize: fontSize(3.5),
        fontFamily: font.MontserratRegular,
        color: '#666',
    },
    resendButton: {
        fontSize: fontSize(3.5),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
    },
});