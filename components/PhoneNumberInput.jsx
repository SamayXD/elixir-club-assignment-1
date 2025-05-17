import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { fontSize, height, width } from '../utils/constants/responsiveUtils';
import { font } from '../utils/constants/constant';

const PhoneNumberInput = ({ onSubmit }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handlePhoneChange = (number) => {
        setPhoneNumber(number);
        onSubmit(number);
    };

    return (
        <Animated.View
            style={styles.stageContainer}
            entering={SlideInRight}
            exiting={SlideOutLeft}
        >
            <View style={styles.inputWrapper}>
                <Text style={styles.stageTitle}>Welcome to Elixir</Text>
                <Text style={styles.subtitle}>Your Health & Wealth Partner</Text>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={[
                    styles.inputContainer,
                    { borderColor: phoneNumber.length === 10 ? '#00A86B' : '#E0E0E0' }
                ]}>
                    <View style={styles.phonePrefix}>
                        <Text style={styles.prefixText}>+91</Text>
                    </View>
                    <TextInput
                        style={styles.phoneInput}
                        placeholder="0000000000"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={handlePhoneChange}
                        maxLength={10}
                    />
                </View>
            </View>
            <Text style={styles.instructionText}>
                We'll send you a verification code
            </Text>
        </Animated.View>
    );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({
    stageContainer: {
        backgroundColor: 'white',
        padding: width(6),
        borderRadius: width(3),
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
    inputWrapper: {
        marginBottom: height(3),
    },
    inputLabel: {
        fontSize: fontSize(3.5),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
        marginBottom: height(1),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: width(2),
        paddingHorizontal: width(3),
        backgroundColor: 'white',
    },
    phonePrefix: {
        paddingRight: width(2),
        borderRightWidth: 1,
        borderRightColor: '#E0E0E0',
    },
    prefixText: {
        fontSize: fontSize(4),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
    },
    phoneInput: {
        flex: 1,
        paddingVertical: width(3),
        paddingLeft: width(2),
        fontSize: fontSize(5.2),
        fontFamily: font.MontserratRegular,
    },
    instructionText: {
        fontSize: fontSize(3.5),
        fontFamily: font.MontserratRegular,
        color: '#666',
        textAlign: 'center',
    },
}); 