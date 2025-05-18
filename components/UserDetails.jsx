import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    findNodeHandle,
    UIManager,
} from 'react-native';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';
import { fontSize, height, width } from '../utils/constants/responsiveUtils';
import { font } from '../utils/constants/constant';

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

const UserDetails = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const scrollViewRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);

    React.useEffect(() => {
        onSubmit({ name, email });
    }, [name, email]);

    const handleEmailChange = (text) => {
        setEmail(text);
        if (text.length === 0 || validateEmail(text)) {
            setEmailError('');
        } else {
            setEmailError('Please enter a valid email address');
        }
    };

    const scrollToInput = (ref) => {
        const handle = findNodeHandle(ref.current);
        if (handle) {
            UIManager.measure(handle, (_x, _y, _width, _height, _pageX, pageY) => {
                scrollViewRef.current?.scrollTo({ y: pageY - height(25), animated: true });
            });
        }
    };

    return (

        <Animated.View
            style={styles.stageContainer}
            entering={SlideInRight.duration(500)}
            exiting={SlideOutLeft.duration(500)}
        >
            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: Keyboard.isVisible() ? height(3) : height(3) }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.stageTitle}>Complete Your Profile</Text>
                <Text style={styles.subtitle}>Let us know a bit more about you</Text>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <TextInput
                        ref={nameRef}
                        style={styles.input}
                        placeholder="Enter your full name"
                        value={name}
                        onChangeText={setName}
                        onFocus={() => scrollToInput(nameRef)}
                        autoCapitalize="words"
                        returnKeyType="next"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Email Address</Text>
                    <TextInput
                        ref={emailRef}
                        style={styles.emailInput}
                        placeholder="Enter your email address"
                        value={email}
                        onChangeText={handleEmailChange}
                        onFocus={() => scrollToInput(emailRef)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="done"
                    />
                    {!!emailError && (
                        <Text style={styles.errorText}>{emailError}</Text>
                    )}
                </View>
            </ScrollView>
        </Animated.View>

    );
};


export default UserDetails;

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
        maxHeight: height(60)
    },
    topHalf: {
        flex: 0,
        minHeight: height(35),
        maxHeight: height(45),
        justifyContent: 'flex-start',
    },
    stageTitle: {
        fontSize: fontSize(6),
        fontFamily: font.MontserratSemiBold,
        marginBottom: height(1),
        color: '#00A86B',
    },
    subtitle: {
        fontSize: fontSize(4),
        fontFamily: font.MontserratRegular,
        color: '#666',
        marginBottom: height(2),
    },
    inputWrapper: {
        marginBottom: height(2.5),
    },
    inputLabel: {
        fontSize: fontSize(3.5),
        fontFamily: font.MontserratSemiBold,
        color: '#00A86B',
        marginBottom: height(1),
    },
    input: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: width(2),
        paddingHorizontal: width(3),
        paddingVertical: width(3),
        backgroundColor: 'white',
        fontSize: fontSize(4),
        fontFamily: font.MontserratRegular,
    },
    emailInput: {
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: width(2),
        paddingHorizontal: width(3),
        paddingVertical: width(3),
        backgroundColor: 'white',
        fontSize: fontSize(4),
        fontFamily: font.MontserratRegular,
    },
    errorText: {
        color: '#D32F2F',
        fontSize: fontSize(3.2),
        marginTop: height(0.5),
        fontFamily: font.MontserratRegular,
    },
}); 